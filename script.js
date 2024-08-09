let apiKey = "802c9c10be5f7cact2abba03f4270ao2";
let apiUrl = "https://api.shecodes.io/weather/v1/current";

document.getElementById("search-btn").addEventListener("click", function () {
  let city = document.getElementById("city-input").value;
  fetchWeatherData(city);
});

function fetchWeatherData(city) {
  let url = `${apiUrl}?query=${city}&key=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      updateCurrentWeather(data);
      if (data) {
        fetchForecastData(
          data.coordinates.latitude,
          data.coordinates.longitude
        );
      }
    })
    .catch((error) => console.error("Error fetching weather data:", error));
}
function fetchForecastData(lat, lon) {
  let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${lat}&lon=${lon}&key=${apiKey}&units=metric`;
  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      updateForecast(data.daily);
    })
    .catch((error) => console.error("Error fetching forecast data:", error));
}

function updateCurrentWeather(data) {
  document.getElementById("city-name").textContent = data.city;
  document.getElementById("temperature").textContent = `${Math.round(
    data.temperature.current
  )}℃`;
  document.getElementById("condition").textContent = data.condition.description;
  document.getElementById("wind").textContent = `Wind Speed: ${Math.round(
    data.wind.speed
  )} km/h`;
  document.getElementById(
    "humidity"
  ).textContent = `Humidity: ${data.temperature.humidity}%`;
  let datetime = new Date(data.time * 1000);
  document.getElementById("datetime").textContent = datetime.toLocaleString();
  document.getElementById("weather-icon").src = data.condition.icon_url;
}
function updateForecast(daily) {
  let forecastContainer = document.querySelector(".forecast");
  forecastContainer.innerHTML = "";
  daily.slice(0, 5).forEach((day) => {
    let forecastBox = document.createElement("div");

    forecastBox.classList.add("forecast-box");
    let date = new Date(day.time * 1000).toLocaleDateString("en-US", {
      weekday: "short",
    });
    let icon = day.condition.icon_url;
    let tempDay = Math.round(day.temperature.day);
    let tempMin = Math.round(day.temperature.minimum);

    forecastBox.innerHTML = ` <p>${date}</p> <img src="${icon}" alt="Weather icon" /> <p><strong>${tempDay}°</strong>/${tempMin}°</p> `;

    forecastContainer.appendChild(forecastBox);
  });
}
