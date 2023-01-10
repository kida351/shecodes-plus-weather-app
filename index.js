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
  tempC = response.data.temperature.current;

  document.querySelector("#current-temp").innerHTML = Math.round(tempC);
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
}

//conversion
function displayTempF(event) {
  event.preventDefault();
  tempClink.classList.remove("active");
  tempFlink.classList.add("active");
  let tempF = (tempC * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(tempF);
}

function displayTempC(event) {
  event.preventDefault();
  tempFlink.classList.remove("active");
  tempClink.classList.add("active");
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(tempC);
}

let tempC = null;

let tempFlink = document.querySelector("#tempf-link");
tempFlink.addEventListener("click", displayTempF);

let tempClink = document.querySelector("#tempc-link");
tempClink.addEventListener("click", displayTempC);

//forecast
function displayForecast() {
  let forecastHTML = `<div class="col align-self-end">`;
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thursday", "Friday", "Saturday", "Sunday", "Monday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<span class="days-of-week" id="forecast">
  <div class="row">
    <div class="col-sm">
      <i class="fa-solid fa-cloud small-icon"></i>
    </div>
    <header class="col-sm-2">${day}</header>
  </div>
  <div class="row">
    <section class="col-sm-10">2° / -3°</section>
    </div>
  </span>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
displayForecast();
