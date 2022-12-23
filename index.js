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

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("h1");
  let cityInput = document.querySelector("#city-input");
  city.innerHTML = cityInput.value;
}
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", changeCity);

//week 5
function citySearch(event) {
  event.preventDefault();
  let apiKey = "bc2cd97eaa209e7d22d8f3c84081655f";
  let name = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}
let cityForm2 = document.querySelector("#city-form");
cityForm2.addEventListener("submit", citySearch);

function showTemperature(response) {
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city-input").innerHTML = response.data.name;
  document.querySelector("h5").innerHTML = response.data.weather[0].description;

  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}
