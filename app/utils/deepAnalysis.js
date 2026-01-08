// Mock deep analysis data generator
// Simulates DNS reputation, WHOIS, and community report checks

/**
 * Generate mock deep analysis based on URL characteristics
 * In production, this would call real APIs for DNS, WHOIS, etc.
 */
export function generateMockDeepAnalysis(url) {
    // Parse domain from URL
    const domain = extractDomain(url);

    // Generate realistic mock data based on domain characteristics
    const isSuspicious = detectSuspiciousPatterns(domain);

    return {
        dns: generateDNSData(domain, isSuspicious),
        domain: generateDomainData(domain, isSuspicious),
        community: generateCommunityData(domain, isSuspicious)
    };
}

function extractDomain(url) {
    try {
        const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
        return urlObj.hostname;
    } catch {
        return url;
    }
}

function detectSuspiciousPatterns(domain) {
    const suspiciousPatterns = [
        /\d{1,3}-\d{1,3}-\d{1,3}-\d{1,3}/, // IP address pattern
        /[0o][0o]/gi, // Double zeros or Os
        /amaz[0o]n|paypa[il]|micr[0o]s[0o]ft/i, // Common phishing
        /-verify|-secure|-login|-account|-update/i, // Suspicious keywords
        /\.tk$|\.ga$|\.ml$|\.cf$/, // Free TLDs
    ];

    return suspiciousPatterns.some(pattern => pattern.test(domain));
}

function generateDNSData(domain, isSuspicious) {
    // Well-known safe domains
    const knownSafeDomains = ['google.com', 'microsoft.com', 'amazon.com', 'apple.com', 'github.com'];

    if (knownSafeDomains.some(safe => domain.includes(safe))) {
        return {
            reputation: 'clean',
            reportCount: 0,
            lastReported: null
        };
    }

    if (isSuspicious) {
        return {
            reputation: 'flagged',
            reportCount: Math.floor(Math.random() * 30) + 15,
            lastReported: '2 days ago'
        };
    }

    // Random for demo purposes
    const rand = Math.random();
    if (rand > 0.7) {
        return {
            reputation: 'clean',
            reportCount: 0,
            lastReported: null
        };
    } else if (rand > 0.4) {
        return {
            reputation: 'suspicious',
            reportCount: Math.floor(Math.random() * 5) + 1,
            lastReported: `${Math.floor(Math.random() * 7) + 1} days ago`
        };
    } else {
        return {
            reputation: 'suspicious',
            reportCount: Math.floor(Math.random() * 10) + 5,
            lastReported: `${Math.floor(Math.random() * 3) + 1} days ago`
        };
    }
}

function generateDomainData(domain, isSuspicious) {
    // Well-known domains are old
    const knownOldDomains = ['google.com', 'microsoft.com', 'amazon.com', 'apple.com'];

    if (knownOldDomains.some(old => domain.includes(old))) {
        return {
            age: {
                years: Math.floor(Math.random() * 10) + 15,
                months: Math.floor(Math.random() * 12)
            },
            registrar: 'MarkMonitor Inc.',
            createdDate: '1997-09-15'
        };
    }

    if (isSuspicious) {
        // Suspicious domains are usually new
        return {
            age: {
                years: 0,
                months: Math.floor(Math.random() * 3) + 1
            },
            registrar: 'Unknown Registrar',
            createdDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        };
    }

    // Random age for demo
    const years = Math.floor(Math.random() * 5);
    const months = Math.floor(Math.random() * 12);

    return {
        age: { years, months },
        registrar: ['GoDaddy', 'Namecheap', 'Google Domains', 'Cloudflare'][Math.floor(Math.random() * 4)],
        createdDate: new Date(Date.now() - (years * 365 + months * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
}

function generateCommunityData(domain, isSuspicious) {
    if (isSuspicious) {
        const scamReports = Math.floor(Math.random() * 30) + 10;
        const phishingReports = Math.floor(Math.random() * 25) + 15;
        return {
            scamReports,
            phishingReports,
            totalReports: scamReports + phishingReports
        };
    }

    // Random for demo
    const rand = Math.random();
    if (rand > 0.8) {
        return {
            scamReports: 0,
            phishingReports: 0,
            totalReports: 0
        };
    } else if (rand > 0.5) {
        const reports = Math.floor(Math.random() * 3) + 1;
        return {
            scamReports: reports,
            phishingReports: 0,
            totalReports: reports
        };
    } else {
        const scam = Math.floor(Math.random() * 5) + 3;
        const phishing = Math.floor(Math.random() * 5) + 2;
        return {
            scamReports: scam,
            phishingReports: phishing,
            totalReports: scam + phishing
        };
    }
}
