export default function Home() {
    return (
        <div style={{ minHeight: 'calc(100vh - 200px)' }}>
            {/* Hero Section */}
            <div className="container" style={{ textAlign: 'center', paddingTop: '4rem', paddingBottom: '3rem' }}>
                <div style={{
                    fontSize: '4rem',
                    marginBottom: '1rem',
                    animation: 'fadeIn 0.8s ease'
                }}>
                    🛡️
                </div>
                <h1 style={{
                    fontSize: '3.5rem',
                    background: 'linear-gradient(135deg, #4285f4 0%, #ea4335 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1rem'
                }}>
                    CyberGuardian AI
                </h1>
                <p style={{
                    fontSize: '1.5rem',
                    color: '#b3b3b3',
                    maxWidth: '700px',
                    margin: '0 auto 2rem auto'
                }}>
                    Your All-in-One AI-Powered Cybersecurity Companion
                </p>

                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    marginTop: '2rem'
                }}>
                    <a href="/chat" style={{ textDecoration: 'none' }}>
                        <button className="btn btn-success" style={{ fontSize: '1.1rem' }}>
                            💬 Chat with AI
                        </button>
                    </a>
                    <a href="/phishing" style={{ textDecoration: 'none' }}>
                        <button className="btn btn-danger" style={{ fontSize: '1.1rem' }}>
                            🎣 Try Phishing Detection
                        </button>
                    </a>
                    <a href="/awareness" style={{ textDecoration: 'none' }}>
                        <button className="btn" style={{ fontSize: '1.1rem' }}>
                            📚 Take Security Quiz
                        </button>
                    </a>
                </div>
            </div>

            {/* Features Grid */}
            <div className="container">
                <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    Protect Yourself Across 4 Security Tracks
                </h2>

                <div className="grid">
                    <a href="/awareness" style={{ textDecoration: 'none' }}>
                        <div className="card card-clickable" style={{ height: '100%' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📚</div>
                            <h3>Cyber Awareness</h3>
                            <p>Learn cybersecurity through interactive quizzes, FAQs, and daily security tips. Build your knowledge progressively.</p>
                            <div className="badge badge-info">Track 1</div>
                        </div>
                    </a>

                    <a href="/phishing" style={{ textDecoration: 'none' }}>
                        <div className="card card-clickable" style={{
                            height: '100%',
                            borderTop: '4px solid var(--danger)'
                        }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎣</div>
                            <h3>Phishing Detection</h3>
                            <p>Analyze suspicious URLs and emails in real-time using AI and threat intelligence. Protect yourself from scams.</p>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <span className="badge badge-critical">Track 2</span>
                                <span className="badge badge-info">AI-Powered</span>
                            </div>
                        </div>
                    </a>

                    <a href="/incident" style={{ textDecoration: 'none' }}>
                        <div className="card card-clickable" style={{ height: '100%' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🚨</div>
                            <h3>Incident Response</h3>
                            <p>Step-by-step playbooks guide you through security incidents like phishing, ransomware, and malware attacks.</p>
                            <div className="badge badge-info">Track 3</div>
                        </div>
                    </a>

                    <a href="/code-security" style={{ textDecoration: 'none' }}>
                        <div className="card card-clickable" style={{ height: '100%' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💻</div>
                            <h3>Code Security</h3>
                            <p>Scan your code for vulnerabilities like SQL injection, XSS, and hardcoded secrets. Get instant fix recommendations.</p>
                            <div className="badge badge-info">Track 4</div>
                        </div>
                    </a>

                    <a href="/scanner" style={{ textDecoration: 'none' }}>
                        <div className="card card-clickable" style={{
                            height: '100%',
                            borderTop: '4px solid var(--success)'
                        }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔍</div>
                            <h3>Multi-Modal Scanner</h3>
                            <p>Scan QR codes and extract text from screenshots to detect phishing attempts in images and messages.</p>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <span className="badge badge-low">QR Scanner</span>
                                <span className="badge badge-info">OCR Analysis</span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            {/* Cybersecurity Awareness Stats - Real Data */}
            <div className="container" style={{ marginTop: '4rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '2rem' }}>
                    Real-Time Threat Landscape
                </h2>
                <div className="grid" style={{ textAlign: 'center' }}>
                    <div className="card" style={{
                        background: 'linear-gradient(135deg, rgba(234, 67, 53, 0.15) 0%, rgba(234, 67, 53, 0.05) 100%)',
                        borderLeft: '4px solid var(--danger)'
                    }}>
                        <h2 style={{ fontSize: '3rem', color: 'var(--danger)', marginBottom: '0.5rem' }}>
                            3.4B
                        </h2>
                        <p style={{ fontSize: '1.05rem', margin: 0, color: 'var(--text-primary)', fontWeight: '600' }}>
                            Phishing Emails Daily
                        </p>
                        <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                            Worldwide average in 2024
                        </p>
                    </div>
                    <div className="card" style={{
                        background: 'linear-gradient(135deg, rgba(251, 188, 4, 0.15) 0%, rgba(251, 188, 4, 0.05) 100%)',
                        borderLeft: '4px solid var(--warning)'
                    }}>
                        <h2 style={{ fontSize: '3rem', color: 'var(--warning)', marginBottom: '0.5rem' }}>
                            ₹33,000
                        </h2>
                        <p style={{ fontSize: '1.05rem', margin: 0, color: 'var(--text-primary)', fontWeight: '600' }}>
                            Average Scam Loss
                        </p>
                        <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                            Per victim in India (2024)
                        </p>
                    </div>
                    <div className="card" style={{
                        background: 'linear-gradient(135deg, rgba(52, 168, 83, 0.15) 0%, rgba(52, 168, 83, 0.05) 100%)',
                        borderLeft: '4px solid var(--success)'
                    }}>
                        <h2 style={{ fontSize: '3rem', color: 'var(--success)', marginBottom: '0.5rem' }}>
                            90%
                        </h2>
                        <p style={{ fontSize: '1.05rem', margin: 0, color: 'var(--text-primary)', fontWeight: '600' }}>
                            Preventable Attacks
                        </p>
                        <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                            With basic awareness
                        </p>
                    </div>
                </div>

                {/* Additional Awareness Stats */}
                <div style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    background: 'rgba(66, 133, 244, 0.05)',
                    borderRadius: '12px',
                    border: '1px solid rgba(66, 133, 244, 0.2)'
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1.5rem',
                        textAlign: 'center'
                    }}>
                        <div>
                            <div style={{ fontSize: '2rem', color: 'var(--primary)', fontWeight: '700' }}>
                                68%
                            </div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                Data breaches involve human error
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '2rem', color: 'var(--primary)', fontWeight: '700' }}>
                                43%
                            </div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                Cyberattacks target small businesses
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '2rem', color: 'var(--primary)', fontWeight: '700' }}>
                                95%
                            </div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                Cybersecurity issues caused by people
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '2rem', color: 'var(--primary)', fontWeight: '700' }}>
                                300+
                            </div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                New threats created every minute
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission Statement */}
            <div className="container" style={{ marginTop: '4rem', textAlign: 'center' }}>
                <div className="card" style={{
                    background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.1) 0%, rgba(234, 67, 53, 0.1) 100%)',
                    borderColor: 'var(--primary)'
                }}>
                    <h2 style={{ marginBottom: '1rem' }}>Our Mission</h2>
                    <p style={{ fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto', color: 'var(--text-primary)' }}>
                        Making enterprise-grade cybersecurity accessible to all 4+ billion internet users.
                        From grandparents checking suspicious emails to developers writing secure code—everyone deserves protection.
                    </p>
                </div>
            </div>
        </div>
    )
}
