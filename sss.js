document.addEventListener('DOMContentLoaded', () => {
    // Endpoint para obtener datos de la API Node
    const apiUrl = 'http://localhost:3000';

    // Función para hacer una solicitud a la API
    async function fetchData(endpoint) {
        const response = await fetch(`${apiUrl}/${endpoint}`);
        const data = await response.json();
        return data;
    }

    // Función para crear un gráfico circular
    async function createCircularChart() {
        const data = await fetchData('api/productos-cantidad');
        console.log(data)
        new Chart(document.getElementById('circular'), {
            type: 'doughnut',
            data: {
                labels: data.map(item => item.ProductName),
                datasets: [{
                    label: 'Total',
                    data: data.map(item => item.TotalQuantity),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }

    // Función para crear un gráfico de barras
    async function createBarChart() {
        const data = await fetchData('api/productos-ratings');

        new Chart(document.getElementById('barras'), {
            type: 'bar',
            data: {
                labels: data.map(item => item.ProductName),
                datasets: [{
                    label: 'Rating',
                    data: data.map(item => item.Rating),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Función para crear un gráfico polar
    async function createPolarChart() {
        const data = await fetchData('api/productos-mas-vendidos');
        console.log()
        new Chart(document.getElementById('polar'), {
            type: 'polarArea',
            data: {
                labels: data.map(item => item.ProductName),
                datasets: [{
                    label: 'Cantidades',
                    data: data.map(item => item.StandardCost),
                    backgroundColor: ['rgb(255, 99, 132)', 'rgb(75, 192, 192)', 'rgb(255, 205, 86)', 'rgb(201, 203, 207)', 'rgb(54, 162, 235)']
                }]
            },
            options: {}
        });
    }

    // Función para crear un gráfico de barras (pro)
    async function createBarProChart() {
        const data = await fetchData('api/productos-costos');

        new Chart(document.getElementById('barrasProDos'), {
            type: 'bar',
            data: {
                labels: data.map(item => item.Name),
                datasets: [{
                    label: 'StandardCost',
                    data: data.map(item => item.StandardCost),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Llamar a las funciones para crear los gráficos
    createCircularChart();
    createBarChart();
    createPolarChart();
    createBarProChart();
});
