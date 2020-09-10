console.log('Application has Started');

const key = '7dd12ed8bc61861e26671e1bee6f88de';
async function gets() {
  console.log('bla');

  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Birigui&units=metric&appid=${key}`);
  const result = await response.json();
  
  console.log(response);
  console.log(result);
}

gets();