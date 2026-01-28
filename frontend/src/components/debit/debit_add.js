import {AuthUtils} from "../utils/auth-utils";
import {Layout} from "../main/layout";

export class Debit_add {
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
    }
}