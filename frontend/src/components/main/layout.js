import {AuthUtils} from "../utils/auth-utils";
import {HttpUtils} from "../utils/http-utils";

export class Layout {
    constructor() {

        this.nav_collapse = document.getElementById('nav-collapse');
        this.btn_category = document.getElementById('btn-category');
        this.btn_category.addEventListener('click', this.borderVisable.bind(this));

        // вставка данных по пользователю из localStorage. JSON.parse преобразует строку JSON в массив
        document.getElementById('user').innerText = JSON.parse(localStorage.userInfo).name;
          this.balance=document.getElementById('balance');
        this.getBalance().then();
         }


    async getBalance(){
        const result = await HttpUtils.request('/balance');
        const response = result.response;
        if (result.error || !response || (response && !response.balance)) {
           alert(' Возникла ошибка при запросе баланса. Обратитесь в поддержку');
        }
        this.balance.value= response.balance +'$';
    }

    borderVisable() {

        if (this.btn_category.getAttribute('aria-expanded') === 'true') {
            this.nav_collapse.classList.add('active');
        } else {
            this.nav_collapse.classList.remove('active');
        }

    }
}