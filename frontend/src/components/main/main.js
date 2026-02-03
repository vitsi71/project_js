import {DebitPie} from "./debit-pie";
import {CreditPie} from "./credit-pie";
import {Layout} from "./layout";
import {AuthUtils} from "../utils/auth-utils";


export class Main {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        // проверяем, была ли сделана авторизация. Если  нет accessToken или refreshToken - открываем страницу login
        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute('login');
        }
        new Layout(this.openNewRoute);

        new DebitPie();
     new CreditPie();

     this.main_link=document.getElementById('main_link');
        this.main_link.classList.add('active');
        this.main_link.classList.remove('link-dark');
    }
}