import {AuthUtils} from "../utils/auth-utils";
import {Layout} from "../main/layout";
import {HttpUtils} from "../utils/http-utils";

export class Debit_credit {
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

        this.getOperations().then()
    }
    async getOperations(){

        const result = await HttpUtils.request('/operations/2');
        console.log(result);

    }


}