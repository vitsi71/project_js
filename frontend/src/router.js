import {Main} from "./components/main.js";
import {Login} from "./components/auth/login";
import {SignUp} from "./components/auth/sign-up";
import {Credit} from "./components/credit/credit";
import {Credit_add} from "./components/credit/credit_add";
import {Credit_edit} from "./components/credit/credit_edit";
import {Debit} from "./components/debit/debit";
import {Debit_edit} from "./components/debit/debit_edit";
import {Debit_add} from "./components/debit/debit_add";
import {Debit_credit} from "./components/debit-credit/debit_credit";
import {Item_create} from "./components/debit-credit/item_create";
import {Item_edit} from "./components/debit-credit/item_edit";


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
                    new SignUp();
                },

            },
            {
                route: '/debit',
                title: 'Доходы',
                filePathTemplate: '/templates/pages/debit/debit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Debit();
                },
            },
            {
                route: '/debit_add',
                title: 'Создание категории доходов',
                filePathTemplate: '/templates/pages/debit/debit_add.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Debit_add();
                },
            },
            {
                route: '/debit_edit',
                title: 'Редактирование категории доходов',
                filePathTemplate: '/templates/pages/debit/debit_edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Debit_edit();
                },
            },
            {
                route: '/credit',
                title: 'Расходы',
                filePathTemplate: '/templates/pages/credit/credit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Credit();
                },
            },
            {
                route: '/credit_add',
                title: 'Создание категории расходов',
                filePathTemplate: '/templates/pages/credit/credit_add.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Credit_add();
                },
            },
            {
                route: '/credit_edit',
                title: 'Редактирование категории расходов',
                filePathTemplate: '/templates/pages/credit/credit_edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Credit_edit();
                },
            },
            {
                route: '/debit_credit',
                title: 'Доходы и расходы',
                filePathTemplate: '/templates/pages/debit-credit/debit_credit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Debit_credit();
                },
            },
            {
                route: '/item_create',
                title: 'Создание дохода/расхода',
                filePathTemplate: '/templates/pages/debit-credit/item_create.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Item_create();
                },
            },
            {
                route: '/item_edit',
                title: 'Редактирование дохода/расхода',
                filePathTemplate: '/templates/pages/debit-credit/item_edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Item_edit();
                },
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