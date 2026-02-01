import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../../context/language-context";
import Logo from "./logo";
import LanguageSwitcher from "../ui/language-switcher";
import classes from "./main-navigation.module.css";

function MainNavigation() {
    const { t, locale, toggleLanguage } = useLanguage();
    const [activeLink, setActiveLink] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const path = window.location.pathname;
        if (path === "/") setActiveLink("home");
        else if (path.startsWith("/posts")) setActiveLink("posts");
        else if (path === "/contact") setActiveLink("contact");
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleRouteChange = () => {
            setIsMobileMenuOpen(false);
        };

        window.addEventListener("popstate", handleRouteChange);
        return () => window.removeEventListener("popstate", handleRouteChange);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    const navLinks = [
        { key: "home", href: "/", label: t("home") },
        { key: "posts", href: "/posts", label: t("posts") },
        { key: "contact", href: "/contact", label: t("contact") },
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleNavClick = (key) => {
        setActiveLink(key);
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <>
            <header
                className={`${classes.header} ${isScrolled ? classes.scrolled : ""}`}>
                <div className={classes.container}>
                    <Logo />

                    <nav className={classes.nav}>
                        <ul className={classes.list}>
                            {navLinks.map((link) => (
                                <li
                                    key={link.key}
                                    className={`${classes.item} ${activeLink === link.key ? classes.active : ""}`}
                                    onMouseEnter={() => setActiveLink(link.key)}
                                    onMouseLeave={() => setActiveLink("")}>
                                    <Link
                                        href={link.href}
                                        className={classes.link}
                                        onClick={() =>
                                            handleNavClick(link.key)
                                        }>
                                        <span className={classes.linkText}>
                                            {link.label}
                                        </span>
                                        <span
                                            className={classes.linkDecoration}>
                                            <span
                                                className={classes.linkCircle}
                                            />
                                            <span
                                                className={classes.linkLine}
                                            />
                                        </span>
                                    </Link>
                                </li>
                            ))}
                            <li className={classes.languageItem}>
                                <LanguageSwitcher />
                            </li>
                        </ul>
                    </nav>

                    <button
                        className={`${classes.burgerButton} ${isMobileMenuOpen ? classes.active : ""}`}
                        onClick={toggleMobileMenu}
                        aria-label={
                            isMobileMenuOpen ? "Close menu" : "Open menu"
                        }>
                        <span className={classes.burgerLines}></span>
                    </button>
                </div>
            </header>

            <div
                className={`${classes.mobileOverlay} ${isMobileMenuOpen ? classes.active : ""}`}
                onClick={toggleMobileMenu}
            />

            <div
                className={`${classes.mobileMenu} ${isMobileMenuOpen ? classes.active : ""}`}>
                <button
                    className={classes.closeButton}
                    onClick={toggleMobileMenu}
                    aria-label="Close menu"
                />

                <ul className={classes.mobileList}>
                    {navLinks.map((link) => (
                        <li key={link.key} className={classes.mobileItem}>
                            <Link
                                href={link.href}
                                className={`${classes.mobileLink} ${activeLink === link.key ? classes.active : ""}`}
                                onClick={() => handleNavClick(link.key)}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className={classes.mobileLanguage}>
                    <div className={classes.mobileLanguageTitle}>
                        {t("switchLanguage")}
                    </div>
                    <div className={classes.mobileLanguageButtons}>
                        <button
                            className={`${classes.mobileLanguageButton} ${locale === "en" ? classes.active : ""}`}
                            onClick={() => {
                                if (locale !== "en") {
                                    toggleLanguage();
                                }
                            }}>
                            🇺🇸 English
                        </button>
                        <button
                            className={`${classes.mobileLanguageButton} ${locale === "ru" ? classes.active : ""}`}
                            onClick={() => {
                                if (locale !== "ru") {
                                    toggleLanguage();
                                }
                            }}>
                            🇷🇺 Русский
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainNavigation;
