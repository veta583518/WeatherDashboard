var searchContainerEl = document.querySelector("#search-container");
var weatherContainerEl = document.querySelector("#weather-container");
var forecastContainerEl = document.querySelector("#forecast-container");
var cityInputEl = document.querySelector("#cityname");

var getCityWeather = function (cities) {
  // format the github api url
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cities +
    "&appid=24ab0f975f1d4b86a57436500d6d9e8b";

  // make a request to the url
  fetch(apiUrl).then(function (response) {
    // if request is successful
   if (response.ok) {
      // format response as json()
      response.json().then(function (data) {
        // send response data to displayWeather()
        console.log(data);
      });
    } else {
      alert("Error:" + response.statusText);
   }
  });
};

var formSubmitHandler = function(event) {
    event.preventDefault();

    // get value from input element
    var cityname = cityInputEl.value.trim();

    //validates if cityname is null
    if (cityname) {
        // if cityname has value pass data from cityname as an argument
        getCityWeather(cityname);
        // clear the form
        cityInputEl.textContent = "";
    } else {
        // if null alert message
        alert("Please enter a city");
    }
};

//Display Weather
var displayWeather = function () {
    // check if api returned any cities
    if(cities.length === 0) {
        weatherContainerEl.textContent = "No cities found with that name";
        return;
    }

    // clear old content
    weatherContainerEl.textContent = "";
    
}

getCityWeather();
