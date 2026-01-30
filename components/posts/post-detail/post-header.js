import Image from "next/image";
import { useLanguage } from "../../../context/language-context";
import classes from "./post-header.module.css";
import { useState } from "react";

function PostHeader(props) {
    const { t, locale } = useLanguage();
    const {
        title,
        image,
        type,
        date,
        readingTime,
        difficulty,
        stats,
        tech,
        excerpt,
    } = props;

    const [buttonClicked, setButtonClicked] = useState(false);
    const [buttonText, setButtonText] = useState("");

    const getTypeLabel = () => {
        switch (type) {
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

    const getTypeIcon = () => {
        switch (type) {
            case "project":
                return "💻";
            case "tutorial":
                return "🎓";
            case "article":
                return "📝";
            default:
                return "📄";
        }
    };

    const handleTypeButtonClick = () => {
        if (buttonClicked) return; // Предотвращаем множественные клики

        setButtonClicked(true);

        // Устанавливаем текст в зависимости от языка
        if (locale === "ru") {
            setButtonText("Это просто кнопка, и что вы мне сделаете? 😎");
        } else {
            setButtonText(
                "This is just a button, and what are you going to do about it? 😎",
            );
        }

        // Сбрасываем через 3 секунды
        setTimeout(() => {
            setButtonClicked(false);
            setButtonText("");
        }, 3000);
    };

    const formattedDate = date
        ? new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
          })
        : "";

    const formattedReadingTime = readingTime
        ? readingTime.includes("min")
            ? readingTime
            : `${readingTime}`
        : "";

    return (
        <header className={classes.header}>
            {/* Контейнер для кнопки с relative позиционированием */}
            <div className={classes.typeButtonContainer}>
                <button
                    className={`${classes.typeBadge} ${classes[type]} ${classes.typeButton}`}
                    onClick={handleTypeButtonClick}
                    aria-label="Interactive type button">
                    <span>{getTypeIcon()}</span>
                    <span>{getTypeLabel()}</span>
                </button>

                {/* Всплывающее сообщение */}
                {buttonClicked && (
                    <div className={classes.buttonMessage}>{buttonText}</div>
                )}
            </div>

            {/* Остальной код остается без изменений */}
            <div className={classes.titleContainer}>
                <h1 className={classes.title}>{title}</h1>
                {excerpt && <p className={classes.excerpt}>{excerpt}</p>}
            </div>

            {image && (
                <div className={classes.imageContainer}>
                    <div className={classes.imageWrapper}>
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className={classes.image}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                            priority
                        />
                        <div className={classes.imageOverlay}></div>
                    </div>
                </div>
            )}

            <div className={classes.metaContainer}>
                {date && (
                    <div className={classes.metaItem}>
                        <span className={classes.metaIcon}>📅</span>
                        <span>{formattedDate}</span>
                    </div>
                )}

                {readingTime && (
                    <div className={classes.metaItem}>
                        <span className={classes.metaIcon}>📖</span>
                        <span>{formattedReadingTime}</span>
                    </div>
                )}

                {difficulty && (
                    <div className={classes.metaItem}>
                        <span className={classes.metaIcon}>⚡</span>
                        <span>{difficulty}</span>
                    </div>
                )}
            </div>

            {stats && (
                <div className={classes.statsContainer}>
                    {stats.stars !== undefined && (
                        <div className={classes.statItem}>
                            <div className={classes.statValue}>
                                {stats.stars}
                            </div>
                            <div className={classes.statLabel}>
                                {t("stars")}
                            </div>
                        </div>
                    )}

                    {stats.forks !== undefined && (
                        <div className={classes.statItem}>
                            <div className={classes.statValue}>
                                {stats.forks}
                            </div>
                            <div className={classes.statLabel}>
                                {t("forks")}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {tech && tech.length > 0 && (
                <div className={classes.techContainer}>
                    <div className={classes.techTitle}>
                        <span>🛠️</span>
                        <span>{t("technologies")}</span>
                    </div>
                    <div className={classes.techStack}>
                        {tech.map((techItem) => (
                            <span key={techItem} className={classes.techBadge}>
                                {techItem}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}

export default PostHeader;
