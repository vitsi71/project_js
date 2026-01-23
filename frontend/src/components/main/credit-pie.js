import Chart from 'chart.js/auto'

export class CreditPie {
    constructor() {


        function getRandomColorRGB() {
            const r = Math.floor(Math.random() * Math.random() * 256); // Случайное значение от 0 до 255
            const g = Math.floor(Math.random() / Math.random() * Math.random() * 256); // Случайное значение от 0 до 255
            const b = Math.floor(Math.random() * Math.random() * 256); // Случайное значение от 0 до 255
            return `rgb(${r}, ${g}, ${b})`; // Возврат цвета в формате rgb(r, g, b)
        }

        (async function () {

            let data = {
                labels: [
                    'Жилье',
                    'Продукты',
                    'Развлечения',
                    'Авто',
                    'Кафе'
                ],
                datasets: [{
                    label: 'Расход',
                    data: [1200,3050,800,2540,1000],

                    backgroundColor: [
                        // 'rgb(52,8,147)',
                        // 'rgb(54, 162, 235)',
                        // 'rgb(255, 205, 86)',
                        // 'rgb(57,220,51)'
                        getRandomColorRGB(),
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
                document.getElementById('credit-pie'),
                {
                    type: 'pie',
                    data: data,

                }
            );
        })();
    }
}