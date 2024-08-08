document.getElementById("search-btn").addEventListener("click", function () {
  let city = document.getElementById("city-input").value;
  let apiKey = "802c9c10be5f7cact2abba03f4270ao2";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("city-name").textContent = data.city;
      document.getElementById(
        "temperature"
      ).textContent = `${data.temperature.current}℃`;
      document.getElementById("condition").textContent =
        data.condition.description;
      document.querySelector(".weather-info-right img").src =
        data.condition.icon_url;
      document.getElementById(
        "humidity"
      ).innerHTML = `Humidity: <span id="description"><strong>${data.temperature.humidity}%</strong></span>`;
      document.getElementById(
        "wind"
      ).innerHTML = `Wind: <span id="description"><strong>${data.wind.speed} km/h</strong></span>`;
      document.getElementById(
        "datetime"
      ).innerHTML = `Time: <span id="description"><strong>${new Date(
        data.time * 1000
      ).toLocaleTimeString()}</strong></span>`;
    })
    .catch((error) => {
      console.error("Error fetching the weather data:", error);
    });
});

function fetchForecast(city) {
  let apiKey = "802c9c10be5f7cact2abba03f4270ao2";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      let forecastContainer = document.querySelector(".forecast");
      forecastContainer.innerHTML = "";
      data.daily.forEach((day, index) => {
        if (index < 5) {
          forecastContainer.innerHTML += ` <div class="forecast-box"> <p>${new Date(
            day.time * 1000
          ).toLocaleDateString("en-GB", {
            weekday: "short",
          })}</p> <div id="weather-icon"> <img src="${
            day.condition.icon_url
          }" alt="${
            day.condition.description
          }"> </div> <p id="temp"><strong>${day.temperature.maximum.toFixed(
            1
          )}°</strong>/${day.temperature.minimum.toFixed(1)}°</p> </div> `;
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching the forecast data:", error);
    });
}

document.getElementById("search-btn").addEventListener("click", function () {
  const city = document.getElementById("city-input").value;
  fetchCurrentWeather(city);
  fetchForecast(city);
});
