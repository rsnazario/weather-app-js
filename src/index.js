const key = '7dd12ed8bc61861e26671e1bee6f88de';

var searchEngine = (function() {
  async function searchCurrentWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`)
    const result = await response.json();
    return result;
  };

  async function searchForecastWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${key}`);
    const result = await response.json();
    return result;
  };

  return { searchCurrentWeather, searchForecastWeather };
})();

var UIController = (function () {

  function setCityName(name) {
    document.querySelector('#city-name > h1').innerHTML = name.toUpperCase();
  };

  function setDescription(desc) {
    document.querySelector('#city-description > h1').innerHTML = desc.toUpperCase();
  };

  function setCurrentTemp(temp) {
    document.getElementById('current-temp').innerHTML = temp + '&nbsp &deg;C';
  };

  function setCurrentFeels(temp) {
    document.getElementById('current-feels').innerHTML = Math.round(temp) + '&nbsp &deg;C';
  };

  function setCurrentWind (wind) {
    document.getElementById('current-wind').innerHTML = Math.round(3.6 * wind) + '&nbsp km/h';
  };

  function setMaxMinTemps (minTemp, maxTemp) {
    document.getElementById('current-range-temp').innerHTML = Math.round(minTemp) + ' ~ ' + Math.round(maxTemp) + '&nbsp &deg;C';
  };

  function setCurrentInformation (data) {
    setCityName(data.name);
    setDescription(data.weather[0].description);
    setCurrentTemp(data.main.temp);
    setCurrentFeels(data.main.feels_like);
    setCurrentWind(data.wind.speed);
    setMaxMinTemps(data.main.temp_min, data.main.temp_max);
  };

  // ------------------------------------------ // 

  

  function setForecast (data) {

  };

  return { setCurrentInformation, setForecast }
})();

var mainController = (function(searcher, displayer) {
  async function triggerSearch() {
    const bla = document.querySelector('input');
    if (bla.value !== '') {
      let val = bla.value;
      bla.value = '';
      let weatherNow = await searcher.searchCurrentWeather(val);
      let forecast = await searcher.searchForecastWeather(val);
      console.log(weatherNow);
      console.log(forecast);
      displayer.setCurrentInformation(weatherNow);
      displayer.setForecast(forecast);
    }
    else {
      console.log('empty');
    }
  }

  var setupEventListeners = function() {
    document.querySelector('button').addEventListener('click', triggerSearch);
    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13) {
        triggerSearch();
      }
    });
  };

  return {
    init: function() {
      console.log('Application has Started');
      setupEventListeners();
    }
  }
})(searchEngine, UIController);

mainController.init();