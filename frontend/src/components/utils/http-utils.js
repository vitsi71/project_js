import config from "../../../config/config.js";
import {AuthUtils} from "./auth-utils.js";

export class HttpUtils {

    // шаблон запроса на backend
    static async request(url, method = 'GET', useAuth = true, body = null) {

        const result = {
            error: false,
            response: null
        }


        const params = {
            method: method,
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
        };
        // если требуется авторизация - добавляем в headers accessToken
        let token = null;
        if (useAuth) {
            token = AuthUtils.getAuthInfo(AuthUtils.accessTokenKey);
            if (token) {
                params.headers['x-auth-token'] = token;
            }
        }
        // заполняем данные для запроса
        if (body) {
            params.body = JSON.stringify(body); // JSON.stringify - чтобы не было ошибки в CORS запросе
        }
        // ответ с обработчиком ошибок
        let response = null;
        try {
            response = await fetch(config.api + url, params);
            result.response = await response.json();
        } catch (e) {
            debugger
            result.error = true;
            return result;
        }

        if (response.status < 200 || response.status >= 300) {
            result.error = true;
            if (useAuth && response.status === 401) {
                // 1 - токена нет
                if (!token) {
                    result.redirect = '/login';
                } else {
                    // 2 - токен просрочен
                    const updateTokenResult = await AuthUtils.updateRefreshToken();

                    if(updateTokenResult){
                        //запрос повторно
                        return this.request( url,method,useAuth, body);

                    } else {
                        result.redirect = '/login';
                    }
                }
            }
        }
        return result;
    }
}