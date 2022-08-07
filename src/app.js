function formatDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let dayIndex = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[dayIndex];

  return `${day}, ${hours}:${minutes}`;
}
let dateElement = document.querySelector("#day");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function displayWeather(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#description").innerHTML = response.data.weather[0].main;
    document.querySelector("#icon").setAttribute("src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);
  }
  
  function newCity(event) {
    event.preventDefault();
    let apiKey = "ee99798ae127a8c0919105d66f5a9bfd";
    let city = document.querySelector("#city-input").value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }
 
 let currentCity = document.querySelector("#search-form");
  currentCity.addEventListener("submit", newCity);

  function displayForecast() {
    let forecastElement = document.querySelector("#fore");
    let days = ["Sun", "Mon", "Tue", "Wed"];
    let forecastHTML = `<div class = "row">`;
    days.forEach(function (day) {
    forecastHTML = forecastHTML + `
    <div class="col-2">
      <div class="weather-forecast-date">${day}</div>
      <img
        src="http://openweathermap.org/img/wn/50d@2x.png"
        alt=""
        width="42"
      />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max"> 18° </span>
        <span class="weather-forecast-temperature-min"> 12° </span>
      </div>
    </div>
`;
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
    
  }
  displayForecast();
  