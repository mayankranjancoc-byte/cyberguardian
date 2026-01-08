'use client';
import { useState } from 'react';
import LanguageSelector from './components/LanguageSelector';
import { useLanguage } from './context/LanguageContext';

export default function NavigationAndFooter({ children }) {
    const { t } = useLanguage();
    const [showExtraMenu, setShowExtraMenu] = useState(false);

    return (
        <>
            <nav style={{
                background: '#2c2c54',
                padding: '1rem 0',
                borderBottom: '1px solid #3d3d6b',
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
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
                        flexWrap: 'wrap',
                        alignItems: 'center'
                    }}>
                        {/* Main Features */}
                        <a href="/awareness" style={{ color: '#ffffff', textDecoration: 'none', transition: 'color 0.3s', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            📚 {t('nav.awareness')}
                        </a>
                        <a href="/phishing" style={{ color: '#ffffff', textDecoration: 'none', transition: 'color 0.3s', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            🔗 {t('nav.phishing')}
                        </a>
                        <a href="/scam-alerts" style={{ color: '#ffffff', textDecoration: 'none', transition: 'color 0.3s', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            🗺️ {t('nav.localAlerts')}
                        </a>

                        {/* Extra Features Dropdown */}
                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={() => setShowExtraMenu(!showExtraMenu)}
                                style={{
                                    color: '#ffffff',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    transition: 'all 0.3s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                                }}
                            >
                                ⚡ Extra Features {showExtraMenu ? '▲' : '▼'}
                            </button>

                            {/* Dropdown Menu */}
                            {showExtraMenu && (
                                <div style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    marginTop: '0.5rem',
                                    background: '#2c2c54',
                                    border: '1px solid #3d3d6b',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                    minWidth: '200px',
                                    overflow: 'hidden',
                                    zIndex: 1001
                                }}>
                                    <a href="/incident" style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.75rem 1rem',
                                        color: '#ffffff',
                                        textDecoration: 'none',
                                        transition: 'background 0.2s',
                                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                                    }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                    >
                                        🚨 {t('nav.incident')}
                                    </a>
                                    <a href="/code-security" style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.75rem 1rem',
                                        color: '#ffffff',
                                        textDecoration: 'none',
                                        transition: 'background 0.2s',
                                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                                    }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                    >
                                        💻 {t('nav.code')}
                                    </a>
                                    <a href="/scanner" style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.75rem 1rem',
                                        color: '#ffffff',
                                        textDecoration: 'none',
                                        transition: 'background 0.2s',
                                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                                    }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                    >
                                        🔍 {t('nav.scanner')}
                                    </a>
                                    <a href="/community" style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.75rem 1rem',
                                        color: '#ffffff',
                                        textDecoration: 'none',
                                        transition: 'background 0.2s'
                                    }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                    >
                                        🌍 {t('nav.community')}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Language Selector */}
                    <LanguageSelector />
                </div>
            </nav>

            <main>{children}</main>

            <footer style={{
                background: '#2c2c54',
                padding: '2rem 0',
                marginTop: '4rem',
                borderTop: '1px solid #3d3d6b',
                textAlign: 'center',
                color: '#ffffff'
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
