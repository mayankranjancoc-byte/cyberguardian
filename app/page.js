export default function Home() {
    return (
        <div style={{ minHeight: 'calc(100vh - 200px)' }}>
            {/* Hero Section - Simple and Clear */}
            <div className="container" style={{ textAlign: 'center', paddingTop: '4rem', paddingBottom: '2rem' }}>
                <div className="floating" style={{
                    fontSize: '6rem',
                    marginBottom: '1.5rem',
                    filter: 'drop-shadow(0 0 30px rgba(102, 126, 234, 0.8))'
                }}>
                    🛡️
                </div>
                <h1 className="gradient-text" style={{
                    fontSize: '4rem',
                    marginBottom: '1.5rem'
                }}>
                    CyberGuardian AI
                </h1>
                <p style={{
                    fontSize: '1.5rem',
                    color: 'var(--text-secondary)',
                    maxWidth: '700px',
                    margin: '0 auto',
                    lineHeight: '1.6'
                }}>
                    Stay safe online with easy, powerful tools
                </p>
            </div>

            {/* Main Feature Cards - 4 Large, Simple Options */}
            <div className="container">
                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '3rem',
                    fontSize: '2rem',
                    fontWeight: '600'
                }}>
                    What would you like to do?
                </h2>

                <div className="grid-2">
                    {/* Card 1: Learn Safety */}
                    <a href="/awareness" style={{ textDecoration: 'none' }}>
                        <div className="feature-card fade-in-up" style={{ animationDelay: '0.1s' }}>
                            <div className="feature-icon">🧠</div>
                            <h3 className="feature-title">Learn Safety</h3>
                            <p className="feature-description">
                                Take a quick quiz to learn how to stay safe
                            </p>
                        </div>
                    </a>

                    {/* Card 2: Check Link or Message */}
                    <a href="/phishing" style={{ textDecoration: 'none' }}>
                        <div className="feature-card fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <div className="feature-icon">🎣</div>
                            <h3 className="feature-title">Check Link or Message</h3>
                            <p className="feature-description">
                                Not sure if a link is safe? Check it here
                            </p>
                        </div>
                    </a>

                    {/* Card 3: Incident Help */}
                    <a href="/incident" style={{ textDecoration: 'none' }}>
                        <div className="feature-card fade-in-up" style={{ animationDelay: '0.3s' }}>
                            <div className="feature-icon">🚨</div>
                            <h3 className="feature-title">Incident Help</h3>
                            <p className="feature-description">
                                Something went wrong? Get step-by-step help
                            </p>
                        </div>
                    </a>

                    {/* Card 4: Check Code */}
                    <a href="/code-security" style={{ textDecoration: 'none' }}>
                        <div className="feature-card fade-in-up" style={{ animationDelay: '0.4s' }}>
                            <div className="feature-icon">💻</div>
                            <h3 className="feature-title">Check Code</h3>
                            <p className="feature-description">
                                Developers: scan your code for security issues
                            </p>
                        </div>
                    </a>
                </div>
            </div>

            {/* Additional Features - Simple List */}
            <div className="container" style={{ marginTop: '4rem' }}>
                <h3 style={{
                    textAlign: 'center',
                    marginBottom: '2rem',
                    color: 'var(--text-secondary)',
                    fontWeight: '500'
                }}>
                    More Tools Available:
                </h3>

                <div className="grid">
                    <a href="/chat" style={{ textDecoration: 'none' }}>
                        <div className="card card-clickable">
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💬</div>
                            <h3>AI Assistant</h3>
                            <p>Ask questions and get instant security advice</p>
                        </div>
                    </a>

                    <a href="/scanner" style={{ textDecoration: 'none' }}>
                        <div className="card card-clickable">
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔍</div>
                            <h3>Scan QR Codes</h3>
                            <p>Check QR codes and images for hidden threats</p>
                        </div>
                    </a>

                    <a href="/community" style={{ textDecoration: 'none' }}>
                        <div className="card card-clickable">
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌍</div>
                            <h3>Threat Alerts</h3>
                            <p>See what scams are happening right now</p>
                        </div>
                    </a>

                    <a href="/dashboard" style={{ textDecoration: 'none' }}>
                        <div className="card card-clickable">
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📊</div>
                            <h3>Your Progress</h3>
                            <p>Track your security learning and achievements</p>
                        </div>
                    </a>
                </div>
            </div>

            {/* Why It's Free - Simple Message */}
            <div className="container" style={{ marginTop: '5rem', marginBottom: '3rem', textAlign: 'center' }}>
                <div className="card" style={{
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(15px)',
                    borderColor: 'rgba(102, 126, 234, 0.3)'
                }}>
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '2.25rem' }}>✨ Free for Everyone ✨</h2>
                    <p style={{
                        fontSize: '1.25rem',
                        maxWidth: '650px',
                        margin: '0 auto',
                        color: 'var(--text-primary)',
                        lineHeight: '1.7'
                    }}>
                        Everyone deserves to be safe online. No signup required, no credit card needed.
                        Just click and start protecting yourself today.
                    </p>
                </div>
            </div>
        </div>
    )
}
