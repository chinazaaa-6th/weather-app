function showTemp(response) {
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#digit").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humid").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#desc").innerHTML = response.data.weather[0].main;
}

function getCity(cityy) {
  let key = "7929f1d72d53680bcee6c96f3057b24d";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityy}&APPID=${key}&units=metric`;
  axios.get(url).then(showTemp);
}

function search(event) {
  event.preventDefault();
  let cityy = document.querySelector("#city-search").value;
  getCity(cityy);
}

function findLocation(position) {
  let units = "metric";
  let key = "7929f1d72d53680bcee6c96f3057b24d";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&APPID=${key}&units=metric`;
  axios.get(url).then(showTemp);
}

function getCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}
let searchForm = document.querySelector("#part");
searchForm.addEventListener("submit", search);

let locationBtn = document.querySelector("#current-button");
locationBtn.addEventListener("click", getCurrent);

getCity("Nigeria");
