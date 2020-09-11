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
    document.getElementById('current-range-temp').innerHTML = Math.floor(minTemp) + ' ~ ' + Math.ceil(maxTemp) + '&nbsp &deg;C';
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
    const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for(var i = 0; i <= 3; i++) {
      var weekDayIndex = new Date(data[i].dt_txt).getDay();
      // console.log(test.getDay());
      // console.log(weekDay[weekDayIndex]);
      document.getElementById(`weekday-${i}`).innerHTML = weekDay[weekDayIndex];
      document.getElementById(`tmax-${i}`).innerHTML = Math.round(data[i].main.temp) + '&nbsp &deg;C';
      document.getElementById(`expect-${i}`).innerHTML = data[i].weather[0].description;
    }
  };

  return { setCurrentInformation, setForecast }
})();

var mainController = (function(searcher, displayer) {

  function forecastFilter(data) {
    const today = new Date(Date.now()).getDate();
    const result = data.list.filter(x => {
      let eachOne = new Date(x.dt_txt);
      if (eachOne.getHours() === 12 && eachOne.getDate() > today) {
        return eachOne;
      }
    });
    return result;
  };

  async function triggerSearch() {
    const bla = document.querySelector('input');
    if (bla.value !== '') {
      let val = bla.value;
      bla.value = '';

      let weatherNow = await searcher.searchCurrentWeather(val);
      displayer.setCurrentInformation(weatherNow);

      let forecast = await searcher.searchForecastWeather(val);
      let filteredForecast = forecastFilter(forecast);
      displayer.setForecast(filteredForecast);
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