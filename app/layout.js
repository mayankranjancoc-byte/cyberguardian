import './globals.css'

export const metadata = {
    title: 'CyberGuardian AI - Your Cybersecurity Companion',
    description: 'All-in-one AI-powered cybersecurity assistant for threat detection, learning, and incident response',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <nav style={{
                    background: 'rgba(26, 26, 46, 0.8)',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    padding: '1rem 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000
                }}>
                    <div style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        padding: '0 2rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2.5rem',
                        flexWrap: 'wrap'
                    }}>
                        <a href="/" style={{
                            fontSize: '1.25rem',
                            fontWeight: '700',
                            color: '#fff',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <span style={{ fontSize: '1.5rem' }}>🛡️</span>
                            CyberGuardian AI
                        </a>

                        <div style={{
                            display: 'flex',
                            gap: '1.5rem',
                            flex: 1,
                            flexWrap: 'wrap'
                        }}>
                            <a href="/chat" style={{
                                color: '#b3b3b3',
                                textDecoration: 'none',
                                transition: 'color 0.3s',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem'
                            }}>
                                💬 Chat
                            </a>
                            <a href="/awareness" style={{
                                color: '#b3b3b3',
                                textDecoration: 'none',
                                transition: 'color 0.3s',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem'
                            }}>
                                📚 Awareness
                            </a>
                            <a href="/phishing" style={{
                                color: '#b3b3b3',
                                textDecoration: 'none',
                                transition: 'color 0.3s',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem'
                            }}>
                                🎣 Phishing
                            </a>
                            <a href="/incident" style={{
                                color: '#b3b3b3',
                                textDecoration: 'none',
                                transition: 'color 0.3s',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem'
                            }}>
                                🚨 Incident
                            </a>
                            <a href="/code-security" style={{
                                color: '#b3b3b3',
                                textDecoration: 'none',
                                transition: 'color 0.3s',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem'
                            }}>
                                💻 Code
                            </a>
                            <a href="/scanner" style={{
                                color: '#b3b3b3',
                                textDecoration: 'none',
                                transition: 'color 0.3s',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem'
                            }}>
                                🔍 Scanner
                            </a>
                            <a href="/community" style={{
                                color: '#b3b3b3',
                                textDecoration: 'none',
                                transition: 'color 0.3s',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem'
                            }}>
                                🌍 Community
                            </a>
                            <a href="/dashboard" style={{
                                color: '#b3b3b3',
                                textDecoration: 'none',
                                transition: 'color 0.3s',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem'
                            }}>
                                📊 Dashboard
                            </a>
                        </div>
                    </div>
                </nav>

                <main>{children}</main>

                <footer style={{
                    background: 'rgba(26, 26, 46, 0.8)',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    padding: '2rem 0',
                    marginTop: '4rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    textAlign: 'center',
                    color: '#b3b3b3'
                }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                        <p>© 2026 CyberGuardian AI - Making Cybersecurity Accessible to Everyone</p>
                        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                            Built with ❤️ for CyberFirst Hackathon
                        </p>
                    </div>
                </footer>
            </body>
        </html>
    )
}
