import {AuthUtils} from "../utils/auth-utils";
import {Layout} from "../main/layout";
import {HttpUtils} from "../utils/http-utils";

export class Debit {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        // проверяем, была ли сделана авторизация. Если  нет accessToken или refreshToken - открываем страницу login
        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute('login');
        }
        new Layout(this.openNewRoute);
        this.popupDelete = document.getElementById('popup_delete');

        document.getElementById('debit_link').classList.add('active');
        document.getElementById('btn-category').classList.add('active');
        document.getElementById('home-collapse').classList.add('show');
        document.getElementById('nav-collapse').classList.add('active');

        this.getDebitCategory().then()
    }

    //запрос уже созданных категорий расходов
    async getDebitCategory() {
        const result = await HttpUtils.request('/categories/income');
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        const response = result.response;
        if (result.error || !response) {
            return alert(' Возникла ошибка при запросе категорий доходов Обратитесь в поддержку');
        }
        this.showDebitCategory(response);
    }

    showDebitCategory(response) {
        const debitCategories = document.getElementById('debit_categories');
        const addCategory = document.getElementById('add_category');


        for (let i = 0; i < response.length; i++) {

            const category = document.createElement('div');
            category.classList.add('content-category-block');

            const title = document.createElement('span');
            title.classList.add('font-m', 'w-100', 'lh-1');
            title.innerText = response[i].title;
            category.appendChild(title);

            const buttonBlock = document.createElement('div');
            category.appendChild(buttonBlock);

            const buttonEdit = document.createElement('a');
            buttonBlock.appendChild(buttonEdit);
            buttonEdit.href = '/debit_edit?id=' + response[i].id;
            buttonEdit.classList.add('btn', 'btn-primary', 'font-m', 'fs-14px', 'px-3');
            buttonEdit.type = 'button';
            buttonEdit.innerText = 'Редактировать';

            const buttonDelete = document.createElement('button');
            buttonBlock.appendChild(buttonDelete);
            buttonDelete.classList.add('btn', 'btn-danger', 'font-m', 'fs-14px', 'px-3', 'ms-2');
            buttonDelete.type = 'button';
            buttonDelete.innerText = 'Удалить';
            buttonDelete.addEventListener('click', () => this.deleteCategory(response[i].id,response[i].title));

            debitCategories.insertBefore(category, addCategory);
        }
    }

    deleteCategory(id,title) {
        this.popupDelete.classList.remove('d-none');
        document.getElementById('text_category').innerText = title;
        document.getElementById('button_popup_cancel').addEventListener('click',()=>this.popupDelete.classList.add('d-none'));
        document.getElementById('button_popup_delete').addEventListener('click', async () => {
            this.popupDelete.classList.add('d-none');
            await HttpUtils.request('/categories/income/'+id,'DELETE');
            this.openNewRoute('debit');
        });
    }




}