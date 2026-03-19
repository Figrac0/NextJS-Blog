---
title: "Express GraphQL API с React клиентом – Full-Stack платформа постов"
excerpt: "Full-stack приложение, объединяющее Express и GraphQL с JWT-аутентификацией, загрузкой изображений и React-клиентом с пагинацией и управлением постами."
date: "2026-02-03"
slug: "message-nodejs"
image: "message-nodejs-preview.png"
type: "project"
tech:
    [
        "Node.js",
        "Express",
        "GraphQL",
        "MongoDB",
        "Mongoose",
        "React",
        "JWT",
        "multer",
    ]
isFeatured: true
isTrending: true
isNew: false
readingTime: "14 min"
difficulty: "Intermediate"
demoUrl: "https://message-node-front.onrender.com/"
githubUrl: "https://github.com/Figrac0/Message_NodeJS"
---

# Express GraphQL API с React клиентом – Full-Stack платформа постов

**[🚀 Live Demo: Открыть приложение](https://message-node-front.onrender.com/)**

---

## 📸 Предпросмотр проекта

![Feed page with posts and pagination](1.png)

---

![Landing page with platform overview](2.png)

---

![Create post modal with image upload](3.png)

---

![Single post page with full content](4.png)

---

## 🚀 Быстрые ссылки

- **[🌐 Live Demo](https://message-node-front.onrender.com/)** - Открыть приложение
- **[💻 GitHub Repository](https://github.com/Figrac0/Message_NodeJS)** - Посмотреть исходный код

---

## 📋 Содержание

- 🏗️ Обзор архитектуры
- 🔗 Интеграция Express + GraphQL
- 🔐 Поток аутентификации
- 🖼️ Пайплайн загрузки изображений
- 🎯 Основной функционал
- ⚙️ Backend реализация
- 🧩 Frontend реализация
- 🚀 Поток данных

---

## 🏗️ Обзор архитектуры

### **Гибридный backend дизайн**

Backend объединяет два подхода:

- **GraphQL** - основная бизнес-логика (auth, посты, данные пользователя)
- **REST (Express)** - инфраструктурные задачи (загрузка файлов, статика)

Это разделение обеспечивает:

- чистую структуру API
- предсказуемые контракты данных
- упрощённую работу с файлами

---

### **Поток системы**

```text
React Client → Express Server → GraphQL Layer → Mongoose → MongoDB
                     ↓
               REST Endpoints (upload, static files)
```

## 🔗 Интеграция Express + GraphQL

GraphQL монтируется напрямую в Express:

```javascript
app.use(
    "/graphql",
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql: true,
    }),
);
```

### Execution Flow

- Express получает HTTP-запрос
- Запрос передаётся в GraphQL middleware
- Происходит валидация схемы
- Resolver выполняет бизнес-логику
- JSON-ответ возвращается клиенту

GraphQL работает как слой поверх Express, а не как отдельный сервис.

---

## 🔐 Поток аутентификации

### JWT-Based Authentication

Аутентификация реализована с использованием JSON Web Tokens:

```javascript
const token = jwt.sign(
    {
        userId: user._id.toString(),
        email: user.email,
    },
    "somesupersecretsecret",
    { expiresIn: "1h" },
);
```

### Flow

- Пользователь логинится через GraphQL
- Сервер проверяет данные через bcrypt
- Генерируется JWT токен
- Токен сохраняется в `localStorage`
- Клиент отправляет токен в заголовках:

```javascript
Authorization: "Bearer " + token;
```

### Shared Auth Layer

Auth middleware добавляет:

- `req.isAuth`
- `req.userId`

Используется в:

- Express routes
- GraphQL resolvers

---

## 🖼️ Пайплайн загрузки изображений

### Why Not GraphQL

Бинарные файлы обрабатываются вне GraphQL через Express и `multer`.

### Upload Endpoint

```text
PUT /post-image
```

### Implementation

```javascript
app.put("/post-image", (req, res, next) => {
    if (!req.isAuth) {
        throw new Error("Not authenticated!");
    }

    if (!req.file) {
        return res.status(200).json({ message: "No file provided!" });
    }

    return res.status(201).json({
        message: "File stored.",
        filePath: `images/${req.file.filename}`,
    });
});
```

### Flow

- Клиент загружает файл через `FormData`
- Express сохраняет файл в `/images`
- Сервер возвращает путь к файлу
- Клиент отправляет GraphQL mutation с `imageUrl`

## 🎯 Основной функционал

### User System

- Регистрация / вход
- JWT аутентификация
- Сохранение сессии через `localStorage`
- Обновление статуса пользователя

### Post Management

- Создание постов
- Редактирование постов
- Удаление постов
- Просмотр постов с пагинацией
- Просмотр отдельного поста

### Media Handling

- Загрузка изображений через Express
- Раздача статических файлов
- Предпросмотр изображений

---

## ⚙️ Backend реализация

### Express Responsibilities

- обработка JSON
- middleware логика
- раздача статических файлов
- обработка загрузок
- middleware аутентификации
- подключение GraphQL

```javascript
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));
```

### MongoDB with Mongoose

#### User Model

```javascript
const userSchema = new Schema({
    email: String,
    password: String,
    name: String,
    status: String,
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});
```

#### Post Model

```javascript
const postSchema = new Schema(
    {
        title: String,
        imageUrl: String,
        content: String,
        creator: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true },
);
```

### GraphQL Schema

```graphql
type RootQuery {
    login(email: String!, password: String!): AuthData!
    posts(page: Int): PostData!
    post(id: ID!): Post!
    user: User!
}
```

### Resolvers Logic

```javascript
createPost: async function({ postInput }, req) {
  if (!req.isAuth) throw new Error("Not authenticated!");

  const post = new Post({
    title: postInput.title,
    content: postInput.content,
    imageUrl: postInput.imageUrl,
    creator: req.userId
  });

  const createdPost = await post.save();

  return {
    ...createdPost._doc,
    _id: createdPost._id.toString()
  };
}
```

## 🧩 Frontend реализация

### React SPA

Responsibilities:

- routing
- authentication state
- form handling
- API communication
- UI rendering

### GraphQL Requests via Fetch

```javascript
fetch("http://localhost:8080/graphql", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(graphqlQuery),
});
```

No Apollo Client - прямой контроль над запросами.

### Post Creation Flow

#### Step 1 - Upload Image

```javascript
fetch("http://localhost:8080/post-image", {
    method: "PUT",
    headers: {
        Authorization: "Bearer " + token,
    },
    body: formData,
});
```

#### Step 2 - GraphQL Mutation

```graphql
mutation CreateNewPost {
  createPost(...) {
    _id
    title
  }
}
```

## 🚀 Поток данных

### Full Post Creation Flow

```text
User Input → React Form → Image Upload (REST)
                         ↓
                  Express + multer
                         ↓
                  File saved (/images)
                         ↓
                  GraphQL Mutation
                         ↓
                  Mongoose → MongoDB
                         ↓
                  Response → UI Update

```

## 🎯 Ключевые архитектурные решения

### GraphQL for business logic

- централизованный API
- строгий контракт схемы

### Express for infrastructure

- загрузка файлов
- статика
- middleware

### JWT authentication

- stateless
- scalable

### Manual fetch over Apollo

- полный контроль
- минимальные зависимости

### Separation of concerns

- upload != data mutation

---

## 📊 Что демонстрирует этот проект

- Гибридный API (GraphQL + REST)
- Архитектура JWT-аутентификации
- Пайплайн загрузки файлов через multer
- Моделирование данных и связи в Mongoose
- Full-stack интеграция React + Node
- Реальный поток обработки запросов

---

## 🚀 Готов посмотреть код?

**[Live Demo](https://message-node-front.onrender.com/)** • **[Репозиторий GitHub](https://github.com/Figrac0/Message_NodeJS)**
