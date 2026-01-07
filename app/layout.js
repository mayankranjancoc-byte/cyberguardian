import './globals.css'

export const metadata = {
    title: 'CyberGuardian AI - Your Cybersecurity Companion',
    description: 'All-in-one AI-powered cybersecurity assistant for threat detection, learning, and incident response',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {/* Navigation - Glassmorphic */}
                <nav style={{
                    background: 'rgba(26, 26, 46, 0.8)',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    padding: '1.25rem 0',
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
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: '#fff',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                        }}>
                            <span style={{ fontSize: '2rem' }}>🛡️</span>
                            CyberGuardian AI
                        </a>

                        <div style={{
                            display: 'flex',
                            gap: '2rem',
                            flex: 1,
                            flexWrap: 'wrap'
                        }}>
                            <a href="/chat" style={{
                                color: 'var(--text-secondary)',
                                textDecoration: 'none',
                                transition: 'all 0.3s',
                                fontWeight: '500',
                                fontSize: '1.125rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 0.75rem',
                                borderRadius: '8px'
                            }}>
                                💬 Chat
                            </a>
                            <a href="/awareness" style={{
                                color: 'var(--text-secondary)',
                                textDecoration: 'none',
                                transition: 'all 0.3s',
                                fontWeight: '500',
                                fontSize: '1.125rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 0.75rem',
                                borderRadius: '8px'
                            }}>
                                🧠 Learn
                            </a>
                            <a href="/phishing" style={{
                                color: 'var(--text-secondary)',
                                textDecoration: 'none',
                                transition: 'all 0.3s',
                                fontWeight: '500',
                                fontSize: '1.125rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 0.75rem',
                                borderRadius: '8px'
                            }}>
                                🎣 Check Link
                            </a>
                            <a href="/incident" style={{
                                color: 'var(--text-secondary)',
                                textDecoration: 'none',
                                transition: 'all 0.3s',
                                fontWeight: '500',
                                fontSize: '1.125rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 0.75rem',
                                borderRadius: '8px'
                            }}>
                                🚨 Help
                            </a>
                            <a href="/code-security" style={{
                                color: 'var(--text-secondary)',
                                textDecoration: 'none',
                                transition: 'all 0.3s',
                                fontWeight: '500',
                                fontSize: '1.125rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 0.75rem',
                                borderRadius: '8px'
                            }}>
                                💻 Code
                            </a>
                        </div>
                    </div>
                </nav>

                <main>{children}</main>

                {/* Floating AI Assistant - Always Visible */}
                <a href="/chat" aria-label="Get Help from AI Assistant" style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '2.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    zIndex: 999,
                    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.6)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    animation: 'glow 3s ease-in-out infinite'
                }}>
                    💬
                </a>

                {/* Footer - Glassmorphic */}
                <footer style={{
                    background: 'rgba(26, 26, 46, 0.8)',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    padding: '2.5rem 0',
                    marginTop: '6rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    textAlign: 'center',
                    color: 'var(--text-secondary)'
                }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                        <p style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>
                            © 2026 CyberGuardian AI
                        </p>
                        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
                            Making Cybersecurity Accessible to Everyone
                        </p>
                    </div>
                </footer>
            </body>
        </html>
    )
}
