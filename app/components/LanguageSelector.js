'use client';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const languages = [
    { code: 'en', name: 'English', emoji: '🌐' },
    { code: 'hi', name: 'हिंदी', nativeName: 'Hindi', emoji: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', nativeName: 'Bengali', emoji: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', nativeName: 'Tamil', emoji: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', nativeName: 'Telugu', emoji: '🇮🇳' },
    { code: 'mr', name: 'मराठी', nativeName: 'Marathi', emoji: '🇮🇳' },
];

export default function LanguageSelector() {
    const { language, changeLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const currentLang = languages.find(lang => lang.code === language) || languages[0];

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} style={{ position: 'relative' }}>
            {/* Selector Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
            >
                <span>{currentLang.emoji}</span>
                <span>{currentLang.name}</span>
                <span style={{
                    fontSize: '0.7rem',
                    transition: 'transform 0.2s ease',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                }}>
                    ▼
                </span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 0.5rem)',
                    right: 0,
                    background: 'rgba(26, 26, 46, 0.98)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    minWidth: '200px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                    zIndex: 10000,
                    padding: '0.5rem',
                    animation: 'fadeIn 0.2s ease'
                }}>
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => {
                                changeLanguage(lang.code);
                                setIsOpen(false);
                            }}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem',
                                background: language === lang.code ? 'rgba(66, 133, 244, 0.2)' : 'transparent',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'var(--text-primary)',
                                fontSize: '0.95rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                textAlign: 'left'
                            }}
                            onMouseEnter={(e) => {
                                if (language !== lang.code) {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (language !== lang.code) {
                                    e.currentTarget.style.background = 'transparent';
                                }
                            }}
                        >
                            <span style={{ fontSize: '1.25rem' }}>{lang.emoji}</span>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: language === lang.code ? '600' : '400' }}>
                                    {lang.name}
                                </div>
                                {lang.nativeName && (
                                    <div style={{
                                        fontSize: '0.8rem',
                                        color: 'var(--text-secondary)',
                                        marginTop: '0.1rem'
                                    }}>
                                        {lang.nativeName}
                                    </div>
                                )}
                            </div>
                            {language === lang.code && (
                                <span style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>✓</span>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
