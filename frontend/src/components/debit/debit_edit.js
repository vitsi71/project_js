import {AuthUtils} from "../utils/auth-utils";
import {Layout} from "../main/layout";
import {HttpUtils} from "../utils/http-utils";

export class Debit_edit {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        // проверяем, была ли сделана авторизация. Если  нет accessToken или refreshToken - открываем страницу login
        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute('login');
        }
        new Layout();

        document.getElementById('debit_link').classList.add('active');
        document.getElementById('btn-category').classList.add('active');
        document.getElementById('home-collapse').classList.add('show');
        document.getElementById('nav-collapse').classList.add('active');

        this.input = document.getElementById('debit_edit_name');
        const urlParams = new URLSearchParams(window.location.search);// получение параметров из URL
        const id = urlParams.get('id');
        this.editCategory(id).then();
    }


    async editCategory(id) {
        const result = await HttpUtils.request('/categories/income/' + id);
        const response = result.response;
        if (result.error || !response || (response && !response.title)) {
            return alert(' Возникла ошибка при запросе категорий доходов Обратитесь в поддержку');
        }
        this.input.value = response.title;
        document.getElementById('save_btn').addEventListener('click',() => this.saveChange(id,response.title));
    }


    async saveChange(id, title) {
        // валидация поля ввода
        if (!this.input.value){
            return this.input.classList.add('is-invalid');
        }
        this.input.classList.remove('is-invalid');
        // проверка на внесение изменений
        if(title.toLowerCase().trim() === this.input.value.toLowerCase().trim()){
            console.log('Изменений нет');

        } else{
            //делаем название категории с большой буквы
            const inputText = this.input.value.charAt(0).toUpperCase() + this.input.value.trim().slice(1);
            await HttpUtils.request('/categories/income/'+id,'PUT',true,{ "title": inputText});
        }
        this.openNewRoute('debit');

    }

}