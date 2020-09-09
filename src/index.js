console.log('Application has Started');

async function gets() {
  const result = await fetch('api.openweathermap.org/data/2.5/weather?q=birigui&appid=7dd12ed8bc61861e26671e1bee6f88de', {mode: 'cors'});
  console.log(result);
}
