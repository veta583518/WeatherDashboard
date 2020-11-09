var searchFormEl = document.querySelector("#search-form");
var searchContainerEl = document.querySelector("#search-container");
var weatherContainerEl = document.querySelector("#weather-container");
var forecastContainerEl = document.querySelector("#forecast-container");
var cityNameEl = document.querySelector("#city-search-term");
var cityInputEl = document.querySelector("#city");
var weatherEl = document.createElement("div");
var apiKey = "046545aeeb89e20c575047e9c9e759c5";
var searchHistoryContainer = document.querySelector("#search-history");

var getWeather = async function (city) {
  // create variable to hold current weather api URL
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=" +
    apiKey;
  // make a request to the url
  console.log(apiUrl);
  await fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayWeather(city, data);
    });
  // .catch(function (error) {
  //     console.log("Unable to connect to Open Weather");
  //   });
};
// get the value of the form <input> element and send it to getWeather
var formSubmitHandler = function (event) {
  event.preventDefault();

  // get the value from input element
  var cityName = cityInputEl.value.trim();

  //validate if cityName is null
  if (cityName) {
    // if username has value, pass data to getWeather as an argument
    getWeather(cityName);
    getForecast(cityName);
    //getSearchHistory(cityName);

    // clear the form
    cityInputEl.value = "";
  } else {
    // if null display alert message
    alert("Please enter a city");
  }
};

var displayWeather = function (city, data) {
  // confirm that api returned weather data
  if (city.length === 0) {
    weatherContainerEl.textContent = "No city found by that name.";
    return;
  }
  // clear old content
  weatherContainerEl.textContent = "";

  // set classlist for weatherEl
  weatherEl.classList = "card p-3 border-right-0 border-light m-2";

  // get data for header
  var cityName = city;
  var weatherIcon =
    "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
  var currentDate = moment().format("MM/DD/YYYY");

  // create header element for weather header
  var weatherHeader = document.createElement("h2");
  weatherHeader.textContent = cityName + " " + currentDate + " " + weatherIcon;
  // append Header to div
  weatherEl.innerHTML = `<h2> ${cityName} ${currentDate} <span> <img src = "${weatherIcon}"/> </span></h2>`;

  //display temp
  var temperature = Math.round(data.main.temp) + " °F";
  var tempEl = document.createElement("p");
  tempEl.classList = "flex-row align-right";
  tempEl.textContent = "Temperature: " + temperature;
  //append temp to div
  weatherEl.appendChild(tempEl);

  //display humidity
  var humidity = data.main.humidity;
  var humidityEl = document.createElement("p");
  humidityEl.classList = "flex-row align-right";
  humidityEl.textContent = "Humidity: " + humidity + " %";
  // append humidity to div
  weatherEl.appendChild(humidityEl);

  //display wind speed
  var windSpeed = data.wind.speed;
  var windEl = document.createElement("p");
  windEl.classList = "flex-row align-right";
  windEl.textContent = "Wind Speed: " + windSpeed + " MPH";
  // append wind speed to div
  weatherEl.appendChild(windEl);

  var lat = data.coord.lat;
  var lon = data.coord.lon;
  getUVData(lat, lon);
  // append div to container
  weatherContainerEl.appendChild(weatherEl);
};

var getUVData = function (lat, lon) {
  // create variables to hold the lat and lon coords

  var uvApiUrl =
    "http://api.openweathermap.org/data/2.5/uvi?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    apiKey;

  fetch(uvApiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // display uvData
      var uvText = document.createElement("p");
      uvText.textContent = "UV Index: ";
      var uvEl = document.createElement("p");
      uvEl.innerHTML = `<p id="index">${data.value}</p>`;
      if (data.value >= 11) {
        uvEl.classList = "Extreme rounded";
      } else if (data.value >= 8) {
        uvEl.classList = "very-high rounded";
      } else if (data.value >= 6) {
        uvEl.classList = "high rounded";
      } else {
        uvEl.classList = "moderate rounded";
      }
      uvText.append(uvEl);
      weatherEl.appendChild(uvText);
      weatherContainerEl.appendChild(weatherEl);
    });
};

var getForecast = async function (city) {
  // create variable to hold current weather api URL
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial&appid=" +
    apiKey;
  // make a request to the url
  forecastContainerEl.classList =
    "p-3 m-2 d-flex flex-row justify-content-between";
  var forecastHeading = document.createElement("h3");
  forecastHeading.textContent = "5-Day Forecast:";
  forecastContainerEl.appendChild(forecastHeading);

  await fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var forecast = data.list;
      var htmlcode = "";
      for (var i = 0; i < forecast.length; i = i + 8) {
        htmlcode += `<div class= "bg-primary rounded text-light"> 
        <p> ${moment(forecast[i].dt_txt).format("MM/DD/YYYY")}</p>
        <img src="http://openweathermap.org/img/wn/${
          forecast[i].weather[0].icon
        }@2x.png">
        <p>Temperature: ${Math.round(forecast[i].main.temp)} °F</p>
        <p>Humidity: ${forecast[i].main.humidity} %</p>
        
        </div>`;
      }
      forecastContainerEl.innerHTML = htmlcode;
    });
};
// var getSearchHistory = function(city) {
//   var searchListEl = document.createElement("button");
//   searchListEl.classList = (btn )
// }
searchFormEl.addEventListener("submit", formSubmitHandler);
