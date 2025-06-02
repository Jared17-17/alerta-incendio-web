const tempEl = document.getElementById('temp');
const humEl = document.getElementById('hum');
const timeEl = document.getElementById('time');

// 🔄 Función para actualizar los datos en tiempo real
async function fetchData() {
  try {
    const response = await fetch('https://alertaincendio-b946e.firebaseio.com/clima.json');
    const data = await response.json();
    const last = Object.values(data).pop();

    tempEl.textContent = last.temperatura + " °C";
    humEl.textContent = last.humedad + " %";
    timeEl.textContent = new Date(last.timestamp).toLocaleString();
  } catch (e) {
    tempEl.textContent = "Error";
    humEl.textContent = "Error";
    timeEl.textContent = "Error";
    console.error("Error al consultar Firebase:", e);
  }
}

// ⏱️ Actualiza cada 10 segundos
setInterval(fetchData, 10000);
fetchData();

// 📈 Dibuja la gráfica de temperatura
async function drawChart() {
  try {
    const response = await fetch('https://alertaincendio-b946e.firebaseio.com/clima.json');
    const data = await response.json();
    const values = Object.values(data);
    const labels = values.map(e => new Date(e.timestamp).toLocaleDateString());
    const temps = values.map(e => e.temperatura);

    const ctx = document.getElementById('tempChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Temperatura (°C)',
          data: temps,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    });
  } catch (e) {
    console.error("Error al cargar gráfica:", e);
  }
}

drawChart();
