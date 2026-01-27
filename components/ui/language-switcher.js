// components/ui/language-switcher.js
import { useLanguage } from "../../context/language-context";
import { locales } from "../../lib/locales";
import classes from "./language-switcher.module.css";

function LanguageSwitcher() {
    const { locale, toggleLanguage } = useLanguage();
    const currentLocale = locales[locale];

    return (
        <button
            className={classes.switcher}
            onClick={toggleLanguage}
            aria-label={`Switch language to ${locale === "en" ? "Russian" : "English"}`}>
            <span className={classes.flag}>{currentLocale.flag}</span>
            <span className={classes.name}>{currentLocale.name}</span>
        </button>
    );
}

export default LanguageSwitcher;
