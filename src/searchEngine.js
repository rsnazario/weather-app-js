const key = '7dd12ed8bc61861e26671e1bee6f88de';

const searchEngine = (() => {
  async function searchCurrentGeoWeather(latitude, longitude) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`);
    const result = await response.json();
    result.wind.speed *= 3.6;
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
    result.wind.speed *= 3.6;
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
})();

export default searchEngine;