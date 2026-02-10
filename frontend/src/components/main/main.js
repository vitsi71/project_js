import {AuthUtils} from "../utils/auth-utils";
import {HttpUtils} from "../utils/http-utils";
import Chart from "chart.js/auto";


export class Main {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        // проверяем, была ли сделана авторизация. Если  нет accessToken или refreshToken - открываем страницу login
        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute('login');
        }

        //построение диаграмм
        this.debitChart = this.initChart('debit-pie');
        this.creditChart = this.initChart('credit-pie');


        this.main_link = document.getElementById('main_link');
        this.main_link.classList.add('active');
        this.main_link.classList.remove('link-dark');

        this.period = '';
        this.dateFrom = document.getElementById('interval_date1');
        this.dateTo = document.getElementById('interval_date2');
        this.dateFrom.value = new Date().toISOString().split('T')[0];
        this.dateTo.value = new Date().toISOString().split('T')[0];

        this.dateFrom.addEventListener('focusin', () => this.dateFrom.classList.remove('no-icon'));
        this.dateTo.addEventListener('focusin', () => this.dateTo.classList.remove('no-icon'));
        this.dateFrom.addEventListener('focusout', () => {
            this.dateFrom.classList.add('no-icon');
            if (this.intervalButton.checked) {
                this.intervalButton.click()
            }
        });
        this.dateTo.addEventListener('focusout', () => {
            this.dateTo.classList.add('no-icon');
            if (this.intervalButton.checked) {
                this.intervalButton.click()
            }
        });

        document.getElementById('today_btn').addEventListener('click', () => {
            this.period = '';
            this.getOperations().then()
        });
        document.getElementById('week_btn').addEventListener('click', () => {
            this.period = 'week';
            this.getOperations().then()
        });
        document.getElementById('week_btn').addEventListener('click', () => {
            this.period = 'week';
            this.getOperations().then()
        });
        document.getElementById('month_btn').addEventListener('click', () => {
            this.period = 'month';
            this.getOperations().then()
        });
        document.getElementById('year_btn').addEventListener('click', () => {
            this.period = 'year';
            this.getOperations().then()
        });
        document.getElementById('all_btn').addEventListener('click', () => {
            this.period = 'all';
            this.getOperations().then()
        });
        this.intervalButton = document.getElementById('interval_btn');
        this.intervalButton.addEventListener('click', () => {
            this.period = 'interval&dateFrom=' + this.dateFrom.value + '&dateTo=' + this.dateTo.value;
            this.getOperations().then()
        });

        this.getOperations().then();
    }

// построение диаграммы
    initChart(canvasId) {
        const chart = new Chart(
            document.getElementById(canvasId),
            {
                type: 'pie',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Доходы',
                        data: [],
                        // data: [],
                        backgroundColor: [
                            this.getRandomColorRGB(),
                            this.getRandomColorRGB(),
                            this.getRandomColorRGB(),
                            this.getRandomColorRGB(),
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)',
                            'rgb(57,220,51)',
                            'rgb(225,50,196)',
                            'rgb(42,117,88)',
                            'rgb(248,2,22)'
                        ],
                        hoverOffset: 5
                    }]
                }
            }
        );
        return chart;
    }

    // запрос операций
    async getOperations() {

        const result = await HttpUtils.request('/operations?period=' + this.period);
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        const response = result.response;
        if (result.error || !response) {
            return alert(' Возникла ошибка при запросе операций. Обратитесь в поддержку');
        }
        this.showOperations(response);
    }

//создание массивов операций по доходам и расходам
    showOperations(response) {
        const operationsDebit = [];
        const operationsCredit = [];

        for (let i = 0; i < response.length; i++) {
            let operation = {};
            operation['category'] = response[i].category ? response[i].category : 'без категории';
            operation['amount'] = response[i].amount;
            if (response[i].type === 'income') {
                let categoryFind = operationsDebit.find(item => item.category === operation.category);
                if (categoryFind) {
                    categoryFind.amount += operation.amount;
                } else {
                    operationsDebit.push(operation);
                }
            } else {
                let categoryFind = operationsCredit.find(item => item.category === operation.category);
                if (categoryFind) {
                    categoryFind.amount += operation.amount;
                } else {
                    operationsCredit.push(operation);
                }
            }
        }

// Обновить диаграмму Доходы
        const debitInfo = document.getElementById('debit_info');
        const debitCanvas = document.getElementById('debit-pie');
        if (operationsDebit.length) {
            debitInfo.classList.add('d-none');
            debitCanvas.classList.remove('d-none');
        } else {
            debitInfo.classList.remove('d-none');
            debitCanvas.classList.add('d-none');
        }
        this.changeData(operationsDebit, this.debitChart);
// Обновить диаграмму Расходы
        const creditInfo = document.getElementById('credit_info');
        const creditCanvas = document.getElementById('credit-pie');
        if (operationsCredit.length) {
            creditInfo.classList.add('d-none');
            creditCanvas.classList.remove('d-none');
        } else {
            creditInfo.classList.remove('d-none');
            creditCanvas.classList.add('d-none');
        }
        this.changeData(operationsCredit, this.creditChart);


    }

// обновление диаграмм
    changeData(initData, diagram) {
        let init_labels = [];
        let init_data = [];
        for (let i = 0; i < initData.length; i++) {
            init_labels.push(initData[i].category);
            init_data.push(initData[i].amount);
        }
        // Обновить метки
        diagram.data.labels = init_labels;
        // Обновить данные
        diagram.data.datasets[0].data = init_data;
        // Обновить диаграмму
        diagram.update();
    }

//рандомайзер цветов для диаграммы
    getRandomColorRGB() {
        const r = Math.floor((Math.random() + Math.random()) * 0.5 * 256); // Случайное значение от 0 до 255
        const g = Math.floor((Math.random() + Math.random()) * 0.5 * 256); // Случайное значение от 0 до 255
        const b = Math.floor((Math.random() + Math.random()) * 0.5 * 256); // Случайное значение от 0 до 255
        return `rgb(${r}, ${g}, ${b})`; // Возврат цвета в формате rgb(r, g, b)
    }

}