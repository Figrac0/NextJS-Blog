// components/home-page/featured-posts.js
import { useState, useMemo, useEffect } from "react";
import { useLanguage } from "../../context/language-context";
import ContentCard from "./content-card";
import TechBadge from "./tech-badge";
import StatsCard from "./stats-card";
import classes from "./featured-posts.module.css";

const TABS = ["all", "repositories", "tutorials", "insights"];
const SORT_OPTIONS = ["latest", "popular"];

function FeaturedPosts({ posts }) {
    const { t, locale } = useLanguage(); // Добавляем locale из useLanguage
    const [activeTab, setActiveTab] = useState("all");
    const [sortBy, setSortBy] = useState("latest");
    const [selectedTech, setSelectedTech] = useState("all");
    const [allTechStack, setAllTechStack] = useState(["all"]);
    const [visibleTech, setVisibleTech] = useState(["all"]);
    const [rotationIndex, setRotationIndex] = useState(0);

    // В useMemo для formattedPosts:
    const formattedPosts = useMemo(() => {
        if (!posts || posts.length === 0) return [];

        // Фильтруем дубликаты переводов
        const seenSlugs = new Set();
        const uniquePosts = [];

        posts.forEach((post) => {
            // Если это русский перевод и есть русская версия - пропускаем
            if (post.locale === "ru" && post.hasRussianVersion) {
                return;
            }

            // Если slug уже видели - пропускаем (предотвращаем дублирование)
            if (seenSlugs.has(post.slug)) {
                return;
            }

            seenSlugs.add(post.slug);
            uniquePosts.push(post);
        });

        return uniquePosts.map((post) => ({
            id: post.slug,
            type: post.type || "article",
            title: post.title,
            excerpt: post.excerpt,
            date: post.date,
            slug: post.slug,
            image: post.image,
            tech: post.tech || [],
            stats: post.stats || null,
            readingTime: post.readingTime || null,
            difficulty: post.difficulty || null,
            featured: post.isFeatured || false,
            trending: post.isTrending || false,
            new: post.isNew || false,
            demoUrl: post.demoUrl || null,
            locale: post.locale || "en",
            hasRussianVersion: post.hasRussianVersion || false,
        }));
    }, [posts]);

    // Получаем все технологии из постов
    useEffect(() => {
        if (formattedPosts.length > 0) {
            const allTech = new Set();
            formattedPosts.forEach((post) => {
                if (post.tech && Array.isArray(post.tech)) {
                    post.tech.forEach((tech) => allTech.add(tech));
                }
            });
            const techArray = ["all", ...Array.from(allTech)];
            setAllTechStack(techArray);

            // Показываем первые 10 технологий (или все, если их меньше)
            const initialVisibleTech =
                techArray.length > 10
                    ? ["all", ...techArray.slice(1, 10)]
                    : techArray;
            setVisibleTech(initialVisibleTech);
        }
    }, [formattedPosts, locale]); // Добавляем locale в зависимости

    // Ротация технологий каждые 10 секунд
    useEffect(() => {
        if (allTechStack.length <= 10) return;

        const interval = setInterval(() => {
            setRotationIndex((prevIndex) => {
                const nextIndex =
                    (prevIndex + 1) % Math.ceil((allTechStack.length - 1) / 9);

                const startPos = nextIndex * 9 + 1;
                const endPos = Math.min(startPos + 9, allTechStack.length);

                const nextVisibleTech = [
                    "all",
                    ...allTechStack.slice(startPos, endPos),
                ];

                if (nextVisibleTech.length < 10 && allTechStack.length > 10) {
                    const remaining = 10 - nextVisibleTech.length;
                    nextVisibleTech.push(
                        ...allTechStack.slice(1, remaining + 1),
                    );
                }

                setVisibleTech(nextVisibleTech);
                return nextIndex;
            });
        }, 10000);

        return () => clearInterval(interval);
    }, [allTechStack]);

    // Остальной код остается без изменений...
    const filteredContent = useMemo(() => {
        let filtered = [...formattedPosts];

        if (activeTab !== "all") {
            const typeMap = {
                repositories: "project",
                tutorials: "tutorial",
                insights: "article",
            };
            filtered = filtered.filter(
                (item) => item.type === typeMap[activeTab],
            );
        }

        if (selectedTech !== "all") {
            filtered = filtered.filter(
                (item) => item.tech && item.tech.includes(selectedTech),
            );
        }

        if (sortBy === "latest") {
            filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (sortBy === "popular") {
            filtered.sort((a, b) => {
                const aScore = (a.stats?.stars || 0) + (a.featured ? 50 : 0);
                const bScore = (b.stats?.stars || 0) + (b.featured ? 50 : 0);
                return bScore - aScore;
            });
        }

        return filtered;
    }, [activeTab, selectedTech, sortBy, formattedPosts]);

    const stats = useMemo(
        () => ({
            totalProjects: formattedPosts.filter((p) => p.type === "project")
                .length,
            tutorials: formattedPosts.filter((p) => p.type === "tutorial")
                .length,
            articles: formattedPosts.filter((p) => p.type === "article").length,
            totalStars: formattedPosts
                .filter((p) => p.stats)
                .reduce((sum, p) => sum + (p.stats.stars || 0), 0),
        }),
        [formattedPosts],
    );

    if (!posts || posts.length === 0) {
        return (
            <section className={classes.featuredSection}>
                <div className={classes.container}>
                    <div className={classes.header}>
                        <div className={classes.titleWrapper}>
                            <h2 className={classes.title}>
                                <span className={classes.titleMain}>
                                    {t("featuredTitle")}
                                </span>
                                <span className={classes.titleSub}>
                                    {t("featuredSubtitle")}
                                </span>
                            </h2>
                        </div>
                    </div>
                    <div className={classes.emptyState}>
                        <div className={classes.emptyIcon}>📭</div>
                        <h3 className={classes.emptyTitle}>
                            {t("noProjectsFound")}
                        </h3>
                        <p className={classes.emptyText}>
                            No content available yet
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={classes.featuredSection} id="featured">
            <div className={classes.container}>
                <div className={classes.header}>
                    <div className={classes.titleWrapper}>
                        <h2 className={classes.title}>
                            <span className={classes.titleMain}>
                                {t("featuredTitle")}
                            </span>
                            <span className={classes.titleSub}>
                                {t("featuredSubtitle")}
                            </span>
                        </h2>
                        <div className={classes.titleLine}></div>
                    </div>
                </div>

                <div className={classes.content}>
                    <aside className={classes.sidebar}>
                        {/* Статистика */}
                        <div className={classes.stats}>
                            <StatsCard
                                label={t("totalProjects")}
                                value={stats.totalProjects}
                                icon="📊"
                            />
                            <StatsCard
                                label={t("articlesPublished")}
                                value={stats.articles}
                                icon="📝"
                            />
                            <StatsCard
                                label={t("githubStars")}
                                value={stats.totalStars}
                                icon="⭐"
                            />
                        </div>

                        <div className={classes.techFilter}>
                            <h3 className={classes.filterTitle}>
                                <span className={classes.filterIcon}>🔧</span>
                                {t("tech")}
                                {allTechStack.length > 10 && (
                                    <span className={classes.rotationIndicator}>
                                        🔄
                                    </span>
                                )}
                            </h3>
                            <div className={classes.techList}>
                                {visibleTech.map((tech) =>
                                    tech === "all" ? (
                                        <button
                                            key={tech}
                                            className={`${classes.techButton} ${selectedTech === "all" ? classes.active : ""}`}
                                            onClick={() =>
                                                setSelectedTech("all")
                                            }>
                                            {t("allTech")}
                                        </button>
                                    ) : (
                                        <TechBadge
                                            key={tech}
                                            name={tech}
                                            isActive={selectedTech === tech}
                                            onClick={() =>
                                                setSelectedTech(tech)
                                            }
                                        />
                                    ),
                                )}
                            </div>
                        </div>

                        <div className={classes.sortFilter}>
                            <h3 className={classes.filterTitle}>
                                <span className={classes.filterIcon}>↕️</span>
                                {t("sortBy")}
                            </h3>
                            <div className={classes.sortOptions}>
                                {SORT_OPTIONS.map((option) => (
                                    <button
                                        key={option}
                                        className={`${classes.sortButton} ${sortBy === option ? classes.active : ""}`}
                                        onClick={() => setSortBy(option)}>
                                        {t(option)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    <main className={classes.main}>
                        <div className={classes.tabsContainer}>
                            <div className={classes.tabs}>
                                {TABS.map((tab) => (
                                    <button
                                        key={tab}
                                        className={`${classes.tab} ${activeTab === tab ? classes.active : ""}`}
                                        onClick={() => setActiveTab(tab)}>
                                        <span className={classes.tabIcon}>
                                            {tab === "all" && "📁"}
                                            {tab === "repositories" && "💻"}
                                            {tab === "tutorials" && "🎓"}
                                            {tab === "insights" && "📄"}
                                        </span>
                                        <span className={classes.tabText}>
                                            {t(`${tab}Tab`)}
                                        </span>
                                        {activeTab === tab && (
                                            <span
                                                className={
                                                    classes.tabIndicator
                                                }></span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {filteredContent.length > 0 ? (
                            <div className={classes.grid}>
                                {filteredContent.map((item) => (
                                    <ContentCard
                                        key={item.id}
                                        item={item}
                                        t={t}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className={classes.emptyState}>
                                <div className={classes.emptyIcon}>📭</div>
                                <h3 className={classes.emptyTitle}>
                                    {t("noProjectsFound")}
                                </h3>
                                <p className={classes.emptyText}>
                                    {t("selectCategory")}
                                </p>
                                <button
                                    className={classes.resetButton}
                                    onClick={() => {
                                        setActiveTab("all");
                                        setSelectedTech("all");
                                    }}>
                                    {t("resetFilters")}
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </section>
    );
}

export default FeaturedPosts;
