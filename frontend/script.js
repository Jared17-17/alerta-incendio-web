const apiKey = 'TU_API_KEY_OPENWEATHER';
const ciudad = 'Manzanillo,mx';

const tempSpot = document.getElementById('temp');
const humSpot  = document.getElementById('hum');

async function climaActual() {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`);
  const data = await res.json();
  tempSpot.textContent = data.main.temp;
  humSpot.textContent  = data.main.humidity;
}
await climaActual();     // primera carga
setInterval(climaActual, 60_000); // actualizar cada minuto

/* === Gráfica últimas 7 d === */
const ctx = document.getElementById('grafico');
const labels = [];
const values = [];
const chart = new Chart(ctx,{
  type:'line',
  data:{labels, datasets:[{label:'Temp °C', data:values, borderColor:'#b91c1c', tension:.2}]},
  options:{scales:{y:{beginAtZero:false}}}
});

// Traer datos de Firebase REST (public rules modo demo)
async function loadHistorico(){
  const url = 'https://firestore.googleapis.com/v1/projects/alertaincendio-b946e/databases/(default)/documents/registros';
  const res = await fetch(url);
  const json = await res.json();
  const rows=json.documents||[];
  rows.sort((a,b)=>new Date(a.fields.fecha.stringValue)-new Date(b.fields.fecha.stringValue));
  rows.slice(-168).forEach(doc=>{
    labels.push(new Date(doc.fields.fecha.stringValue).toLocaleTimeString());
    values.push(doc.fields.temperatura.doubleValue||doc.fields.temperatura.integerValue);
  });
  chart.update();
}
loadHistorico();
