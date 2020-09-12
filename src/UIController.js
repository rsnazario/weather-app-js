const UIController = (function () {
  function setCityName(name) {
    document.querySelector('#city-name > h1').innerHTML = name.toUpperCase();
  }

  function setDescription(desc) {
    document.querySelector('#city-description > h1').innerHTML = desc.toUpperCase();
  }

  function setCurrentTemp(temp) {
    document.getElementById('current-temp').innerHTML = `${temp}&nbsp &deg;C`;
  }

  function setCurrentFeels(temp) {
    document.getElementById('current-feels').innerHTML = `${Math.round(temp)}&nbsp &deg;C`;
  }

  function setCurrentWind(wind) {
    document.getElementById('current-wind').innerHTML = `${Math.round(3.6 * wind)}&nbsp km/h`;
  }

  function setMaxMinTemps(minTemp, maxTemp) {
    document.getElementById('current-range-temp').innerHTML = `${Math.floor(minTemp)} ~ ${Math.ceil(maxTemp)}&nbsp &deg;C`;
  }

  function setCurrentInformation(data) {
    setCityName(data.name);
    setDescription(data.weather[0].description);
    setCurrentTemp(data.main.temp);
    setCurrentFeels(data.main.feels_like);
    setCurrentWind(data.wind.speed);
    setMaxMinTemps(data.main.temp_min, data.main.temp_max);
  }

  // ------------------------------------------ //

  function setForecast(data) {
    const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (let i = 0; i <= 3; i += 1) {
      const weekDayIndex = new Date(data[i].dt_txt).getDay();
      document.getElementById(`weekday-${i}`).innerHTML = weekDay[weekDayIndex];
      document.getElementById(`tmax-${i}`).innerHTML = `${Math.round(data[i].main.temp)}&nbsp &deg;C`;
      document.getElementById(`expect-${i}`).innerHTML = data[i].weather[0].description;
    }
  }

  return { setCurrentInformation, setForecast };
}());

export default UIController;