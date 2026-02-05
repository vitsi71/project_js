import {HttpUtils} from "../utils/http-utils";
import config from "../../../config/config";


export class Layout {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.nav_collapse = document.getElementById('nav-collapse');
        this.btn_category = document.getElementById('btn-category');
        this.btn_category.addEventListener('click', this.borderVisable.bind(this));

        this.popupEdit = document.getElementById('popup_edit');
        this.saveButton = document.getElementById('button_popup_save');
        this.cancelButton = document.getElementById('button_popup_cancel');

        // вставка данных по пользователю из localStorage. JSON.parse преобразует строку JSON в массив
        try {
            document.getElementById('user').innerText = JSON.parse(localStorage.userInfo).name;
        } catch (e) {
            document.getElementById('user').innerText ='ошибка запроса';
        }

        this.balance = document.getElementById('balance');
        this.getBalance().then(value => {
            this.balance.value = value + '$';
            this.val = value
        });
        this.balance.addEventListener('focusin', () => this.balance.value = this.val);
        this.balance.addEventListener('focusout', () => this.balanceEdit(this.val));
    }

//запрос баланса
    async getBalance() {
        const result = await HttpUtils.request('/balance');
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        const response = result.response;
        if (result.error || !response) {
            return alert(' Возникла ошибка при запросе баланса. Обратитесь в поддержку');
        }
        return response.balance;
    }

//изменение баланса
    balanceEdit(balance) {
        const newBalance = this.balance.value;

        if (!newBalance || Number(newBalance) === Number(balance)) {
            this.balance.value = balance + '$';
        } else {
            this.popupEdit.classList.remove('d-none');
            document.getElementById('new-balance').innerText = newBalance;
            this.saveButton.addEventListener('click', () => this.editBalance(newBalance));
            this.cancelButton.addEventListener('click', () => {
                this.popupEdit.classList.add('d-none');
                this.balance.value = balance + '$';
            })
        }
    }

    //сохранение измененного баланса
    async editBalance(newBalance) {
        this.popupEdit.classList.add('d-none');
        const result = await HttpUtils.request('/balance', 'PUT', true, {"newBalance": newBalance});
        const response = result.response;
        if (result.error || !response || (response && !response.balance)) {
            return alert(' Возникла ошибка при изменении баланса. Обратитесь в поддержку');
        } else {
            this.balance.value = response.balance + '$';
            this.val = response.balance;
        }

    }

    borderVisable() {

        if (this.btn_category.getAttribute('aria-expanded') === 'true') {
            this.nav_collapse.classList.add('active');
        } else {
            this.nav_collapse.classList.remove('active');
        }

    }
}