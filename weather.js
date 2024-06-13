"use strict";

const API_KEY = "MUOg1WAkG1ebBGH4dTdfemzrw2cfgQ49"; // Your AccuWeather API key

const dayEl = document.querySelector(".default_day");
const dateEl = document.querySelector(".default_date");
const btnEl = document.querySelector(".btn_search");
const inputEl = document.querySelector(".input_field");

const iconsContainer = document.querySelector(".icons");
const dayInfoEl = document.querySelector(".day_info");
const listContentEl = document.querySelector(".list_content ul");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Display the day
const day = new Date();
const dayName = days[day.getDay()];
dayEl.textContent = dayName;

// Display date
let month = day.toLocaleString("default", { month: "long" });
let date = day.getDate();
let year = day.getFullYear();

dateEl.textContent = date + " " + month + " " + year;

// Add event
btnEl.addEventListener("click", (e) => {
  e.preventDefault();

  // Check empty value
  if (inputEl.value !== "") {
    const search = inputEl.value;
    inputEl.value = "";
    findLocation(search);
  } else {
    console.log("Please Enter City or Country Name");
  }
});

// Find location using AccuWeather API

async function findLocation(name) {
  iconsContainer.innerHTML = "";
  dayInfoEl.innerHTML = "";
  listContentEl.innerHTML = "";
  try {
    console.log(`Searching for location: ${name}`);
    const locationAPI = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${name}`;
    const locationData = await fetch(locationAPI);
    const locationResult = await locationData.json();
    console.log('Location Data:', locationResult);

    if (locationResult.length > 0) {
      const locationKey = locationResult[0].Key;

      document.getElementById("location").value = name;
      const weatherAPI = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}&details=true`;
      const weatherData = await fetch(weatherAPI);
      const weatherResult = await weatherData.json();
      console.log('Weather Data:', weatherResult);

      if (weatherResult.length > 0) {
        // Display image content
        const imageContent = displayImageContent(weatherResult[0]);

        // Display right side content
        const rightSide = rightSideContent(locationResult[0], weatherResult[0]);

        // Forecast function
        displayForecast(locationKey);

        setTimeout(() => {
          iconsContainer.insertAdjacentHTML("afterbegin", imageContent);
          iconsContainer.classList.add("fadeIn");
          dayInfoEl.insertAdjacentHTML("afterbegin", rightSide);
        }, 1500);

        // Fetch recipes after displaying weather
        fetchRecipes(weatherResult[0]);
      } else {
        console.log("No weather data found for the location");
      }
    } else {
      const message = `<h2 class="weather_temp">404</h3><h3 class="cloudtxt">Location not found</h3>`;
      iconsContainer.insertAdjacentHTML("afterbegin", message);
    }
  } catch (error) {
    console.error('Error fetching location data:', error);
  }
}

// Display image content and temp
function displayImageContent(data) {
  return `<img src="https://developer.accuweather.com/sites/default/files/${data.WeatherIcon < 10 ? '0' : ''}${data.WeatherIcon}-s.png" alt="" />
    <h2 class="weather_temp">${data.Temperature.Metric.Value}°C</h2>
    <h3 class="cloudtxt">${data.WeatherText}</h3>`;
}

// Display the right side content
function rightSideContent(location, weather) {
  return `<div class="content">
          <p class="title">NAME</p>
          <span class="value">${location.LocalizedName}, ${location.Country.LocalizedName}</span>
        </div>
        <div class="content">
          <p class="title">TEMP</p>
          <span class="value">${weather.Temperature.Metric.Value}°C</span>
        </div>
        `;
}

// Display forecast using AccuWeather API
async function displayForecast(locationKey) {
  try {
    const forecastAPI = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&metric=true`;
    const forecastData = await fetch(forecastAPI);
    const forecastResult = await forecastData.json();
    console.log('Forecast Data:', forecastResult);

    forecastResult.DailyForecasts.forEach((content, indx) => {
      const day = new Date(content.Date).toLocaleDateString('en-US', { weekday: 'long' });
      const condition = content.Day.IconPhrase;
      const icon = content.Day.Icon < 10 ? '0' + content.Day.Icon : content.Day.Icon;
      listContentEl.innerHTML += `<li class="forecast-item">
        <div class="forecast-day">${indx === 0 ? 'TODAY' : day}</div>
        <img src="https://developer.accuweather.com/sites/default/files/${icon}-s.png" alt="${condition}" class="forecast-icon" />
        <div class="forecast-temp">High: ${content.Temperature.Maximum.Value}°C, Low: ${content.Temperature.Minimum.Value}°C</div>
        <div class="forecast-condition">${condition}</div>
      </li>`;
    });
  } catch (error) {
    console.error('Error fetching forecast data:', error);
  }
}

function fetchRecipes(weather) {

  const location = document.getElementById('location').value;
  const weatherCondition = weather.WeatherText.toLowerCase();

  // Map weather conditions to general recipe keywords
  const weatherToRecipeKeyword = {
    clear: "cold",
    sunny: "cold",
    cloudy: "comfort food",
    rain: "soup",
    snow: "soup",
    storm: "comfort food",
    "partly cloudy": "light meal",
    "mostly cloudy": "comfort food",
    "partly sunny": "cold",
    "hazy sunshine": "comfort food",
    overcast: "comfort food",
    fog: "cozy",
    drizzle: "rainy day",
    thunderstorm: "comfort food",
  };

  // Find the keyword to use for the recipe search
  let recipeKeyword = weatherToRecipeKeyword[weatherCondition] || "dinner";

  console.log(`Fetching recipes for weather condition: ${weatherCondition}, using keyword: ${recipeKeyword}`); // Log the weather condition and keyword
  getRecipes(recipeKeyword);

  const buttons_KT = {
    cozy: document.getElementById('cozyButton_KT'),
    comfortFood: document.getElementById('comfortFoodButton_KT'),
    soup: document.getElementById('soupButton_KT'),
    cold: document.getElementById('coldButton_KT'),
    lightMeal: document.getElementById('lightMealButton_KT'),
    hearty: document.getElementById('heartyButton_KT'),
    rainyDay: document.getElementById('rainyDayButton_KT')
  };

  const buttons_KL = {
    cozy: document.getElementById('cozyButton_KL'),
    comfortFood: document.getElementById('comfortFoodButton_KL'),
    soup: document.getElementById('soupButton_KL'),
    cold: document.getElementById('coldButton_KL'),
    lightMeal: document.getElementById('lightMealButton_KL'),
    hearty: document.getElementById('heartyButton_KL'),
    rainyDay: document.getElementById('rainyDayButton_KL')
  };

  const buttons_ipoh = {
    cozy: document.getElementById('cozyButton_ipoh'),
    comfortFood: document.getElementById('comfortFoodButton_ipoh'),
    soup: document.getElementById('soupButton_ipoh'),
    cold: document.getElementById('coldButton_ipoh'),
    lightMeal: document.getElementById('lightMealButton_ipoh'),
    hearty: document.getElementById('heartyButton_ipoh'),
    rainyDay: document.getElementById('rainyDayButton_ipoh')
  };

  const buttons_JB = {
    cozy: document.getElementById('cozyButton_JB'),
    comfortFood: document.getElementById('comfortFoodButton_JB'),
    soup: document.getElementById('soupButton_JB'),
    cold: document.getElementById('coldButton_JB'),
    lightMeal: document.getElementById('lightMealButton_JB'),
    hearty: document.getElementById('heartyButton_JB'),
    rainyDay: document.getElementById('rainyDayButton_JB')
  };

  const buttons_AS = {
    cozy: document.getElementById('cozyButton_AS'),
    comfortFood: document.getElementById('comfortFoodButton_AS'),
    soup: document.getElementById('soupButton_AS'),
    cold: document.getElementById('coldButton_AS'),
    lightMeal: document.getElementById('lightMealButton_AS'),
    hearty: document.getElementById('heartyButton_AS'),
    rainyDay: document.getElementById('rainyDayButton_AS')
  };

  const buttons_kuantan = {
    cozy: document.getElementById('cozyButton_kuantan'),
    comfortFood: document.getElementById('comfortFoodButton_kuantan'),
    soup: document.getElementById('soupButton_kuantan'),
    cold: document.getElementById('coldButton_kuantan'),
    lightMeal: document.getElementById('lightMealButton_kuantan'),
    hearty: document.getElementById('heartyButton_kuantan'),
    rainyDay: document.getElementById('rainyDayButton_kuantan')
  };

  const buttons_seremban = {
    cozy: document.getElementById('cozyButton_seremban'),
    comfortFood: document.getElementById('comfortFoodButton_seremban'),
    soup: document.getElementById('soupButton_seremban'),
    cold: document.getElementById('coldButton_seremban'),
    lightMeal: document.getElementById('lightMealButton_seremban'),
    hearty: document.getElementById('heartyButton_seremban'),
    rainyDay: document.getElementById('rainyDayButton_seremban')
  };

  const buttons_penang = {
    cozy: document.getElementById('cozyButton_penang'),
    comfortFood: document.getElementById('comfortFoodButton_penang'),
    soup: document.getElementById('soupButton_penang'),
    cold: document.getElementById('coldButton_penang'),
    lightMeal: document.getElementById('lightMealButton_penang'),
    hearty: document.getElementById('heartyButton_penang'),
    rainyDay: document.getElementById('rainyDayButton_penang')
  };

  const buttons_SA = {
    cozy: document.getElementById('cozyButton_SA'),
    comfortFood: document.getElementById('comfortFoodButton_SA'),
    soup: document.getElementById('soupButton_SA'),
    cold: document.getElementById('coldButton_SA'),
    lightMeal: document.getElementById('lightMealButton_SA'),
    hearty: document.getElementById('heartyButton_SA'),
    rainyDay: document.getElementById('rainyDayButton_SA')
  };


  
  const allButtons = { ...buttons_KT, ...buttons_KL, ...buttons_ipoh, ...buttons_JB, ...buttons_AS, ...buttons_kuantan, ...buttons_seremban, ...buttons_penang, ...buttons_SA };

  // Hide all buttons initially
  Object.values(allButtons).forEach(button => button.style.display = 'none');

  let buttonsToShow;

  if (location.toLowerCase() === 'kuala terengganu') {
    buttonsToShow = buttons_KT;
  } else if (location.toLowerCase() === 'kuala lumpur') {
    buttonsToShow = buttons_KL;
  } else if (location.toLowerCase() === 'ipoh') {
    buttonsToShow = buttons_ipoh;
  } else if (location.toLowerCase() === 'johor bahru') {
    buttonsToShow = buttons_JB;
  } else if (location.toLowerCase() === 'alor setar') {
    buttonsToShow = buttons_AS;
  } else if (location.toLowerCase() === 'kuantan') {
    buttonsToShow = buttons_kuantan;
  } else if (location.toLowerCase() === 'seremban') {
    buttonsToShow = buttons_seremban;
  } else if (location.toLowerCase() === 'penang') {
    buttonsToShow = buttons_penang;
  } else if (location.toLowerCase() === 'shah alam') {
    buttonsToShow = buttons_SA;
  }

  switch (weatherCondition) {
    case 'fog':
      buttonsToShow.cozy.style.display = 'block';
      break;
    case 'cloudy':
    case 'overcast':
    case 'mostly cloudy':
      buttonsToShow.comfortFood.style.display = 'block';
      break;
    case 'rain':
    case 'drizzle':
      buttonsToShow.soup.style.display = 'block';
      break;
    case 'clear':
    case 'sunny':
      case 'partly sunny':
      buttonsToShow.cold.style.display = 'block';
      break;
    case 'partly cloudy':
      buttonsToShow.lightMeal.style.display = 'block';
      break;
    case 'storm':
    case 'thunderstorm':
      case 'hazy sunshine':
      buttonsToShow.comfortFood.style.display = 'block';
      break;
    case 'snow':
      buttonsToShow.cold.style.display = 'block';
      break;
    default:
      buttonsToShow.rainyDay.style.display = 'block';
  }

}

async function getRecipes(query) {
  const appId = '4994f904'; // Replace with your Edamam App ID
  const appKey = '17828a480e4c7f1f17dc9c1bd935c390'; // Replace with your Edamam App Key
  const url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`;
  console.log(`Fetching recipes from URL: ${url}`); // Log the URL being fetched

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('Recipe Data:', data); // Log the recipe data
    displayRecipes(data.hits);
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
}

function displayRecipes(recipes) {
  const recipesContainer = document.getElementById('recipes');
  recipesContainer.innerHTML = '';

  if (recipes.length === 0) {
    recipesContainer.innerHTML = '<p>No recipes found for the given query.</p>';
    return;
  }

  recipes.forEach(hit => {
    const recipe = hit.recipe;
    const recipeElement = document.createElement('div');
    recipeElement.classList.add('recipe');

    const recipeContent = `
          <h3>${recipe.label}</h3>
          <img src="${recipe.image}" alt="${recipe.label}">
      `;

    recipeElement.innerHTML = recipeContent;
    recipesContainer.appendChild(recipeElement);
  });

}
