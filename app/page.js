export default function Home() {
    return (
    \u003cdiv style = {{ minHeight: 'calc(100vh - 200px)' }
} \u003e
{/* Hero Section - Simple and Clear */ }
\u003cdiv className = "container" style = {{ textAlign: 'center', paddingTop: '4rem', paddingBottom: '2rem' }}\u003e
\u003cdiv className = "floating" style = {{
    fontSize: '6rem',
        marginBottom: '1.5rem',
            filter: 'drop-shadow(0 0 30px rgba(102, 126, 234, 0.8))'
}}\u003e
                    🛡️
\u003c / div\u003e
\u003ch1 className = "gradient-text" style = {{
    fontSize: '4rem',
        marginBottom: '1.5rem'
}}\u003e
                    CyberGuardian AI
\u003c / h1\u003e
\u003cp style = {{
    fontSize: '1.5rem',
        color: 'var(--text-secondary)',
            maxWidth: '700px',
                margin: '0 auto',
                    lineHeight: '1.6'
}}\u003e
                    Stay safe online with easy, powerful tools
\u003c / p\u003e
\u003c / div\u003e

{/* Main Feature Cards - 4 Large, Simple Options */ }
\u003cdiv className = "container"\u003e
\u003ch2 style = {{
    textAlign: 'center',
        marginBottom: '3rem',
            fontSize: '2rem',
                fontWeight: '600'
}}\u003e
                    What would you like to do?
\u003c / h2\u003e

\u003cdiv className = "grid-2"\u003e
{/* Card 1: Learn Safety */ }
\u003ca href = "/awareness" style = {{ textDecoration: 'none' }}\u003e
\u003cdiv className = "feature-card fade-in-up" style = {{ animationDelay: '0.1s' }}\u003e
\u003cdiv className = "feature-icon"\u003e🧠\u003c / div\u003e
\u003ch3 className = "feature-title"\u003eLe arn Safety\u003c / h3\u003e
\u003cp className = "feature-description"\u003e
                                Take a quick quiz to learn how to stay safe
\u003c / p\u003e
\u003c / div\u003e
\u003c / a\u003e

{/* Card 2: Check Link or Message */ }
\u003ca href = "/phishing" style = {{ textDecoration: 'none' }}\u003e
\u003cdiv className = "feature-card fade-in-up" style = {{ animationDelay: '0.2s' }}\u003e
\u003cdiv className = "feature-icon"\u003e🎣\u003c / div\u003e
\u003ch3 className = "feature-title"\u003eCheck Link or Message\u003c / h3\u003e
\u003cp className = "feature-description"\u003e
                                Not sure if a link is safe ? Check it here
\u003c / p\u003e
\u003c / div\u003e
\u003c / a\u003e

{/* Card 3: Incident Help */ }
\u003ca href = "/incident" style = {{ textDecoration: 'none' }}\u003e
\u003cdiv className = "feature-card fade-in-up" style = {{ animationDelay: '0.3s' }}\u003e
\u003cdiv className = "feature-icon"\u003e🚨\u003c / div\u003e
\u003ch3 className = "feature-title"\u003eIncident Help\u003c / h3\u003e
\u003cp className = "feature-description"\u003e
                                Something went wrong ? Get step - by - step help
\u003c / p\u003e
\u003c / div\u003e
\u003c / a\u003e

{/* Card 4: Check Code */ }
\u003ca href = "/code-security" style = {{ textDecoration: 'none' }}\u003e
\u003cdiv className = "feature-card fade-in-up" style = {{ animationDelay: '0.4s' }}\u003e
\u003cdiv className = "feature-icon"\u003e💻\u003c / div\u003e
\u003ch3 className = "feature-title"\u003eCheck Code\u003c / h3\u003e
\u003cp className = "feature-description"\u003e
Developers: scan your code for security issues
\u003c / p\u003e
\u003c / div\u003e
\u003c / a\u003e
\u003c / div\u003e
\u003c / div\u003e

{/* Additional Features - Simple List */ }
\u003cdiv className = "container" style = {{ marginTop: '4rem' }}\u003e
\u003ch3 style = {{
    textAlign: 'center',
        marginBottom: '2rem',
            color: 'var(--text-secondary)',
                fontWeight: '500'
}}\u003e
                    More Tools Available:
\u003c / h3\u003e

\u003cdiv className = "grid"\u003e
\u003ca href = "/chat" style = {{ textDecoration: 'none' }}\u003e
\u003cdiv className = "card card-clickable"\u003e
\u003cdiv style = {{ fontSize: '2.5rem', marginBottom: '1rem' }}\u003e💬\u003c / div\u003e
\u003ch3\u003eAI Assistant\u003c / h3\u003e
\u003cp\u003eAsk questions and get instant security advice\u003c / p\u003e
\u003c / div\u003e
\u003c / a\u003e

\u003ca href = "/scanner" style = {{ textDecoration: 'none' }}\u003e
\u003cdiv className = "card card-clickable"\u003e
\u003cdiv style = {{ fontSize: '2.5rem', marginBottom: '1rem' }}\u003e🔍\u003c / div\u003e
\u003ch3\u003eScan QR Codes\u003c / h3\u003e
\u003cp\u003eCheck QR codes and images for hidden threats\u003c / p\u003e
\u003c / div\u003e
\u003c / a\u003e

\u003ca href = "/community" style = {{ textDecoration: 'none' }}\u003e
\u003cdiv className = "card card-clickable"\u003e
\u003cdiv style = {{ fontSize: '2.5rem', marginBottom: '1rem' }}\u003e🌍\u003c / div\u003e
\u003ch3\u003eThreat Alerts\u003c / h3\u003e
\u003cp\u003eSee what scams are happening right now\u003c / p\u003e
\u003c / div\u003e
\u003c / a\u003e

\u003ca href = "/dashboard" style = {{ textDecoration: 'none' }}\u003e
\u003cdiv className = "card card-clickable"\u003e
\u003cdiv style = {{ fontSize: '2.5rem', marginBottom: '1rem' }}\u003e📊\u003c / div\u003e
\u003ch3\u003eYour Progress\u003c / h3\u003e
\u003cp\u003eTrack your security learning and achievements\u003c / p\u003e
\u003c / div\u003e
\u003c / a\u003e
\u003c / div\u003e
\u003c / div\u003e

{/* Why It's Free - Simple Message */ }
\u003cdiv className = "container" style = {{ marginTop: '5rem', marginBottom: '3rem', textAlign: 'center' }}\u003e
\u003cdiv className = "card" style = {{
    background: 'var(--glass-bg)',
        backdropFilter: 'blur(15px)',
            borderColor: 'rgba(102, 126, 234, 0.3)'
}}\u003e
\u003ch2 style = {{ marginBottom: '1.5rem', fontSize: '2.25rem' }}\u003e✨ Free for Everyone ✨\u003c / h2\u003e
\u003cp style = {{
    fontSize: '1.25rem',
        maxWidth: '650px',
            margin: '0 auto',
                color: 'var(--text-primary)',
                    lineHeight: '1.7'
}}\u003e
                        Everyone deserves to be safe online.No signup required, no credit card needed.
                        Just click and start protecting yourself today.
\u003c / p\u003e
\u003c / div\u003e
\u003c / div\u003e
\u003c / div\u003e
    )
}
