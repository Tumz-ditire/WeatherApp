function searchCity(city) {
  let apiKey = "a6741cd8ft83dffab4c019b9d8327o0d";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dispayTemperature);
}

function search(event) {
  event.preventDefault();

  let searchInputElement = document.querySelector("#search-input");
  searchCity(searchInputElement.value);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[date.getDay()];
  return `${formattedDay} ${hours}:${minutes}`;
}

function dispayTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let currentTemperature = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let currentDateELement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  let currentHumidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let weatherIcon = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  currentTemperature.innerHTML = temperature;
  descriptionElement.innerHTML = response.data.condition.description;
  currentDateELement.innerHTML = formatDate(date);
  currentHumidity.innerHTML = `${response.data.temperature.humidity}% class="current-details`;
  windSpeed.innerHTML = `${response.data.wind.speed}km/h class="current-details`;
  weatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" />`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

searchCity("Paris");