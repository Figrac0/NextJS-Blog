import { useState, useMemo, useEffect } from "react";
import { useLanguage } from "../../context/language-context";
import ContentCard from "./content-card";
import TechBadge from "./tech-badge";
import StatsCard from "./stats-card";
import {
    parseReadingTimeToMinutes,
    formatTotalReadingTime,
} from "../../lib/reading-time";
import classes from "./featured-posts.module.css";

const TABS = ["all", "repositories", "tutorials", "insights"];
const SORT_OPTIONS = ["latest", "popular"];
const POSTS_PER_PAGE = 4;

function FeaturedPosts({ posts }) {
    const { t, locale } = useLanguage();
    const studyTimeLabel =
        locale === "ru" ? "На обзор проектов" : "Review time";
    const [activeTab, setActiveTab] = useState("all");
    const [sortBy, setSortBy] = useState("latest");
    const [selectedTech, setSelectedTech] = useState("all");
    const [allTechStack, setAllTechStack] = useState(["all"]);
    const [visibleTech, setVisibleTech] = useState(["all"]);
    const [rotationIndex, setRotationIndex] = useState(0);
    const [visiblePostsCount, setVisiblePostsCount] = useState(POSTS_PER_PAGE);

    const formattedPosts = useMemo(() => {
        if (!posts || posts.length === 0) {
            return [];
        }

        const seenSlugs = new Set();
        const uniquePosts = [];

        posts.forEach((post) => {
            if (post.locale === "ru" && post.hasRussianVersion) {
                return;
            }

            if (seenSlugs.has(post.slug)) {
                return;
            }

            seenSlugs.add(post.slug);
            uniquePosts.push(post);
        });

        return uniquePosts.map((post) => {
            const localizedPreview =
                locale === "ru" && post.previewTranslations?.ru
                    ? post.previewTranslations.ru
                    : post.previewTranslations?.en;

            return {
                id: post.slug,
                type: post.type || "article",
                title: localizedPreview?.title ?? post.title,
                excerpt: localizedPreview?.excerpt ?? post.excerpt,
                date: post.date,
                slug: post.slug,
                image: post.image,
                tech: post.tech || [],
                readingTime:
                    localizedPreview?.readingTime ?? post.readingTime ?? null,
                difficulty:
                    localizedPreview?.difficulty ?? post.difficulty ?? null,
                featured: post.isFeatured || false,
                trending: post.isTrending || false,
                new: post.isNew || false,
                demoUrl: post.demoUrl || null,
                locale: post.locale || "en",
                hasRussianVersion: post.hasRussianVersion || false,
            };
        });
    }, [posts, locale]);

    useEffect(() => {
        if (formattedPosts.length === 0) {
            return;
        }

        const allTech = new Set();

        formattedPosts.forEach((post) => {
            if (post.tech && Array.isArray(post.tech)) {
                post.tech.forEach((tech) => allTech.add(tech));
            }
        });

        const techArray = ["all", ...Array.from(allTech)];
        setAllTechStack(techArray);

        const initialVisibleTech =
            techArray.length > 10
                ? ["all", ...techArray.slice(1, 10)]
                : techArray;

        setVisibleTech(initialVisibleTech);
    }, [formattedPosts]);

    useEffect(() => {
        if (allTechStack.length <= 10) {
            return undefined;
        }

        let intervalId = null;

        const tick = () => {
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
        };

        const start = () => {
            if (intervalId === null) {
                intervalId = setInterval(tick, 10000);
            }
        };

        const stop = () => {
            if (intervalId !== null) {
                clearInterval(intervalId);
                intervalId = null;
            }
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === "hidden") {
                stop();
            } else {
                start();
            }
        };

        if (document.visibilityState !== "hidden") {
            start();
        }

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            stop();
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange,
            );
        };
    }, [allTechStack]);

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
                const aScore =
                    (a.featured ? 50 : 0) +
                    (a.trending ? 30 : 0) +
                    (a.new ? 20 : 0) +
                    (a.demoUrl ? 10 : 0);
                const bScore =
                    (b.featured ? 50 : 0) +
                    (b.trending ? 30 : 0) +
                    (b.new ? 20 : 0) +
                    (b.demoUrl ? 10 : 0);

                return bScore - aScore;
            });
        }

        return filtered;
    }, [activeTab, selectedTech, sortBy, formattedPosts]);

    useEffect(() => {
        setVisiblePostsCount(POSTS_PER_PAGE);
    }, [activeTab, selectedTech, sortBy]);

    const visiblePosts = useMemo(
        () => filteredContent.slice(0, visiblePostsCount),
        [filteredContent, visiblePostsCount],
    );

    const hasMorePosts = filteredContent.length > visiblePostsCount;

    const stats = useMemo(
        () => ({
            totalProjects: formattedPosts.filter(
                (post) => post.type === "project",
            ).length,
            tutorials: formattedPosts.filter((post) => post.type === "tutorial")
                .length,
            articles: formattedPosts.filter((post) => post.type === "article")
                .length,
            totalStudyTime: formattedPosts
                .filter((post) => post.type === "project")
                .reduce(
                    (sum, post) =>
                        sum + parseReadingTimeToMinutes(post.readingTime),
                    0,
                ),
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
                                label={studyTimeLabel}
                                value={formatTotalReadingTime(
                                    stats.totalStudyTime,
                                    locale,
                                )}
                                icon="🕐"
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
                                <span className={classes.filterIcon}>↕</span>
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
                            <>
                                <div className={classes.grid}>
                                    {visiblePosts.map((item) => (
                                        <ContentCard
                                            key={item.id}
                                            item={item}
                                            t={t}
                                        />
                                    ))}
                                </div>

                                {hasMorePosts && (
                                    <div className={classes.loadMoreContainer}>
                                        <button
                                            className={classes.loadMoreButton}
                                            onClick={() =>
                                                setVisiblePostsCount(
                                                    (prevCount) =>
                                                        prevCount +
                                                        POSTS_PER_PAGE,
                                                )
                                            }>
                                            {t("showMore")}
                                        </button>
                                    </div>
                                )}
                            </>
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
