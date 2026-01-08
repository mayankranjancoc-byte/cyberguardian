'use client';
import LanguageSelector from './components/LanguageSelector';
import { useLanguage } from './context/LanguageContext';

export default function NavigationAndFooter({ children }) {
    const { t } = useLanguage();

    return (
        <>
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
                        {t('app.name')}
                    </a>

                    <div style={{
                        display: 'flex',
                        gap: '1.5rem',
                        flex: 1,
                        flexWrap: 'wrap'
                    }}>
                        <a href="/chat" style={{ color: '#b3b3b3', textDecoration: 'none', transition: 'color 0.3s', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            💬 {t('nav.chat')}
                        </a>
                        <a href="/awareness" style={{ color: '#b3b3b3', textDecoration: 'none', transition: 'color 0.3s', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            📚 {t('nav.awareness')}
                        </a>
                        <a href="/phishing" style={{ color: '#b3b3b3', textDecoration: 'none', transition: 'color 0.3s', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            🎣 {t('nav.phishing')}
                        </a>
                        <a href="/incident" style={{ color: '#b3b3b3', textDecoration: 'none', transition: 'color 0.3s', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            🚨 {t('nav.incident')}
                        </a>
                        <a href="/scam-alerts" style={{ color: '#b3b3b3', textDecoration: 'none', transition: 'color 0.3s', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            🗺️ {t('nav.localAlerts')}
                        </a>
                        <a href="/code-security" style={{ color: '#b3b3b3', textDecoration: 'none', transition: 'color 0.3s', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            💻 {t('nav.code')}
                        </a>
                        <a href="/scanner" style={{ color: '#b3b3b3', textDecoration: 'none', transition: 'color 0.3s', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            🔍 {t('nav.scanner')}
                        </a>
                        <a href="/community" style={{ color: '#b3b3b3', textDecoration: 'none', transition: 'color 0.3s', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            🌍 {t('nav.community')}
                        </a>
                        <a href="/dashboard" style={{ color: '#b3b3b3', textDecoration: 'none', transition: 'color 0.3s', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            📊 {t('nav.dashboard')}
                        </a>
                    </div>

                    {/* Language Selector */}
                    <LanguageSelector />
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
                    <p>© 2026 {t('app.name')} - {t('footer.copyright')}</p>
                    <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                        {t('footer.builtWith')}
                    </p>
                </div>
            </footer>
        </>
    );
}
