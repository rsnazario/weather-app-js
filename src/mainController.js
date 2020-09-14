import searchEngine from './searchEngine';
import UIController from './UIController';

const mainController = ((searcher, displayer) => {
  function forecastFilter(data) {
    const today = new Date(Date.now()).getDate();
    // eslint-disable-next-line consistent-return
    const result = data.list.filter(x => { // eslint-disable-line array-callback-return
      const eachOne = new Date(x.dt_txt);
      if (eachOne.getHours() === 12 && eachOne.getDate() > today) return eachOne;
    });
    return result;
  }

  async function setLocalWeather(latitude, longitude) {
    const weatherNow = await searcher.searchCurrentGeoWeather(latitude, longitude);
    displayer.setCurrentInformation(weatherNow);

    const forecast = await searcher.searchGeoForecast(latitude, longitude);
    const filteredForecast = forecastFilter(forecast);
    displayer.setForecast(filteredForecast);
  }

  function getLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      setLocalWeather(lat, long);
    });
  }

  async function triggerSearch() {
    const bla = document.querySelector('input');
    if (bla.value !== '') {
      const val = bla.value;
      bla.value = '';

      const weatherNow = await searcher.searchCurrentWeather(val);
      displayer.setCurrentInformation(weatherNow);

      const forecast = await searcher.searchForecastWeather(val);
      const filteredForecast = forecastFilter(forecast);
      displayer.setForecast(filteredForecast);
    } else {
      getLocation();
    }
  }

  function convertToCelsius() {
    document.getElementById('celsius-scale').classList.toggle('active');
    document.getElementById('fahrenheit-scale').classList.toggle('active');
  }

  function convertToFahrenheit() {
    document.getElementById('celsius-scale').classList.toggle('active');
    document.getElementById('fahrenheit-scale').classList.toggle('active');
    var data = {
      name: document.querySelector('#city-name > h1').innerHTML,
      weather: [{
        description: document.querySelector('#city-description > h1').innerHTML
      }],
      wind: {
        speed: document.getElementById('current-wind').innerHTML
      },
      main: {
        temp: parseFloat(document.getElementById('current-temp').innerHTML),
        temp_max: 33,
        temp_min: 31,
        feels_like: document.getElementById('current-feels').innerHTML
      }
    }
    displayer.setCurrentInformation(data);
  }

  function setupEventListeners() {
    document.getElementById('celsius-scale').addEventListener('click', convertToCelsius);
    document.getElementById('fahrenheit-scale').addEventListener('click', convertToFahrenheit);
    document.querySelector('button').addEventListener('click', triggerSearch);
    document.addEventListener('keypress', (event) => {
      if (event.keyCode === 13) {
        triggerSearch();
      }
    });
  }

  return {
    init() {
      setupEventListeners();
      getLocation();
    },
  };
})(searchEngine, UIController);

export default mainController;