const apikey = "f8a9866fc4188bef6a8a29f67c42893a";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?lat=10&lon=25&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apikey}`);

    if (response.status === 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none"; // Hide weather info on error
    } else {
      const data = await response.json();

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°F";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";

      if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "weather-app-img/images/clouds.png";
      } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "weather-app-img/images/clear.png";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "weather-app-img/images/rain.png";
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "weather-app-img/images/drizzle.png";
      } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "weather-app-img/images/mist.png";
      }
      document.querySelector(".weather").style.display = "block"; // Show weather info
      document.querySelector(".error").style.display = "none"; // Hide error message
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    document.querySelector(".error").style.display = "block"; // Display error message if an exception occurs
    document.querySelector(".weather").style.display = "none"; // Hide weather info
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
