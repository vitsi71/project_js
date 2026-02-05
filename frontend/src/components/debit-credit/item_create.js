import {AuthUtils} from "../utils/auth-utils";
import {Layout} from "../main/layout";
import {HttpUtils} from "../utils/http-utils";

export class Item_create {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        // проверяем, была ли сделана авторизация. Если  нет accessToken или refreshToken - открываем страницу login
        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute('login');
        }
        new Layout(this.openNewRoute);

        this.debit_credit_link=document.getElementById('debit_credit_link');
        this.debit_credit_link.classList.add('active');
        this.debit_credit_link.classList.remove('link-dark');

        const urlParams = new URLSearchParams(window.location.search);// получение параметров из URL
        this.type = urlParams.get('type');
        this.selectType = document.getElementById('select_type');
        this.selectCategory = document.getElementById('select_category');
        this.amountOperation = document.getElementById('amount_operation');
        this.dateOperation = document.getElementById('date_operation');
        this.commentOperation = document.getElementById('comment_operation');
        this.val = 0;
        this.saveButton = document.getElementById('save_btn')

        this.createOperation().then();
    }

    async createOperation() {
          // устанавливаем полученнай тип операции

        if (this.type === 'expense') {
            document.getElementById('select_credit').selected = true;
        } else {
            document.getElementById('select_debit').selected = true;
        }
        this.selectType.addEventListener('change',()=>this.getCategory(this.selectType.value).then());
        // устанавливаем полученную категорию операции
        this.getCategory(this.selectType.value).then();
        // устанавливаем сумму
        this.amountOperation.addEventListener('focusin', () => {
            this.amountOperation.type = 'number';
        })
        this.amountOperation.addEventListener('focusout', () => {
            this.val = this.amountOperation.value;
            this.amountOperation.type = 'text';
            this.amountOperation.value = this.val + '$';
        })
        //устанавливаем дату
        this.dateOperation.value = new Date().toISOString().split('T')[0];
        this.dateOperation.addEventListener('focusin', () => this.dateOperation.classList.remove('no-icon'));
        this.dateOperation.addEventListener('focusout', () => this.dateOperation.classList.add('no-icon'));
             // обработчик кнопки Сохранить
        this.saveButton.addEventListener('click', async () => {
            // валидация полей
            let amountValid = this.validateForm(this.amountOperation);
            let dateValid = this.validateForm(this.dateOperation);
            let commentValid = this.validateForm(this.commentOperation);

            if (amountValid && dateValid && commentValid) {
                const result = await HttpUtils.request('/operations','POST',true,
                    {
                        "type": this.selectType.value,
                        "amount": Number(this.val),
                        "date": this.dateOperation.value,
                        "comment": this.commentOperation.value,
                        "category_id": Number(this.selectCategory.value)});
                if (result.redirect) {
                    return this.openNewRoute(result.redirect);
                }
                const response = result.response;
                if (result.error || !response) {
                    return alert(' Возникла ошибка при создании операции. Обратитесь в поддержку');
                }
                this.openNewRoute('debit_credit');
            }
        })
    }

    validateForm(Element) {
        let isValid = true;
        console.log(Element.value);
        if (Element.value && !(Element.value === '$')) {
            Element.classList.remove('is-invalid');
        } else {
            Element.classList.add('is-invalid');
            isValid = false;
        }
        return isValid;
    }

    //запрос уже созданных категорий расходов
    async getCategory(typeCategory) {
        //сброс всех категорий перед обновлением
        this.selectCategory.options.length = 0;
        const result = await HttpUtils.request('/categories/' + typeCategory);
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        const response = result.response;
        if (result.error || !response) {
            return alert(' Возникла ошибка при запросе категорий. Обратитесь в поддержку');
        }
        for (let i = 0; i < response.length; i++) {
            const option = new Option(response[i].title, response[i].id);
            this.selectCategory.add(option);
          }
    }

}