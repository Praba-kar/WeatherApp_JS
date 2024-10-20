const apiKey = "773172d76b693f99306e73eb6824abae";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (!response.ok) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();
    console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    data.weather.map((item, index) => {
      if (`images/${item.main}.png`) {
        weatherIcon.src = `images/${item.main}.png`;
        // console.log(weatherIcon.src);
      } else {
        if (!`images/${item.main}.png`) {
          weatherIcon.src = `/images/humidity.png`;
        }
      }
    });
  }
}
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
