import { getWeatherData } from "./index.js";
const loadPosition = (position)=> {
    getWeatherData(position.coords.latitude, position.coords.longitude, 'your location');
    }

const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(loadPosition);
    } 
}

// getLocation()



export {
    getLocation
    
}