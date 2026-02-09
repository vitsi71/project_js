import "./styles/bootstrap.css";
import './styles/style.css'
import './styles/adaptive.css'
import 'bootstrap';
import {Router} from "./router.js";

class App {
    constructor() {
        new Router();
            }
}
(new App());