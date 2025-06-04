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
  let date = new Date(response.time * 1000);
  let currentHumidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");

  cityElement.innerHTML = response.data.city;
  currentTemperature.innerHTML = temperature;
  descriptionElement.innerHTML = response.data.condition.description;
  currentDateElement.innerHTML = formatDate(date);
  currentHumidity.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeed.innerHTML = `${response.data.wind.speed}km/h`;

}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

searchCity("Paris");