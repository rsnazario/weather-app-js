import searchEngine from './searchEngine';
import UIController from './UIController';

const mainController = ((searcher, displayer) => {
  const forecastFilter = (data) => {
    const today = new Date(Date.now()).getDate();
    // eslint-disable-next-line consistent-return
    const result = data.list.filter(x => { // eslint-disable-line array-callback-return
      const eachOne = new Date(x.dt_txt);
      if (eachOne.getHours() === 12 && eachOne.getDate() > today) return eachOne;
    });
    return result;
  };

  const setLocalWeather = async (latitude, longitude) => {
    const weatherNow = await searcher.searchCurrentGeoWeather(latitude, longitude);
    displayer.setCurrentInformation(weatherNow);

    const forecast = await searcher.searchGeoForecast(latitude, longitude);
    const filteredForecast = forecastFilter(forecast);
    displayer.setForecast(filteredForecast);
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      setLocalWeather(lat, long);
    });
  };

  const triggerSearch = async () => {
    const input = document.querySelector('input');
    if (input.value !== '') {
      if (document.getElementById('fahrenheit-scale').classList.contains('active')) {
        document.getElementById('celsius-scale').classList.toggle('active');
        document.getElementById('fahrenheit-scale').classList.toggle('active');
        const changeScale = document.querySelectorAll('.current-scale');
        for (let i = 0; i < changeScale.length; i += 1) {
          changeScale[i].innerHTML = 'C';
        }
      }
      const val = input.value;
      input.value = '';

      const weatherNow = await searcher.searchCurrentWeather(val);
      displayer.setCurrentInformation(weatherNow);

      const forecast = await searcher.searchForecastWeather(val);
      const filteredForecast = forecastFilter(forecast);
      displayer.setForecast(filteredForecast);
    } else {
      getLocation();
    }
  };

  const convertToCelsius = () => {
    if (!document.getElementById('celsius-scale').classList.contains('active')) {
      document.getElementById('celsius-scale').classList.toggle('active');
      document.getElementById('fahrenheit-scale').classList.toggle('active');

      const changeScale = document.querySelectorAll('.current-scale');
      for (let i = 0; i < changeScale.length; i += 1) {
        changeScale[i].innerHTML = 'C';
      }

      const weatherNow = {
        name: document.querySelector('#city-name > h1').innerHTML,
        weather: [{
          description: document.querySelector('#city-description > h1').innerHTML,
        }],
        wind: {
          speed: document.getElementById('current-wind').innerHTML,
        },
        main: {
          temp: (parseFloat(document.getElementById('current-temp').innerHTML) - 32) / 1.8,
          temp_max: (parseFloat(document.getElementById('max-temp').innerHTML) - 32) / 1.8,
          temp_min: (parseFloat(document.getElementById('min-temp').innerHTML) - 32) / 1.8,
          feels_like: document.getElementById('current-feels').innerHTML,
        },
      };
      displayer.setCurrentInformation(weatherNow);

      const forecast = [];
      for (let i = 0; i <= 3; i += 1) {
        const aux = {
          weather: [{
            description: document.getElementById(`expect-${i}`).innerHTML,
          }],
          main: {
            temp: (parseFloat(document.getElementById(`tmax-${i}`).innerHTML) - 32) / 1.8,
          },
        };
        forecast.push(aux);
      }
      displayer.updateForecast(forecast);
    }
  };

  const convertToFahrenheit = () => {
    if (!document.getElementById('fahrenheit-scale').classList.contains('active')) {
      document.getElementById('celsius-scale').classList.toggle('active');
      document.getElementById('fahrenheit-scale').classList.toggle('active');

      const changeScale = document.querySelectorAll('.current-scale');
      for (let i = 0; i < changeScale.length; i += 1) {
        changeScale[i].innerHTML = 'F';
      }

      const weatherNow = {
        name: document.querySelector('#city-name > h1').innerHTML,
        weather: [{
          description: document.querySelector('#city-description > h1').innerHTML,
        }],
        wind: {
          speed: document.getElementById('current-wind').innerHTML,
        },
        main: {
          temp: parseFloat(document.getElementById('current-temp').innerHTML) * 1.8 + 32,
          temp_max: parseFloat(document.getElementById('max-temp').innerHTML) * 1.8 + 32,
          temp_min: parseFloat(document.getElementById('min-temp').innerHTML) * 1.8 + 32,
          feels_like: document.getElementById('current-feels').innerHTML,
        },
      };
      displayer.setCurrentInformation(weatherNow);

      const forecast = [];
      for (let i = 0; i <= 3; i += 1) {
        const aux = {
          weather: [{
            description: document.getElementById(`expect-${i}`).innerHTML,
          }],
          main: {
            temp: parseFloat(document.getElementById(`tmax-${i}`).innerHTML) * 1.8 + 32,
          },
        };
        forecast.push(aux);
      }
      displayer.updateForecast(forecast);
    }
  };

  const setupEventListeners = () => {
    document.getElementById('celsius-scale').addEventListener('click', convertToCelsius);
    document.getElementById('fahrenheit-scale').addEventListener('click', convertToFahrenheit);
    document.querySelector('button').addEventListener('click', triggerSearch);
    document.addEventListener('keypress', (event) => {
      if (event.keyCode === 13) {
        triggerSearch();
      }
    });
  };

  return {
    init() {
      setupEventListeners();
      getLocation();
    },
  };
})(searchEngine, UIController);

export default mainController;