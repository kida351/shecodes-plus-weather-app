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
if (theHours < 10) {
  theTime.innerHTML = `0${theHours}`;
}
let theMinutes = dateTime.getMinutes();
if (theMinutes < 10) {
  theTime.innerHTML = `0${theMinutes}`;
}
theDate.innerHTML = `${theDay}`;
theTime.innerHTML = `${theHours}:${theMinutes}`;

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("h1");
  let cityInput = document.querySelector("#city-input");
  city.innerHTML = cityInput.value;
}
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", changeCity);

//api
function citySearch(event) {
  event.preventDefault();
  let name = document.querySelector("#city-input").value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${name}&key=7ftb31c6ca144ob050a59fada87fc0d7&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}
let cityForm2 = document.querySelector("#city-form");
cityForm2.addEventListener("submit", citySearch);

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
}
