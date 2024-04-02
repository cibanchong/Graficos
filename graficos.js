//grafico 1
const xhr1 = new XMLHttpRequest();
xhr1.open("GET", "http://localhost:3000/api/productos-ratings");
xhr1.send();

xhr1.onload = function() {
  if (xhr1.status === 200) {
    const data = JSON.parse(xhr1.responseText); // Usa la variable `data` consistentemente

    const ra = data.map(objeto => objeto.rating);
    const nas = data.map(objeto => objeto.name);

    const circularpro = document.getElementById('barras');
    new Chart(circularpro, {
      type: 'bar',
            data: {
                labels: nas,
                datasets: [{
                    label: 'Rating',
                    data: ra,
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

  } else {
    console.error("Error:", xhr1.status); // Usa xhr3.status en la consola
  }
};

//grafico 2
const xhr2 = new XMLHttpRequest();
xhr2.open("GET", "http://localhost:3000/api/productos-cantidad");
xhr2.send();

xhr2.onload = function() {
  if (xhr2.status === 200) {
    const data = JSON.parse(xhr2.responseText); // Usa la variable `data` consistentemente

    const qua = data.map(objeto => objeto.quantity);
    const na = data.map(objeto => objeto.name);

    const circularpro = document.getElementById('circular');
    new Chart(circularpro, {
      type: 'doughnut',
      data: {
          labels: na,
          datasets: [{
              label: 'Total',
              data: qua,
              borderWidth: 0
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

  } else {
    console.error("Error:", xhr2.status); // Usa xhr3.status en la consola
  }
};



//grafico 3
const xhr3 = new XMLHttpRequest();
xhr3.open("GET", "http://localhost:3000/api/productos-mas-vendidos");
xhr3.send();

xhr3.onload = function() {
  if (xhr3.status === 200) {
    const data = JSON.parse(xhr3.responseText); // Usa la variable `data` consistentemente

    const local = data.map(objeto => objeto.localizacion);
    const cantidad = data.map(objeto => objeto.Quantity);

    const polar = document.getElementById('polar');
    new Chart(polar, {
      type: 'bar',
      data: {
        labels: local, // Usa la variable `data` correcta
        datasets: [{
          label: 'Cantidades',
          data: cantidad,
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(75, 192, 192)', 'rgb(255, 205, 86)', 'rgb(201, 203, 207)', 'rgb(54, 162, 235)']
        }]
      },
      options: {}
    });

  } else {
    console.error("Error:", xhr3.status); // Usa xhr3.status en la consola
  }
};


//grafico 4
const xhr4 = new XMLHttpRequest();
xhr4.open("GET", "http://localhost:3000/api/productos-costos");
xhr4.send();

xhr4.onload = function() {
  if (xhr4.status === 200) {
    const data = JSON.parse(xhr4.responseText);

    // Ahora sí puedes usar map y console.log dentro del onload
    nombre = data.map(objeto => objeto.Name);
    standardCost = data.map(objeto => objeto.StandardCost);
    // Crea el gráfico aquí, después de tener los datos de la API
    const barraspro = document.getElementById('barrasProDos');
    new Chart(barraspro, {
      type: 'bar',
      data: {
        labels: nombre,
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

  } else {
    console.error("Error:", xhr.status);
  }
};
