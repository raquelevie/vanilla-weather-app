function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentHumidity = response.data.main.humidity;
  let currentWind = response.data.wind.speed;
  let currentIcon = document.querySelector("#icon");
  let currentDescription = document.querySelector("#description");

  //response.data.weather[0].icon;
  console.log(response.data.weather[0].description);

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
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);

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
let cityName = document.querySelector("#city");
console.log(cityName);
let searchName = document.querySelector("#city-input");
let hum = document.querySelector("#humidity");
let win = document.querySelector("#wind");
console.log(hum);
let searchCity = document.querySelector("#search-form");
let currentCity = document.querySelector("#current-location-button");
searchCity.addEventListener("submit", search);
currentCity.addEventListener("click", current);
let dateTime = document.querySelector("#date");
currentTime();
let currentTemp = document.querySelector("#temperature");

let apiKey = "adb7ae5bb76c11b5c643833eb2dfec01";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
