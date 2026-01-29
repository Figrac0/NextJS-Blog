import Image from "next/image";
import { useLanguage } from "../../../context/language-context";
import classes from "./post-header.module.css";

function PostHeader(props) {
    const { t } = useLanguage();
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

    // Функция для получения метки типа контента
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

    // Функция для получения иконки типа
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

    // Форматирование даты
    const formattedDate = date
        ? new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
          })
        : "";

    // Исправляем отображение времени чтения (убираем дублирование "min")
    const formattedReadingTime = readingTime
        ? readingTime.includes("min")
            ? readingTime
            : `${readingTime} min read`
        : "";

    return (
        <header className={classes.header}>
            {/* Тип и статус */}
            <div className={classes.typeContainer}>
                <div className={`${classes.typeBadge} ${classes[type]}`}>
                    <span>{getTypeIcon()}</span>
                    <span>{getTypeLabel()}</span>
                </div>
            </div>

            {/* Заголовок */}
            <div className={classes.titleContainer}>
                <h1 className={classes.title}>{title}</h1>
                {excerpt && <p className={classes.excerpt}>{excerpt}</p>}
            </div>

            {/* Изображение */}
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

            {/* Мета информация */}
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

            {/* Статистика */}
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

            {/* Технологии */}
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
