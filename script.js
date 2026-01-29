const apiKey = "e2f83a19e08ae6ddda183355c108130d";

const input = document.getElementById("cityInput");
const btn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherInfo = document.getElementById("weatherInfo");
const errorMsg = document.getElementById("errorMsg");

btn.addEventListener("click", getWeather);

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

function getWeather() {
  const city = input.value.trim();

  if (city === "") {
    errorMsg.textContent = "Please enter a city name";
    weatherInfo.style.display = "none";
    return;
  }

  errorMsg.textContent = "";

  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(function (data) {
      showWeather(data);
    })
    .catch(function () {
      errorMsg.textContent = "City not found. Try again.";
      weatherInfo.style.display = "none";
    });
}

function showWeather(data) {
  cityName.textContent = data.name;
  temperature.textContent = `🌡 ${data.main.temp}°C`;
  condition.textContent = `🌥 ${data.weather[0].description}`;
  humidity.textContent = `💧 Humidity: ${data.main.humidity}%`;
  wind.textContent = `🌬 Wind: ${data.wind.speed} km/h`;

  weatherInfo.style.display = "block";
}