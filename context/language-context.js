// context/language-context.js
import { createContext, useState, useContext, useEffect } from "react";
import { defaultLocale, locales } from "../lib/locales";
import { translations } from "../lib/translations";

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [locale, setLocale] = useState(defaultLocale);

    // При монтировании проверяем сохраненный язык
    useEffect(() => {
        const savedLocale = localStorage.getItem("locale");
        if (savedLocale && locales[savedLocale]) {
            setLocale(savedLocale);
        }
    }, []);

    // Сохраняем язык при изменении
    useEffect(() => {
        localStorage.setItem("locale", locale);
    }, [locale]);

    const toggleLanguage = () => {
        setLocale((prevLocale) => (prevLocale === "en" ? "ru" : "en"));
    };

    const t = (key) => {
        const keys = key.split(".");
        let value = translations[locale];

        for (const k of keys) {
            if (value && value[k] !== undefined) {
                value = value[k];
            } else {
                // Fallback to English
                let enValue = translations.en;
                for (const ek of keys) {
                    if (enValue && enValue[ek] !== undefined) {
                        enValue = enValue[ek];
                    } else {
                        return key; // Return key if not found
                    }
                }
                return enValue;
            }
        }

        return value;
    };

    return (
        <LanguageContext.Provider value={{ locale, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

// Хук для удобного использования
export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
