// components/layout/main-navigation.js
import Link from "next/link";
import { useLanguage } from "../../context/language-context";
import Logo from "./logo";
import LanguageSwitcher from "../ui/language-switcher";
import classes from "./main-navigation.module.css";

function MainNavigation() {
    const { t } = useLanguage();

    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <Link href="/" className={classes.logoLink}>
                    <Logo />
                </Link>

                <nav className={classes.nav}>
                    <ul className={classes.list}>
                        <li className={classes.item}>
                            <Link href="/" className={classes.link}>
                                {t("home")}
                            </Link>
                        </li>
                        <li className={classes.item}>
                            <Link href="/posts" className={classes.link}>
                                {t("posts")}
                            </Link>
                        </li>
                        <li className={classes.item}>
                            <Link href="/contact" className={classes.link}>
                                {t("contact")}
                            </Link>
                        </li>
                        <li className={classes.item}>
                            <LanguageSwitcher />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default MainNavigation;
