# ЛР8 ИНИС — REST API «Лекториум» (Express + MongoDB)

Максимович Р. А., гр. 310101. CRUD для курсов интернет-магазина «Лекториум».

## Стек
Node.js, Express 5, Mongoose 9, dotenv, nodemon.

## Установка и запуск

1. MongoDB локально (или Atlas). Через Docker:
   ```bash
   docker run -d --name inis-lr8-mongo -p 127.0.0.1:27017:27017 mongo:7
   ```
2. Зависимости:
   ```bash
   npm install
   ```
3. Настройки: скопировать `.env.example` в `.env` и при необходимости поменять `MONGO_URI`.
   ```
   PORT=5208
   MONGO_URI=mongodb://127.0.0.1:27017/lektorium
   ```
4. Запуск:
   ```bash
   npm run dev   # с перезапуском (nodemon)
   npm start     # обычный
   ```
   API: `http://localhost:5208/api/courses`

## Модель `Course`

| Поле | Тип | Правила |
|------|-----|---------|
| `title` | String | обязательно, до 120 символов |
| `price` | Number | обязательно, ≥ 0 |
| `description` | String | по умолчанию `''` |
| `image` | String | по умолчанию `/assets/course.svg` |
| `createdAt`, `updatedAt` | Date | автоматически |

## Эндпоинты

| Метод | URL | Назначение | Успех | Ошибки |
|-------|-----|------------|-------|--------|
| GET | `/api/courses` | список курсов | 200 | 500 |
| GET | `/api/courses/:id` | курс по id | 200 | 400, 404 |
| POST | `/api/courses` | создать курс | 201 | 400 |
| PUT | `/api/courses/:id` | обновить курс | 200 | 400, 404 |
| DELETE | `/api/courses/:id` | удалить курс | 200 | 400, 404 |

Пример тела POST:
```json
{ "title": "Онлайн-курс «Основы TypeScript»", "price": 49, "description": "Типы, интерфейсы, дженерики" }
```

Коллекция для Postman: `postman_collection.json` (импорт: File → Import).
