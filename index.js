const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "89e03460f09cfcdbcf5648b034d3209e";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.log(error);
      displayError(error);
    }
  } else {
    displayError("Please Enter A Valid City");
  }
});

//gets weather data
async function getWeatherData(city) {
  const apiUrl = `http://api.weatherapi.com/v1`;
}

//displays weather info
function displayWeatherInfo(data) {}

//gets emjoi for weather
function getWeatherEmoji(weatherId) {}

//message to be displayed in case of error
function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  //adds the css properties to errorDisplay
  errorDisplay.classList.add("errorDisplay");
  //resets card content
  card.textContent = "";
  card.computedStyleMap.display = "flex";
  card.appendChild(errorDisplay);
}
