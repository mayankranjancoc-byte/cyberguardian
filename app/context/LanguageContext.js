'use client';
import { createContext, useContext, useState, useEffect } from 'react';

// Import all translations
import en from '../translations/en.json';
import hi from '../translations/hi.json';
import bn from '../translations/bn.json';
import ta from '../translations/ta.json';
import te from '../translations/te.json';
import mr from '../translations/mr.json';

const translations = { en, hi, bn, ta, te, mr };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('en');

    // Load language preference from localStorage on mount
    useEffect(() => {
        const savedLang = localStorage.getItem('language');
        if (savedLang && translations[savedLang]) {
            setLanguage(savedLang);
        }
    }, []);

    // Save language preference to localStorage when changed
    const changeLanguage = (newLang) => {
        if (translations[newLang]) {
            setLanguage(newLang);
            localStorage.setItem('language', newLang);
        }
    };

    // Translation function with fallback
    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language];

        for (const k of keys) {
            value = value?.[k];
        }

        // Fallback to English if translation not found
        if (!value) {
            value = translations.en;
            for (const k of keys) {
                value = value?.[k];
            }
        }

        return value || key;
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
