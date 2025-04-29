# MVP Приложение

Это минимально жизнеспособный продукт (MVP), созданный с использованием React, Tailwind CSS и других современных технологий.

## Требования

- Node.js 14+ и npm

## Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/yourusername/my-mvp-app.git
cd my-mvp-app
```

2. Установите зависимости:
```bash
npm install
```

## Запуск приложения

Для запуска приложения в режиме разработки:

```bash
npm start
```

Приложение будет доступно по адресу: [http://localhost:3000](http://localhost:3000)

## Тестирование

Для запуска тестов:

```bash
npm test
```

## Сборка для продакшена

Для создания оптимизированной версии приложения:

```bash
npm run build
```

## Структура проекта

- `/src/components` - UI компоненты
  - `/src/components/ui` - Базовые UI компоненты (кнопки, поля ввода и т.д.)
  - `/src/components/layout` - Компоненты разметки (шапка, подвал, сайдбар)
  - `/src/components/features` - Компоненты для конкретных функций
- `/src/pages` - Страницы приложения
- `/src/services` - Сервисы для работы с API
- `/src/hooks` - Пользовательские React хуки
- `/src/utils` - Вспомогательные функции
- `/src/assets` - Статические ресурсы

## Переменные окружения

- `REACT_APP_API_URL` - URL API сервера
- `REACT_APP_USE_MOCK_API` - Использовать ли имитацию API (true/false)

## Лицензия

MIT
