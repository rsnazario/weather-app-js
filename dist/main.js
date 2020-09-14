!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const r="7dd12ed8bc61861e26671e1bee6f88de";((e,t)=>{function n(e){const t=new Date(Date.now()).getDate();return e.list.filter(e=>{const n=new Date(e.dt_txt);if(12===n.getHours()&&n.getDate()>t)return n})}function r(){navigator.geolocation.getCurrentPosition(r=>{!async function(r,a){const c=await e.searchCurrentGeoWeather(r,a);t.setCurrentInformation(c);const o=n(await e.searchGeoForecast(r,a));t.setForecast(o)}(r.coords.latitude,r.coords.longitude)})}async function a(){const a=document.querySelector("input");if(""!==a.value){if(document.getElementById("fahrenheit-scale").classList.contains("active")){document.getElementById("celsius-scale").classList.toggle("active"),document.getElementById("fahrenheit-scale").classList.toggle("active");var c=document.querySelectorAll(".current-scale");for(let e=0;e<c.length;e+=1)c[e].innerHTML="C"}const r=a.value;a.value="";const o=await e.searchCurrentWeather(r);t.setCurrentInformation(o);const i=n(await e.searchForecastWeather(r));t.setForecast(i)}else r()}function c(){if(!document.getElementById("celsius-scale").classList.contains("active")){document.getElementById("celsius-scale").classList.toggle("active"),document.getElementById("fahrenheit-scale").classList.toggle("active");var e=document.querySelectorAll(".current-scale");for(let t=0;t<e.length;t+=1)e[t].innerHTML="C";var n={name:document.querySelector("#city-name > h1").innerHTML,weather:[{description:document.querySelector("#city-description > h1").innerHTML}],wind:{speed:document.getElementById("current-wind").innerHTML},main:{temp:5*(parseFloat(document.getElementById("current-temp").innerHTML)-32)/9,temp_max:5*(parseFloat(document.getElementById("max-temp").innerHTML)-32)/9,temp_min:5*(parseFloat(document.getElementById("min-temp").innerHTML)-32)/9,feels_like:document.getElementById("current-feels").innerHTML}};t.setCurrentInformation(n);var r=[];for(let e=0;e<=3;e+=1){let t={weather:[{description:document.getElementById("expect-"+e).innerHTML}],main:{temp:5*(parseFloat(document.getElementById("tmax-"+e).innerHTML)-32)/9}};r.push(t)}t.updateForecast(r)}}function o(){if(!document.getElementById("fahrenheit-scale").classList.contains("active")){document.getElementById("celsius-scale").classList.toggle("active"),document.getElementById("fahrenheit-scale").classList.toggle("active");var e=document.querySelectorAll(".current-scale");for(let t=0;t<e.length;t+=1)e[t].innerHTML="F";var n={name:document.querySelector("#city-name > h1").innerHTML,weather:[{description:document.querySelector("#city-description > h1").innerHTML}],wind:{speed:document.getElementById("current-wind").innerHTML},main:{temp:9*parseFloat(document.getElementById("current-temp").innerHTML)/5+32,temp_max:9*parseFloat(document.getElementById("max-temp").innerHTML)/5+32,temp_min:9*parseFloat(document.getElementById("min-temp").innerHTML)/5+32,feels_like:document.getElementById("current-feels").innerHTML}};t.setCurrentInformation(n);var r=[];for(let e=0;e<=3;e+=1){let t={weather:[{description:document.getElementById("expect-"+e).innerHTML}],main:{temp:9*parseFloat(document.getElementById("tmax-"+e).innerHTML)/5+32}};r.push(t)}t.updateForecast(r)}}return{init(){document.getElementById("celsius-scale").addEventListener("click",c),document.getElementById("fahrenheit-scale").addEventListener("click",o),document.querySelector("button").addEventListener("click",a),document.addEventListener("keypress",e=>{13===e.keyCode&&a()}),r()}}})({searchCurrentGeoWeather:async function(e,t){const n=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${e}&lon=${t}&units=metric&appid=${r}`),a=await n.json();return a.wind.speed*=3.6,a},searchGeoForecast:async function(e,t){const n=await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${e}&lon=${t}&units=metric&appid=${r}`);return await n.json()},searchCurrentWeather:async function(e){const t=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e}&units=metric&appid=${r}`),n=await t.json();return n.wind.speed*=3.6,n},searchForecastWeather:async function(e){const t=await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${e}&units=metric&appid=${r}`);return await t.json()}},{setCurrentInformation:function(e){var t,n,r,a,c,o;t=e.name,document.querySelector("#city-name > h1").innerHTML=t.toUpperCase(),n=e.weather[0].description,document.querySelector("#city-description > h1").innerHTML=n.toUpperCase(),r=e.main.temp,document.getElementById("current-temp").textContent=r.toFixed(2),function(e){document.getElementById("current-feels").innerHTML=Math.round(e)}(e.main.feels_like),a=e.wind.speed,document.getElementById("current-wind").innerHTML=Math.round(a),c=e.main.temp_min,o=e.main.temp_max,document.getElementById("min-temp").innerHTML=Math.floor(c),document.getElementById("max-temp").innerHTML=Math.ceil(o)},setForecast:function(e){const t=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];for(let n=0;n<=3;n+=1){const r=new Date(e[n].dt_txt).getDay();document.getElementById("weekday-"+n).innerHTML=t[r],document.getElementById("tmax-"+n).innerHTML=Math.round(e[n].main.temp),document.getElementById("expect-"+n).innerHTML=e[n].weather[0].description}},updateForecast:function(e){for(let t=0;t<=3;t+=1)document.getElementById("tmax-"+t).innerHTML=Math.round(e[t].main.temp),document.getElementById("expect-"+t).innerHTML=e[t].weather[0].description}}).init()}]);