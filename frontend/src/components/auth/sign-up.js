import {AuthUtils} from "../utils/auth-utils";
import {HttpUtils} from "../utils/http-utils";
import {Login} from "./login";

export class SignUp {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        // проверяем, была ли сделана авторизация. Если accessTokenKey есть - открываем главную страницу
        if (AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            return this.openNewRoute('/');
        }

        this.nameElement = document.getElementById('name');
        this.lastNameElement = document.getElementById('last-name');
        this.emailElement = document.getElementById('email');
        this.passwordElement = document.getElementById('password');
        this.passwordRepeatElement = document.getElementById('password-repeat');
        this.commonErrorElement = document.getElementById('common-error');

        document.getElementById('process-button').addEventListener('click', this.signUp.bind(this))//bind(this) - чтобы контекст не менялся

    }

    validateForm() {
        let isValid = true;

        if (this.nameElement.value && this.nameElement.value.match(/^[А-ЯЁ][а-яё]+\s*[А-ЯЁёа-я]+$/)) {
            this.nameElement.classList.remove('is-invalid');
        } else {
            this.nameElement.classList.add('is-invalid');
            isValid = false;
        }

        if (this.lastNameElement.value && this.lastNameElement.value.match(/^[А-ЯЁ][а-яё]+\s*[А-ЯЁёа-я]+$/)) {
            this.lastNameElement.classList.remove('is-invalid');
        } else {
            this.lastNameElement.classList.add('is-invalid');
            isValid = false;
        }

        if (this.emailElement.value && this.emailElement.value.match(/^\S+@\S+\.\S+$/)) {
            this.emailElement.classList.remove('is-invalid');
        } else {
            this.emailElement.classList.add('is-invalid');
            isValid = false;
        }

        if (this.passwordElement.value && this.passwordElement.value.match(/^(?=.*\d)(?=.*[A-ZА-Я]).{8,}$/)) {
            this.passwordElement.classList.remove('is-invalid');
        } else {
            this.passwordElement.classList.add('is-invalid');
            isValid = false;
        }

        if (this.passwordRepeatElement.value && this.passwordRepeatElement.value === this.passwordElement.value) {
            this.passwordRepeatElement.classList.remove('is-invalid');
        } else {
            this.passwordRepeatElement.classList.add('is-invalid');
            isValid = false;
        }

        return isValid;
    }

    async signUp() {
        this.commonErrorElement.style.display = 'none';
        if (this.validateForm()) {

            let result = await HttpUtils.request('/signup', 'POST', false, {
                name: this.nameElement.value,
                lastName: this.lastNameElement.value,
                email: this.emailElement.value,
                password: this.passwordElement.value,
                passwordRepeat: this.passwordRepeatElement.value,
            });
            let response = result.response;

            // Проверяем, что регистация прошла успешно
            if (result.error || !response || (response && (!response.user.id || !response.user.name || !response.user.lastName))) {
                this.commonErrorElement.style.display = 'block';
                return;
            }

            // Логинимся созданным пользователем
            result = await HttpUtils.request('/login', 'POST',false, {
                email: this.emailElement.value,
                password: this.passwordElement.value,
                rememberMe: false,
            });
            response = result.response;

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