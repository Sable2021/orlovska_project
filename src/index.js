let tempC = 19;
function formatData(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let currentWeekDay = days[date.getDay()];
  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let formatedData = `${currentWeekDay} ${currentHours}:${currentMinutes}`;
  return formatedData;
}

let currentDay = document.querySelector("li #current-data");
currentDay.innerHTML = formatData(new Date());

function showTemperature(response) {
  console.log(response.data);
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = city;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = temperature;
  let description = response.data.weather[0].description;
  let descrElement = document.querySelector("#description");
  descrElement.innerHTML = description;
  let windSpeed = response.data.wind.speed;
  let wind = document.querySelector("#wind");
  wind.innerHTML = windSpeed;
  let humid = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = humid;
}

function getCity(event) {
  event.preventDefault();
  let cityValue = document.querySelector("#type-city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = cityValue.value;
  let city = cityValue.value;
  let apiKey = "bc2cd97eaa209e7d22d8f3c84081655f";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(position) {
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

function showCurrentLocation(position) {
  let apiKey = "bc2cd97eaa209e7d22d8f3c84081655f";
  let unit = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}

let formSearch = document.querySelector(".search-form");
formSearch.addEventListener("submit", getCity);

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getCurrentPosition);
