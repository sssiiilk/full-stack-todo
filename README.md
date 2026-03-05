# Fullstack Todo

todo-приложение: фронт на `index.html`, API на `Express`, данные в `PostgreSQL`.

## Что внутри

- `index.html` — интерфейс (добавление, список, удаление задач)
- `server.js` — API и раздача статики
- `style.css` — стили

## Быстрый запуск

1. Установить зависимости:
   ```bash
   npm install
   ```
2. Убедиться, что PostgreSQL запущен.
3. Запустить сервер:
   ```bash
   node server.js
   ```
4. Открыть в браузере:
   [http://localhost:8080](http://localhost:8080)



## API

- `GET /api/todos` — получить список
- `POST /api/todos` — добавить задачу (`{ "text": "..." }`)
- `DELETE /api/todos/:id` — удалить задачу
