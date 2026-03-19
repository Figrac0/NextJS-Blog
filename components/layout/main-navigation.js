import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLanguage } from "../../context/language-context";
import Logo from "./logo";
import LanguageSwitcher from "../ui/language-switcher";
import classes from "./main-navigation.module.css";

function MainNavigation() {
    const router = useRouter();
    const { t, locale, toggleLanguage } = useLanguage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [router.asPath]);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    const navLinks = [
        { key: "home", href: "/", label: t("home") },
        { key: "posts", href: "/posts", label: t("posts") },
        { key: "about", href: "/about", label: t("about") },
        { key: "contact", href: "/contact", label: t("contact") },
    ];

    const isActiveLink = (href) => {
        const currentPath = router.asPath.split("?")[0];

        if (href === "/") {
            return currentPath === "/";
        }

        return currentPath === href || currentPath.startsWith(`${href}/`);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prevState) => !prevState);
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
                                    className={`${classes.item} ${isActiveLink(link.href) ? classes.active : ""}`}>
                                    <Link
                                        href={link.href}
                                        className={classes.link}>
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
                                className={`${classes.mobileLink} ${isActiveLink(link.href) ? classes.active : ""}`}>
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
