---
title: "Express Shop – Node.js E-Commerce (MVC, MongoDB, Stripe, PDF Invoices)"
excerpt: "Production-like server-rendered e-commerce app on Express with MVC, MongoDB sessions, CSRF protection, Stripe Checkout payments, and on-demand PDF invoices."
date: "2026-02-25"
slug: "express-shop-nodejs"
image: "express-shop-preview.png"
type: "project"
tech:
    [
        "Node.js",
        "Express",
        "EJS",
        "MongoDB",
        "Mongoose",
        "express-session",
        "connect-mongodb-session",
        "csurf",
        "Stripe Checkout",
        "pdfkit",
        "multer",
        "bcryptjs",
        "express-validator",
        "nodemailer",
        "SendGrid",
    ]
isFeatured: true
isTrending: true
isNew: true
readingTime: "12 мин"
difficulty: "Средний"
demoUrl: "https://express-shop-gray.vercel.app/"
githubUrl: "https://github.com/Figrac0/Express_Shop"
---

# Express Shop – Node.js E-Commerce (MVC, MongoDB, Stripe, PDF Invoices)

Живое демо: https://express-shop-gray.vercel.app/  
GitHub репозиторий: https://github.com/Figrac0/Express_Shop

## Предварительный просмотр проекта

![Полный обзор](main.gif)

![Витрина магазина – список товаров](1.png)

![Регистрация – валидация формы](2.png)

![Stripe Checkout – процесс оплаты](3.png)

![Счёт – PDF, генерируемый после покупки](4.png)

## Обзор

Express Shop – это production-подобное e-commerce приложение, построенное на Node.js и Express с использованием классической архитектуры MVC и серверного рендеринга (EJS).

Проект сфокусирован на реальных backend-задачах, которые имеют значение в типичных e-commerce сценариях:

- безопасная аутентификация и управление сессиями
- персистентная корзина и история заказов
- интеграция платежей через Stripe Checkout
- генерация PDF-счетов по запросу со стримингом в браузер
- защита от CSRF для форм и деструктивных запросов

## Ключевые возможности

- Управление товарами (создание, обновление, удаление) с загрузкой изображений
- Аутентификация: регистрация, вход, выход, сброс пароля через email
- Авторизация на основе сессий (серверные сессии, хранящиеся в MongoDB)
- Корзина пользователя (добавление, удаление, очистка)
- Платежи через Stripe Checkout
- Сохранение заказов с неизменяемыми снапшотами товаров
- Генерация PDF-счёта по запросу (стриминг в браузер и сохранение на диск)
- CSRF-защита для форм и DELETE-запросов через fetch()
- Серверный рендеринг с использованием EJS

## Технологический стек

Backend и SSR:

- Node.js
- Express
- EJS

База данных:

- MongoDB
- Mongoose (ODM)

Безопасность и аутентификация:

- express-session + connect-mongodb-session (хранилище сессий в MongoDB)
- csurf (CSRF-защита)
- bcryptjs (хеширование паролей)
- express-validator (валидация и санитизация)
- connect-flash (одноразовые сообщения об ошибках авторизации)

Платежи и документы:

- Stripe Checkout (hosted payment pages)
- pdfkit (генерация счетов)

Загрузка файлов и email:

- multer (загрузка изображений на локальное хранилище)
- nodemailer + SendGrid transport (отправка писем при регистрации и сбросе пароля)

## Архитектура

Приложение следует архитектуре MVC:

- Routes – определяют HTTP-эндпоинты и цепочку middleware
- Controllers – реализуют обработку запросов, бизнес-логику и рендеринг представлений
- Models – схемы MongoDB и доменные методы (логика корзины в модели User)
- Views – шаблоны EJS, рендеримые на сервере

Типичный поток запроса:

```js
// route -> middleware -> controller -> model -> view
router.post("/add-product", isAuth, validators, adminController.postAddProduct);
```

## Конфигурация окружения

Конфигурация загружается через dotenv:

```js
require("dotenv").config();
// Загружает process.env.MONGO_USER, process.env.STRIPE_SECRET и т.д.
```

Секреты не хранятся в Git и настраиваются отдельно для каждого окружения (local, staging, production).

Ожидаемые переменные окружения (согласно коду):

```text
MONGO_USER
MONGO_PASSWORD
MONGO_CLUSTER
MONGO_DB
STRIPE_SECRET
STRIPE_PUBLIC_KEY
API_KEY (SendGrid)
DB_HOST, DB_USER, DB_PASSWORD, DB_NAME (модуль Sequelize/MySQL присутствует, но основная база – MongoDB)
```

## Слой базы данных – MongoDB + Mongoose

### Почему MongoDB

MongoDB подходит для:

- гибкого документного моделирования корзин и заказов
- вложенных структур (user.cart.items)
- быстрой итерации без жёстких миграций схем
- естественного хранения снапшотов товаров внутри заказов

### Ответственность Mongoose

- Определение схем и ограничений (required, типы)
- Предоставление API моделей (find, findById, save, deleteOne)
- Поддержка ссылок через ObjectId (поведение, похожее на relations, через populate)
- Определение instance-методов для бизнес-логики (методы корзины в User)

## Основные доменные модели

### Модель Product

Каждый товар связан с пользователем (владельцем) через userId.

```js
const productSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});
```

Это позволяет реализовать проверки авторизации, например «только владелец может редактировать/удалять».

### Модель User и логика корзины

Корзина хранится внутри документа пользователя:

```js
items: [{ productId, quantity }];
```

Операции с корзиной инкапсулированы в instance-методах:

```js
userSchema.methods.addToCart = function (product) {
    // Находит товар в корзине и увеличивает количество или добавляет новый
    // Логика корзины остается рядом с моделью данных
    return this.save();
};
```

Это сильное архитектурное решение – инварианты корзины и обновления остаются согласованными.

### Модель Order

Заказы хранят:

- информацию о пользователе (email + userId)
- купленные товары в виде неизменяемых снапшотов

```js
products: [
    {
        product: { type: Object, required: true },
        quantity: { type: Number, required: true },
    },
];
```

Хранение товара как plain object снапшота предотвращает историческую несогласованность при изменении названия или цены товара в будущем.

## Сессии, Cookies и аутентификация

### express-session + connect-mongodb-session

Состояние аутентификации хранится на сервере в MongoDB (коллекция sessions). Браузер хранит только session id cookie.

```js
app.use(
    session({
        secret: "my secret",
        resave: false,
        saveUninitialized: false,
        store,
    }),
);
```

Ключевые моменты:

- Cookie идентифицирует сессию, а не пользователя напрямую
- Хранилище сессий сохраняется при перезапуске сервера
- Сервер полностью контролирует инвалидизацию сессии

### Хеширование паролей – bcryptjs

Пароли никогда не хранятся в открытом виде. При регистрации:

```js
bcrypt.hash(password, 12); // 12 раундов – безопасный стандартный минимум
```

При входе:

```js
bcrypt.compare(password, user.password);
```

## Валидация и санитизация – express-validator

Запросы валидируются на уровне маршрутов до попадания в контроллер.

Пример для создания товара:

```js
body("price")
  .customSanitizer(v => String(v).replace(",", "."))
  .isFloat(),
```

Это:

- нормализует десятичный разделитель (EU запятая vs точка)
- гарантирует корректный числовой формат

Контроллеры затем проверяют:

```js
const errors = validationResult(req);
if (!errors.isEmpty()) {
    // повторный рендер с ошибками валидации
}
```

Этот паттерн обеспечивает точную и понятную обратную связь пользователю.

## Безопасность

### CSRF-защита – csurf

CSRF-токены генерируются на каждую сессию и внедряются в шаблоны:

```js
app.use(csrfProtection);

app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});
```

Формы содержат \_csrf, а AJAX-запросы передают токен в заголовках:

```js
fetch("/admin/product/" + prodId, {
    method: "DELETE",
    headers: { "csrf-token": csrf },
});
```

Это предотвращает атаки межсайтовой подделки запросов.

### Middleware авторизации – is-auth

Минимальная проверка доступа:

```js
module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) return res.redirect("/login");
    next();
};
```

Используется для защищённых маршрутов: корзина, checkout, админ-управление товарами.

## Загрузка файлов – multer

Изображения товаров загружаются в локальную директорию `images/`.

```js
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "images"),
    filename: (req, file, cb) => {
        const safeDate = new Date()
            .toISOString()
            .replace(/:/g, "-")
            .replace(/\./g, "-");
        cb(null, `${safeDate}-${file.originalname}`);
    },
});
```

Разрешены только MIME-типы изображений:

```js
if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg")
```

Удаление старых файлов при обновлении/удалении товара реализовано через helper:

```js
fileHelper.deleteFile(product.imageUrl);
```

Это предотвращает накопление «сиротских» файлов.

## Платежи – Stripe Checkout

Checkout реализован через Stripe-hosted страницы (без обработки данных карты внутри приложения).

Поток:

- Сервер получает товары корзины через Mongoose populate
- Создаёт Stripe Checkout session с line_items
- Рендерит страницу checkout с sessionId и STRIPE_PUBLIC_KEY

```js
return stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: products.map((p) => ({
        quantity: p.quantity,
        price_data: {
            currency: "usd",
            unit_amount: Math.round(Number(p.productId.price) * 100),
            product_data: {
                name: p.productId.title,
                description: p.productId.description,
            },
        },
    })),
    success_url: `${req.protocol}://${req.get("host")}/checkout/success`,
    cancel_url: `${req.protocol}://${req.get("host")}/checkout/cancel`,
});
```

Важные детали:

- Цена переводится в центы (требование Stripe)
- success_url и cancel_url формируются динамически

При успешной оплате:

- создаётся Order на основе снапшота корзины
- корзина очищается

## PDF-счета – pdfkit

Счета генерируются по запросу и стримятся:

- Content-Disposition: inline – отображение в браузере
- также сохраняются в data/invoices/

```js
const pdfDoc = new PDFDocument();
pdfDoc.pipe(fs.createWriteStream(invoicePath));
pdfDoc.pipe(res);
```

Реализация включает:

- контроль авторизации (только владелец заказа может скачать)
- управление путями к файлам
- стриминг без буферизации всего PDF в памяти

## Email – Nodemailer + SendGrid

Используется для:

- письма после регистрации
- письма для сброса пароля

Транспорт через SendGrid:

```js
const transporter = nodemailer.createTransport(
    sendgridTransport({ auth: { api_key: process.env.API_KEY } }),
);
```

Сброс пароля использует криптографически безопасный токен:

```js
crypto.randomBytes(32, (err, buffer) => {
    const token = buffer.toString("hex");
});
```

Токен и срок действия сохраняются в User:

- resetToken
- resetTokenExpiration

Стандартный безопасный поток:

1. пользователь запрашивает сброс
2. получает одноразовый токен
3. устанавливает новый пароль
4. токен очищается

## Клиентские улучшения

В проекте используется JS для:

- удаления товаров через fetch() + CSRF-заголовок
- мобильной навигации
- сохранения темы в localStorage
- улучшения UX загрузки файлов

Пример удаления без перезагрузки страницы:

```js
fetch("/admin/product/" + prodId, {
    method: "DELETE",
    headers: { "csrf-token": csrf },
});
```

## Стратегия обработки ошибок

Контроллеры используют единый подход:

- при ошибке – передача в глобальный error middleware
- отдельные обработчики 404 и 500

Пример:

```js
.catch(err => {
  const error = new Error(err);
  error.httpStatusCode = 500;
  next(error);
});
```

Глобальный middleware рендерит страницу 500 и предотвращает «тихие» сбои.

## Обоснование зависимостей

- **express** – веб-фреймворк
- **ejs** – SSR-шаблоны
- **mongoose / mongodb** – подключение и моделирование данных
- **express-session** – управление сессиями
- **connect-mongodb-session** – персистентное хранилище сессий
- **csurf** – CSRF-защита
- **connect-flash** – одноразовые сообщения
- **express-validator** – валидация и санитизация
- **bcryptjs** – хеширование паролей
- **multer** – загрузка изображений
- **stripe** – интеграция платежей
- **pdfkit** – генерация PDF
- **nodemailer + nodemailer-sendgrid-transport** – отправка email
- **dotenv** – переменные окружения
- **nodemon (dev)** – авто-перезапуск

Также присутствует:

- **sequelize + mysql2** – SQL-модуль, не являющийся основным в MongoDB-версии

## Запуск локально

```bash
npm install
npm run start
```

### Сервер:

```text
http://localhost:3000
```

Необходимо:

- настроить переменные MongoDB
- указать ключи Stripe
- настроить API-ключ SendGrid

## Что демонстрирует проект

- Практическую backend-инженерию: сессии, безопасность, валидация, загрузка файлов
- Реальную интеграцию платежей через Stripe
- Генерацию и стриминг PDF-документов
- Чистую MVC-архитектуру в Node.js
- Корректное использование populate и снапшотов заказов
- Production-ориентированный подход: секреты, авторизация, глобальная обработка ошибок

## 🚀 Готовы изучить код?

**[Live Demo](https://express-shop-gray.vercel.app/)** • **[GitHub Repository](https://github.com/Figrac0/Express_Shop)**
