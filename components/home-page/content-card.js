// components/home-page/content-card.js
import Link from "next/link";
import Image from "next/image";
import classes from "./content-card.module.css";

function ContentCard({ item, t }) {
    const getTypeLabel = () => {
        switch (item.type) {
            case "project":
                return t("projectType");
            case "tutorial":
                return t("tutorialType");
            case "article":
                return t("articleType");
            default:
                return "";
        }
    };

    return (
        <article className={classes.card}>
            <div className={`${classes.typeBadge} ${classes[item.type]}`}>
                {getTypeLabel()}
            </div>

            <div className={classes.statusBadges}>
                {item.featured && (
                    <span
                        className={`${classes.statusBadge} ${classes.featured}`}>
                        {t("featuredLabel")}
                    </span>
                )}
                {item.trending && (
                    <span
                        className={`${classes.statusBadge} ${classes.trending}`}>
                        {t("trendingLabel")}
                    </span>
                )}
                {item.new && (
                    <span className={`${classes.statusBadge} ${classes.new}`}>
                        {t("newLabel")}
                    </span>
                )}
            </div>

            <div className={classes.imageContainer}>
                <div className={classes.imageWrapper}>
                    <Image
                        src={`/images/posts/${item.slug}/${item.image}`}
                        alt={item.title}
                        fill
                        className={classes.image}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className={classes.imageOverlay}></div>
                </div>
            </div>

            <div className={classes.content}>
                <div className={classes.meta}>
                    <time className={classes.date}>
                        {new Date(item.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </time>
                    {item.readingTime && (
                        <span className={classes.readingTime}>
                            📖 {item.readingTime}
                        </span>
                    )}
                    {item.difficulty && (
                        <span className={classes.difficulty}>
                            {item.difficulty}
                        </span>
                    )}
                </div>

                <h3 className={classes.title}>
                    <Link href={`/posts/${item.slug}`}>{item.title}</Link>
                </h3>

                <p className={classes.excerpt}>{item.excerpt}</p>

                {/* Технологии */}
                {item.tech && item.tech.length > 0 && (
                    <div className={classes.techStack}>
                        {item.tech.map((tech) => (
                            <span key={tech} className={classes.tech}>
                                {tech}
                            </span>
                        ))}
                    </div>
                )}

                <div className={classes.footer}>
                    {item.stats ? (
                        <div className={classes.stats}>
                            <span className={classes.stat}>
                                <span className={classes.statIcon}>⭐</span>
                                <span className={classes.statValue}>
                                    {item.stats.stars}
                                </span>
                                <span className={classes.statLabel}>
                                    {t("stars")}
                                </span>
                            </span>
                            <span className={classes.stat}>
                                <span className={classes.statIcon}>🔀</span>
                                <span className={classes.statValue}>
                                    {item.stats.forks}
                                </span>
                                <span className={classes.statLabel}>
                                    {t("forks")}
                                </span>
                            </span>
                        </div>
                    ) : (
                        <div className={classes.statsPlaceholder}></div>
                    )}

                    <div className={classes.actions}>
                        {item.demoUrl && (
                            <a
                                href={item.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={classes.demoButton}>
                                {t("liveDemo")}
                            </a>
                        )}
                        <Link
                            href={`/posts/${item.slug}`}
                            className={classes.readButton}>
                            {item.type === "article"
                                ? t("readArticle")
                                : t("viewCode")}
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default ContentCard;
