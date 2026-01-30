import { filter } from "mongodb/lib/core/connection/logger";

// lib/translations.js - обновленный файл
export const translations = {
    en: {
        // Navigation
        home: "Home",
        posts: "Posts",
        contact: "Contact",

        // Hero section
        greeting: "Hi, I'm Sergey",
        bio: "I'm a frontend developer passionate about creating modern web applications. Welcome to my blog!",
        blogDescription:
            "Here I share insights about frontend development, modern web technologies, and creative coding!",

        // Posts/Repositories
        allRepositories: "All Posts",
        featuredRepositories: "Featured Repositories",
        viewRepository: "View Repository",
        technologies: "Technologies",

        // Contact
        contactTitle: "How can I help you?",
        yourEmail: "Your Email",
        yourName: "Your Name",
        yourMessage: "Your Message",
        sendMessage: "Send Message",

        // Contact page specific
        projectInMind: "Have a project in mind? Let's work together!",
        otherWays: "Other ways to connect",
        emailTitle: "Email",
        telegramTitle: "Telegram",
        portfolioTitle: "Portfolio",
        telegramUsername: "@fajllovt42",
        portfolioUrl: "figrac0.github.io",

        // Placeholders
        emailPlaceholder: "john@example.com",
        namePlaceholder: "John Doe",
        messagePlaceholder: "Tell me about your project...",

        // Notifications
        sendingMessage: "Sending message...",
        messageOnWay: "Your message is on its way!",
        success: "Success!",
        messageSent: "Message sent successfully!",
        error: "Error!",

        // Footer or common
        switchLanguage: "Switch language",
        readMore: "Read More",
        backToHome: "Back to Home",

        // SEO
        siteDescription: "My blog showcasing projects and repositories",
        allPostsDescription: "Browse all my projects, tutorials and articles",
        contactDescription: "Send me your messages or collaboration proposals!",

        // Placeholders
        searchPlaceholder: "Search posts...",
        filterByTech: "Filter by technology",

        // Featured section
        featuredTitle: "My Showcase",
        featuredSubtitle: "Projects, tutorials and insights",
        allTab: "All",
        repositoriesTab: "Repositories",
        tutorialsTab: "Tutorials",
        insightsTab: "Insights",
        featuredLabel: "Featured",
        trendingLabel: "Trending",
        newLabel: "New",

        // Repository cards
        stars: "Stars",
        forks: "Forks",
        viewCode: "Explore",
        liveDemo: "Live Demo",
        readArticle: "Read Article",

        // Content types
        tutorialType: "Tutorial",
        projectType: "Project",
        articleType: "Article",

        // Stats/Highlights
        totalProjects: "Total Projects",
        openSourceContributions: "Open Source",
        articlesPublished: "Articles",
        githubStars: "GitHub Stars",

        // Empty states
        noProjectsFound: "No projects found",
        selectCategory: "Select a category to view content",

        // Filter
        filterBy: "Filter by",
        sortBy: "Sort by",
        latest: "Latest",
        popular: "Most Popular",
        allTech: "All Tech",

        // Tech badges
        tech: "Technologies",

        // Reset button
        resetFilters: "Reset Filters",

        siteTitle: "Sergey's Blog",
        siteDescription:
            "My blog showcasing projects, tutorials and articles about web development",

        viewWork: "View My Work ↓",
        getInTouch: "Get In Touch",
        scrollToExplore: "Scroll to explore",

        // All Posts Page
        allPosts: "All Posts",
        totalPosts: "Total Posts",
        viewAll: "View All",
        clearSearch: "Clear Search",
        searchPosts: "Search posts...",
        loading: "Loading...",
        noResultsFound: "No results found",
        tryDifferentFilter: "Try different filters",
        showMore: "Show More",
        showLess: "Show Less",
        viewDetails: "View Details",
        readTime: "min read",
        dateAdded: "Date Added",

        // Sort options - только ключи с () на английском
        sortOptions: {
            newest: "sortOptions.newest( )",
            oldest: "sortOptions.oldest( )",
            popular: "sortOptions.popular( )",
            alphabetical: "sortOptions.alphabetical( )",
        },

        // Filters - только ключи с () на английском
        filters: {
            all: "filters.all( )",
            featured: "filters.featured( )",
            trending: "filters.trending( )",
            new: "filters.new( )",
        },

        // Categories - только ключи с () на английском
        categories: {
            all: "categories.all( )",
            projects: "categories.projects( )",
            tutorials: "categories.tutorials( )",
            articles: "categories.articles( )",
        },
        categoriesFormated: {
            projects: "Projects",
            tutorials: "Tutorials",
            categories: "Categories",
            filter: "Filters",
        },

        // Stats
        totalViews: "Total Views",
        averageRating: "Avg. Rating",
        lastUpdated: "Last Updated",

        // Psychedelic Background
        psychedelicMode: "Animated Background",
        normalMode: "Simple Background",

        backToRepositories: "Back to Posts",

        // Special display functions for English
        displayCategory: (key) => `categories.${key}( )`,
        displayFilter: (key) => `filters.${key}( )`,
        displaySortOption: (key) => `sortOptions.${key}( )`,
        displayContentType: (key) => `${key}Type( )`,
    },
    ru: {
        // Navigation
        home: "Главная",
        posts: "Посты",
        contact: "Контакты",

        // Hero section
        greeting: "Привет, я Сергей",
        bio: "Я фронтенд-разработчик, увлеченный созданием современных веб-приложений. Добро пожаловать в мой блог!",
        blogDescription:
            "Здесь я делюсь знаниями о фронтенд-разработке, современных веб-технологиях и креативном программировании!",

        // Posts/Repositories
        allRepositories: "Все посты",
        featuredRepositories: "Избранные репозитории",
        viewRepository: "Посмотреть репозиторий",
        technologies: "Технологии",

        // Contact
        contactTitle: "Чем я могу помочь?",
        yourEmail: "Ваш Email",
        yourName: "Ваше Имя",
        yourMessage: "Ваше Сообщение",
        sendMessage: "Отправить Сообщение",

        // Contact page specific
        projectInMind: "Есть проект? Давайте работать вместе!",
        otherWays: "Другие способы связи",
        emailTitle: "Почта",
        telegramTitle: "Телеграм",
        portfolioTitle: "Портфолио",
        telegramUsername: "@fajllovt42",
        portfolioUrl: "figrac0.github.io",

        // Placeholders
        emailPlaceholder: "ivan@mail.ru",
        namePlaceholder: "Иван Иванов",
        messagePlaceholder: "Расскажите о вашем проекте...",

        // Notifications
        sendingMessage: "Отправка сообщения...",
        messageOnWay: "Ваше сообщение отправляется!",
        success: "Успех!",
        messageSent: "Сообщение успешно отправлено!",
        error: "Ошибка!",

        // Footer or common
        switchLanguage: "Сменить язык",
        readMore: "Подробнее",
        backToHome: "На главную",

        // SEO
        siteDescription: "Мой блог с проектами и репозиториями",
        allPostsDescription: "Просмотр всех моих проектов, туториалов и статей",
        contactDescription:
            "Отправьте мне сообщения или предложения о сотрудничестве!",

        // Placeholders
        searchPlaceholder: "Поиск постов...",
        filterByTech: "Фильтр по технологиям",

        // Featured section
        featuredTitle: "Мои Работы",
        featuredSubtitle: "Проекты, туториалы и статьи",
        allTab: "Все",
        repositoriesTab: "Репозитории",
        tutorialsTab: "Туториалы",
        insightsTab: "Статьи",
        featuredLabel: "Избранное",
        trendingLabel: "Популярное",
        newLabel: "Новое",

        // Repository cards
        stars: "Звезды",
        forks: "Форки",
        viewCode: "Изучить",
        liveDemo: "Демо",
        readArticle: "Читать",

        // Content types - нормальный текст на русском
        tutorialType: "Туториал",
        projectType: "Проект",
        articleType: "Статья",

        // Stats/Highlights
        totalProjects: "Всего проектов",
        openSourceContributions: "Open Source",
        articlesPublished: "Статей",
        githubStars: "Звёзд GitHub",

        // Empty states
        noProjectsFound: "Проектов не найдено",
        selectCategory: "Выберите категорию",

        // Filter
        filterBy: "Фильтр",
        sortBy: "Сортировка",
        latest: "Новые",
        popular: "Популярные",
        allTech: "Все технологии",

        // Tech badges
        tech: "Технологии",

        // Reset button
        resetFilters: "Сбросить фильтры",

        siteTitle: "Блог Сергея",
        siteDescription:
            "Мой блог с проектами, туториалами и статьями о веб-разработке",

        viewWork: "Смотреть работы ↓",
        getInTouch: "Связаться",
        scrollToExplore: "Прокрутите чтобы посмотреть",

        // All Posts Page
        allPosts: "Все посты",
        totalPosts: "Всего постов",
        viewAll: "Посмотреть все",
        clearSearch: "Очистить поиск",
        searchPosts: "Поиск постов...",
        loading: "Загрузка...",
        noResultsFound: "Ничего не найдено",
        tryDifferentFilter: "Попробуйте другие фильтры",
        showMore: "Показать больше",
        showLess: "Свернуть",
        viewDetails: "Подробнее",
        readTime: "мин чтения",
        dateAdded: "Дата добавления",

        // Sort options - нормальный текст на русском
        sortOptions: {
            newest: "Сначала новые",
            oldest: "Сначала старые",
            popular: "Популярные",
            alphabetical: "А-Я",
        },

        // Filters - нормальный текст на русском
        filters: {
            all: "Все",
            featured: "Только избранные",
            trending: "Популярные",
            new: "Новые",
        },

        // Categories - нормальный текст на русском
        categories: {
            all: "Все категории",
            projects: "Проекты",
            tutorials: "Туториалы",
            articles: "Статьи",
        },
        categoriesFormated: {
            projects: "Проекты",
            tutorials: "Туториалы",
        },

        // Stats
        totalViews: "Всего просмотров",
        averageRating: "Ср. рейтинг",
        lastUpdated: "Обновлено",

        // Psychedelic Background
        psychedelicMode: "Живой фон",
        normalMode: "Обычный режим",

        backToRepositories: "Назад к постам",
    },
};
