/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js"
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _router_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router.js */ \"./src/router.js\");\n\r\n\r\nclass App {\r\n    constructor() {\r\n        new _router_js__WEBPACK_IMPORTED_MODULE_0__.Router();\r\n    }\r\n}\r\n(new App());\n\n//# sourceURL=webpack://frontend/./src/app.js?\n}");

/***/ },

/***/ "./src/components/login.js"
/*!*********************************!*\
  !*** ./src/components/login.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Login: () => (/* binding */ Login)\n/* harmony export */ });\nclass Login {\r\n    constructor() {\r\n        console.log('Логин');\r\n    }\r\n}\n\n//# sourceURL=webpack://frontend/./src/components/login.js?\n}");

/***/ },

/***/ "./src/components/main.js"
/*!********************************!*\
  !*** ./src/components/main.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Main: () => (/* binding */ Main)\n/* harmony export */ });\nclass Main {\r\n    constructor() {\r\n        console.log('Главная');\r\n    }\r\n}\n\n//# sourceURL=webpack://frontend/./src/components/main.js?\n}");

/***/ },

/***/ "./src/components/sign-up.js"
/*!***********************************!*\
  !*** ./src/components/sign-up.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SignUp: () => (/* binding */ SignUp)\n/* harmony export */ });\nclass SignUp {\r\n    constructor() {\r\n        console.log('Регистрация');\r\n    }\r\n}\n\n//# sourceURL=webpack://frontend/./src/components/sign-up.js?\n}");

/***/ },

/***/ "./src/router.js"
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Router: () => (/* binding */ Router)\n/* harmony export */ });\n/* harmony import */ var _components_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/main.js */ \"./src/components/main.js\");\n/* harmony import */ var _components_sign_up_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/sign-up.js */ \"./src/components/sign-up.js\");\n/* harmony import */ var _components_login_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/login.js */ \"./src/components/login.js\");\n\r\n\r\n\r\n\r\nclass Router {\r\n    constructor() {\r\n\r\n        this.titlePageElement = document.getElementById('title');\r\n        this.contentPageElement = document.getElementById('content');\r\n\r\n        this.initEvents();\r\n        this.routes = [\r\n            {\r\n                route: '/',\r\n                title: 'Главная',\r\n                filePathTemplate: '/templates/pages/main.html',\r\n                useLayout: '/templates/layout.html',\r\n                load: () => {\r\n                    new _components_main_js__WEBPACK_IMPORTED_MODULE_0__.Main();\r\n                    // new Dashboard(this.openNewRoute.bind(this));\r\n                },\r\n                // styles: ['fullcalendar.css'],\r\n                // scripts: ['moment.min.js','moment-ru-locale.js','fullcalendar.js','fullcalendar-ru-locale.js'],\r\n            },\r\n            {\r\n                route: '/404',\r\n                title: 'Страница не найдена',\r\n                filePathTemplate: '/templates/pages/404.html',\r\n                useLayout: false\r\n            },\r\n            {\r\n                route: '/login',\r\n                title: 'Авторизация',\r\n                filePathTemplate: '/templates/pages/auth/login.html',\r\n                load: () => {\r\n                //     document.body.classList.add('login-page');\r\n                //     document.body.style.height = '100vh';\r\n                //     new Login(this.openNewRoute.bind(this));\r\n                    new _components_login_js__WEBPACK_IMPORTED_MODULE_2__.Login();\r\n                },\r\n                // unload: () => {\r\n                //     document.body.classList.remove('login-page');\r\n                //     document.body.style.height = 'auto';\r\n                // },\r\n                // styles: ['icheck-bootstrap.min.css']\r\n            },\r\n            {\r\n                route: '/sign-up',\r\n                title: 'Регистрация',\r\n                filePathTemplate: '/templates/pages/auth/sign-up.html',\r\n                load: () => {\r\n                //     document.body.classList.add('register-page');\r\n                //     document.body.style.height = '100vh';\r\n                //     new SignUp(this.openNewRoute.bind(this));\r\n                    new _components_sign_up_js__WEBPACK_IMPORTED_MODULE_1__.SignUp();\r\n                },\r\n                // unload: () => {\r\n                //     document.body.classList.remove('register-page');\r\n                //     document.body.style.height = 'auto';\r\n                // },\r\n                // styles: ['icheck-bootstrap.min.css']\r\n            },\r\n            // {\r\n            //     route: '/logout',\r\n            //     load: () => {\r\n            //         new Logout(this.openNewRoute.bind(this));\r\n            //     },\r\n            //\r\n            // },\r\n        ]\r\n\r\n    }\r\n\r\n    // инициализация при запуске приложения или переходе по страницам\r\n    initEvents() {\r\n        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));\r\n        window.addEventListener('popstate', this.activateRoute.bind(this));\r\n    }\r\n\r\n   async activateRoute() {\r\n        // определяем открытую страницу\r\n        const urlRoute = window.location.pathname;\r\n        const newRoute = this.routes.find(item => item.route === urlRoute);\r\n\r\n        if (newRoute) {\r\n            // if (newRoute.styles && newRoute.styles.length > 0) {\r\n            //     newRoute.styles.forEach(style => {\r\n            //         FileUtils.loadPageStyle('/css/' + style, this.adminLteStyleElement);\r\n            //     })\r\n            // }\r\n            //\r\n            // if (newRoute.scripts && newRoute.scripts.length > 0) {\r\n            //     for (const script of newRoute.scripts) {\r\n            //         await FileUtils.loadPageScript('/js/' + script); // делается для последовательной загрузки\r\n            //     }\r\n            // }\r\n            //\r\n            if (newRoute.title) {\r\n                this.titlePageElement.innerText = newRoute.title + ' | Фронтенд проект на JS';\r\n            }\r\n\r\n            if (newRoute.filePathTemplate) {\r\n            //\r\n            //     // document.body.className = ''; // очищаем все классы перед загрузкой страницы\r\n            //\r\n            //     let contentBlock = this.contentPageElement;\r\n            //     if (newRoute.useLayout) {\r\n                    this.contentPageElement.innerHTML = await fetch(newRoute.filePathTemplate).then(response => response.text());\r\n                    // this.contentPageElement.innerHTML = await fetch(newRoute.useLayout).then(response => response.text());\r\n                    // contentBlock = document.getElementById('content-layout');\r\n            //         document.body.classList.add('sidebar-mini');\r\n            //         document.body.classList.add('layout-fixed');\r\n            //         this.activateMenuItem(newRoute);\r\n            //     } else {\r\n            //         document.body.classList.remove('sidebar-mini');\r\n            //         document.body.classList.remove('layout-fixed');\r\n            //     }\r\n            //     contentBlock.innerHTML = await fetch(newRoute.filePathTemplate).then(response => response.text());\r\n            //\r\n            }\r\n            //\r\n            //\r\n            if (newRoute.load && typeof newRoute.load === 'function') {\r\n                newRoute.load();\r\n            }\r\n\r\n        } else {\r\n            console.log('No route found');\r\n            window.location = '/404';\r\n            // history.pushState({}, '', '/404');// позволяет изменить URL без перезагрузки и добавить новую запись в историю браузера\r\n            // await this.activateRoute();\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack://frontend/./src/router.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;