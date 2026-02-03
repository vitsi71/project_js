import {AuthUtils} from "../utils/auth-utils";
import {Layout} from "../main/layout";
import {HttpUtils} from "../utils/http-utils";

export class Debit_add {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        // проверяем, была ли сделана авторизация. Если  нет accessToken или refreshToken - открываем страницу login
        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute('login');
        }
        new Layout(this.openNewRoute);

        document.getElementById('debit_link').classList.add('active');
        document.getElementById('btn-category').classList.add('active');
        document.getElementById('home-collapse').classList.add('show');
        document.getElementById('nav-collapse').classList.add('active');

        this.input = document.getElementById('debit_add_name');
        this.addCategory().then();
    }

    async addCategory() {
        const result = await HttpUtils.request('/categories/income/');
        const response = result.response;
        if (result.error || !response) {
            return alert(' Возникла ошибка при запросе категорий доходов Обратитесь в поддержку');
        }
        const categoryName = [];
        for (let i = 0; i < response.length; i++) {
            categoryName.push(response[i].title.toLowerCase().trim());
        }
        document.getElementById('save_btn').addEventListener('click', () => this.saveChange(categoryName));
    }

    async saveChange(categoryName) {
        // валидация поля ввода
        if (!this.input.value) {
            return this.input.classList.add('is-invalid');
        }
        this.input.classList.remove('is-invalid');

        //проверка на наличие
        if (categoryName.includes(this.input.value.toLowerCase().trim())) {
            console.log('Категория есть');

        } else {
            //делаем название категории с большой буквы
            const inputText = this.input.value.charAt(0).toUpperCase() + this.input.value.trim().slice(1);
            await HttpUtils.request('/categories/income', 'POST', true, {"title": inputText});
        }
        this.openNewRoute('debit');
    }
}