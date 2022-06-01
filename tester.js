console.log("Weather App");
import {API_KEY} from "./console.js";
const url = "https://api.openweathermap.org/data/2.5/weather?q="
+ city 
+ "&units=metric&exclude=daily&appid="
+ API_KEY

let weather = {

    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
         + city 
         + "&units=metric&exclude=daily&appid="
         + this.API_KEY
        ).then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed} = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
         "https://openweathermap.org/img/wn/" + icon + ".png"
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp.toFixed(0) + "°C";
        document.querySelector(".humidity").innerText =
         "Humidity:" + humidity + "%";
        document.querySelector(".wind").innerText =
         "Wind speed:" + speed + "km/h";  
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/2400x1600/?" + name + "')"
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

const d = new Date();
const weekday =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saterday"];

function CheckDay(day) {
    if(day +d.getDay() > 6) {
        return day +d.getDay() -7;
    }
    else {
        return day +d.getDay();
    }
}

for (i=0;i<5;i++) {
    document.getElementById("day"+(i+1)).innerText = weekday[CheckDay(i)];
}

const getWeatherData = () => {
    console.log(API_KEY);
    // get user input
    // get api 
}

document.querySelector('.search button')
.addEventListener("click", getWeatherData);

document.querySelector(".search-bar")
.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        getWeatherData()
    }
})

document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
         "https://openweathermap.org/img/wn/" + icon + ".png"

weather.fetchWeather("Ghent");

