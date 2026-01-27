export class Credit {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        document.getElementById('credit_link').classList.add('active');
        document.getElementById('btn-category').classList.add('active');
        document.getElementById('home-collapse').classList.add('show');
        document.getElementById('nav-collapse').classList.add('active');

       // this.btn_edit = document.getElementsByClassName('btn_edit');
       //  document.getElementById('updateButton').addEventListener('click', this.updateFreelancer.bind(this));
       //  document.getElementById('btn_edit').addEventListener('click',this.findElements)
       //  this.btn_edit.addEventListener('click',this.findElements)
       // this.findElements();

        document.querySelectorAll('.btn_edit').forEach(el => el.addEventListener('click', () => this.cons(el.parentElement.previousElementSibling.innerText)) );
    }


 cons(data){
     this.openNewRoute('/credit_edit?name=' + data);
 }

}

