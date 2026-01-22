import {Main} from "./components/main.js";
import {SignUp} from "./components/sign-up.js";
import {Login} from "./components/login.js";

export class Router {
    constructor() {

        this.titlePageElement = document.getElementById('title');
        this.contentPageElement = document.getElementById('content');

        this.initEvents();
        this.routes = [
            {
                route: '/',
                title: 'Главная',
                filePathTemplate: '/templates/pages/main.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Main();
                    // new Dashboard(this.openNewRoute.bind(this));
                },
                // styles: ['fullcalendar.css'],
                // scripts: ['moment.min.js','moment-ru-locale.js','fullcalendar.js','fullcalendar-ru-locale.js'],
            },
            {
                route: '/404',
                title: 'Страница не найдена',
                filePathTemplate: '/templates/pages/404.html',
                useLayout: false
            },
            {
                route: '/login',
                title: 'Авторизация',
                filePathTemplate: '/templates/pages/auth/login.html',
                load: () => {
                //     document.body.classList.add('login-page');
                //     document.body.style.height = '100vh';
                //     new Login(this.openNewRoute.bind(this));
                    new Login();
                },
                // unload: () => {
                //     document.body.classList.remove('login-page');
                //     document.body.style.height = 'auto';
                // },
                // styles: ['icheck-bootstrap.min.css']
            },
            {
                route: '/sign-up',
                title: 'Регистрация',
                filePathTemplate: '/templates/pages/auth/sign-up.html',
                load: () => {
                //     document.body.classList.add('register-page');
                //     document.body.style.height = '100vh';
                //     new SignUp(this.openNewRoute.bind(this));
                    new SignUp();
                },
                // unload: () => {
                //     document.body.classList.remove('register-page');
                //     document.body.style.height = 'auto';
                // },
                // styles: ['icheck-bootstrap.min.css']
            },
            // {
            //     route: '/logout',
            //     load: () => {
            //         new Logout(this.openNewRoute.bind(this));
            //     },
            //
            // },
        ]

    }

    // инициализация при запуске приложения или переходе по страницам
    initEvents() {
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));
        window.addEventListener('popstate', this.activateRoute.bind(this));
    }

   async activateRoute() {
        // определяем открытую страницу
        const urlRoute = window.location.pathname;
        const newRoute = this.routes.find(item => item.route === urlRoute);

        if (newRoute) {
            // if (newRoute.styles && newRoute.styles.length > 0) {
            //     newRoute.styles.forEach(style => {
            //         FileUtils.loadPageStyle('/css/' + style, this.adminLteStyleElement);
            //     })
            // }
            //
            // if (newRoute.scripts && newRoute.scripts.length > 0) {
            //     for (const script of newRoute.scripts) {
            //         await FileUtils.loadPageScript('/js/' + script); // делается для последовательной загрузки
            //     }
            // }
            //
            if (newRoute.title) {
                this.titlePageElement.innerText = newRoute.title + ' | Фронтенд проект на JS';
            }

            if (newRoute.filePathTemplate) {
            //
            //     // document.body.className = ''; // очищаем все классы перед загрузкой страницы
            //
                let contentBlock = this.contentPageElement;
                if (newRoute.useLayout) {

                    this.contentPageElement.innerHTML = await fetch(newRoute.useLayout).then(response => response.text());
                    contentBlock = document.getElementById('content-layout');
            //         document.body.classList.add('sidebar-mini');
            //         document.body.classList.add('layout-fixed');
            //         this.activateMenuItem(newRoute);
                } else {
            //         document.body.classList.remove('sidebar-mini');
            //         document.body.classList.remove('layout-fixed');
                }
                contentBlock.innerHTML = await fetch(newRoute.filePathTemplate).then(response => response.text());
            //

            }
            //
            //
            if (newRoute.load && typeof newRoute.load === 'function') {
                newRoute.load();
            }

        } else {
            console.log('No route found');
            window.location = '/404';
            history.pushState({}, '', '/404');// позволяет изменить URL без перезагрузки и добавить новую запись в историю браузера
            await this.activateRoute();
        }
    }
}