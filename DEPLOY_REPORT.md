Мини-отчет по деплою в Yandex Cloud

Сделали деплой приложения в Serverless Containers полностью через CLI.

Что было сделано:
- Проверили доступы и роли в облаке, чтобы убедиться, что можно создавать и настраивать ресурсы через CLI.
- Подготовили Docker: проверили состояние daemon и запустили его, чтобы сборка и push образа прошли без ошибок.
- Собрали образ приложения из текущего проекта и загрузили его в Container Registry.
  Это подтверждает, что артефакт для деплоя успешно подготовлен и хранится в реестре.
  (Скриншот: успешный `docker build` и `docker push` в терминале)
- Создали Serverless Container для приложения и отдельный Service Account для запуска ревизий.
- Назначили Service Account необходимые IAM-права для доступа к образу и запуска контейнера.
- Выполнили деплой новой ревизии контейнера из загруженного образа и включили публичный вызов.
  (Скриншот: успешный `revision deploy` и `allow-unauthenticated-invoke`)

Итог:
- Приложение развернуто и доступно по публичному адресу.
- Ссылка на итоговый контейнер: `https://bba9nonfq936ieqe956m.containers.yandexcloud.net/`
- Главная страница открывается корректно, значит сборка и запуск контейнера успешны.
- Публичный URL отвечает стабильно, базовый smoke-check пройден.
  (Скриншот: открытая главная страница в браузере / `HTTP 200` в терминале)
- API-часть пока не работает: запросы к `/api/todos` возвращают ошибку БД.
- Основная причина — в облаке пока не настроено подключение к PostgreSQL.

Что осталось:
- Поднять PostgreSQL в Yandex Cloud (Managed PostgreSQL или другой подходящий вариант).
- Создать базу и пользователя, подготовить параметры подключения.
- Передать эти параметры в переменные окружения контейнера.
- Перезадеплоить ревизию и выполнить проверку `GET/POST/DELETE` для `/api/todos`.
- После настройки БД повторно сделать функциональную проверку в браузере и через API-запросы.
- После проверки зафиксировать рабочую конфигурацию в короткой документации проекта.



ичный вопрос — для этих двух строк нужны два скрина из терминала.

Для строки 10
(Скриншот: успешный docker build и docker push в терминале)

В терминале проекта запустите:
docker build -t cr.yandex/<REGISTRY_ID>/fullstack-todo:latest .
docker push cr.yandex/<REGISTRY_ID>/fullstack-todo:latest
Дождитесь успешного завершения push (должно быть видно digest: и latest).
Сделайте скрин области терминала: Win + Shift + S.
Сохраните как, например, 01_build_push.png.
Для строки 14
(Скриншот: успешный revision deploy и allow-unauthenticated-invoke)

Выполните деплой и открытие публичного доступа:
yc serverless container revision deploy --container-name fullstack1todo --folder-id <FOLDER_ID> --image cr.yandex/<REGISTRY_ID>/fullstack-todo:latest --runtime http --memory 256MB --execution-timeout 10s --concurrency 8 --service-account-id <SA_ID>
yc serverless container allow-unauthenticated-invoke --name fullstack1todo --folder-id <FOLDER_ID>
На скрине должны быть видны:
успешный deploy (done, status: ACTIVE)
успешный allow-unauthenticated-invoke
Сделайте скрин Win + Shift + S.
Сохраните как 02_deploy_public.png.
Если хотите, могу сразу подставить в DEPLOY_REPORT.md подписи вида:
Рисунок 1 — Сборка и push образа, Рисунок 2 — Деплой и публичный доступ.
