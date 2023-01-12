let dateTime = new Date();
let theDate = document.querySelector("#week-day");
let theTime = document.querySelector("#time-of-day");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let theDay = days[dateTime.getDay()];
let theHours = dateTime.getHours();
let theMinutes = dateTime.getMinutes();
theDate.innerHTML = `${theDay}`;
theTime.innerHTML = `${theHours}:${theMinutes}`;
if (theMinutes < 10) {
  theTime.innerHTML = `${theHours}:0${theMinutes}`;
}

function citySearch(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=7ftb31c6ca144ob050a59fada87fc0d7&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}
function whenSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("h1");
  let cityInput = document.querySelector("#city-input");
  city.innerHTML = cityInput.value;
  citySearch(cityInput.value);
}
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", whenSubmit);
citySearch("Toronto");

function showTemperature(response) {
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#city-input").innerHTML = response.data.name;
  document.querySelector("h5").innerHTML = response.data.condition.description;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.temperature.feels_like
  );
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#big-icon")
    .setAttribute("src", response.data.condition.icon_url);

  getForecast(response.data.coordinates);
}

//forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastHTML = `<div class="col align-self-end">`;
  let forecastElement = document.querySelector("#forecast");
  forecast.forEach(function (forecastDay, index) {
    if (index < 3) {
      forecastHTML =
        forecastHTML +
        `<span class="days-of-week" id="forecast">
  <div class="row">
    <div class="col-sm">
      <img
          alt="icon"
          class="small-icon"
          id="small-icon"
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"
          />
    </div>
    <header class="col-sm-2">${formatDay(forecastDay.time)}</header>
  </div>
  <div class="row">
    <section class="col-sm-10">${Math.round(
      forecastDay.temperature.maximum
    )}° / ${Math.round(forecastDay.temperature.minimum)}°</section>
    </div>
  </span>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//forecast api
function getForecast(coordinates) {
  let apikey = "7ftb31c6ca144ob050a59fada87fc0d7";
  let apiurl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apikey}&unit=metric`;
  axios.get(apiurl).then(displayForecast);
}
