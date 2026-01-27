import {AuthUtils} from "../utils/auth-utils";
import {HttpUtils} from "../utils/http-utils";

export class Login {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        // проверяем, была ли сделана авторизация. Если accessTokenKey есть - открываем главную страницу
        if (AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            return this.openNewRoute('/');
        }

        this.emailElement = document.getElementById('email');
        this.passwordElement = document.getElementById('password');
        this.rememberMeElement = document.getElementById('remember-me');
        this.commonErrorElement = document.getElementById('common-error');

        document.getElementById('process-button').addEventListener('click', this.login.bind(this))//bind(this) - чтобы контекст не менялся

    }

    validateForm() {
        let isValid = true;
        if (this.emailElement.value && this.emailElement.value.match(/^\S+@\S+\.\S+$/)) {
            this.emailElement.classList.remove('is-invalid');
            } else {
            this.emailElement.classList.add('is-invalid');
              isValid = false;
        }
        if (this.passwordElement.value) {
            this.passwordElement.classList.remove('is-invalid');
        } else {
            this.passwordElement.classList.add('is-invalid');
            isValid = false;
        }
        return isValid;
    }


    async login() {
        this.commonErrorElement.style.display = 'none';
        if (this.validateForm()) {
// Передаем параметры для запроса на backend
            const result = await HttpUtils.request('/login', 'POST',false, {
                email: this.emailElement.value,
                password: this.passwordElement.value,
                rememberMe: this.rememberMeElement.checked
            });
            const response = result.response;
// если получили успешный ответ
            if (result.error || !response || (response && (!response.tokens.accessToken || !response.tokens.refreshToken || !response.user.id || !response.user.name || !response.user.lastName))) {
                this.commonErrorElement.style.display = 'block';
                return;
            }
            // записываем данные Токинов в LocalStorage
            AuthUtils.setAuthInfo(response.tokens.accessToken, response.tokens.refreshToken, {id: response.user.id, name: response.user.name + " " + response.user.lastName });

            this.openNewRoute('/');


        }
    }
}