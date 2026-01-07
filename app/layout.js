import './globals.css'

export const metadata = {
    title: 'CyberGuardian AI - Your Cybersecurity Companion',
    description: 'All-in-one AI-powered cybersecurity assistant for threat detection, learning, and incident response',
}

export default function RootLayout({ children }) {
    return (
    \u003chtml lang = "en"\u003e
    \u003cbody\u003e
    {/* Navigation - Glassmorphic */ }
    \u003cnav style = {{
        background: 'rgba(26, 26, 46, 0.8)',
            backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
                    padding: '1.25rem 0',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                            position: 'sticky',
                                top: 0,
                                    zIndex: 1000
    }
} \u003e
\u003cdiv style = {{
    maxWidth: '1200px',
        margin: '0 auto',
            padding: '0 2rem',
                display: 'flex',
                    alignItems: 'center',
                        gap: '2.5rem',
                            flexWrap: 'wrap'
}}\u003e
\u003ca href = "/" style = {{
    fontSize: '1.5rem',
        fontWeight: '700',
            color: '#fff',
                textDecoration: 'none',
                    display: 'flex',
                        alignItems: 'center',
                            gap: '0.75rem'
}}\u003e
\u003cspan style = {{ fontSize: '2rem' }}\u003e🛡️\u003c / span\u003e
                            CyberGuardian AI
\u003c / a\u003e

\u003cdiv style = {{
    display: 'flex',
        gap: '2rem',
            flex: 1,
                flexWrap: 'wrap'
}}\u003e
\u003ca href = "/chat" style = {{
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
}}\u003e
                                💬 Chat
\u003c / a\u003e
\u003ca href = "/awareness" style = {{
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
}}\u003e
                                🧠 Learn
\u003c / a\u003e
\u003ca href = "/phishing" style = {{
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
}}\u003e
                                🎣 Check Link
\u003c / a\u003e
\u003ca href = "/incident" style = {{
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
}}\u003e
                                🚨 Help
\u003c / a\u003e
\u003ca href = "/code-security" style = {{
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
}}\u003e
                                💻 Code
\u003c / a\u003e
\u003c / div\u003e
\u003c / div\u003e
\u003c / nav\u003e

\u003cmain\u003e{ children } \u003c / main\u003e

{/* Floating AI Assistant - Always Visible */ }
\u003ca href = "/chat" aria - label="Get Help from AI Assistant" style = {{
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
}}\u003e
                    💬
\u003c / a\u003e

{/* Footer - Glassmorphic */ }
\u003cfooter style = {{
    background: 'rgba(26, 26, 46, 0.8)',
        backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
                padding: '2.5rem 0',
                    marginTop: '6rem',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                            textAlign: 'center',
                                color: 'var(--text-secondary)'
}}\u003e
\u003cdiv style = {{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}\u003e
\u003cp style = {{ fontSize: '1.125rem', marginBottom: '0.75rem' }}\u003e
                            © 2026 CyberGuardian AI
\u003c / p\u003e
\u003cp style = {{ fontSize: '1rem', color: 'var(--text-secondary)' }}\u003e
                            Making Cybersecurity Accessible to Everyone
\u003c / p\u003e
\u003c / div\u003e
\u003c / footer\u003e
\u003c / body\u003e
\u003c / html\u003e
    )
}
