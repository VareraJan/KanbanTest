# React + TypeScript + Vite + Redux/Toolkit

Релиз без подключенного Redux.

## Getting Started

Склонировать репозиторий в рабочую папку

Установить зависимости:

```bash
npm i
```

Переименуйте файл .env.example в .env и заполните его

Запустить приложение:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

В терминале будет указан URL запуска приложения.
Например [http://localhost:5173/](http://localhost:5173/)

# Тестовое задание: Канбан-доска

Условие:
Реализовать Канбан-доску.

Инструменты:
• React + Redux, JS или TS – на выбор;
• Для визуального оформления можно использовать любую библиотеку типа bootstrap, materialize и тд, но лучше если сразу CONSTA (https://consta.design);
• В качестве источника данных можно использовать любой сервис типа https://jsonplaceholder.typicode.com.

Критерии выполнения: 1. На доске должны быть 4 колонки с заголовками «Очередь», «В работе», «На проверке», «Выполнено»; 2. Реализовать получение уже имеющихся карточек и вывод на доску; 3. Реализовать добавление новых карточек в первую колонку. В карточке должны быть поля «ID», «Заголовок», «Описание»; 4. Реализовать перетягивание курсором мыши карточки из одной колонки в другую. Причём карточка может двигаться только слева направо, и только в ближайшую колонку; 5. Добавить кнопку удаления карточки; 6. Обязательно реализовать запросы к API на получение, обновление, удаление карточек. Даже если данные не откуда получить, запрос должен быть написан.
