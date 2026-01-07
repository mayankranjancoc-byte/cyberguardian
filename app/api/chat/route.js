export async function POST(request) {
    try {
        const { message, context = [] } = await request.json();

        if (!message || !message.trim()) {
            return Response.json({ error: 'Message is required' }, { status: 400 });
        }

        // Call Gemini AI API
        const geminiResponse = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.AIzaSyBoIiLJVEe9qaqnuAN9wqNkWqXNLQrxfLM}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `You are CyberGuardian AI, a friendly and knowledgeable cybersecurity assistant. Help users with:
1. Cybersecurity questions and education
2. Phishing detection and analysis
3. Incident response guidance
4. Secure coding practices
5. General security advice

Be concise, friendly, and actionable. Use emojis where appropriate.

${context.length > 0 ? `Previous context: ${JSON.stringify(context.slice(-3))}` : ''}

User question: ${message}`
                                }
                            ]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 1024
                    }
                })
            }
        );

        if (!geminiResponse.ok) {
            const errorData = await geminiResponse.json();
            console.error('Gemini API error:', errorData);

            // Fallback response if API fails
            return Response.json({
                response: getFallbackResponse(message),
                source: 'fallback'
            });
        }

        const data = await geminiResponse.json();
        const aiResponse = data.candidates[0]?.content?.parts[0]?.text || 'Sorry, I couldn\'t process that request.';

        return Response.json({
            response: aiResponse,
            source: 'gemini'
        });

    } catch (error) {
        console.error('Chat API error:', error);

        // Return fallback response
        return Response.json({
            response: getFallbackResponse(message || ''),
            source: 'fallback'
        });
    }
}

// Fallback responses when AI is unavailable
function getFallbackResponse(message) {
    const msg = message.toLowerCase();

    if (msg.includes('phishing') || msg.includes('scam') || msg.includes('suspicious')) {
        return "🎣 To analyze a suspicious URL or email, please use our Phishing Detection tool. Navigate to the Phishing section and paste the URL you want to check. We'll analyze it using real-time threat intelligence!";
    }

    if (msg.includes('password') || msg.includes('strong')) {
        return "🔐 Strong passwords should be:\n• At least 12 characters long\n• Mix of uppercase, lowercase, numbers, and symbols\n• Unique for each account\n• Not based on personal information\n\nConsider using a password manager to generate and store strong passwords!";
    }

    if (msg.includes('2fa') || msg.includes('two-factor') || msg.includes('authentication')) {
        return "🛡️ Two-Factor Authentication (2FA) adds an extra layer of security by requiring:\n1. Something you know (password)\n2. Something you have (phone, security key)\n\nAlways enable 2FA on important accounts like email, banking, and social media!";
    }

    if (msg.includes('ransomware')) {
        return "🔒 If you suspect ransomware:\n1. Disconnect from network immediately\n2. DO NOT pay the ransom\n3. Contact law enforcement\n4. Check our Incident Response section for detailed guidance\n\nPrevention: Keep backups, update software, and be cautious with email attachments!";
    }

    if (msg.includes('quiz') || msg.includes('learn') || msg.includes('test')) {
        return "📚 Test your knowledge with our Cyber Awareness Quiz! Navigate to the Awareness section to:\n• Take a 10-question quiz\n• Learn cybersecurity fundamentals\n• Earn badges and track your progress\n\nIt's a great way to improve your security awareness!";
    }

    if (msg.includes('code') || msg.includes('sql injection') || msg.includes('vulnerability')) {
        return "💻 Use our Code Security Scanner to detect vulnerabilities like:\n• SQL Injection\n• Cross-Site Scripting (XSS)\n• Hardcoded secrets\n• Weak cryptography\n\nNavigate to the Code Security section and paste your code for instant analysis!";
    }

    // Default response
    return "👋 Hello! I'm CyberGuardian AI, your cybersecurity assistant. I can help you with:\n\n🎣 **Phishing Detection** - Analyze suspicious URLs\n📚 **Security Learning** - Take quizzes and learn best practices\n🚨 **Incident Response** - Get guidance during security incidents\n💻 **Code Security** - Scan code for vulnerabilities\n\nWhat would you like help with today?";
}
