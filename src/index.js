const key = '7dd12ed8bc61861e26671e1bee6f88de';

var searchEngine = (function() {
  async function searchWeather(city) {

    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`);
    const result = await response.json();
    
    console.log(result);
  };

  return { searchWeather };
})();
// gets();
// ---------------------------------------------


var mainController = (function(searcher) {

  var triggerSearch = function() {
    const bla = document.querySelector('input');
    if (bla.value !== '') {
      let val = bla.value;
      bla.value = '';
      searcher.searchWeather(val);

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
})(searchEngine);

mainController.init();