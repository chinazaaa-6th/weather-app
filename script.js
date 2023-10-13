let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let year = now.getFullYear();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();
let fullDate = `${date}, ${day} ${month}, ${year}`;
dateElement = document.querySelector("#date");
dateElement.innerHTML = fullDate;

function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let year = now.getFullYear();
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let datee = now.getDate();

  let fullDate = `${day}, ${month} ${datee}, ${year}`;
  return `${day}, ${month} ${datee}, ${year}`;
}

function formateDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showForecast(response) {
  let future = response.data.daily;
  let futureElement = document.querySelector("#future");
  let futureHTML = `<div class="row">`;
  future.forEach(function (futureDay, index) {
    futureHTML =
      futureHTML +
      `<div class="col">
          <div class="forcast-date">${formateDay(
            futureDay.temperature.day
          )}</div>
          <div>
           <img
            src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              futureDay.condition.icon
            }.png"
            alt="clear-sky"
            width="30"
          />
          </div>
          <div class="forcast-temp-max">${Math.round(
            futureDay.temperature.maximum
          )}°C</div>
          <div class="forcast-temp-min">${Math.round(
            futureDay.temperature.minimum
          )}°C</div>
        </div>`;
  });
  futureElement.innerHTML = futureHTML;
  futureHTML = `</div>`;
}

function getForecast(coordinates) {
  let key = "32fob4398470td4a73fb1e1ffb79ad6a";
  let url = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${key}&units=metric`;
  axios.get(url).then(showForecast);
}
function showTemp(response) {
  document.querySelector("#location").innerHTML = response.data.city;
  document.querySelector("#digit").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#humid").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#desc").innerHTML =
    response.data.condition.description;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
  celTemp = response.data.temperature.current;
  getForecast(response.data.coordinates);
}

function getCity(cityy) {
  let key = "32fob4398470td4a73fb1e1ffb79ad6a";
  let url = `https://api.shecodes.io/weather/v1/current?query=${cityy}&key=${key}&units=metric`;
  axios.get(url).then(showTemp);
}

function search(event) {
  event.preventDefault();
  let cityy = document.querySelector("#city-search").value;
  getCity(cityy);
}

function findLocation(position) {
  let key = "32fob4398470td4a73fb1e1ffb79ad6a";
  let url = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${key}&units=metric`;
  axios.get(url).then(showTemp);
}

function getCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

function getFarTemp(event) {
  event.preventDefault();
  let faTemp = (celTemp * 9) / 5 + 32;
  let number = document.querySelector("#digit");
  number.innerHTML = Math.round(faTemp);
}

function getCelTemp(event) {
  event.preventDefault();
  let number = document.querySelector("#digit");
  number.innerHTML = Math.round(celTemp);
}

function getCondition(melbourne) {
  let key = "32fob4398470td4a73fb1e1ffb79ad6a";
  let url = `https://api.shecodes.io/weather/v1/current?query=${Melbourne}&key=${key}&units=metric`;
  axios.get(url).then(showTemp);
}
function showFrequent(event) {
  event.preventDefault();
  melbor = document.querySelector("#location");
  getCondition(melbourne);
}

let celTemp = null;

let searchForm = document.querySelector("#part");
searchForm.addEventListener("submit", search);

let locationBtn = document.querySelector("#current-button");
locationBtn.addEventListener("click", getCurrent);

getCity("Nigeria");

let farLink = document.querySelector("#far");
farLink.addEventListener("click", getFarTemp);

let celLink = document.querySelector("#cel");
celLink.addEventListener("click", getCelTemp);

let melCity = document.querySelector("#mel");
melCity.addEventListener("click", showFrequent);
