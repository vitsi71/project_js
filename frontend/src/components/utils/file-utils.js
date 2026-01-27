export class FileUtils {

    // Промис полной загрузки скрипта
    static loadPageScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;

            script.onload = () => resolve('Script loaded: ' + src);// выполняется после загрузки скрипта, делает задержку в цикле,
            // чтобы скрипты загружались последовательно и небыло ошибок из-за зависимостей библиотек
            script.onerror = () => reject(new Error('Script load error for: ' + src)); // если оштбка загрузки

            document.body.appendChild(script);// вставляем script в body в конец
        });
    }

    static loadPageStyle(src, insertBeforeElement) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = src;
        document.head.insertBefore(link, insertBeforeElement);// вставляем стиль в head перед стилем adminlte.css
    }
// конвертация файла в закодированную строку в формате base64
    static convertFileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error('Can not convert this file')); // если ошибка загрузки

        });
    }

}