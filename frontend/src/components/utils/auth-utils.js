import config from "../../../config/config";


export class AuthUtils {
    static accessTokenKey = 'accessToken';
    static refreshTokenKey = 'refreshToken';
    static userInfoTokenKey = 'userInfo';
// записываем accessToken, refreshToken и userInfo если есть в localStorage
    static setAuthInfo(accessToken, refreshToken, userInfo = null) {
        debugger
        localStorage.setItem(this.accessTokenKey, accessToken);
        localStorage.setItem(this.refreshTokenKey, refreshToken);
        if (userInfo) {
            localStorage.setItem(this.userInfoTokenKey, JSON.stringify(userInfo));
        }
    }

   // удаляем accessToken, refreshToken и userInfo из localStorage
    static removeAuthInfo() {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
        localStorage.removeItem(this.userInfoTokenKey);
    }

    // получаем ключи
    static getAuthInfo(TokenKey = null) {

        // если запрашиваемый ключ есть среди записанных в localStorage
        if (TokenKey && [this.accessTokenKey, this.refreshTokenKey, this.userInfoTokenKey].includes(TokenKey)) {
            // подтверждаем действительность ключа
            return localStorage.getItem(TokenKey);
        } else {
            return {
                //иначе возвращаем записанные в localStorage ключи
                [this.accessTokenKey]: localStorage.getItem(this.accessTokenKey),
                [this.refreshTokenKey]: localStorage.getItem(this.refreshTokenKey),
                [this.userInfoTokenKey]: localStorage.getItem(this.userInfoTokenKey),
            }
        }
    }

    // обновление Token
    static async updateRefreshToken() {
        let result = false
        const refreshToken = this.getAuthInfo(this.refreshTokenKey);
        //если есть refreshToken в localStorage то делаем запрос на нбновление ключей
        if (refreshToken) {
            const response = await fetch(config.api + '/refresh', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({refreshToken: refreshToken}),
            });

            debugger
            // если получен успешный ответ
            if (response && response.status === 200) {
                // обрабатываем ответ
                const tokens = await response.json();
                if (tokens && !tokens.error) {
                    // записываем новые ключи в localStorage
                    this.setAuthInfo(tokens.accessToken, tokens.refreshToken);
                    result = true;
                }

            }
            if (!result){// очищаем данные если не удалось обновить token
                this.removeAuthInfo();
            }
        }
        return result;
    }
}