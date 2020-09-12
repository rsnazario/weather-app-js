const key = '7dd12ed8bc61861e26671e1bee6f88de';

const searchEngine = (function () {
  async function searchCurrentGeoWeather(latitude, longitude) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`);
    const result = await response.json();
    return result;
  }

  async function searchGeoForecast(latitude, longitude) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`);
    const result = await response.json();
    return result;
  }

  async function searchCurrentWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`);
    const result = await response.json();
    return result;
  }

  async function searchForecastWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${key}`);
    const result = await response.json();
    return result;
  }

  return {
    searchCurrentGeoWeather, searchGeoForecast, searchCurrentWeather, searchForecastWeather,
  };
}());

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

const mainController = (function (searcher, displayer) {
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

  function setupEventListeners() {
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
}(searchEngine, UIController));

mainController.init();