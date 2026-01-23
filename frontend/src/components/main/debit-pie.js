
import Chart from "chart.js/auto";

export class DebitPie {
    constructor() {

function getRandomColorRGB() {
    const r = Math.floor((Math.random()+Math.random())*0.5* 256); // Случайное значение от 0 до 255
    const g = Math.floor((Math.random()+Math.random())*0.5 * 256); // Случайное значение от 0 до 255
    const b = Math.floor((Math.random()+Math.random())*0.5* 256); // Случайное значение от 0 до 255
    return `rgb(${r}, ${g}, ${b})`; // Возврат цвета в формате rgb(r, g, b)
}

(async function() {

    const data = {
        labels: [
            'Зарплата',
            'Инвестиции',
            'Депозиты',
            'Продажи',
            'Сбережения'
        ],
        datasets: [{
            label: 'Доход',
            data: [1000, 2050, 1000, 2050, 1000, 2050, 1200],

            backgroundColor: [
                getRandomColorRGB(),
                getRandomColorRGB(),
                getRandomColorRGB(),
                getRandomColorRGB(),
                getRandomColorRGB(),
                getRandomColorRGB(),
                getRandomColorRGB()
            ],
            hoverOffset: 5
        }]
    };
    new Chart(
        document.getElementById('debit-pie'),
        {
            type: 'pie',
            data: data,
                   }
    );
})();

    }
}