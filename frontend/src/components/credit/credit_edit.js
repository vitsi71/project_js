export class Credit_edit {
    constructor() {
        document.getElementById('credit_link').classList.add('active');
        document.getElementById('btn-category').classList.add('active');
        document.getElementById('home-collapse').classList.add('show');
        document.getElementById('nav-collapse').classList.add('active');
        const urlParams=new URLSearchParams(window.location.search);// получение параметров из URL
        const name=urlParams.get('name');
        document.getElementById('credit_edit_name').value=name;
    }
}