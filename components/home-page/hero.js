// components/home-page/hero.js
import Image from "next/image";
import { useLanguage } from "../../context/language-context";
import classes from "./hero.module.css";

function Hero() {
    const { t } = useLanguage();

    return (
        <section className={classes.hero}>
            <div className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.text}>
                        <h1 className={classes.greeting}>
                            {t("greeting")}
                            <span className={classes.wave}>👋</span>
                        </h1>
                        <p className={classes.bio}>{t("bio")}</p>
                        <div className={classes.actions}>
                            <a
                                href="#featured"
                                className={classes.primaryButton}>
                                {t("viewWork")}
                            </a>
                            <a
                                href="/contact"
                                className={classes.secondaryButton}>
                                {t("getInTouch")}
                            </a>
                        </div>
                    </div>
                    <div className={classes.imageContainer}>
                        <div className={classes.imageWrapper}>
                            <Image
                                src="/images/site/cropped_main.png"
                                alt="Sergey - Frontend Developer & Blogger"
                                width={400}
                                height={400}
                                className={classes.image}
                                priority
                            />
                            <div className={classes.floatingTech}>
                                <span className={classes.techBadge}>React</span>
                                <span className={classes.techBadge}>
                                    TypeScript
                                </span>
                                <span className={classes.techBadge}>
                                    Next.js
                                </span>
                                <span className={classes.techBadge}>
                                    JavaScript
                                </span>
                                <span className={classes.techBadge}>
                                    Node.js
                                </span>
                                <span className={classes.techBadge}>CSS</span>
                                <span className={classes.techBadge}>HTML</span>
                                <span className={classes.techBadge}>
                                    Vue.js
                                </span>
                                <span className={classes.techBadge}>CSS3</span>
                                <span className={classes.techBadge}>Sass</span>
                                <span className={classes.techBadge}>
                                    Tailwind
                                </span>
                                <span className={classes.techBadge}>Figma</span>
                                <span className={classes.techBadge}>UI/UX</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.scrollIndicator}>
                <div className={classes.mouse}>
                    <div className={classes.wheel}></div>
                </div>
                <span className={classes.scrollText}>
                    {t("scrollToExplore")}
                </span>
            </div>
        </section>
    );
}

export default Hero;
