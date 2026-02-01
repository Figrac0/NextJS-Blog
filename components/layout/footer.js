import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../../context/language-context";
import classes from "./footer.module.css";

function Footer() {
    const { t, locale } = useLanguage();
    const [particles, setParticles] = useState([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const newParticles = [];
        for (let i = 0; i < 20; i++) {
            newParticles.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 4 + 1,
                speed: Math.random() * 0.5 + 0.2,
                opacity: Math.random() * 0.3 + 0.1,
                delay: Math.random() * 5,
            });
        }
        setParticles(newParticles);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setParticles((prev) =>
                prev.map((p) => ({
                    ...p,
                    y: (p.y + p.speed) % 100,
                    x:
                        (p.x + Math.sin(Date.now() / 1000 + p.id) * 0.1 + 100) %
                        100,
                })),
            );
        }, 50);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const socialLinks = [
        {
            name: "GitHub",
            url: "https://github.com/Figrac0",
            color: "linear-gradient(135deg, #333 0%, #24292e 100%)",
            icon: "🐙",
        },
        {
            name: "Portfolio",
            url: "https://figrac0.github.io/",
            color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            icon: "💼",
        },
        {
            name: "Telegram",
            url: "https://t.me/fajllovt42",
            color: "linear-gradient(135deg, #0088cc 0%, #2aabee 100%)",
            icon: "📱",
        },
        {
            name: "Email",
            url: "https://mail.google.com/mail/?view=cm&fs=1&to=serjjiniuss@gmail.com",
            color: "linear-gradient(135deg, #ea4335 0%, #fbbc05 100%)",
            icon: "✉️",
        },
    ];

    const quickLinks = [
        { name: t("home"), url: "/" },
        { name: t("posts"), url: "/posts" },
        { name: t("contact"), url: "/contact" },
    ];

    const stats = [
        { value: "20+", label: t("projectsCompleted") || "Projects" },
        { value: "100%", label: t("happyClients") || "Satisfaction" },
        { value: "50K+", label: t("codeLines") || "Code Lines" },
    ];

    const gradientStyle = {
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(102, 126, 234, 0.1) 0%, transparent 50%)`,
    };

    return (
        <footer
            className={classes.footer}
            style={gradientStyle}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}>
            <div className={classes.particlesContainer}>
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className={classes.particle}
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            opacity: p.opacity,
                            animationDelay: `${p.delay}s`,
                        }}
                    />
                ))}
            </div>

            <div className={classes.waves}>
                <div className={classes.wave}></div>
                <div
                    className={classes.wave}
                    style={{ animationDelay: "2s" }}></div>
                <div
                    className={classes.wave}
                    style={{ animationDelay: "4s" }}></div>
            </div>

            <div className={classes.container}>
                <div className={classes.topSection}>
                    <div className={classes.titleSection}>
                        <h2 className={classes.title}>{t("footerTitle")}</h2>
                        <p className={classes.description}>
                            {t("footerDescription")}
                        </p>

                        <div className={classes.stats}>
                            {stats.map((stat, index) => (
                                <div key={index} className={classes.statItem}>
                                    <div className={classes.statValue}>
                                        {stat.value}
                                    </div>
                                    <div className={classes.statLabel}>
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={classes.ctaSection}>
                        <div className={classes.ctaBox}>
                            <div className={classes.ctaContent}>
                                <span className={classes.availableBadge}>
                                    {t("availableForWork")}
                                </span>
                                <h3 className={classes.ctaTitle}>
                                    {t("letsTalk")}
                                </h3>
                                <a
                                    href="https://mail.google.com/mail/?view=cm&fs=1&to=serjjiniuss@gmail.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={classes.ctaButton}>
                                    <span className={classes.buttonText}>
                                        {locale === "ru"
                                            ? "Написать"
                                            : "Get in Touch"}
                                    </span>
                                    <span className={classes.buttonArrow}>
                                        →
                                    </span>
                                </a>
                            </div>
                            <div className={classes.ctaGlow}></div>
                        </div>
                    </div>
                </div>

                <div className={classes.mainContent}>
                    <div className={classes.socialSection}>
                        <h3 className={classes.sectionTitle}>
                            <span className={classes.titleLine}></span>
                            {t("connectWithMe")}
                            <span className={classes.titleLine}></span>
                        </h3>

                        <div className={classes.socialGrid}>
                            {socialLinks.map((link, index) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={classes.socialCard}
                                    style={{
                                        "--delay": `${index * 0.1}s`,
                                        background: link.color,
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform =
                                            "translateY(-10px) scale(1.05)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform =
                                            "translateY(0) scale(1)";
                                    }}>
                                    <div className={classes.socialIconWrapper}>
                                        <span className={classes.socialIcon}>
                                            {link.icon}
                                        </span>
                                    </div>
                                    <div className={classes.socialContent}>
                                        <span className={classes.socialName}>
                                            {link.name}
                                        </span>
                                        {link.name === "Email" && (
                                            <span
                                                className={
                                                    classes.socialDetail
                                                }>
                                                serjjiniuss@gmail.com
                                            </span>
                                        )}
                                        {link.name === "Telegram" && (
                                            <span
                                                className={
                                                    classes.socialDetail
                                                }>
                                                @fajllovt42
                                            </span>
                                        )}
                                        {link.name === "Portfolio" && (
                                            <span
                                                className={
                                                    classes.socialDetail
                                                }>
                                                figrac0.github.io
                                            </span>
                                        )}
                                    </div>
                                    <div className={classes.socialArrow}>↗</div>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className={classes.linksSection}>
                        <h3 className={classes.sectionTitle}>
                            <span className={classes.titleLine}></span>
                            {t("quickLinks")}
                            <span className={classes.titleLine}></span>
                        </h3>

                        <div className={classes.linksGrid}>
                            {quickLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.url}
                                    className={classes.linkItem}>
                                    <span className={classes.linkLine}></span>
                                    <span className={classes.linkText}>
                                        {link.name}
                                    </span>
                                    <span className={classes.linkArrow}>→</span>
                                </Link>
                            ))}
                        </div>

                        <div className={classes.footerLanguage}>
                            <div className={classes.languageText}>
                                {locale === "en" ? "🇺🇸 English" : "🇷🇺 Русский"}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={classes.bottomSection}>
                    <div className={classes.logoSection}>
                        <div className={classes.logo}>
                            <span className={classes.logoText}>Figrac0</span>
                            <span className={classes.logoDot}></span>
                        </div>
                        <p className={classes.madeWith}>
                            {t("madeWith")}{" "}
                            <span className={classes.heart}>❤️</span>{" "}
                            {new Date().getFullYear()}
                        </p>
                    </div>

                    <div className={classes.copyright}>
                        <p>
                            © {new Date().getFullYear()} Sergey.{" "}
                            {t("copyright")}
                        </p>
                        <p className={classes.techStack}>
                            Built with: Next.js · React · CSS Modules
                        </p>
                    </div>

                    <button
                        className={classes.scrollTop}
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                        aria-label="Scroll to top">
                        <svg
                            className={classes.scrollIcon}
                            viewBox="0 0 24 24"
                            fill="none">
                            <path
                                d="M7 15L12 10L17 15"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M12 20V10"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>

                <div className={classes.decorations}>
                    <div className={classes.orb}></div>
                    <div
                        className={classes.orb}
                        style={{ animationDelay: "1s" }}></div>
                    <div
                        className={classes.orb}
                        style={{ animationDelay: "2s" }}></div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
