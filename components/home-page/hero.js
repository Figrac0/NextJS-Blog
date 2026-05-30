import Image from "next/image";
import { useLanguage } from "../../context/language-context";
import classes from "./hero.module.css";
import Link from "next/link";

const RESUME_URL =
    "https://drive.google.com/file/d/1HyEo9yoa8h43tjocp0scDrHFzToI3IDJ/view";
const GITHUB_URL = "https://github.com/Figrac0";

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
                            <Link
                                href="/posts#results-info"
                                className={`${classes.actionButton} ${classes.primaryButton}`}>
                                <span className={classes.actionIcon} aria-hidden="true">
                                    <svg
                                        viewBox="0 0 24 24"
                                        width="20"
                                        height="20"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <rect x="3" y="7" width="18" height="13" rx="2" />
                                        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                                        <path d="M3 13h18" />
                                    </svg>
                                </span>
                                <span className={classes.actionLabel}>
                                    {t("viewWork")}
                                </span>
                            </Link>

                            <Link
                                href="/contact"
                                className={`${classes.actionButton} ${classes.secondaryButton}`}>
                                <span className={classes.actionIcon} aria-hidden="true">
                                    <svg
                                        viewBox="0 0 24 24"
                                        width="20"
                                        height="20"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path d="M4 4h16v16H4z" />
                                        <path d="m4 4 8 8 8-8" />
                                    </svg>
                                </span>
                                <span className={classes.actionLabel}>
                                    {t("getInTouch")}
                                </span>
                            </Link>

                            <a
                                href={RESUME_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${classes.actionButton} ${classes.resumeButton}`}>
                                <span className={classes.actionIcon} aria-hidden="true">
                                    <svg
                                        viewBox="0 0 24 24"
                                        width="20"
                                        height="20"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                                        <path d="M14 2v6h6" />
                                        <path d="M8 13h8" />
                                        <path d="M8 17h6" />
                                    </svg>
                                </span>
                                <span className={classes.actionLabel}>
                                    {t("viewResume")}
                                </span>
                            </a>

                            <a
                                href={GITHUB_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${classes.actionButton} ${classes.githubButton}`}>
                                <span className={classes.actionIcon} aria-hidden="true">
                                    <svg
                                        viewBox="0 0 24 24"
                                        width="20"
                                        height="20"
                                        fill="currentColor">
                                        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.02c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.24 2.76.12 3.05.73.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.06.78 2.14v3.18c0 .31.21.67.8.55C20.21 21.38 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z" />
                                    </svg>
                                </span>
                                <span className={classes.actionLabel}>
                                    {t("viewGitHub")}
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className={classes.imageContainer}>
                        <div className={classes.imageWrapper}>
                            <Image
                                src="/images/site/hero-blur-bg.jpg"
                                alt="Sergey - Frontend Developer & Blogger"
                                width={1280}
                                height={854}
                                className={classes.image}
                                priority
                                quality={90}
                                sizes="(max-width: 480px) 250px, (max-width: 768px) 300px, (max-width: 1200px) 350px, 400px"
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
                                <span className={classes.techBadge}>Docker</span>
                                <span className={classes.techBadge}>Angular</span>
                                <span className={classes.techBadge}>Node</span>
                                <span className={classes.techBadge}>Express</span>
                                <span className={classes.techBadge}>MongoDB</span>
                                <span className={classes.techBadge}>FSD</span>
                                <span className={classes.techBadge}>Redux</span>
                                <span className={classes.techBadge}>AI</span>
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
