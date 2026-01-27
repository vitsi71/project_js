export class Layout {
    constructor() {
        this.nav_collapse = document.getElementById('nav-collapse');
        this.btn_category = document.getElementById('btn-category');
        this.btn_category.addEventListener('click', this.borderVisable.bind(this))
        // вставка данных по пользователю из localStorage. JSON.parse преобразует строку JSON в массив
        document.getElementById('user').innerText = JSON.parse(localStorage.userInfo).name;
    }

    borderVisable() {

        if (this.btn_category.getAttribute('aria-expanded') === 'true') {
            this.nav_collapse.classList.add('active');
        } else {
            this.nav_collapse.classList.remove('active');
        }

    }
}