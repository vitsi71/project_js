
import Chart from "chart.js/auto";

export class DebitPie {
    constructor() {
        // this.labels=[];
        // this.data=[];
        // for (let i = 0; i <initial_data.length ; i++) {
        //     this.labels.push(initial_data[i].category);
        //     this.data.push(initial_data[i].amount);
        // }

// function getRandomColorRGB() {
//     const r = Math.floor((Math.random()+Math.random())*0.5* 256); // Случайное значение от 0 до 255
//     const g = Math.floor((Math.random()+Math.random())*0.5 * 256); // Случайное значение от 0 до 255
//     const b = Math.floor((Math.random()+Math.random())*0.5* 256); // Случайное значение от 0 до 255
//     return `rgb(${r}, ${g}, ${b})`; // Возврат цвета в формате rgb(r, g, b)
// }

        (async function () {
            // let init_labels = [];
            // let init_data = [];
            // for (let i = 0; i < initial_data.length; i++) {
            //     init_labels.push(initial_data[i].category);
            //     init_data.push(initial_data[i].amount);
            // }
            let data = {
                labels: [1,2,3,4],
                datasets: [{
                    label: 'Доход',
                    data: [100,200,300,400,500],


                    backgroundColor: [
                        'rgb(52,8,147)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(57,220,51)',
                        'rgb(225,50,196)',
                        'rgb(42,117,88)',
                        'rgb(248,2,22)'
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