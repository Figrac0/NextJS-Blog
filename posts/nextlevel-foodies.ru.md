---
title: "NextLevel Foodies – Современная платформа рецептов с App Router"
excerpt: "Полноценное приложение для обмена рецептами на Next.js 15 App Router с серверным рендерингом, загрузкой файлов и интеграцией с базой данных SQLite."
date: "2026-01-25"
slug: "nextlevel-foodies"
image: "nextlevel-foodies-preview.png"
type: "project"
tech:
    [
        "Next.js 15",
        "React 19",
        "App Router",
        "Server Components",
        "Server Actions",
        "SQLite",
        "better-sqlite3",
        "CSS Modules",
        "Vercel",
    ]
isFeatured: true
isTrending: true
isNew: false
readingTime: "12 мин"
difficulty: "Средний"
demoUrl: "https://r-next-onwards-foodies.vercel.app/"
---

# NextLevel Foodies – Проект на Next.js 15 App Router

**[🚀 Живое демо: Кликните, чтобы исследовать платформу](https://r-next-onwards-foodies.vercel.app/)**

---

## 📸 Предварительный просмотр проекта

![Главная страница со слайдшоу и призывом к действию](1.png)

---

![Страница просмотра всех доступных блюд](2.png)

---

![Детальный просмотр конкретного рецепта](3.png)

---

![Страница сообщества с преимуществами платформы](4.png)

---

![Форма для публикации собственного рецепта в сообществе](5.png)

---

## 🚀 Быстрые ссылки

- **[🌐 Живое демо](https://r-next-onwards-foodies.vercel.app/)** - Исследуйте полное приложение
- **[💻 Репозиторий GitHub](https://github.com/Figrac0/R-Next-Proj)** - Посмотрите исходный код

---

## 📋 Содержание

- 🚀 Обзор
- ✨ Ключевые особенности
- 🛠️ Подробный обзор технологического стека
- 🏗️ Архитектура App Router
- 💻 Подробный разбор кода
- 🔄 Поток данных и хранение
- 🛡️ Безопасность и валидация
- 🚀 Развертывание

---

## 🚀 Обзор

**NextLevel Foodies** – это практичная полноценная платформа для обмена рецептами, полностью построенная на **App Router** в Next.js 15. Проект служит комплексной демонстрацией современных паттернов full-stack разработки на React, сфокусированной на серверном управлении данными, клиентской интерактивности, безопасной загрузке файлов и постоянном локальном хранилище с использованием SQLite.

Приложение предоставляет полный CRUD-подобный опыт, где пользователи могут просматривать рецепты сообщества, изучать подробные инструкции приготовления и делиться своими собственными блюдами – всё в рамках бесшовной архитектуры на основе файловой маршрутизации.

---

## ✨ Ключевые особенности

### 🍽️ **Основное управление рецептами**

- **Просмотр и открытие** – Сетка всех рецептов, опубликованных сообществом
- **Детальные страницы рецептов** – Полные инструкции, изображения и информация об авторе
- **Поделитесь своим творением** – Удобная форма для загрузки новых рецептов с изображениями
- **Постоянное хранение** – Все данные сохраняются в локальной базе данных SQLite (`meals.db`)

### ⚡ **Современные паттерны Next.js 15**

- **Архитектура App Router** – Использование директории `/app` для маршрутизации, макетов и серверных компонентов
- **Server Components по умолчанию** – Эффективная загрузка данных без клиентского JavaScript
- **Динамические метаданные** – SEO-оптимизированные заголовки и описания страниц, генерируемые для каждого рецепта
- **Стриминг и Suspense** – Улучшенное воспринимаемое быстродействие с состояниями загрузки

### 🔄 **Интерактивные клиентские функции**

- **Активная навигация** – Подсвечивает текущую страницу с помощью `usePathname()`
- **Предпросмотр изображений** – Предварительный просмотр файлов в реальном времени перед загрузкой с использованием `useRef()` и `useState()`
- **Управление состоянием форм** – Использует `useActionState()` и `useFormStatus()` из React 19 для состояний ожидания и обратной связи
- **Обработка адаптивных изображений** – Построено на компоненте `Image` от Next.js для оптимизации

### 🗄️ **Полноценная обработка данных**

- **Server Actions (`"use server"`)** – Обработка отправки форм, загрузки файлов и записи в базу данных без отдельных API-маршрутов
- **Операции с файловой системой** – Загруженные изображения обрабатываются и сохраняются в `/public/images`
- **Интеграция с базой данных** – Синхронные запросы к SQLite с использованием `better-sqlite3` для простого и быстрого доступа к данным
- **Ревалидация маршрутов** – Автоматическое обновление кэша списков блюд после новых публикаций с использованием `revalidatePath()`

---

## 🛠️ Подробный обзор технологического стека

### **Основной фреймворк и среда выполнения**

- **Next.js 15 с App Router** – Основа для маршрутизации, рендеринга и серверной логики
- **React 19** – Использует последние хуки, включая `useActionState` и `useFormStatus`
- **Файловая система Node.js (`fs`)** – Обрабатывает запись загруженных файлов изображений на диск

### **Уровень данных**

- **SQLite через `better-sqlite3`** – Встроенная база данных для постоянного хранения рецептов
- **Server Components** – Прямые запросы к базе данных выполняются на сервере, исключая необходимость в клиентских библиотеках для загрузки данных

### **Утилиты и безопасность**

- **`slugify`** – Создает URL-дружественные слаги из названий рецептов (например, "Лучший бургер" → `luchshiy-burger`)
- **Библиотека `xss`** – Санитизирует пользовательский HTML-контент в инструкциях рецептов для предотвращения XSS-атак

### **Стилизация и развертывание**

- **CSS Modules** – Изолированная, компонентная стилизация для поддержки
- **Vercel** – Платформа для беспроблемного развертывания и хостинга

---

## 🏗️ Архитектура App Router

Проект является образцом структурирования приложений с App Router.

### **Ключевая структура файлов**

```text
/app
├── page.js                 # Главная страница (Server Component)
├── meals/
│   ├── page.js            # Список блюд (Server Component)
│   ├── [mealSlug]/
│   │   └── page.js        # Динамическая страница деталей блюда (Server Component)
│   └── share/
│       └── page.js        # Форма для публикации блюда (Client Component)
├── community/page.js      # Информационная страница сообщества (Server Component)
└── layout.js              # Корневой макет с заголовком
```

---

## Стратегия Server vs. Client Components

- **Server Components (`/meals`, `/[mealSlug]`)**: Обрабатывают загрузку данных, SEO-метаданные и рендерят статический HTML. Они импортируют и запускают драйвер базы данных `better-sqlite3` напрямую.
- **Client Components (`/meals/share`)**: Необходимы для интерактивных форм, выбора файлов и stateful-хуков, таких как `useState` и `useActionState`.

---

## Server Actions: Бэкенд в вашем фронтенде

Server Action `shareMeal` (в `lib/actions.js`) олицетворяет современный full-stack подход:

1. Получает `FormData` от клиента.
2. Валидирует все входные данные (текст, email, изображение).
3. Санитизирует инструкции с помощью библиотеки `xss`.
4. Обрабатывает загруженное изображение, сохраняет его в `/public/images`.
5. Вставляет новую запись о блюде в базу данных SQLite.
6. Ревалидирует кэш страницы `/meals` и перенаправляет пользователя.

Это заменяет необходимость в традиционных обработчиках API-маршрутов (таких как `pages/api`).

---

## 💻 Подробный разбор кода

### **Динамическая страница рецепта с SEO-метаданными**

`app/meals/[mealSlug]/page.js` демонстрирует Server Components, динамическую маршрутизацию и встроенную SEO-оптимизацию:

```jsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { getMeal } from "@/lib/meals";

// Next.js автоматически вызывает эту функцию для генерации метаданных страницы
export async function generateMetadata({ params }) {
    const meal = await getMeal(params.mealSlug);
    if (!meal) notFound();

    return {
        title: meal.title,
        description: meal.summary, // SEO-описание из базы данных
    };
}

export default async function MealDetailsPage({ params }) {
    const meal = await getMeal(params.mealSlug);
    if (!meal) notFound();

    // Преобразуем переносы строк в <br> для корректного отображения HTML
    const instructionsHtml = meal.instructions.replace(/\n/g, "<br />");

    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    {/* Оптимизированное изображение Next.js с приоритетной загрузкой */}
                    <Image src={meal.image} alt={meal.title} fill priority />
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        от{" "}
                        <a href={`mailto:${meal.creator_email}`}>
                            {meal.creator}
                        </a>
                    </p>
                    <p className={classes.summary}>{meal.summary}</p>
                </div>
            </header>
            <main>
                {/* Безопасный рендеринг санитизированных HTML-инструкций */}
                <p
                    className={classes.instructions}
                    dangerouslySetInnerHTML={{ __html: instructionsHtml }}
                />
            </main>
        </>
    );
}
```

### **Ключевые особенности**

- **`generateMetadata()`** – Автоматически устанавливает заголовок и описание страницы для SEO
- **`notFound()`** – Встроенная обработка 404 для невалидных слагов блюд
- **Компонент Image** – Автоматическая оптимизация, ленивая загрузка и приоритетная загрузка
- **Серверная загрузка данных** – Не требует клиентских состояний загрузки

---

### **Страница сообщества со статическими ресурсами**

`app/community/page.js` показывает, как работать со статическими изображениями и создавать вовлекающие разделы контента:

```jsx
import Image from "next/image";
import mealIcon from "@/assets/icons/meal.png";
import communityIcon from "@/assets/icons/community.png";
import eventsIcon from "@/assets/icons/events.png";

export default function CommunityPage() {
    return (
        <>
            <header className={classes.header}>
                <h1>
                    Одна общая страсть:{" "}
                    <span className={classes.highlight}>Еда</span>
                </h1>
                <p>
                    Присоединяйтесь к сообществу и делитесь любимыми рецептами!
                </p>
            </header>
            <main className={classes.main}>
                <h2>Преимущества сообщества</h2>
                <ul className={classes.perks}>
                    <li>
                        {/* Статический импорт изображений с оптимизацией Next.js */}
                        <Image src={mealIcon} alt="Вкусное блюдо" />
                        <p>Делитесь и открывайте рецепты</p>
                    </li>
                    <li>
                        <Image
                            src={communityIcon}
                            alt="Группа людей, готовящих"
                        />
                        <p>Находите новых друзей и единомышленников</p>
                    </li>
                    <li>
                        <Image
                            src={eventsIcon}
                            alt="Группа людей на кулинарном мероприятии"
                        />
                        <p>Участвуйте в эксклюзивных мероприятиях</p>
                    </li>
                </ul>
            </main>
        </>
    );
}
```

### **Переиспользуемый компонент блюда**

`components/meals/meal-item.js` демонстрирует переиспользуемость компонентов и правильную обработку изображений:

```jsx
import Link from "next/link";
import Image from "next/image";

export default function MealItem({ title, slug, image, summary, creator }) {
    return (
        <article className={classes.meal}>
            <header>
                <div className={classes.image}>
                    {/* Свойство fill делает изображение покрывающим контейнер */}
                    <Image src={image} alt={title} fill />
                </div>
                <div className={classes.headerText}>
                    <h2>{title}</h2>
                    <p>от {creator}</p>
                </div>
            </header>
            <div className={classes.content}>
                <p className={classes.summary}>{summary}</p>
                <div className={classes.actions}>
                    {/* Динамическая ссылка на страницу деталей блюда */}
                    <Link href={`/meals/${slug}`}>Просмотреть детали</Link>
                </div>
            </div>
        </article>
    );
}
```

### **Server Action с валидацией**

`lib/action.js` демонстрирует Server Actions, валидацию форм и ревалидацию кэша:

```jsx
"use server";
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
    return !text || text.trim() === "";
}

export async function shareMeal(prevState, formData) {
    // Извлекаем данные формы
    const meal = {
        title: formData.get("title"),
        summary: formData.get("summary"),
        instructions: formData.get("instructions"),
        image: formData.get("image"),
        creator: formData.get("name"),
        creator_email: formData.get("email"),
    };

    // Комплексная валидация
    if (
        isInvalidText(meal.title) ||
        isInvalidText(meal.summary) ||
        isInvalidText(meal.instructions) ||
        isInvalidText(meal.creator) ||
        isInvalidText(meal.creator_email) ||
        !meal.creator_email.includes("@") ||
        !meal.image ||
        meal.image.size === 0
    ) {
        return { message: "Неверные входные данные!" }; // Понятная ошибка для пользователя
    }

    // Сохраняем в базу данных (включая обработку изображений и XSS-санитизацию)
    await saveMeal(meal);

    // Очищаем кэш, чтобы сразу показать новое блюдо
    revalidatePath("/meals", "layout");

    // Перенаправляем на обновленный список блюд
    redirect("/meals");
}
```

### **Уровень базы данных с безопасностью**

`lib/meals.js` обрабатывает все операции с базой данных с мерами безопасности:

```jsx
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function saveMeal(meal) {
    // Создаем URL-безопасный слаг
    meal.slug = slugify(meal.title, { lower: true });

    // Санитизируем HTML для предотвращения XSS-атак
    meal.instructions = xss(meal.instructions);

    // Обрабатываем загруженное изображение
    const extension = meal.image.name.split(".").pop();
    const fileName = `${meal.slug}.${extension}`;

    // Сохраняем изображение в файловую систему
    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage));

    // Обновляем объект meal путем к изображению
    meal.image = `/images/${fileName}`;

    // Вставляем в базу данных SQLite
    db.prepare(
        `
        INSERT INTO meals
        (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
    `,
    ).run(meal);
}
```

### **Функции безопасности в этом коде:**

- **`xss()`** – Предотвращает XSS-атаки в пользовательском контенте
- **`slugify()`** – Создает безопасные, предсказуемые URL
- **Валидация расширений файлов** – Предотвращает произвольную загрузку файлов
- **Параметризованные запросы** – Предотвращает SQL-инъекции

---

## 🔄 Поток данных и хранение

### **1. Чтение данных (Отображение блюд)**

**Путь**: Пользователь посещает `/meals`

**Процесс**: Server Component `app/meals/page.js` вызывает `getMeals()` из `lib/meals.js`.

**Выполнение**: Эта функция выполняет синхронный запрос `SELECT * FROM meals` на сервере. Полученные данные передаются Server Components, которые рендерят HTML, отправляемый в браузер.

### **2. Запись данных (Публикация блюда)**

**Путь**: Пользователь отправляет форму на `/meals/share`

**Процесс**:

1.  Данные формы отправляются в Server Action `shareMeal`.
2.  Файл изображения конвертируется в буфер и записывается в файловую систему.
3.  Название преобразуется в слаг, инструкции санитизируются.
4.  Новая строка вставляется в таблицу `meals`.
5.  `revalidatePath("/meals")` сообщает Next.js очистить кэшированный список блюд.
6.  Пользователь `redirect("/meals")` чтобы увидеть свою новую публикацию.

### **Схема базы данных (`meals.db`)**

Таблица SQLite хранит всю информацию о рецептах:

- `slug` (Первичный ключ, сгенерированный из названия)
- `title`, `summary`, `instructions`
- `creator`, `creator_email`
- `image` (путь к загруженному файлу, например, `/images/luchshiy-burger.jpg`)

---

## 🛡️ Безопасность и валидация

Проект реализует несколько лучших практик безопасности, подходящих для публичного приложения.

### **Валидация входных данных**

Действие `shareMeal` проверяет:

- Пустые или состоящие только из пробелов текстовые поля.
- Валидный формат email (содержит `"@"`).
- Наличие загруженного файла изображения.

### **Предотвращение XSS**

Пользовательские инструкции рецептов (которые могут содержать базовый HTML, такой как `<br />` для переносов строк) проходят через библиотеку санитизации `xss` **перед сохранением в базу данных**. Это гарантирует нейтрализацию вредоносных тегов скриптов.

### **Безопасность загрузки файлов**

- Загрузки ограничены директорией `public/images`.
- Имена файлов производятся от санитизированного слага, предотвращая атаки обхода директорий.
- Компонент `Image` от Next.js используется для безопасного, оптимизированного рендеринга.

---

## 🚀 Развертывание

Проект настроен для легкого развертывания на **Vercel**, создателях Next.js.

### **Настройка Vercel**

1.  Подключение репозитория GitHub запускает автоматические деплои.
2.  Процесс сборки распознает Next.js и устанавливает зависимости.
3.  Файл базы данных SQLite (`meals.db`) включен в деплой.
4.  Директория `/public/images` обслуживается как статические ресурсы.

### **Соображения по окружению**

Этот проект использует **локальный файл SQLite**. Для production-приложений, требующих конкурентных записей, это было бы заменено на клиент-серверную базу данных, такую как PostgreSQL (с использованием библиотеки, такой как `pg`), но паттерн `better-sqlite3` чисто демонстрирует модель загрузки данных Server Component.

---

**🚀 Готовы исследовать?**

**[Живое демо](https://r-next-onwards-foodies.vercel.app/)** • **[Репозиторий GitHub](https://github.com/Figrac0/R-Next-Proj)**
