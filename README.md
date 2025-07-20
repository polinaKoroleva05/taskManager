# Менеджер задач

Веб-приложение "Менеджер задач", позволяющее просматривать список задач и редактировать их. 
### Для ознакомления проект доступен по ссылке:
[https://task-manager-peach-rho.vercel.app/](https://task-manager-peach-rho.vercel.app/)

### Главная страница:
![Главная страница](https://github.com/polinaKoroleva05/taskManager/blob/main/public/mainPage.png)

### Форма создания и редактирования задачи:
![Страница редактирования](https://github.com/polinaKoroleva05/taskManager/blob/main/public/editPage.png)

### Доступно переключение на темную тему:
![Главная страница](https://github.com/polinaKoroleva05/taskManager/blob/main/public/mainPageDark.png)

<ins>Установка для дальнейшей разработки:</ins>
1. Склонируйте репозиторий 
2. Установите npm и Node, если еще не устанавливали. В корне проекта запустите команду `npm install`
3. Запустите команду `npm run dev` для запуска dev-сервера или `npm run build` для сборки проекта на продакшн

<ins>Установка для использования на сервере:</ins>
1. Скачайте папку dist
2. Используйте dist/index.html как entry point

Используемые технологии:
-  React (с использованием TypeScript)
-  React Router v6 для маршрутизации
-  Сборщик проекта: Vite
-  UI-фреймворк: Mantine
-  Инструменты стилизации: css modules
-  Плагин для работы с svg: vite-plugin-svgr
-  Tanstack для управления кэшированием данных от сервера


Приложение использует архитектуру Feature-Sliced Design.
Использованы следующие слои: App, Pages, Widgets, Shared. Краткое описание каждого слоя (взято с сайта [https://feature-sliced.github.io/documentation/ru/docs/get-started/overview](https://feature-sliced.github.io/documentation/ru/docs/get-started/overview)):
- App — всё, благодаря чему приложение запускается — роутинг, точки входа, глобальные стили, провайдеры и т. д.
- Pages (страницы) — полные страницы или большие части страницы при вложенном роутинге.
- Widgets (виджеты) — большие самодостаточные куски функциональности или интерфейса, обычно реализующие целый пользовательский сценарий.
- Shared — переиспользуемый код, особенно когда он отделён от специфики проекта/бизнеса, хотя это не обязательно.

### API 

[https://github.com/polinaKoroleva05/taskManagerApi](https://github.com/polinaKoroleva05/taskManagerApi):
 - Для сервера использовался фреймворк Express.js
 - Cохранение данных в json файл
 - Сервер поднят на vercel