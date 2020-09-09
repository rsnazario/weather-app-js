console.log('Application has Started');

async function gets() {
  console.log('bla');

  const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Birigui&appid=7dd12ed8bc61861e26671e1bee6f88de', {mode: 'cors'});
  const result = await response.json();
  document.getElementById('content').innerHTML = result.main.temp;
  console.log(response);
  console.log(result);
}

gets();