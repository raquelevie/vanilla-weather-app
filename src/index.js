function showTemperature(response) {
  celsiusTemp = response.data.main.temp;
  let temperature = Math.round(celsiusTemp);
  let currentHumidity = response.data.main.humidity;
  let currentWind = response.data.wind.speed;
  let currentIcon = document.querySelector("#icon");
  let currentDescription = document.querySelector("#description");

  cityName.innerHTML = `${searchName.value}`;
  currentDescription.innerHTML = `${response.data.weather[0].description}`;
  currentTemp.innerHTML = `${temperature}`;
  hum.innerHTML = `${currentHumidity}`;
  win.innerHTML = `${currentWind}`;
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentIcon.setAttribute("alt", response.data.weather[0].description);
}
function showPosition(position) {
  axios
    .get(
      `${apiUrl}lon=${position.coords.longitude}&lat=${position.coords.latitude}&appid=${apiKey}&units=metric`
    )
    .then(showTemperature);
}

function search(event) {
  event.preventDefault();

  axios
    .get(`${apiUrl}q=${searchName.value}&appid=${apiKey}&units=metric`)
    .then(showTemperature);
}
function current(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
navigator.geolocation.getCurrentPosition(showPosition);
function currentTime() {
  let now = new Date();
  let currentDay = now.getDay();
  let Days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = Days[currentDay];
  let currentMinute = `${now.getMinutes()}`.padStart(2, "0");
  let currentHour = now.getHours();
  dateTime.innerHTML = `${day} ${currentHour}:${currentMinute}`;
}
function convertFahrenheit(event) {
  event.addEventListener;
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  currentTemp.innerHTML = `${fahrenheitTemp}`;
}
function convertCelsius(event) {
  event.addEventListener;
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  currentTemp.innerHTML = `${Math.round(celsiusTemp)}`;
}
let cityName = document.querySelector("#city");
let searchName = document.querySelector("#city-input");
let hum = document.querySelector("#humidity");
let win = document.querySelector("#wind");
let searchCity = document.querySelector("#search-form");
let currentCity = document.querySelector("#current-location-button");
let celsiusTemp = null;

searchCity.addEventListener("submit", search);
currentCity.addEventListener("click", current);
fahrenheit.addEventListener("click", convertFahrenheit);
celsius.addEventListener("click", convertCelsius);
let dateTime = document.querySelector("#date");
currentTime();
let currentTemp = document.querySelector("#temperature");

let apiKey = "adb7ae5bb76c11b5c643833eb2dfec01";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
