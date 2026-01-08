export async function POST(request) {
    try {
        const { url } = await request.json();

        if (!url) {
            return Response.json({ error: 'URL is required' }, { status: 400 });
        }

        // Step 1: Pattern Analysis
        const patterns = [];

        // Check for character substitution (common phishing trick)
        if (url.match(/[0-9]/g) && /amazon|paypal|microsoft|netflix|google|apple|bank/i.test(url)) {
            patterns.push("⚠️ Suspicious character substitution detected (numbers in brand name)");
        }

        // Check for suspicious domains
        const suspiciousTLDs = ['.tk', '.ml', '.ga', '.cf'];
        if (suspiciousTLDs.some(tld => url.toLowerCase().includes(tld))) {
            patterns.push("⚠️ Known suspicious top-level domain");
        }

        // Check for URL shorteners
        if (/bit\.ly|tinyurl|goo\.gl/i.test(url)) {
            patterns.push("⚠️ URL shortener detected (could hide malicious link)");
        }

        // Check for extra subdomains
        try {
            const urlObj = new URL(url);
            const parts = urlObj.hostname.split('.');
            if (parts.length > 3) {
                patterns.push("⚠️ Excessive subdomains detected");
            }
        } catch (e) {
            return Response.json({ error: 'Invalid URL format' }, { status: 400 });
        }

        // Step 2: VirusTotal Check
        let vtScore = 0;
        let vtSuspicious = 0;
        let vtError = null;

        try {
            // Create URL identifier for VirusTotal
            const urlIdentifier = Buffer.from(url).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

            // Check if URL is already analyzed
            const checkResponse = await fetch(
                `https://www.virustotal.com/api/v3/urls/${urlIdentifier}`,
                {
                    headers: {
                        'x-apikey': process.env.VIRUSTOTAL_API_KEY
                    }
                }
            );

            if (checkResponse.ok) {
                const checkData = await checkResponse.json();
                const stats = checkData.data?.attributes?.last_analysis_stats;
                if (stats) {
                    vtScore = stats.malicious || 0;
                    vtSuspicious = stats.suspicious || 0;
                }
            } else if (checkResponse.status === 404) {
                // URL not in database, submit for analysis
                const submitResponse = await fetch(
                    `https://www.virustotal.com/api/v3/urls`,
                    {
                        method: 'POST',
                        headers: {
                            'x-apikey': process.env.VIRUSTOTAL_API_KEY,
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: `url=${encodeURIComponent(url)}`
                    }
                );

                if (submitResponse.ok) {
                    // Wait a bit and try to get results
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    const retryResponse = await fetch(
                        `https://www.virustotal.com/api/v3/urls/${urlIdentifier}`,
                        {
                            headers: {
                                'x-apikey': process.env.VIRUSTOTAL_API_KEY
                            }
                        }
                    );
                    if (retryResponse.ok) {
                        const retryData = await retryResponse.json();
                        const stats = retryData.data?.attributes?.last_analysis_stats;
                        if (stats) {
                            vtScore = stats.malicious || 0;
                            vtSuspicious = stats.suspicious || 0;
                        }
                    }
                }
            }
        } catch (e) {
            vtError = 'VirusTotal check unavailable';
            console.error('VirusTotal error:', e);
        }

        // Step 3: Calculate Risk Score
        let risk = 0;

        // Pattern-based risk
        risk += patterns.length * 20;

        // VirusTotal-based risk
        risk += vtScore * 10; // Each malicious detection adds 10 points
        risk += vtSuspicious * 5; // Each suspicious detection adds 5 points

        // Cap at 100
        risk = Math.min(risk, 100);

        // Step 4: Generate Recommendation
        let recommendation;
        let riskLevel;

        if (risk >= 70) {
            recommendation = "🚨 HIGH RISK - Do NOT click this link! This appears to be a phishing attempt.";
            riskLevel = 'high';
        } else if (risk >= 40) {
            recommendation = "⚠️ MEDIUM RISK - Proceed with extreme caution. Verify the source before clicking.";
            riskLevel = 'medium';
        } else {
            recommendation = "✅ LOW RISK - This link appears safe, but always stay vigilant.";
            riskLevel = 'low';
        }

        return Response.json({
            url,
            patterns,
            virusTotalScore: vtScore,
            virusTotalSuspicious: vtSuspicious,
            virusTotalError: vtError,
            riskScore: risk,
            riskLevel,
            recommendation,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Analysis error:', error);
        return Response.json(
            { error: 'Failed to analyze URL', details: error.message },
            { status: 500 }
        );
    }
}
