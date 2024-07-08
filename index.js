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
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please Enter A Valid City");
  }
});

//gets weather data
async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  //   console.log(response);

  // if response if not okay, throw a new error
  // if response is okay return response, convert to json format
  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }
  return await response.json();
}

//displays weather info
function displayWeatherInfo(data) {
  //   console.log(data);
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description }],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descriptionDisplay = document.createElement("p");

  cityDisplay.textContent = city;
  //math to get degrees in F instead of K and rounds num
  tempDisplay.textContent = `${((temp - 273.15) * (9 / 5) + 32).toFixed(1)}°F`;
  humidityDisplay.textContent = `Humidity: ${humidity} %`;
  descriptionDisplay.textContent = description;

  //apply css styling
  cityDisplay.classList.add(".citydisplay");
  tempDisplay.classList.add(".tempDisplay");
  humidityDisplay.classList.add(".humidityDisplay");
  descriptionDisplay.classList.add(".descriptionDisplay");

  //append element to card element
  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descriptionDisplay);
}

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
