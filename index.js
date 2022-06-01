console.log("Weather App");
import {API_KEY, GEO_KEY, USP_KEY} from "./console.js";
import { getLocation } from "./functions.js";



const timeE1 = document.getElementById('time');
const dateE1 = document.getElementById('date');
const currentWeatherItemsE1 = document.getElementById
('current-weather-items');
const countryE1 = document.getElementById('country');
const weatherForecastE1 = document.getElementById('weather-forecast');
const currentTempE1 = document.getElementById('current-temp');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
'Friday', 'Saterday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
'Sep', 'Oct', 'Nov', 'Dec'];

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'

    timeE1.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat :
    hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes) + '' + `<span
    id="am-pm">${ampm}</span>`

    dateE1.innerHTML = days[day] + ',' + date + '' + months[month] 

}, 1000);


// const loadPosition = positionData(position);
// const loadPosition = (position)=> {
//     getWeatherData(position.coords.latitude, position.coords.longitude, 'your location');
// }


// const getLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(loadPosition);
//     } 
// }


getLocation()

export const getWeatherData = (latitude, longitude, city) => {
    navigator.geolocation.getCurrentPosition((succes) => {
        
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => {

            console.log(data)
            showWeatherData(data);

            const loadImg = (city) => {
                const url = `https://api.unsplash.com/search/photos?query=${city}&page=1&client_id=${USP_KEY}`;
                  fetch(url)
                      .then(response => {
                          return response.json();
                      })
                      
                      .then(data => {
                            if(city == 'your location' || data.total == 0) {
                                document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?landscape')`;
                            } else {
                             console.log(data.results)
                                document.body.style.backgroundImage = `url('${data.results[0].urls.regular}')`;
                            }
                        });                       
            }
            document.getElementById('city').innerText = `Weather in `;
            loadImg(city)

        })

    })
}

document.querySelector(".search-bar")
.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        getLocationData(event.target.value)
        console.log(event.target.value);
    }
}

const getLocationData = (city) => {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${GEO_KEY}`)
    .then(function (response) { return response.json(); })
        .then(function (result) {
            getWeatherData(result[0].lat, result[0].lon, city);
        }).catch(function (err) { main.innerHTML = err; });  
}



const timezone = document.querySelector('#time-zone');
const showWeatherData = (data) => {
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

    timezone.innerHTML = data.timezone;
    countryE1.innerHTML = data.lat + ' N ' + data.lon + ' E '

    currentWeatherItemsE1.innerHTML = 
    `<div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
    </div>
    
    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
    </div>
    `;
    
    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
      if(idx == 0){
          currentTempE1.innerHTML = 
          `<img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" 
          alt="weather icon" class="w-icon">
          <div class="other">
              <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
          <div class="temp">Night - ${day.temp.night.toFixed(0)}&#176; C</div>
          <div class="temp">Day - ${day.temp.day.toFixed(0)}&#176; C</div>
          </div>
          `

      }else{
          otherDayForcast += `
            <div class="weather-forecast-item">
            <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="weather icon" class="w-icon">                
            <div class="temp">Night - ${day.temp.night.toFixed(0)}&#176; C</div>
            <div class="temp">Day - ${day.temp.day.toFixed(0)}&#176; C</div>
            </div>
          `
      }  

    });
    
    document.querySelector(".container").classList.remove("loading");
    weatherForecastE1.innerHTML = otherDayForcast;

}




