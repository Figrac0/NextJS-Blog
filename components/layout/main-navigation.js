// components/layout/main-navigation.js
import Link from "next/link";
import { useLanguage } from "../../context/language-context";
import Logo from "./logo";
import LanguageSwitcher from "../ui/language-switcher";
import classes from "./main-navigation.module.css";
import { useState } from "react";

function MainNavigation() {
    const { t } = useLanguage();
    const [activeLink, setActiveLink] = useState("");

    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <Logo />

                <nav className={classes.nav}>
                    <ul className={classes.list}>
                        <li
                            className={classes.item}
                            onMouseEnter={() => setActiveLink("home")}
                            onMouseLeave={() => setActiveLink("")}>
                            <Link href="/" className={classes.link}>
                                <span className={classes.linkText}>
                                    {t("home")}
                                </span>
                                <span className={classes.linkDecoration}>
                                    <span className={classes.linkCircle} />
                                    <span className={classes.linkLine} />
                                </span>
                            </Link>
                        </li>
                        <li
                            className={classes.item}
                            onMouseEnter={() => setActiveLink("posts")}
                            onMouseLeave={() => setActiveLink("")}>
                            <Link href="/posts" className={classes.link}>
                                <span className={classes.linkText}>
                                    {t("posts")}
                                </span>
                                <span className={classes.linkDecoration}>
                                    <span className={classes.linkCircle} />
                                    <span className={classes.linkLine} />
                                </span>
                            </Link>
                        </li>
                        <li
                            className={classes.item}
                            onMouseEnter={() => setActiveLink("contact")}
                            onMouseLeave={() => setActiveLink("")}>
                            <Link href="/contact" className={classes.link}>
                                <span className={classes.linkText}>
                                    {t("contact")}
                                </span>
                                <span className={classes.linkDecoration}>
                                    <span className={classes.linkCircle} />
                                    <span className={classes.linkLine} />
                                </span>
                            </Link>
                        </li>
                        <li className={classes.languageItem}>
                            <LanguageSwitcher />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default MainNavigation;
