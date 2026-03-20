import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import JavaScriptChallengeSection from "../game/javascript-challenge-section";
import { useLanguage } from "../../context/language-context";
import classes from "./about-content.module.css";

const RESUME_LINK =
    "https://drive.google.com/file/d/15rhQVGy25rH0c80GoduCizC92pt_nEAV/view?usp=drive_link";
const PORTRAIT_SRC = "/images/site/cropped_main.png";
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
        actionPortfolio: "Open projects",
        actionContact: "Contact me",
        actionResume: "Full resume",
        experience: [
            {
                id: "tvs",
                role: "Frontend Developer",
                company: "TVS.ru",
                location: "Russia · Remote",
                startDate: "2025-01-15T09:00:00+04:00",
                duration: "1 year 2 months",
                isLive: true,
                summary:
                    "B2B e-commerce platform for antenna equipment. I work on the store architecture, product categories, filtering, checkout flows, delivery settings, and the UI stability needed by both customers and administrators.",
                achievements: [
                    "Designed and implemented a scalable frontend architecture for the store, improving stability and usability.",
                    "Built product filtering and category logic for easier navigation and faster search.",
                    "Implemented checkout flows with cart management and flexible delivery configuration.",
                    "Set up clear UI presentation for products, categories, and order data across the store.",
                    "Maintained reliable synchronization between client-side modules and store services.",
                ],
            },
            {
                id: "freelance",
                role: "Frontend Software Engineer",
                company: "Freelance",
                location: "Russia · Remote",
                startDate: "2024-01-12T09:00:00+04:00",
                duration: "2 years 2 months",
                isLive: true,
                summary:
                    "JavaScript library for SPA applications with an admin panel and modular UI architecture. The platform includes a core, state management, routing, reusable modules, and service connectors for external APIs.",
                achievements: [
                    "Designed the architecture for SPA and admin-panel solutions with reusable modules, routing, and state management.",
                    "Created UI components that connect to APIs and services for dynamic data loading.",
                    "Implemented an admin panel with login, page editing, media handling, metadata, backups, and restore flows.",
                    "Built modular service integration for asynchronous loading and synchronization.",
                    "Standardized interfaces and architecture for long-term maintenance and future growth.",
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
                duration: "9 months",
                isLive: false,
                summary:
                    "Built user interfaces for automation systems and industrial controllers: monitoring panels, sensor data views, control elements, and equipment parameter configuration screens.",
                achievements: [
                    "Created interfaces for industrial sensor visualization and equipment settings.",
                    "Participated in UI integration with existing automated systems and controller logic.",
                    "Tested, debugged, and optimized interfaces to improve reliability and data accuracy.",
                ],
            },
        ],
        technologiesEyebrow: "Technologies",
        technologiesTitle: "Stack with a systems mindset",
        technologiesText:
            "My core stack is JavaScript / TypeScript, React, and Next.js, plus the tools needed to build reliable product interfaces from data flow to deployment.",
        skillGroups: [
            {
                title: "Languages",
                items: ["JavaScript", "TypeScript"],
            },
            {
                title: "Frontend",
                items: [
                    "React",
                    "Next.js",
                    "Redux Toolkit",
                    "RTK Query",
                    "React Hook Form",
                    "HTML / CSS",
                ],
            },
            {
                title: "Backend and data",
                items: [
                    "Node.js",
                    "REST API",
                    "WebSockets",
                    "MongoDB",
                    "MySQL",
                ],
            },
            {
                title: "Engineering focus",
                items: [
                    "SPA / SSR architecture",
                    "Reusable UI",
                    "Performance",
                    "Testing",
                    "CI/CD",
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
        actionPortfolio: "Посмотреть проекты",
        actionContact: "Связаться",
        actionResume: "Полное резюме",
        experience: [
            {
                id: "tvs",
                role: "Frontend Developer",
                company: "TVS.ru",
                location: "Россия · Удаленно",
                startDate: "2025-01-15T09:00:00+04:00",
                duration: "1 год 2 месяца",
                isLive: true,
                summary:
                    "B2B-платформа интернет-магазина для продажи антенного оборудования. Проектирую frontend-архитектуру магазина, структуру категорий, фильтрацию, оформление заказов и настройку доставки так, чтобы и клиенты, и администраторы работали со стабильным и понятным интерфейсом.",
                achievements: [
                    "Спроектировал и реализовал масштабируемую frontend-архитектуру интернет-магазина, обеспечив стабильность интерфейсов и удобство использования.",
                    "Создал систему фильтрации товаров, обеспечив удобный поиск и сортировку по категориям и атрибутам.",
                    "Реализовал систему оформления заказов с корзиной, выбором товаров и гибкой настройкой параметров доставки.",
                    "Настроил UI для корректного отображения товаров, категорий и информации о заказах на клиентской стороне.",
                    "Обеспечил синхронизацию данных между компонентами клиентской части и сервисами магазина.",
                ],
            },
            {
                id: "freelance",
                role: "Frontend Software Engineer",
                company: "Freelance",
                location: "Россия · Удаленно",
                startDate: "2024-01-12T09:00:00+04:00",
                duration: "2 года 2 месяца",
                isLive: true,
                summary:
                    "JavaScript-библиотека для SPA-приложений с административной панелью и модульной структурой компонентов. Внутри: ядро, управление состоянием, роутинг, UI-модули и сервисные коннекторы для интеграции с разными API.",
                achievements: [
                    "Спроектировал и реализовал архитектуру библиотеки для SPA и административных панелей с ядром, управлением состоянием, роутингом и модульными UI-компонентами.",
                    "Разработал набор UI-компонентов, которые удобно подключаются к API и сервисам для динамического получения данных.",
                    "Реализовал административную панель с логином, управлением страницами, редактированием текста и изображений, метаданными, резервными копиями и восстановлением данных.",
                    "Создал модульное подключение сервисов и API к компонентам, обеспечив асинхронную загрузку и синхронизацию данных.",
                    "Стандартизировал архитектуру и интерфейсы для долгосрочной поддержки и дальнейшего расширения функциональности.",
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
                duration: "9 месяцев",
                isLive: false,
                summary:
                    "Разрабатывал интерфейсы для систем автоматизации и управления промышленными контроллерами: панели мониторинга, визуализацию сигналов, элементы управления и экраны настройки оборудования.",
                achievements: [
                    "Создал интерфейсы для визуализации данных с промышленных датчиков и настройки параметров оборудования.",
                    "Участвовал в интеграции интерфейсов с существующими автоматизированными системами и контроллерами.",
                    "Проводил тестирование, отладку и оптимизацию интерфейсов, повышая надёжность и точность отображения данных.",
                ],
            },
        ],
        technologiesEyebrow: "Технологии",
        technologiesTitle: "Стек с опорой на системное мышление",
        technologiesText:
            "Мой основной стек - JavaScript / TypeScript, React и Next.js, плюс всё, что нужно для надёжных продуктовых интерфейсов: от данных и форм до интеграций и деплоя.",
        skillGroups: [
            {
                title: "Языки",
                items: ["JavaScript", "TypeScript"],
            },
            {
                title: "Frontend",
                items: [
                    "React",
                    "Next.js",
                    "Redux Toolkit",
                    "RTK Query",
                    "React Hook Form",
                    "HTML / CSS",
                ],
            },
            {
                title: "Backend и данные",
                items: [
                    "Node.js",
                    "REST API",
                    "WebSockets",
                    "MongoDB",
                    "MySQL",
                ],
            },
            {
                title: "Инженерный фокус",
                items: [
                    "SPA / SSR-архитектура",
                    "Переиспользуемый UI",
                    "Производительность",
                    "Тестирование",
                    "CI/CD",
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

        let previousTime = performance.now();

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

        frameRef.current = window.requestAnimationFrame(animate);

        return () => {
            window.cancelAnimationFrame(frameRef.current);
            window.removeEventListener("resize", measure);
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
function AboutContent({ stats, techStack = [], certificates = [] }) {
    const { locale } = useLanguage();
    const [isBlogExpanded, setIsBlogExpanded] = useState(false);
    const [blogPreviewHeight, setBlogPreviewHeight] = useState(null);
    const [blogFullHeight, setBlogFullHeight] = useState(null);
    const [isBlogExpandable, setIsBlogExpandable] = useState(false);
    const blogStackRef = useRef(null);
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

                            <div className={classes.inlineExperienceGrid}>
                                {experienceEntries.map((entry) => (
                                    <article
                                        key={entry.id}
                                        className={
                                            classes.inlineExperienceCard
                                        }>
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
                                {visibleTechStack.map((item) => (
                                    <span
                                        key={item}
                                        className={classes.portfolioStackPill}>
                                        {item}
                                    </span>
                                ))}
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

                <JavaScriptChallengeSection
                    className={classes.challengeSection}
                />
            </div>
        </section>
    );
}

export default AboutContent;
