const inputBox = document.querySelector('.search-input');
const searchBtn = document.querySelector('#search-icon');
const weather_img = document.querySelector('.weather-icon');
const temperature = document.querySelector('.weather-temp');
const description = document.querySelector('.weather-description');
const humidity = document.querySelector('.humidity-percent');
const wind_speed = document.querySelector('.wind-speed');

const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-box');

const container = document.querySelector(".container");

const logo = document.querySelector(".logo");


async function checkWeather(city){
    const api_key = "87f0f7053f3a2cad6ea48b7fc3e5320c";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    
    const weather_data = await fetch(`${url}`).then(response => response.json());

    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        container.style.backgroundColor = "#ffffff";
        logo.style.display = "none";
        console.log("error");
        return;
    }

    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    container.style.backgroundColor = "#ffffff";
    logo.style.display = "none";

    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "images/cloud.png";
            break;
        
        case 'Clear':
            weather_img.src = "images/clear.png";
            break;

        case 'Rain':
            weather_img.src = "images/rain.png";
            break;

        case 'Mist':
            weather_img.src = "images/mist.png";
            break;

        case 'Snow':
            weather_img.src = "images/snow.png";
            break;
    }
    console.log(weather_data);
}

searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});