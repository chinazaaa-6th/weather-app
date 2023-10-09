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
