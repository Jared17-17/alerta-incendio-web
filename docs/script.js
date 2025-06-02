
const tempEl = document.getElementById('temp');
const humEl = document.getElementById('hum');
const timeEl = document.getElementById('time');

async function fetchData() {
  try {
    const response = await fetch('https://alertaincendio-b946e-default-rtdb.firebaseio.com/clima.json');
    const data = await response.json();
    if (!data || Object.keys(data).length === 0) throw new Error("No hay datos en la base de datos.");

    const last = Object.values(data).pop();
    if (!last || !last.temperatura || !last.humedad || !last.timestamp) throw new Error("Datos incompletos.");

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

setInterval(fetchData, 10000);
fetchData();
