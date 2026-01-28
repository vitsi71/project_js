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
import {Main} from "./components/main/main";
import {Layout} from "./components/main/layout";
import {Logout} from "./components/auth/logout";


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
                    new Main(this.openNewRoute.bind(this));
                                  },
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
                    new Login(this.openNewRoute.bind(this));
                },
            },

            {
                route: '/sign-up',
                title: 'Регистрация',
                filePathTemplate: '/templates/pages/auth/sign-up.html',
                load: () => {
                    new SignUp(this.openNewRoute.bind(this));
                },
            },
            {
                route: '/debit',
                title: 'Доходы',
                filePathTemplate: '/templates/pages/debit/debit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Debit(this.openNewRoute.bind(this));
                                  },
            },
            {
                route: '/debit_add',
                title: 'Создание категории доходов',
                filePathTemplate: '/templates/pages/debit/debit_add.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Debit_add(this.openNewRoute.bind(this));
                                  },
            },
            {
                route: '/debit_edit',
                title: 'Редактирование категории доходов',
                filePathTemplate: '/templates/pages/debit/debit_edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Debit_edit(this.openNewRoute.bind(this));
                                 },
            },
            {
                route: '/credit',
                title: 'Расходы',
                filePathTemplate: '/templates/pages/credit/credit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Credit(this.openNewRoute.bind(this));
                                   },
            },
            {
                route: '/credit_add',
                title: 'Создание категории расходов',
                filePathTemplate: '/templates/pages/credit/credit_add.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Credit_add(this.openNewRoute.bind(this));
                                 },
            },
            {
                route: '/credit_edit',
                title: 'Редактирование категории расходов',
                filePathTemplate: '/templates/pages/credit/credit_edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Credit_edit(this.openNewRoute.bind(this));
                                },
            },
            {
                route: '/debit_credit',
                title: 'Доходы и расходы',
                filePathTemplate: '/templates/pages/debit-credit/debit_credit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Debit_credit(this.openNewRoute.bind(this));
                              },
            },
            {
                route: '/item_create',
                title: 'Создание дохода/расхода',
                filePathTemplate: '/templates/pages/debit-credit/item_create.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Item_create(this.openNewRoute.bind(this));
                                 },
            },
            {
                route: '/item_edit',
                title: 'Редактирование дохода/расхода',
                filePathTemplate: '/templates/pages/debit-credit/item_edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Item_edit(this.openNewRoute.bind(this));
                               },
            },
            {
                route: '/logout',
                load: () => {
                    new Logout(this.openNewRoute.bind(this));
                },

            },
        ]

    }

    // инициализация при запуске приложения или переходе по страницам
    initEvents() {
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));
        window.addEventListener('popstate', this.activateRoute.bind(this));
    }

    // открвтие страницы по ссылке
    async openNewRoute(url) {
        const currentRoute = window.location.pathname;//возвращает путь, следующий за именем домена в текущем URL-адресе
        history.pushState({}, '', url);// позволяет изменить URL без перезагрузки и добавить новую запись в историю браузера
        await this.activateRoute(null, currentRoute);
    }

    async activateRoute(e, oldRoute = null) {
        // определяем открытую страницу
        const urlRoute = window.location.pathname;//возвращает путь, следующий за именем домена в текущем URL-адресе
        const newRoute = this.routes.find(item => item.route === urlRoute);//ищем соответствующий route

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
            // Собираем index.html страницу
            if (newRoute.filePathTemplate) {
                //
                //     // document.body.className = ''; // очищаем все классы перед загрузкой страницы
                //
                let contentBlock = this.contentPageElement; // определяем место вставки HTML кода в шаблоне index.html
                if (newRoute.useLayout) {
                    // ищем и вставляем текст HTML страницы useLayout в index.html
                    this.contentPageElement.innerHTML = await fetch(newRoute.useLayout).then(response => response.text());
                    // на полученной странице ищем место для следующей вставки кода
                    contentBlock = document.getElementById('content-layout');
                    //         document.body.classList.add('sidebar-mini');
                    //         document.body.classList.add('layout-fixed');
                    //         this.activateMenuItem(newRoute);
                } else {
                    //         document.body.classList.remove('sidebar-mini');
                    //         document.body.classList.remove('layout-fixed');
                }
                // ищем и вставляем основной текст HTML открываемой страницы из filePathTemplate в index.html
                contentBlock.innerHTML = await fetch(newRoute.filePathTemplate).then(response => response.text());
                //

            }
            //
            // выполняем скрипт, необходимый для работы данной страницы
            if (newRoute.load && typeof newRoute.load === 'function') {
                newRoute.load();
            }

        } else {
            // если route не найден
            window.location = '/404';
            history.pushState({}, '', '/404');// позволяет изменить URL без перезагрузки и добавить новую запись в историю браузера
            await this.activateRoute();
        }
    }
}