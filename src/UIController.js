const UIController = (() => {
  const setCityName = (name) => {
    document.querySelector('#city-name > h1').innerHTML = name.toUpperCase();
  }

  const setDescription = (desc) =>{
    document.querySelector('#city-description > h1').innerHTML = desc.toUpperCase();
  }

  const setCurrentTemp = (temp) => {
    document.getElementById('current-temp').textContent = temp.toFixed(2);
  }

  const setCurrentFeels = (temp) => {
    document.getElementById('current-feels').innerHTML = Math.round(temp);
  }

  const setCurrentWind = (wind) => {
    document.getElementById('current-wind').innerHTML = Math.round(wind);
  }

  const setMaxMinTemps = (minTemp, maxTemp) => {
    document.getElementById('min-temp').innerHTML = Math.floor(minTemp);
    document.getElementById('max-temp').innerHTML = Math.ceil(maxTemp);
  }

  const setCurrentInformation = (data) => {
    setCityName(data.name);
    setDescription(data.weather[0].description);
    setCurrentTemp(data.main.temp);
    setCurrentFeels(data.main.feels_like);
    setCurrentWind(data.wind.speed);
    setMaxMinTemps(data.main.temp_min, data.main.temp_max);
  }

  // ------------------------------------------ //

  const updateForecast = (data) => {
    for (let i = 0; i <= 3; i += 1) {
      document.getElementById(`tmax-${i}`).innerHTML = Math.round(data[i].main.temp);
      document.getElementById(`expect-${i}`).innerHTML = data[i].weather[0].description;
    }
  }

  const setForecast = (data) => {
    const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (let i = 0; i <= 3; i += 1) {
      const weekDayIndex = new Date(data[i].dt_txt).getDay();
      document.getElementById(`weekday-${i}`).innerHTML = weekDay[weekDayIndex];
      document.getElementById(`tmax-${i}`).innerHTML = Math.round(data[i].main.temp);
      document.getElementById(`expect-${i}`).innerHTML = data[i].weather[0].description;
    }
  }

  return { setCurrentInformation, setForecast, updateForecast };
})();

export default UIController;