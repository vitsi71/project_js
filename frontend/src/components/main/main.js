import {DebitPie} from "./debit-pie";
import {CreditPie} from "./credit-pie";


export class Main {
    constructor() {
     new DebitPie();
     new CreditPie();
     this.main_link=document.getElementById('main_link');
        this.main_link.classList.add('active');
        this.main_link.classList.remove('link-dark');
    }
}