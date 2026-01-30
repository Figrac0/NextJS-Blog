// context/language-context.js
import { createContext, useState, useContext, useEffect } from "react";
import { defaultLocale, locales } from "../lib/locales";
import { translations } from "../lib/translations";

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [locale, setLocale] = useState(defaultLocale);
    const [postsCache, setPostsCache] = useState({}); // Кэш постов для разных языков

    useEffect(() => {
        const savedLocale = localStorage.getItem("locale");
        if (savedLocale && locales[savedLocale]) {
            setLocale(savedLocale);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("locale", locale);

        // Отправляем событие о смене языка
        window.dispatchEvent(
            new CustomEvent("languageChanged", {
                detail: { locale },
            }),
        );
    }, [locale]);

    const toggleLanguage = () => {
        const newLocale = locale === "en" ? "ru" : "en";
        setLocale(newLocale);
    };

    // Функция для получения поста для конкретного языка
    const getCachedPost = (slug, locale) => {
        const key = `${slug}-${locale}`;
        return postsCache[key];
    };

    // Функция для кэширования поста
    const cachePost = (slug, locale, postData) => {
        const key = `${slug}-${locale}`;
        setPostsCache((prev) => ({
            ...prev,
            [key]: postData,
        }));
    };

    const t = (key) => {
        const keys = key.split(".");
        let value = translations[locale];

        for (const k of keys) {
            if (value && value[k] !== undefined) {
                value = value[k];
            } else {
                let enValue = translations.en;
                for (const ek of keys) {
                    if (enValue && enValue[ek] !== undefined) {
                        enValue = enValue[ek];
                    } else {
                        return key;
                    }
                }
                return enValue;
            }
        }

        return value;
    };

    return (
        <LanguageContext.Provider
            value={{
                locale,
                toggleLanguage,
                t,
                getCachedPost,
                cachePost,
                postsCache,
            }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
