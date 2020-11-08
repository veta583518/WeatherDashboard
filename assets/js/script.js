var searchFormEl = document.querySelector("#search-form")
var searchContainerEl = document.querySelector("#search-container");
var weatherContainerEl = document.querySelector("#weather-container");
var forecastContainerEl = document.querySelector("#forecast-container");
var cityNameEl = document.querySelector("#city-search-term");
var cityInputEl = document.querySelector("#city");
// var todayTempEl = document.querySelector("today-temp");
// var todayHumidEl = document.querySelector("today-humid");
// var todayWindEl = document.querySelector("#today-wind");
// var todayUVEl = document.querySelector("#today-uv");
// var weatherIconEl = document.querySelector("weather-icon");
// var today = document.querySelector("#date");
var apiKey = "046545aeeb89e20c575047e9c9e759c5";

var getWeather = function (city) {
  // create variable to hold current weather api URL
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=Memphis&unit=imperial&appid=" +
    apiKey;
  // make a request to the url
  fetch(apiUrl).then(function (response) {

    // request was successful
    if(response.ok) {

      // format response as json()
      response.json().then(function (data) {
        console.log(city);
      });
   }
    else {
      alert("Error:" + response.statusText);
    }
  })
  // 
  .catch(function (error) {
    alert("Unable to connect to Open Weather");
  });
};
// get the value of the form <input> element and send it to getWeather
var formSubmitHandler = function (event) {
  event.preventDefault();

  // get the value from input element
  var cityName = cityInputEl.value.trim();

  //validate if cityName is null
  if(cityName) {

    // if username has value, pass data to getWeather as an argument
    getWeather(cityName);
    console.log(cityName);

    // clear the form
    cityInputEl.value = "";
  } else {
    // if null display alert message
    alert("Please enter a city");
  }
};

// var displayWeather = function(city) {
//   // confirm that api returned weather data
//   if (city.length === 0) {
//     weatherContainerEl.textContent = "No city found by that name.";
//     return;
//   }
//   // clear old content
//   weatherContainerEl.textContent = "";

//   // create <div> to display current weather
//   var weatherEl = document.createElement("div");
//   weatherEl.classList = ("card p-3 border-right-0 border-light");
//   var weatherSpan = document.createElement("span");
//   weatherSpan.textContent = data.name;
//   var temperature = data.temperature;
//   var humidity = data.humidity;
//   var windSpeed = data.wind.speed;

//   console.log(temperature, humidity, windSpeed, UV);
// }
// // create variables to hold the lat and lon coords
// var lat = weatherResponse.coord.lat;
// var lon = weatherResponse.coord.lon;

// // create variable to hold UV Data api Url
// var UVApiUrl =
//   "http://api.openweathermap.org/data/2.5/uvi?lat=" +
//   lat +
//   "&lon=" +
//   lon +
//   "&appid=" +
//   apiKey;

// fetch(UVApiUrl).then(function (uvResponse) {
// // format response as json()
//   uvResponse.json().then(function (uvResponse) {
//     // create variable to hold the forecaste api URL
//     var forecastApiUrl =
//       "https:api.openweathermap.org/data/2.5/forecast?q=Memphis&unit=imperial&appid=" +
//       apiKey;

//     fetch(forecastApiUrl).then(function (forecastResponse) {
//       forecastResponse.json().then(function (forecastdata) {
//         displayWeather(weatherResponse, uvResponse, forecastResponse, city);
//       });
//     });
//   });
// });
// })
getWeather(city);
//searchFormEl.addEventListener("submit", formSubmitHandler);