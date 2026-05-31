import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLanguage } from "../../context/language-context";
import classes from "./about-content.module.css";

const RESUME_LINK =
    "https://drive.google.com/file/d/1HyEo9yoa8h43tjocp0scDrHFzToI3IDJ/view?usp=drive_link";
const PORTRAIT_SRC = "/images/site/cropped_main-1.png";
const AUTO_SCROLL_SPEED = 0.22;
const THROW_FRICTION = 0.92;
const MAX_THROW_SPEED = 7;

const ABOUT_CONTENT = {
    en: {
        introEyebrow: "About me",
        roleTitleLines: ["frontend", "software", "engineer"],
        introText:
            "I build product interfaces, admin panels, and frontend architecture that stay readable and calm as products grow.",
        statusLine: "Samara, Russia · Remote · React / Next.js / TypeScript",
        metrics: {
            posts: "Portfolio items",
            projects: "Projects",
            studyTime: "Review time",
            technologies: "Technologies",
            experienceYears: "Years of experience",
            certificates: "Certificates",
        },
        heroEyebrow: "Sergey Sablin",
        heroTitle:
            "I build interfaces where complex logic feels calm and easy to read.",
        heroLead:
            "I am most interested in SPA and SSR products, B2B interfaces, admin panels, and work where UX, architecture, and asynchronous data flows need to support each other as one system.",
        heroTags: [
            "B2B and admin panels",
            "Scalable SPA / SSR architecture",
            "Interfaces that are easy to maintain",
        ],
        portraitAlt: "Portrait of Sergey Sablin",
        contactEyebrow: "Links and contacts",
        contactTitle: "The fastest way to understand my background",
        contactText:
            "These are the main resume links and work profiles that give the quickest overview of my experience.",
        links: [
            {
                label: "GitHub",
                value: "github.com/Figrac0",
                href: "https://github.com/Figrac0",
            },
            {
                label: "HH",
                value: "hh.ru / resume",
                href: "https://hh.ru/resume/8d121a6aff0df318cf0039ed1f43543442796a",
            },
            {
                label: "LinkedIn",
                value: "sergey-sablin",
                href: "https://www.linkedin.com/in/sergey-sablin/",
            },
            {
                label: "Habr Career",
                value: "career.habr.com/figraco",
                href: "https://career.habr.com/figraco",
            },
            {
                label: "Resume",
                value: "Main version on Google Drive",
                href: RESUME_LINK,
            },
        ],
        impactEyebrow: "What I bring",
        impactTitle: "Not just screens, but structure around them",
        impactText:
            "For me frontend is a system: clear ownership of data, understandable scenarios, reusable components, and a UI that still feels clean several months after release.",
        impactItems: [
            "I think through architecture and module boundaries before the interface becomes hard to scale.",
            "I focus on readable flows for both end users and administrators.",
            "I prefer reusable patterns, stable integrations, and code that teams can support without friction.",
        ],
        experienceEyebrow: "Work experience",
        experienceText: "",
        achievementTitle: "Key achievements:",
        liveSince: "Started",
        liveDuration: "In role",
        liveBadge: "Active now",
        openBadge: "Open to offers",
        placeholderPeriodLine:
            "Status: open to offers · Start: as soon as we agree on the offer",
        experienceExpand: "Show all experience",
        experienceCollapse: "Show less",
        actionPortfolio: "Open projects",
        actionContact: "Contact me",
        actionResume: "Full resume",
        experience: [
            {
                id: "t-guide",
                role: "Frontend Developer",
                company: "T-Bank · T-Guide",
                location: "Russia · Remote",
                period: {
                    start: "2026-02-01T09:00:00+04:00",
                    end: "2026-05-31T18:00:00+04:00",
                },
                isLive: false,
                summary:
                    "Mobile-first audio-guide and custom-route platform built inside the frontend team on React, TypeScript, and Vite. Worked on Leaflet maps with real-time in-tour navigation, a drag-to-snap mobile sheet, performance work, and admin tooling for tour content.",
                achievements: [
                    "Developed a mobile-first platform for audio guides and user-built routes as part of the frontend team, designing the client-side logic on React, TypeScript, and Vite.",
                    "Implemented an interactive Leaflet map with geolocation, dynamic markers, and route building, supporting user routes of up to 10 stops with real-time navigation.",
                    "Built a drag-to-snap mobile sheet, lazy loading, and session-level caching, reducing duplicate API calls and improving mobile UI responsiveness by more than 35%.",
                    "Integrated JWT authentication with a refresh-token flow and the admin interfaces for managing tours and content, improving session stability and interaction speed by roughly 25%.",
                ],
            },
            {
                id: "allapteki",
                role: "Frontend Engineer",
                company: "InformBureau · AllApteki",
                location: "Russia · Remote",
                startDate: "2026-01-15T09:00:00+04:00",
                isLive: true,
                summary:
                    "Large pharmacy aggregator on Next.js maintained in a team led by a senior frontend developer. The platform serves up to 70k requests per day and 2M+ per month, with a catalog of more than 80,000 medications.",
                achievements: [
                    "Develop a large pharmacy-information aggregator on Next.js in a team led by a senior frontend developer, supporting stable operation at up to 70k daily and 2M+ monthly requests.",
                    "Migrate the client side onto a new technology stack with integration of multiple REST APIs and asynchronous data handling across a catalog of more than 80,000 medications.",
                    "Develop search, filtering, and product presentation across the pharmacy catalog, improving interaction speed and overall page performance.",
                    "Optimise data structures and client-side business logic, making it easier to ship new functionality and increasing the long-term stability of the interfaces.",
                ],
            },
            {
                id: "tvs",
                role: "Frontend Engineer",
                company: "TVS.ru",
                location: "Russia · Remote",
                period: {
                    start: "2024-06-01T09:00:00+04:00",
                    end: "2025-02-28T18:00:00+04:00",
                },
                isLive: false,
                summary:
                    "B2B e-commerce platform for antenna and telecommunications equipment. Designed and grew the storefront architecture, catalog filtering, checkout, and delivery-configuration UI for both customers and administrators.",
                achievements: [
                    "Designed and grew a B2B e-commerce platform for antenna and telecommunications equipment, keeping the platform scalable and easy to extend.",
                    "Built the catalog filtering and structure system, improving search speed and user interaction with the interface by more than 30%.",
                    "Implemented order checkout, cart management, and delivery configuration, increasing the reliability of user flows and cutting checkout errors by 25%.",
                    "Optimised UI for product, category, and customer-data presentation with responsive, cross-browser behaviour and stable synchronisation with REST APIs and platform services.",
                ],
            },
            {
                id: "freelance",
                role: "Frontend Software Engineer",
                company: "Freelance",
                location: "Russia · Remote",
                period: {
                    start: "2023-10-01T09:00:00+04:00",
                    end: "2025-08-31T18:00:00+04:00",
                },
                isLive: false,
                summary:
                    "Production-ready platform on TypeScript and Node.js supporting 1000+ concurrent users with real-time interaction, subscriptions and payment integration. A 6-service Docker backend on PostgreSQL 16, Redis 7, Prisma ORM and Caddy, deployed to a VPS with auto-HTTPS, 12-hour S3-compatible backups and service monitoring.",
                achievements: [
                    "Built a production-ready platform in TypeScript and Node.js supporting 1000+ concurrent users with real-time interaction, a subscription system and payment integration for product monetisation.",
                    "Designed a backend infrastructure of 6 Docker services on PostgreSQL 16, Redis 7, Prisma ORM and Caddy, with 14 normalised tables, audit-logged operations, connection pooling at 20 connections and API throttling up to 30 req/sec.",
                    "Implemented production deployment to a VPS with automatic HTTPS, webhook infrastructure, scheduled backups every 12 hours to S3-compatible storage, service monitoring and automatic log rotation.",
                    "Optimised platform performance, cutting user-operation latency from 1000 ms to under 100 ms, layered anti-abuse defences and kept the system stable at under 213 MB RAM and CPU usage below 1%.",
                    "Designed frontend architecture and modular UI systems for admin panels, e-commerce stores and service platforms.",
                    "Integrated REST APIs, authentication systems, asynchronous data handling and client-side caching for high-load web applications.",
                ],
            },
            {
                id: "internship",
                role: "Frontend Intern",
                company: "SMS Automation Group",
                location: "Russia · On-site",
                period: {
                    start: "2023-01-09T09:00:00+04:00",
                    end: "2023-09-30T18:00:00+04:00",
                },
                isLive: false,
                summary:
                    "Built user interfaces for industrial controllers and automation systems: monitoring panels, sensor visualisations, control elements, and equipment configuration screens, deployed on production equipment.",
                achievements: [
                    "Developed interfaces for industrial controllers and automation systems.",
                    "Delivered more than 8 operator interfaces, all deployed on production equipment.",
                    "Integrated the UI with industrial systems and controllers for live data exchange.",
                    "Performed testing, debugging, and optimisation of industrial-system interfaces.",
                ],
            },
            {
                id: "future",
                role: "Frontend Engineer",
                company: "Your company?",
                location: "Remote · On-site · Hybrid — open",
                isPlaceholder: true,
                summary:
                    "Possibly your company. The rest of this card will be filled in once we start working together — promises to ship calmly, write readable code, and not break production on a Friday evening.",
                achievements: [
                    "Show up on time, ship features, and write code you will not have to rewrite a month later.",
                    "Take tasks end to end — scoping, architecture, implementation, review, and deploy.",
                    "Care about UX, accessibility, and performance, not only the status of the Jira ticket.",
                    "Be the person on the team who actually reads pull requests instead of stamping them.",
                ],
            },
        ],
        technologiesEyebrow: "Technologies",
        technologiesTitle: "Stack with a systems mindset",
        technologiesText:
            "My core stack is JavaScript / TypeScript, React, and Next.js, plus the tools needed to build reliable product interfaces from data flow to deployment.",
        skillGroups: [
            {
                title: "Frontend",
                items: [
                    "JavaScript",
                    "TypeScript",
                    "React.js",
                    "Next.js",
                    "Angular",
                    "Redux",
                    "RTK Query",
                    "React Router",
                    "React Hook Form",
                    "HTML5",
                    "CSS3",
                    "SCSS",
                    "TailwindCSS",
                ],
            },
            {
                title: "Backend & APIs",
                items: ["Node.js", "REST API", "WebSockets", "Prisma ORM"],
            },
            {
                title: "Databases",
                items: ["MongoDB", "MySQL", "PostgreSQL"],
            },
            {
                title: "Infrastructure & Tools",
                items: ["Docker", "Git", "Vite", "Webpack", "CI/CD", "Jest"],
            },
            {
                title: "Architecture & Engineering",
                items: [
                    "SPA / SSR Architecture",
                    "Frontend System Design",
                    "State Management",
                    "Performance Optimization",
                    "Scalable UI Architecture",
                ],
            },
            {
                title: "Spoken languages",
                items: ["Russian — Native", "English — Intermediate"],
            },
            {
                title: "Laboratory",
                items: [
                    "PyTorch",
                    "CNN Architectures",
                    "Computer Vision",
                    "Dataset Analysis",
                    "Domain Shift Analysis",
                    "Model Evaluation",
                    "Classification Metrics",
                    "Data Visualization",
                ],
            },
            {
                title: "Interests",
                items: [
                    "Frontend Architecture",
                    "High-Load Web Applications",
                    "UI/UX Systems",
                    "Machine Learning",
                    "Computer Vision",
                    "Product Development",
                    "Telegram Platforms",
                    "System Design",
                ],
            },
        ],
        educationEyebrow: "Education",
        educationTitle: "",
        educationText:
            "My education is directly connected with software engineering, applied informatics, and systems thinking.",
        education: [
            {
                period: "2021 - 2025",
                degree: "Bachelor's Degree in Fundamental Informatics and Information Technologies",
                institution: "Samara State Aerospace University (SSAU)",
            },
            {
                period: "2025 - 2027",
                degree: "Master's Degree in Fundamental Informatics and Information Technologies",
                institution: "Samara National Research University (SU)",
            },
        ],
        blogStackEyebrow: "Portfolio tags",
        blogStackTitle: "",
        blogStackText:
            "The tags below are pulled directly from projects and materials that are already published in the blog.",
        blogStackExpand: "Show all tags",
        blogStackCollapse: "Hide tags",
        certificatesEyebrow: "Certificates",
        certificatesTitle: "",
        certificatesText: "",
        carouselStatus: "Certificate carousel",
        emptyCertificates:
            "Certificates will appear here automatically once images are available in public/about/certificates.",
    },
    ru: {
        introEyebrow: "Обо мне",
        roleTitleLines: ["frontend", "software", "engineer"],
        introText:
            "Делаю продуктовые интерфейсы, админ-панели и frontend-архитектуру, которые остаются понятными и аккуратными по мере роста проекта.",
        statusLine: "Самара, Россия · Удаленно · React / Next.js / TypeScript",
        metrics: {
            posts: "Материалов",
            projects: "Проектов",
            studyTime: "На обзор",
            technologies: "Технологий",
            experienceYears: "Лет опыта",
            certificates: "Сертификатов",
        },
        heroEyebrow: "Сергей Саблин",
        heroTitle:
            "Делаю интерфейсы, где сложная логика выглядит просто и понятно.",
        heroLead:
            "Больше всего мне интересны SPA- и SSR-приложения, B2B-интерфейсы и админ-панели — задачи, где UX, архитектура и работа с данными должны быть выстроены как единая система.",
        heroTags: [
            "B2B и админ-панели",
            "Масштабируемая SPA / SSR-архитектура",
            "UI, который легко поддерживать",
        ],
        portraitAlt: "Портрет Сергея Саблина",
        contactEyebrow: "Ссылки и контакты",
        contactTitle:
            "Самый простой способ увидеть, как я работаю и чем занимаюсь",
        contactText:
            "Здесь собраны основные профили и резюме, по которым можно быстро понять мой опыт и связаться со мной.",
        links: [
            {
                label: "GitHub",
                value: "github.com/Figrac0",
                href: "https://github.com/Figrac0",
            },
            {
                label: "HH",
                value: "hh.ru / резюме",
                href: "https://hh.ru/resume/8d121a6aff0df318cf0039ed1f43543442796a",
            },
            {
                label: "LinkedIn",
                value: "sergey-sablin",
                href: "https://www.linkedin.com/in/sergey-sablin/",
            },
            {
                label: "Habr Career",
                value: "career.habr.com/figraco",
                href: "https://career.habr.com/figraco",
            },
            {
                label: "Резюме",
                value: "Основная версия на Google Drive",
                href: RESUME_LINK,
            },
        ],
        impactEyebrow: "Что я приношу",
        impactTitle: "Строю интерфейсы, думая о системе целиком.",
        impactText:
            "Для меня фронтенд — это система: управление данными, продуманные сценарии и интерфейсы, которые остаются понятными и устойчивыми со временем.",
        impactItems: [
            "Продумываю архитектуру и границы модулей до того, как интерфейс становится тяжело масштабировать.",
            "Смотрю на читаемость сценариев и для пользователей, и для администраторов.",
            "Делаю ставку на переиспользуемые паттерны, стабильные интеграции и код, который удобно поддерживать в команде.",
        ],
        experienceEyebrow: "Опыт работы",
        experienceText: "",
        achievementTitle: "Мои достижения:",
        liveSince: "Старт",
        liveDuration: "В роли",
        liveBadge: "Сейчас в работе",
        openBadge: "Открыт к офферам",
        placeholderPeriodLine:
            "Статус: открыт к офферам · Старт — как только договоримся об оффере",
        experienceExpand: "Показать весь опыт",
        experienceCollapse: "Свернуть",
        actionPortfolio: "Посмотреть проекты",
        actionContact: "Связаться",
        actionResume: "Полное резюме",
        experience: [
            {
                id: "t-guide",
                role: "Frontend Developer",
                company: "Т-Банк · T-Guide",
                location: "Россия · Удалённо",
                period: {
                    start: "2026-02-01T09:00:00+04:00",
                    end: "2026-05-31T18:00:00+04:00",
                },
                isLive: false,
                summary:
                    "Mobile-first платформа для аудиогидов и пользовательских маршрутов в составе frontend-команды. Работал над клиентской логикой на React, TypeScript и Vite: карты Leaflet, навигация в реальном времени, drag-to-snap мобильная шторка и интеграция с административными интерфейсами.",
                achievements: [
                    "Разрабатывал mobile-first платформу для аудиогидов и пользовательских маршрутов в составе frontend-команды, проектируя клиентскую логику на React, TypeScript и Vite.",
                    "Реализовал интерактивную карту на Leaflet с геолокацией, динамическими маркерами и построением маршрутов, обеспечив поддержку пользовательских маршрутов до 10 точек с навигацией в реальном времени.",
                    "Разработал drag-to-snap интерфейс мобильной шторки, внедрил lazy loading и session-level кеширование, сократив количество повторных API-запросов и повысив отзывчивость интерфейсов на мобильных устройствах более чем на 35%.",
                    "Интегрировал JWT authentication, refresh-token flow и административные интерфейсы для управления экскурсиями и контентом, повысив стабильность пользовательской сессии и скорость взаимодействия с платформой примерно на 25%.",
                ],
            },
            {
                id: "allapteki",
                role: "Frontend Engineer",
                company: "ИнформБюро · AllApteki",
                location: "Россия · Удалённо",
                startDate: "2026-01-15T09:00:00+04:00",
                isLive: true,
                summary:
                    "Крупный агрегатор аптечной информации на Next.js в команде под руководством senior frontend developer. Платформа обслуживает до 70 тыс. запросов в день и более 2 млн в месяц при каталоге более чем из 80 000 препаратов.",
                achievements: [
                    "Развиваю крупный агрегатор аптечной информации на Next.js в команде под руководством senior frontend developer, обеспечивая стабильную работу платформы с нагрузкой до 70 тыс. запросов в день и более 2 млн запросов в месяц.",
                    "Выполняю миграцию клиентской части на новый технологический стек с интеграцией множества REST API и асинхронной обработкой данных для каталога более чем из 80 000 препаратов.",
                    "Разрабатываю систему поиска, фильтрации и отображения аптечных товаров, улучшая скорость взаимодействия пользователей с интерфейсом и оптимизируя производительность страниц.",
                    "Оптимизирую структуру данных и клиентскую бизнес-логику платформы, упрощая внедрение нового функционала и повышая стабильность работы интерфейсов.",
                ],
            },
            {
                id: "tvs",
                role: "Frontend Engineer",
                company: "TVS.ru",
                location: "Россия · Удалённо",
                period: {
                    start: "2024-06-01T09:00:00+04:00",
                    end: "2025-02-28T18:00:00+04:00",
                },
                isLive: false,
                summary:
                    "B2B-платформа интернет-магазина для продажи антенного и телекоммуникационного оборудования. Проектировал frontend-архитектуру магазина, структуру каталога, систему фильтрации, оформление заказов и адаптивные UI-интерфейсы для клиентов и администраторов.",
                achievements: [
                    "Спроектировал и развивал платформу B2B интернет-магазина для продажи антенного и телекоммуникационного оборудования, обеспечивая масштабируемость платформы и упрощение внедрения нового функционала.",
                    "Разработал систему фильтрации и структурирования каталога товаров, улучшив скорость поиска и взаимодействия пользователей с интерфейсом более чем на 30%.",
                    "Реализовал систему оформления заказов, управления корзиной и настройки параметров доставки, повысив стабильность пользовательских сценариев и сократив количество ошибок при оформлении заказов на 25%.",
                    "Оптимизировал UI-интерфейсы отображения товаров, категорий и клиентских данных, обеспечив адаптивность, кроссбраузерность и стабильную синхронизацию с REST API и сервисами платформы.",
                ],
            },
            {
                id: "freelance",
                role: "Frontend Software Engineer",
                company: "Freelance",
                location: "Россия · Удалённо",
                period: {
                    start: "2023-10-01T09:00:00+04:00",
                    end: "2025-08-31T18:00:00+04:00",
                },
                isLive: false,
                summary:
                    "Production-ready платформа на TypeScript и Node.js с поддержкой 1000+ одновременных пользователей, real-time-взаимодействием, подписками и платёжной интеграцией. Backend из 6 Docker-сервисов на PostgreSQL 16, Redis 7, Prisma ORM и Caddy, развёрнутый на VPS с auto-HTTPS, бэкапами каждые 12 часов в S3-совместимое хранилище и мониторингом.",
                achievements: [
                    "Разработал production-ready платформу на TypeScript и Node.js с поддержкой 1000+ одновременных пользователей, real-time взаимодействием, системой подписок и интеграцией платёжных сервисов для монетизации продукта.",
                    "Спроектировал backend-инфраструктуру из 6 Docker-сервисов на PostgreSQL 16, Redis 7, Prisma ORM и Caddy, реализовал 14 нормализованных таблиц, audit-log операций, connection pooling на 20 соединений и API throttling до 30 req/sec.",
                    "Реализовал production deployment на VPS с автоматическим HTTPS, webhook-инфраструктурой, системой резервного копирования данных каждые 12 часов в S3-совместимое хранилище, мониторингом сервисов и автоматической ротацией логов.",
                    "Оптимизировал производительность платформы, сократив latency пользовательских операций с 1000 мс до менее 100 мс, реализовал многоуровневую защиту от злоупотреблений и обеспечил стабильную работу системы при потреблении менее 213 MB RAM и загрузке CPU менее 1%.",
                    "Проектировал frontend-архитектуру и модульные UI-системы для административных панелей, интернет-магазинов и сервисных платформ.",
                    "Интегрировал REST API, системы авторизации, асинхронную обработку данных и клиентское кеширование для high-load web-приложений.",
                ],
            },
            {
                id: "internship",
                role: "Frontend Intern",
                company: "Группа компаний СМС-Автоматизация",
                location: "Россия · Офис",
                period: {
                    start: "2023-01-09T09:00:00+04:00",
                    end: "2023-09-30T18:00:00+04:00",
                },
                isLive: false,
                summary:
                    "Разрабатывал интерфейсы для промышленных контроллеров и систем автоматизации: панели мониторинга, визуализацию сигналов, элементы управления и экраны настройки оборудования, введённые в эксплуатацию на производственном оборудовании.",
                achievements: [
                    "Разрабатывал интерфейсы для промышленных контроллеров и систем автоматизации.",
                    "Реализовал более 8 операторских интерфейсов, введённых в эксплуатацию на производственном оборудовании.",
                    "Интегрировал UI с промышленными системами и контроллерами для обмена данными.",
                    "Проводил тестирование, отладку и оптимизацию интерфейсов промышленных систем.",
                ],
            },
            {
                id: "future",
                role: "Frontend Engineer",
                company: "Ваша компания?",
                location: "Удалённо · Офис · Гибрид — открыт",
                isPlaceholder: true,
                summary:
                    "Возможно, ваша компания. Остальное содержимое этой карточки появится, когда мы начнём работать вместе — обещания делать релизы спокойно, писать читаемый код и не ронять продакшен в пятницу вечером.",
                achievements: [
                    "Буду приходить вовремя, делать фичи и писать код, который не придётся переписывать через месяц.",
                    "Буду тянуть задачи от и до — оценка, архитектура, реализация, ревью и деплой.",
                    "Буду внимательно относиться к UX, доступности и производительности, а не только к статусу задачи в Jira.",
                    "Буду тем человеком в команде, который реально читает pull request'ы, а не штампует их.",
                ],
            },
        ],
        technologiesEyebrow: "Технологии",
        technologiesTitle: "Стек с опорой на системное мышление",
        technologiesText:
            "Мой основной стек - JavaScript / TypeScript, React и Next.js, плюс всё, что нужно для надёжных продуктовых интерфейсов: от данных и форм до интеграций и деплоя.",
        skillGroups: [
            {
                title: "Frontend",
                items: [
                    "JavaScript",
                    "TypeScript",
                    "React.js",
                    "Next.js",
                    "Angular",
                    "Redux",
                    "RTK Query",
                    "React Router",
                    "React Hook Form",
                    "HTML5",
                    "CSS3",
                    "SCSS",
                    "TailwindCSS",
                ],
            },
            {
                title: "Backend и API",
                items: ["Node.js", "REST API", "WebSockets", "Prisma ORM"],
            },
            {
                title: "Базы данных",
                items: ["MongoDB", "MySQL", "PostgreSQL"],
            },
            {
                title: "Инструменты и инфраструктура",
                items: ["Docker", "Git", "Vite", "Webpack", "CI/CD", "Jest"],
            },
            {
                title: "Архитектура и инженерия",
                items: [
                    "SPA / SSR-архитектура",
                    "Frontend System Design",
                    "Управление состоянием",
                    "Оптимизация производительности",
                    "Масштабируемая UI-архитектура",
                ],
            },
            {
                title: "Языки",
                items: ["Русский — Родной", "Английский — Intermediate"],
            },
            {
                title: "Лаборатория",
                items: [
                    "PyTorch",
                    "CNN-архитектуры",
                    "Computer Vision",
                    "Анализ датасетов",
                    "Domain Shift Analysis",
                    "Оценка моделей",
                    "Метрики классификации",
                    "Визуализация данных",
                ],
            },
            {
                title: "Интересы",
                items: [
                    "Frontend-архитектура",
                    "High-load веб-приложения",
                    "UI/UX системы",
                    "Machine Learning",
                    "Computer Vision",
                    "Product Development",
                    "Telegram-платформы",
                    "System Design",
                ],
            },
        ],
        educationEyebrow: "Образование",
        educationTitle: "",
        educationText:
            "Моё образование связано с программной инженерией, прикладной информатикой и системным мышлением.",
        education: [
            {
                period: "2021 - 2025",
                degree: "Бакалавриат по направлению «Фундаментальная информатика и информационные технологии»",
                institution:
                    "Самарский государственный аэрокосмический университет (SSAU)",
            },
            {
                period: "2025 - 2027",
                degree: "Магистратура по направлению «Фундаментальная информатика и информационные технологии»",
                institution:
                    "Самарский национальный исследовательский университет (SU)",
            },
        ],
        blogStackEyebrow: "Теги портфолио",
        blogStackTitle: "",
        blogStackText:
            "Эти теги подтягиваются прямо из проектов и материалов, которые уже опубликованы в блоге.",
        blogStackExpand: "Показать все теги",
        blogStackCollapse: "Свернуть теги",
        certificatesEyebrow: "Сертификаты",
        certificatesTitle: "",
        certificatesText: "",
        carouselStatus: "Карусель сертификатов",
        emptyCertificates:
            "Сертификаты появятся здесь автоматически, как только изображения будут лежать в public/about/certificates.",
    },
};

const MONTH_FORMATTERS = {
    en: new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
    }),
    ru: new Intl.DateTimeFormat("ru-RU", {
        month: "short",
        year: "numeric",
    }),
};

const LONG_DATE_FORMATTERS = {
    en: new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }),
    ru: new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }),
};

const TIME_LABELS = {
    year: {
        en: ["year", "years"],
        ru: ["год", "года", "лет"],
    },
    month: {
        en: ["month", "months"],
        ru: ["месяц", "месяца", "месяцев"],
    },
    day: {
        en: ["day", "days"],
        ru: ["день", "дня", "дней"],
    },
    certificate: {
        en: ["certificate", "certificates"],
        ru: ["сертификат", "сертификата", "сертификатов"],
    },
};

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function getRussianPlural(value, [one, few, many]) {
    const mod10 = value % 10;
    const mod100 = value % 100;

    if (mod10 === 1 && mod100 !== 11) {
        return one;
    }

    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
        return few;
    }

    return many;
}

function formatTimeUnit(value, unit, locale) {
    if (locale === "ru") {
        return `${value} ${getRussianPlural(value, TIME_LABELS[unit].ru)}`;
    }

    const [single, plural] = TIME_LABELS[unit].en;
    return `${value} ${value === 1 ? single : plural}`;
}

function cleanDateText(value) {
    return value
        .replace(/\u00A0/g, " ")
        .replace(/\u202F/g, " ")
        .replace(/\s?г\.$/, "")
        .trim();
}

function getDurationParts(startValue, endValue) {
    const start = new Date(startValue);
    const end = new Date(endValue);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
        return { years: 0, months: 0, days: 0 };
    }

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
        const previousMonthDays = new Date(
            end.getFullYear(),
            end.getMonth(),
            0,
        ).getDate();
        days += previousMonthDays;
        months -= 1;
    }

    if (months < 0) {
        months += 12;
        years -= 1;
    }

    return {
        years: Math.max(years, 0),
        months: Math.max(months, 0),
        days: Math.max(days, 0),
    };
}

function formatDuration(startValue, endValue, locale) {
    const { years, months, days } = getDurationParts(startValue, endValue);
    const parts = [];

    if (years > 0) {
        parts.push(formatTimeUnit(years, "year", locale));
    }

    if (months > 0) {
        parts.push(formatTimeUnit(months, "month", locale));
    }

    if (parts.length === 0 && days > 0) {
        parts.push(formatTimeUnit(days, "day", locale));
    }

    if (parts.length === 0) {
        return locale === "ru" ? "менее месяца" : "less than a month";
    }

    return parts.slice(0, 2).join(" ");
}

function formatLongDate(value, locale) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return cleanDateText(LONG_DATE_FORMATTERS[locale].format(date));
}

function formatMonthYear(value, locale) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return cleanDateText(MONTH_FORMATTERS[locale].format(date));
}

function formatStudyTime(totalMinutes, locale) {
    if (!totalMinutes) {
        return locale === "ru" ? "0 мин" : "0 min";
    }

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (locale === "ru") {
        if (hours > 0 && minutes > 0) {
            return `${hours} ч ${minutes} мин`;
        }

        if (hours > 0) {
            return `${hours} ч`;
        }

        return `${minutes} мин`;
    }

    if (hours > 0 && minutes > 0) {
        return `${hours}h ${minutes}m`;
    }

    if (hours > 0) {
        return `${hours}h`;
    }

    return `${minutes} min`;
}

function formatCertificateCount(count, locale) {
    if (locale === "ru") {
        return `${count} ${getRussianPlural(count, TIME_LABELS.certificate.ru)}`;
    }

    const [single, plural] = TIME_LABELS.certificate.en;
    return `${count} ${count === 1 ? single : plural}`;
}

function formatExperienceYearsMetric(experience) {
    const timestamps = experience
        .map((item) => item.period?.start ?? item.startDate)
        .map((value) => new Date(value).getTime())
        .filter((value) => Number.isFinite(value));

    if (!timestamps.length) {
        return "0";
    }

    const earliest = new Date(Math.min(...timestamps));
    const { years, months } = getDurationParts(
        earliest.toISOString(),
        new Date().toISOString(),
    );

    const visibleYears = Math.max(years, 1);
    return `${visibleYears}${months > 0 ? "+" : ""}`;
}

function wrapCarouselOffset(offset, segmentWidth) {
    if (segmentWidth <= 0) {
        return offset;
    }

    let normalizedOffset = offset;

    while (normalizedOffset > 0) {
        normalizedOffset -= segmentWidth;
    }

    while (normalizedOffset <= -segmentWidth) {
        normalizedOffset += segmentWidth;
    }

    return normalizedOffset;
}
function CertificateCarousel({ certificates, status, emptyText }) {
    const viewportRef = useRef(null);
    const trackRef = useRef(null);
    const segmentRef = useRef(null);
    const frameRef = useRef(0);
    const offsetRef = useRef(0);
    const velocityRef = useRef(0);
    const segmentWidthRef = useRef(0);
    const draggingRef = useRef(false);
    const pointerIdRef = useRef(null);
    const lastPointerXRef = useRef(0);

    useEffect(() => {
        if (!certificates.length) {
            return undefined;
        }

        let isVisible = true;
        let isTabActive =
            typeof document === "undefined" ||
            document.visibilityState !== "hidden";
        let previousTime = performance.now();

        const applyTransform = () => {
            if (!trackRef.current) {
                return;
            }

            trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
        };

        const measure = () => {
            if (!segmentRef.current) {
                return;
            }

            const segmentWidth =
                segmentRef.current.getBoundingClientRect().width;
            segmentWidthRef.current = segmentWidth;
            offsetRef.current = -segmentWidth;
            velocityRef.current = 0;
            applyTransform();
        };

        measure();
        window.addEventListener("resize", measure);

        const animate = (time) => {
            const delta = clamp((time - previousTime) / 16.67, 0.5, 2);
            previousTime = time;

            if (!draggingRef.current && segmentWidthRef.current > 0) {
                velocityRef.current = clamp(
                    velocityRef.current * THROW_FRICTION,
                    -MAX_THROW_SPEED,
                    MAX_THROW_SPEED,
                );

                if (Math.abs(velocityRef.current) < 0.02) {
                    velocityRef.current = 0;
                }

                offsetRef.current -= AUTO_SCROLL_SPEED * delta;
                offsetRef.current += velocityRef.current * delta;
                offsetRef.current = wrapCarouselOffset(
                    offsetRef.current,
                    segmentWidthRef.current,
                );
                applyTransform();
            }

            frameRef.current = window.requestAnimationFrame(animate);
        };

        const startAnimation = () => {
            if (frameRef.current) {
                return;
            }
            previousTime = performance.now();
            frameRef.current = window.requestAnimationFrame(animate);
        };

        const stopAnimation = () => {
            if (frameRef.current) {
                window.cancelAnimationFrame(frameRef.current);
                frameRef.current = 0;
            }
        };

        const syncRunningState = () => {
            if (isVisible && isTabActive) {
                startAnimation();
            } else {
                stopAnimation();
            }
        };

        const handleVisibilityChange = () => {
            isTabActive = document.visibilityState !== "hidden";
            syncRunningState();
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        let observer = null;
        if (
            typeof IntersectionObserver !== "undefined" &&
            viewportRef.current
        ) {
            observer = new IntersectionObserver(
                (entries) => {
                    const entry = entries[0];
                    if (entry) {
                        isVisible = entry.isIntersecting;
                        syncRunningState();
                    }
                },
                { rootMargin: "200px 0px" },
            );
            observer.observe(viewportRef.current);
        } else {
            startAnimation();
        }

        syncRunningState();

        return () => {
            stopAnimation();
            window.removeEventListener("resize", measure);
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange,
            );
            if (observer) {
                observer.disconnect();
            }
        };
    }, [certificates.length]);

    const applyDragTransform = () => {
        if (!trackRef.current) {
            return;
        }

        trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    };

    const handlePointerDown = (event) => {
        if (!certificates.length) {
            return;
        }

        draggingRef.current = true;
        pointerIdRef.current = event.pointerId;
        lastPointerXRef.current = event.clientX;
        velocityRef.current = 0;
        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event) => {
        if (!draggingRef.current || pointerIdRef.current !== event.pointerId) {
            return;
        }

        const delta = event.clientX - lastPointerXRef.current;
        lastPointerXRef.current = event.clientX;
        velocityRef.current = clamp(delta, -MAX_THROW_SPEED, MAX_THROW_SPEED);
        offsetRef.current += delta;
        offsetRef.current = wrapCarouselOffset(
            offsetRef.current,
            segmentWidthRef.current,
        );
        applyDragTransform();
        event.preventDefault();
    };

    const finishDrag = (event) => {
        if (!draggingRef.current || pointerIdRef.current !== event.pointerId) {
            return;
        }

        draggingRef.current = false;
        pointerIdRef.current = null;

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
    };

    if (!certificates.length) {
        return <div className={classes.carouselEmpty}>{emptyText}</div>;
    }

    return (
        <div className={classes.carouselShell}>
            <div
                className={classes.carouselViewport}
                ref={viewportRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={finishDrag}
                onPointerCancel={finishDrag}
                onLostPointerCapture={finishDrag}
                aria-label={status}>
                <div className={classes.carouselTrack} ref={trackRef}>
                    {[0, 1, 2].map((segmentIndex) => (
                        <div
                            key={segmentIndex}
                            className={classes.carouselSegment}
                            ref={segmentIndex === 0 ? segmentRef : null}
                            aria-hidden={segmentIndex !== 1}>
                            {certificates.map((certificate) => (
                                <article
                                    key={`${segmentIndex}-${certificate.id}`}
                                    className={classes.certificateCard}>
                                    <div className={classes.certificateFrame}>
                                        <Image
                                            src={certificate.src}
                                            alt={certificate.title}
                                            fill
                                            sizes="(max-width: 780px) 76vw, 18rem"
                                            className={classes.certificateImage}
                                            draggable={false}
                                        />
                                    </div>
                                    <div className={classes.certificateFooter}>
                                        <h3
                                            className={
                                                classes.certificateTitle
                                            }>
                                            {certificate.title}
                                        </h3>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
function AboutContent({
    stats,
    techStack = [],
    techStackMap = {},
    certificates = [],
}) {
    const { locale } = useLanguage();
    const router = useRouter();
    const [isBlogExpanded, setIsBlogExpanded] = useState(false);
    const [blogPreviewHeight, setBlogPreviewHeight] = useState(null);
    const [blogFullHeight, setBlogFullHeight] = useState(null);
    const [isBlogExpandable, setIsBlogExpandable] = useState(false);
    const blogStackRef = useRef(null);
    const [isExperienceExpanded, setIsExperienceExpanded] = useState(false);
    const [experiencePreviewHeight, setExperiencePreviewHeight] =
        useState(null);
    const [experienceFullHeight, setExperienceFullHeight] = useState(null);
    const [isExperienceExpandable, setIsExperienceExpandable] = useState(false);
    const experienceGridRef = useRef(null);
    const content = ABOUT_CONTENT[locale] ?? ABOUT_CONTENT.en;
    const visibleTechStack = techStack;

    useEffect(() => {
        const measure = () => {
            const container = blogStackRef.current;

            if (!container) {
                return;
            }

            const items = Array.from(container.children);

            if (!items.length) {
                setBlogPreviewHeight(null);
                setBlogFullHeight(null);
                setIsBlogExpandable(false);
                return;
            }

            const rowTops = [];

            items.forEach((item) => {
                const top = item.offsetTop;

                if (!rowTops.some((value) => Math.abs(value - top) < 4)) {
                    rowTops.push(top);
                }
            });

            const fullHeight = container.scrollHeight;

            if (rowTops.length <= 2) {
                setBlogPreviewHeight(fullHeight);
                setBlogFullHeight(fullHeight);
                setIsBlogExpandable(false);
                return;
            }

            const secondRowTop = rowTops[1];
            const secondRowBottom = Math.max(
                ...items
                    .filter(
                        (item) => Math.abs(item.offsetTop - secondRowTop) < 4,
                    )
                    .map((item) => item.offsetTop + item.offsetHeight),
            );

            setBlogPreviewHeight(secondRowBottom);
            setBlogFullHeight(fullHeight);
            setIsBlogExpandable(true);
        };

        const frameId = window.requestAnimationFrame(measure);
        window.addEventListener("resize", measure);

        return () => {
            window.cancelAnimationFrame(frameId);
            window.removeEventListener("resize", measure);
        };
    }, [visibleTechStack, locale]);

    useEffect(() => {
        const measure = () => {
            const grid = experienceGridRef.current;

            if (!grid) {
                return;
            }

            const items = Array.from(grid.children);

            if (!items.length) {
                setExperiencePreviewHeight(null);
                setExperienceFullHeight(null);
                setIsExperienceExpandable(false);
                return;
            }

            const fullHeight = grid.scrollHeight;
            const isNarrowViewport = window.matchMedia(
                "(max-width: 1199px)",
            ).matches;

            if (!isNarrowViewport) {
                setExperiencePreviewHeight(fullHeight);
                setExperienceFullHeight(fullHeight);
                setIsExperienceExpandable(false);
                return;
            }

            if (items.length <= 2) {
                setExperiencePreviewHeight(fullHeight);
                setExperienceFullHeight(fullHeight);
                setIsExperienceExpandable(false);
                return;
            }

            const secondItem = items[1];
            const previewHeight =
                secondItem.offsetTop + secondItem.offsetHeight;

            if (previewHeight >= fullHeight - 8) {
                setExperiencePreviewHeight(fullHeight);
                setExperienceFullHeight(fullHeight);
                setIsExperienceExpandable(false);
                return;
            }

            setExperiencePreviewHeight(previewHeight);
            setExperienceFullHeight(fullHeight);
            setIsExperienceExpandable(true);
        };

        const frameId = window.requestAnimationFrame(measure);
        window.addEventListener("resize", measure);

        return () => {
            window.cancelAnimationFrame(frameId);
            window.removeEventListener("resize", measure);
        };
    }, [locale, content.experience.length]);

    const metrics = [
        {
            label: content.metrics.posts,
            value: stats?.totalPosts ?? 0,
        },
        {
            label: content.metrics.projects,
            value: stats?.totalProjects ?? 0,
        },
        {
            label: content.metrics.studyTime,
            value: formatStudyTime(stats?.totalStudyTime ?? 0, locale),
        },
        {
            label: content.metrics.technologies,
            value: stats?.totalTechnologies ?? 0,
        },
        {
            label: content.metrics.experienceYears,
            value: formatExperienceYearsMetric(content.experience),
        },
        {
            label: content.metrics.certificates,
            value: certificates.length,
        },
    ];

    const experienceEntries = content.experience.map((entry, index) => {
        if (entry.isPlaceholder) {
            return {
                ...entry,
                indexLabel: String(index + 1).padStart(2, "0"),
                periodLine: content.placeholderPeriodLine,
            };
        }

        const startValue = entry.period?.start ?? entry.startDate;
        const endValue = entry.period?.end ?? null;
        const duration =
            entry.duration ??
            (endValue
                ? formatDuration(startValue, endValue, locale)
                : formatDuration(startValue, new Date().toISOString(), locale));

        const periodLine = endValue
            ? `${formatMonthYear(startValue, locale)} - ${formatMonthYear(
                  endValue,
                  locale,
              )} · ${duration}`
            : `${content.liveSince}: ${formatLongDate(
                  startValue,
                  locale,
              )} · ${content.liveDuration}: ${duration}`;

        return {
            ...entry,
            indexLabel: String(index + 1).padStart(2, "0"),
            periodLine,
        };
    });

    return (
        <section className={classes.page}>
            <div className={classes.pageGlowOne} />
            <div className={classes.pageGlowTwo} />

            <div className={classes.container}>
                <div className={classes.mosaic}>
                    <article
                        className={`${classes.card} ${classes.identityCard}`}>
                        <span className={classes.eyebrow}>
                            {content.introEyebrow}
                        </span>

                        <h1 className={classes.roleTitle}>
                            {content.roleTitleLines.map((line) => (
                                <span key={line}>{line}</span>
                            ))}
                        </h1>

                        <p className={classes.cardText}>{content.introText}</p>
                        <p className={classes.statusLine}>
                            {content.statusLine}
                        </p>

                        <div className={classes.metricGrid}>
                            {metrics.map((metric) => (
                                <div
                                    key={metric.label}
                                    className={classes.metricItem}>
                                    <strong className={classes.metricValue}>
                                        {metric.value}
                                    </strong>
                                    <span className={classes.metricLabel}>
                                        {metric.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className={`${classes.card} ${classes.photoCard}`}>
                        <div className={classes.photoLayout}>
                            <div className={classes.photoWrap}>
                                <Image
                                    src={PORTRAIT_SRC}
                                    alt={content.portraitAlt}
                                    fill
                                    priority
                                    sizes="(max-width: 980px) 100vw, 22rem"
                                    className={classes.photo}
                                />
                            </div>

                            <div className={classes.heroCopy}>
                                <span className={classes.heroEyebrow}>
                                    {content.heroEyebrow}
                                </span>
                                <h2 className={classes.heroTitle}>
                                    {content.heroTitle}
                                </h2>
                                <p className={classes.heroLead}>
                                    {content.heroLead}
                                </p>

                                <div className={classes.heroTagList}>
                                    {content.heroTags.map((tag) => (
                                        <span
                                            key={tag}
                                            className={classes.heroTag}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </article>

                    <article
                        className={`${classes.card} ${classes.contactsCard}`}>
                        <span className={classes.eyebrow}>
                            {content.contactEyebrow}
                        </span>
                        <h2 className={classes.cardTitle}>
                            {content.contactTitle}
                        </h2>
                        <p className={classes.cardText}>
                            {content.contactText}
                        </p>

                        <div className={classes.contactList}>
                            {content.links.map((linkItem) => (
                                <a
                                    key={linkItem.label}
                                    href={linkItem.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={classes.contactCard}>
                                    <span className={classes.contactLabel}>
                                        {linkItem.label}
                                    </span>
                                    <span className={classes.contactValue}>
                                        {linkItem.value}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </article>

                    <article className={`${classes.card} ${classes.techCard}`}>
                        <span className={classes.eyebrow}>
                            {content.technologiesEyebrow}
                        </span>
                        <h2 className={classes.cardTitle}>
                            {content.technologiesTitle}
                        </h2>
                        <p className={classes.cardText}>
                            {content.technologiesText}
                        </p>

                        <div className={classes.skillGroups}>
                            {content.skillGroups.map((group) => (
                                <section
                                    key={group.title}
                                    className={classes.skillGroup}>
                                    <h3 className={classes.skillGroupTitle}>
                                        {group.title}
                                    </h3>
                                    <div className={classes.skillItems}>
                                        {group.items.map((item) => (
                                            <span
                                                key={item}
                                                className={classes.skillItem}>
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </section>
                            ))}

                            <div
                                aria-hidden="true"
                                className={`${classes.skillFiller} ${classes.skillFillerPulse}`}>
                                <div className={classes.skillFillerPulseDots}>
                                    <span />
                                    <span />
                                    <span />
                                </div>
                            </div>

                            <div
                                aria-hidden="true"
                                className={`${classes.skillFiller} ${classes.skillFillerOrb}`}>
                                <div className={classes.skillFillerOrbInner} />
                            </div>

                            <div
                                aria-hidden="true"
                                className={`${classes.skillFiller} ${classes.skillFillerWave}`}>
                                <div className={classes.skillFillerWaveBar} />
                            </div>

                            <div
                                aria-hidden="true"
                                className={`${classes.skillFiller} ${classes.skillFillerOrbit}`}>
                                <div className={classes.skillFillerOrbitInner}>
                                    <span />
                                    <span />
                                    <span />
                                    <span />
                                    <span />
                                    <span />
                                </div>
                            </div>
                        </div>
                    </article>

                    <article
                        className={`${classes.card} ${classes.impactCard}`}>
                        <span className={classes.eyebrow}>
                            {content.impactEyebrow}
                        </span>
                        <h2 className={classes.cardTitle}>
                            {content.impactTitle}
                        </h2>
                        <p className={classes.cardText}>{content.impactText}</p>

                        <ul className={classes.impactList}>
                            {content.impactItems.map((item) => (
                                <li key={item} className={classes.impactItem}>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className={classes.inlineExperienceSection}>
                            <div className={classes.inlineExperienceHeader}>
                                <span
                                    className={classes.inlineExperienceEyebrow}>
                                    {content.experienceEyebrow}
                                </span>
                                {content.experienceText ? (
                                    <p className={classes.inlineExperienceText}>
                                        {content.experienceText}
                                    </p>
                                ) : null}
                            </div>

                            <div
                                className={classes.experienceAccordion}
                                style={
                                    experienceFullHeight
                                        ? {
                                              maxHeight: isExperienceExpanded
                                                  ? `${experienceFullHeight}px`
                                                  : `${experiencePreviewHeight ?? experienceFullHeight}px`,
                                          }
                                        : undefined
                                }>
                                <div
                                    className={classes.inlineExperienceGrid}
                                    ref={experienceGridRef}>
                                    {experienceEntries.map((entry) => (
                                        <article
                                            key={entry.id}
                                            className={`${classes.inlineExperienceCard} ${
                                                entry.isPlaceholder
                                                    ? classes.inlineExperienceCardPlaceholder
                                                    : ""
                                            }`}>
                                        <div
                                            className={
                                                classes.inlineExperienceTop
                                            }>
                                            <div
                                                className={
                                                    classes.inlineExperiencePills
                                                }>
                                                <span
                                                    className={
                                                        classes.rolePill
                                                    }>
                                                    {entry.role}
                                                </span>
                                                {entry.isLive ? (
                                                    <span
                                                        className={
                                                            classes.livePill
                                                        }>
                                                        {content.liveBadge}
                                                    </span>
                                                ) : null}
                                                {entry.isPlaceholder ? (
                                                    <span
                                                        className={
                                                            classes.openPill
                                                        }>
                                                        {content.openBadge}
                                                    </span>
                                                ) : null}
                                            </div>

                                            <span
                                                className={
                                                    classes.experienceIndex
                                                }>
                                                {entry.indexLabel}
                                            </span>
                                        </div>

                                        <h3
                                            className={
                                                classes.inlineExperienceCompany
                                            }>
                                            {entry.company}
                                        </h3>
                                        <p
                                            className={
                                                classes.inlineExperienceMeta
                                            }>
                                            {entry.location}
                                        </p>
                                        <p
                                            className={
                                                classes.inlineExperienceMeta
                                            }>
                                            {entry.periodLine}
                                        </p>
                                        <div
                                            className={
                                                classes.inlineExperienceSummaryWrap
                                            }>
                                            <p
                                                className={
                                                    classes.inlineExperienceSummary
                                                }>
                                                {entry.summary}
                                            </p>
                                        </div>

                                        <p
                                            className={
                                                classes.inlineAchievementHeading
                                            }>
                                            {content.achievementTitle}
                                        </p>

                                        <ul
                                            className={
                                                classes.inlineAchievementList
                                            }>
                                            {entry.achievements.map(
                                                (achievement) => (
                                                    <li
                                                        key={achievement}
                                                        className={
                                                            classes.inlineAchievementItem
                                                        }>
                                                        {achievement}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </article>
                                    ))}
                                </div>
                                {isExperienceExpandable &&
                                !isExperienceExpanded ? (
                                    <div
                                        className={classes.experienceFade}
                                    />
                                ) : null}
                            </div>

                            {isExperienceExpandable ? (
                                <button
                                    type="button"
                                    className={classes.experienceToggle}
                                    onClick={() =>
                                        setIsExperienceExpanded(
                                            (currentValue) => !currentValue,
                                        )
                                    }
                                    aria-expanded={isExperienceExpanded}>
                                    <span>
                                        {isExperienceExpanded
                                            ? content.experienceCollapse
                                            : content.experienceExpand}
                                    </span>
                                    <span
                                        className={`${classes.experienceToggleIcon} ${
                                            isExperienceExpanded
                                                ? classes.experienceToggleIconExpanded
                                                : ""
                                        }`}>
                                        ↓
                                    </span>
                                </button>
                            ) : null}
                        </div>

                        <div className={classes.actionRow}>
                            <Link
                                href="/#featured"
                                className={classes.primaryAction}>
                                {content.actionPortfolio}
                            </Link>
                            <Link
                                href="/contact"
                                className={classes.secondaryAction}>
                                {content.actionContact}
                            </Link>
                            <a
                                href={RESUME_LINK}
                                target="_blank"
                                rel="noreferrer"
                                className={classes.ghostAction}>
                                {content.actionResume}
                            </a>
                        </div>
                    </article>

                    <article
                        className={`${classes.card} ${classes.educationCard}`}>
                        <div className={classes.educationHeader}>
                            <span className={classes.eyebrow}>
                                {content.educationEyebrow}
                            </span>
                            {content.educationTitle ? (
                                <h2 className={classes.cardTitle}>
                                    {content.educationTitle}
                                </h2>
                            ) : null}
                            <p className={classes.cardText}>
                                {content.educationText}
                            </p>
                        </div>

                        <div className={classes.educationList}>
                            {content.education.map((item) => (
                                <article
                                    key={`${item.period}-${item.degree}`}
                                    className={classes.educationItem}>
                                    <span className={classes.educationPeriod}>
                                        {item.period}
                                    </span>
                                    <h3 className={classes.educationDegree}>
                                        {item.degree}
                                    </h3>
                                    <p className={classes.educationSchool}>
                                        {item.institution}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </article>

                    <article
                        className={`${classes.card} ${classes.blogStackCard}`}>
                        <span className={classes.eyebrow}>
                            {content.blogStackEyebrow}
                        </span>
                        {content.blogStackTitle ? (
                            <h2 className={classes.cardTitle}>
                                {content.blogStackTitle}
                            </h2>
                        ) : null}
                        <p className={classes.cardText}>
                            {content.blogStackText}
                        </p>

                        <div
                            className={classes.portfolioStackAccordion}
                            style={
                                blogFullHeight
                                    ? {
                                          maxHeight: isBlogExpanded
                                              ? `${blogFullHeight}px`
                                              : `${blogPreviewHeight ?? blogFullHeight}px`,
                                      }
                                    : undefined
                            }>
                            <div
                                className={classes.portfolioStackCloud}
                                ref={blogStackRef}>
                                {visibleTechStack.map((item) => {
                                    const matchingSlugs =
                                        techStackMap[item] ?? [];
                                    const hasMatchingPost =
                                        matchingSlugs.length > 0;

                                    return (
                                        <button
                                            key={item}
                                            type="button"
                                            className={
                                                classes.portfolioStackPill
                                            }
                                            disabled={!hasMatchingPost}
                                            onClick={() => {
                                                if (!hasMatchingPost) {
                                                    return;
                                                }

                                                const targetSlug =
                                                    matchingSlugs[
                                                        Math.floor(
                                                            Math.random() *
                                                                matchingSlugs.length,
                                                        )
                                                    ];

                                                router.push(
                                                    `/posts/${targetSlug}`,
                                                );
                                            }}>
                                            {item}
                                        </button>
                                    );
                                })}
                            </div>
                            {isBlogExpandable && !isBlogExpanded ? (
                                <div className={classes.portfolioStackFade} />
                            ) : null}
                        </div>

                        {isBlogExpandable ? (
                            <button
                                type="button"
                                className={classes.stackToggle}
                                onClick={() =>
                                    setIsBlogExpanded(
                                        (currentValue) => !currentValue,
                                    )
                                }
                                aria-expanded={isBlogExpanded}>
                                <span>
                                    {isBlogExpanded
                                        ? content.blogStackCollapse
                                        : content.blogStackExpand}
                                </span>
                                <span
                                    className={`${classes.stackToggleIcon} ${
                                        isBlogExpanded
                                            ? classes.stackToggleIconExpanded
                                            : ""
                                    }`}>
                                    ↓
                                </span>
                            </button>
                        ) : null}
                    </article>
                </div>

                <section
                    className={`${classes.card} ${classes.certificatesSection}`}>
                    <div className={classes.certificatesHeader}>
                        <div>
                            <span className={classes.eyebrow}>
                                {content.certificatesEyebrow}
                            </span>
                            {content.certificatesTitle ? (
                                <h2 className={classes.sectionTitle}>
                                    {content.certificatesTitle}
                                </h2>
                            ) : null}
                            {content.certificatesText ? (
                                <p className={classes.sectionText}>
                                    {content.certificatesText}
                                </p>
                            ) : null}
                        </div>

                        <span className={classes.carouselCount}>
                            {formatCertificateCount(
                                certificates.length,
                                locale,
                            )}
                        </span>
                    </div>

                    <CertificateCarousel
                        certificates={certificates}
                        status={content.carouselStatus}
                        emptyText={content.emptyCertificates}
                    />
                </section>
            </div>
        </section>
    );
}

export default AboutContent;
