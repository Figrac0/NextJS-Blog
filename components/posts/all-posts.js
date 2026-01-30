// components/posts/all-posts-enhanced.js
import { useState, useMemo, useEffect } from "react";
import { useLanguage } from "../../context/language-context";
import ContentCard from "../home-page/content-card";
import CustomSelect from "../ui/custom-select";
import classes from "./all-posts.module.css";

function AllPostsEnhanced({ posts }) {
    const { t, locale } = useLanguage();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [sortOption, setSortOption] = useState("newest");
    const [expandedPostId, setExpandedPostId] = useState(null);
    const [psychedelicMode, setPsychedelicMode] = useState(false);
    const [animatedParticles, setAnimatedParticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Опции для сортировки
    // В all-posts-enhanced.js
    const sortOptions = useMemo(
        () => [
            { value: "newest", label: t("sortOptions.newest") },
            { value: "oldest", label: t("sortOptions.oldest") },
            { value: "popular", label: t("sortOptions.popular") },
            { value: "alphabetical", label: t("sortOptions.alphabetical") },
        ],
        [t],
    );

    // Форматирование постов
    const formattedPosts = useMemo(() => {
        if (!posts || posts.length === 0) return [];

        // Фильтруем посты: оставляем только те, у которых locale === "en"
        const uniquePosts = posts.filter((post) => {
            // Если у поста есть русская версия, но это русский перевод - не включаем
            if (post.hasRussianVersion && post.locale === "ru") {
                return false;
            }
            return true;
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
            content: post.content || "",
            views: post.views || Math.floor(Math.random() * 1000) + 100,
            rating: post.rating || (Math.random() * 2 + 3).toFixed(1),
            locale: post.locale || "en",
            hasRussianVersion: post.hasRussianVersion || false,
        }));
    }, [posts]);

    // Создание психоделических частиц
    useEffect(() => {
        if (!psychedelicMode) {
            setAnimatedParticles([]);
            return;
        }

        const particles = [];
        const colors = [
            "#ff6b6b",
            "#4ecdc4",
            "#45b7d1",
            "#96ceb4",
            "#feca57",
            "#ff9ff3",
            "#54a0ff",
            "#5f27cd",
            "#00d2d3",
            "#f368e0",
        ];

        for (let i = 0; i < 50; i++) {
            particles.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 30 + 10,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 5,
                shape: Math.random() > 0.5 ? "circle" : "triangle",
                pulseSpeed: Math.random() * 0.02 + 0.01,
                pulsePhase: Math.random() * Math.PI * 2,
            });
        }

        setAnimatedParticles(particles);

        // Анимация частиц
        const interval = setInterval(() => {
            setAnimatedParticles((prev) =>
                prev.map((p) => ({
                    ...p,
                    x: (p.x + p.speedX + 100) % 100,
                    y: (p.y + p.speedY + 100) % 100,
                    rotation: p.rotation + p.rotationSpeed,
                    pulsePhase: p.pulsePhase + p.pulseSpeed,
                })),
            );
        }, 50);

        return () => clearInterval(interval);
    }, [psychedelicMode]);

    // Фильтрация и сортировка
    const filteredAndSortedPosts = useMemo(() => {
        let filtered = [...formattedPosts];

        // Поиск
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (post) =>
                    post.title.toLowerCase().includes(query) ||
                    post.excerpt.toLowerCase().includes(query) ||
                    (post.tech &&
                        post.tech.some((tech) =>
                            tech.toLowerCase().includes(query),
                        )),
            );
        }

        // Фильтр по категории
        if (selectedCategory !== "all") {
            const typeMap = {
                projects: "project",
                tutorials: "tutorial",
                articles: "article",
            };
            filtered = filtered.filter(
                (post) => post.type === typeMap[selectedCategory],
            );
        }

        // Дополнительные фильтры
        if (selectedFilter === "featured") {
            filtered = filtered.filter((post) => post.featured);
        } else if (selectedFilter === "trending") {
            filtered = filtered.filter((post) => post.trending);
        } else if (selectedFilter === "new") {
            filtered = filtered.filter((post) => post.new);
        }

        // Сортировка
        filtered.sort((a, b) => {
            switch (sortOption) {
                case "newest":
                    return new Date(b.date) - new Date(a.date);
                case "oldest":
                    return new Date(a.date) - new Date(b.date);
                case "popular":
                    const aScore = (a.stats?.stars || 0) + (a.views || 0) / 100;
                    const bScore = (b.stats?.stars || 0) + (b.views || 0) / 100;
                    return bScore - aScore;
                case "alphabetical":
                    return a.title.localeCompare(
                        b.title,
                        locale === "ru" ? "ru" : "en",
                    );
                default:
                    return 0;
            }
        });

        return filtered;
    }, [
        formattedPosts,
        searchQuery,
        selectedCategory,
        selectedFilter,
        sortOption,
        locale,
    ]);

    // Статистика
    const stats = useMemo(
        () => ({
            total: formattedPosts.length,
            projects: formattedPosts.filter((p) => p.type === "project").length,
            tutorials: formattedPosts.filter((p) => p.type === "tutorial")
                .length,
            articles: formattedPosts.filter((p) => p.type === "article").length,
            totalStars: formattedPosts
                .filter((p) => p.stats)
                .reduce((sum, p) => sum + (p.stats.stars || 0), 0),
            totalViews: formattedPosts.reduce(
                (sum, p) => sum + (p.views || 0),
                0,
            ),
        }),
        [formattedPosts],
    );

    // Обработчики
    const handleSearchClear = () => setSearchQuery("");
    const handleResetFilters = () => {
        setSearchQuery("");
        setSelectedCategory("all");
        setSelectedFilter("all");
        setSortOption("newest");
        setExpandedPostId(null);
    };

    const handlePostClick = (postId) => {
        setExpandedPostId(expandedPostId === postId ? null : postId);
    };

    const togglePsychedelicMode = () => {
        setPsychedelicMode(!psychedelicMode);
    };

    if (isLoading) {
        return (
            <div className={classes.loadingContainer}>
                <div className={classes.spinner}></div>
                <p>{t("loading")}</p>
            </div>
        );
    }

    return (
        <div
            className={`${classes.container} ${psychedelicMode ? classes.psychedelic : ""}`}>
            {/* Психоделический фон */}
            {psychedelicMode && (
                <div className={classes.psychedelicBackground}>
                    {animatedParticles.map((particle) => (
                        <div
                            key={particle.id}
                            className={`${classes.particle} ${classes[particle.shape]}`}
                            style={{
                                left: `${particle.x}%`,
                                top: `${particle.y}%`,
                                width: `${particle.size}px`,
                                height: `${particle.size}px`,
                                background: particle.color,
                                transform: `rotate(${particle.rotation}deg)`,
                                opacity:
                                    0.3 + Math.sin(particle.pulsePhase) * 0.2,
                                filter: `blur(${Math.sin(particle.pulsePhase) * 2}px)`,
                            }}
                        />
                    ))}

                    {/* Волны */}
                    <div className={classes.wave}></div>
                    <div
                        className={classes.wave}
                        style={{ animationDelay: "2s" }}></div>
                    <div
                        className={classes.wave}
                        style={{ animationDelay: "4s" }}></div>

                    {/* Пульсирующие круги */}
                    <div className={classes.pulseCircle}></div>
                    <div
                        className={classes.pulseCircle}
                        style={{ animationDelay: "1s" }}></div>
                    <div
                        className={classes.pulseCircle}
                        style={{ animationDelay: "2s" }}></div>
                </div>
            )}

            <div className={classes.content}>
                {/* Заголовок */}
                <header className={classes.header}>
                    <div className={classes.titleWrapper}>
                        <h1 className={classes.title}>
                            <span className={classes.titleText}>
                                {t("allRepositories")}
                            </span>
                            <span className={classes.titleSubtitle}>
                                {t("allPostsDescription")}
                            </span>
                        </h1>
                        <button
                            className={classes.psychedelicButton}
                            onClick={togglePsychedelicMode}
                            aria-label={
                                psychedelicMode
                                    ? t("normalMode")
                                    : t("psychedelicMode")
                            }>
                            <span className={classes.buttonIcon}>
                                {psychedelicMode ? " " : "✨"}
                            </span>
                            <span className={classes.buttonText}>
                                {psychedelicMode
                                    ? t("normalMode")
                                    : t("psychedelicMode")}
                            </span>
                        </button>
                    </div>
                </header>

                {/* Статистика */}
                <div className={classes.statsContainer}>
                    <div className={classes.statsGrid}>
                        <div className={classes.statCard}>
                            <div className={classes.statIcon}>💼</div>
                            <div className={classes.statContent}>
                                <div className={classes.statValue}>
                                    {stats.total}
                                </div>
                                <div className={classes.statLabel}>
                                    {t("totalPosts")}
                                </div>
                            </div>
                        </div>
                        <div className={classes.statCard}>
                            <div className={classes.statIcon}>💻</div>
                            <div className={classes.statContent}>
                                <div className={classes.statValue}>
                                    {stats.projects}
                                </div>
                                <div className={classes.statLabel}>
                                    {t("categoriesFormated.projects")}
                                </div>
                            </div>
                        </div>
                        <div className={classes.statCard}>
                            <div className={classes.statIcon}>🎓</div>
                            <div className={classes.statContent}>
                                <div className={classes.statValue}>
                                    {stats.tutorials}
                                </div>
                                <div className={classes.statLabel}>
                                    {t("categoriesFormated.tutorials")}
                                </div>
                            </div>
                        </div>
                        <div className={classes.statCard}>
                            <div className={classes.statIcon}>⭐</div>
                            <div className={classes.statContent}>
                                <div className={classes.statValue}>
                                    {stats.totalStars}
                                </div>
                                <div className={classes.statLabel}>
                                    {t("githubStars")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Панель управления */}
                <div className={classes.controlPanel}>
                    {/* Поиск */}
                    <div className={classes.searchContainer}>
                        <div className={classes.searchInputWrapper}>
                            <span className={classes.searchIcon}>🔍</span>
                            <input
                                type="text"
                                className={classes.searchInput}
                                placeholder={t("searchPosts")}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button
                                    className={classes.clearButton}
                                    onClick={handleSearchClear}
                                    aria-label={t("clearSearch")}>
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Фильтры */}
                    <div className={classes.filtersContainer}>
                        <div className={classes.filterGroup}>
                            <span className={classes.filterLabel}>
                                📁 {t("categoriesFormated.categories")}
                            </span>
                            <div className={classes.filterButtons}>
                                {[
                                    "all",
                                    "projects",
                                    "tutorials",
                                    "articles",
                                ].map((category) => (
                                    <button
                                        key={category}
                                        className={`${classes.filterButton} ${selectedCategory === category ? classes.active : ""}`}
                                        onClick={() =>
                                            setSelectedCategory(category)
                                        }>
                                        {t(`categories.${category}`)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={classes.filterGroup}>
                            <span className={classes.filterLabel}>
                                🎯 {t("categoriesFormated.filter")}
                            </span>
                            <div className={classes.filterButtons}>
                                {["all", "featured", "trending", "new"].map(
                                    (filter) => (
                                        <button
                                            key={filter}
                                            className={`${classes.filterButton} ${selectedFilter === filter ? classes.active : ""}`}
                                            onClick={() =>
                                                setSelectedFilter(filter)
                                            }>
                                            {t(`filters.${filter}`)}
                                            {filter === "featured"}
                                            {filter === "trending"}
                                            {filter === "new"}
                                        </button>
                                    ),
                                )}
                            </div>
                        </div>

                        {/* Используем CustomSelect вместо стандартного select */}
                        <CustomSelect
                            label={t("sortBy")}
                            value={sortOption}
                            onChange={setSortOption}
                            options={sortOptions}
                            placeholder={t("selectNewest")}
                            icon="↕️"
                        />
                    </div>

                    {/* Сброс фильтров */}
                    {(searchQuery ||
                        selectedCategory !== "all" ||
                        selectedFilter !== "all" ||
                        sortOption !== "newest") && (
                        <div className={classes.resetContainer}>
                            <button
                                className={classes.resetButton}
                                onClick={handleResetFilters}>
                                🔄 {t("resetFilters")}
                            </button>
                        </div>
                    )}
                </div>

                {/* Результаты */}
                <main className={classes.mainContent}>
                    {filteredAndSortedPosts.length > 0 ? (
                        <>
                            <div className={classes.resultsInfo}>
                                <span className={classes.resultsCount}>
                                    {filteredAndSortedPosts.length}{" "}
                                    {t("totalPosts")}
                                </span>
                                {searchQuery && (
                                    <span className={classes.searchQuery}>
                                        {t("searchPosts")}: "{searchQuery}"
                                    </span>
                                )}
                            </div>

                            <div className={classes.postsGrid}>
                                {filteredAndSortedPosts.map((post) => (
                                    <div
                                        key={post.id}
                                        className={classes.postCardWrapper}>
                                        <ContentCard item={post} t={t} />

                                        {/* Дополнительная информация при клике */}
                                        {expandedPostId === post.id && (
                                            <div
                                                className={
                                                    classes.expandedInfo
                                                }>
                                                <div
                                                    className={
                                                        classes.additionalStats
                                                    }>
                                                    <div
                                                        className={
                                                            classes.additionalStat
                                                        }>
                                                        <span
                                                            className={
                                                                classes.statIcon
                                                            }>
                                                            👁️
                                                        </span>
                                                        <span>
                                                            {post.views}{" "}
                                                            {t("totalViews")}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className={
                                                            classes.additionalStat
                                                        }>
                                                        <span
                                                            className={
                                                                classes.statIcon
                                                            }>
                                                            ⭐
                                                        </span>
                                                        <span>
                                                            {post.rating}/5{" "}
                                                            {t("averageRating")}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className={
                                                            classes.additionalStat
                                                        }>
                                                        <span
                                                            className={
                                                                classes.statIcon
                                                            }>
                                                            📅
                                                        </span>
                                                        <span>
                                                            {new Date(
                                                                post.date,
                                                            ).toLocaleDateString(
                                                                locale,
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        classes.techList
                                                    }>
                                                    {post.tech &&
                                                        post.tech.map(
                                                            (tech) => (
                                                                <span
                                                                    key={tech}
                                                                    className={
                                                                        classes.techBadge
                                                                    }>
                                                                    {tech}
                                                                </span>
                                                            ),
                                                        )}
                                                </div>
                                                <button
                                                    className={
                                                        classes.closeButton
                                                    }
                                                    onClick={() =>
                                                        setExpandedPostId(null)
                                                    }>
                                                    {t("showLess")}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className={classes.emptyState}>
                            <div className={classes.emptyIcon}>🔍</div>
                            <h3 className={classes.emptyTitle}>
                                {t("noResultsFound")}
                            </h3>
                            <p className={classes.emptyText}>
                                {t("tryDifferentFilter")}
                            </p>
                            <button
                                className={classes.emptyButton}
                                onClick={handleResetFilters}>
                                {t("resetFilters")}
                            </button>
                        </div>
                    )}
                </main>

                {/* Информация о технологиях */}
                <aside className={classes.techSidebar}>
                    <h3 className={classes.sidebarTitle}>🧩 {t("tech")}</h3>
                    <div className={classes.allTech}>
                        {Array.from(
                            new Set(
                                formattedPosts.flatMap((p) => p.tech || []),
                            ),
                        )
                            .sort()
                            .slice(0, 15)
                            .map((tech) => (
                                <button
                                    key={tech}
                                    className={classes.sidebarTech}
                                    onClick={() => setSearchQuery(tech)}>
                                    {tech}
                                </button>
                            ))}
                    </div>
                </aside>
            </div>

            <button
                className={classes.scrollTop}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Scroll to top">
                ↑
            </button>
        </div>
    );
}

export default AllPostsEnhanced;
