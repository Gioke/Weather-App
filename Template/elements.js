const createElements = (data, dayOfTheWeek, container) => { //Create all the elements
    const card = addElement('card', 'div', 'card', container, data, dayOfTheWeek);
    const imageBox = addElement('imageBox', 'div', 'imgBx', card, data, dayOfTheWeek);
    const cardImg = addElement('cardImg', 'img', 'none', imageBox, data, dayOfTheWeek);
    const contentBox = addElement('contentBox', 'div', 'contentBx', card, data, dayOfTheWeek);
    const cardHeader = addElement('cardHeader', 'h2', 'none', contentBox, data, dayOfTheWeek);
    const tempDescription = addElement('tempDescription', 'h4', 'none', contentBox, data, dayOfTheWeek);
    const currentTempBox = addElement('currentTempBox', 'div', 'color', contentBox, data, dayOfTheWeek);
    const currentTempHeader = addElement('currentTempHeader', 'h3', 'none', currentTempBox, data, dayOfTheWeek);
    const currentTemp = addElement('currentTemp', 'span', 'current-temp', currentTempBox, data, dayOfTheWeek);
    const minMaxTemperatures = addElement('minMaxTemperatures', 'div', 'details', contentBox, data, dayOfTheWeek);
    const minMaxTempHeader = addElement('minMaxTempHeader', 'h3', 'none', minMaxTemperatures, data, dayOfTheWeek);
    const minTemp = addElement('minTemp', 'span', 'min-temp', minMaxTemperatures, data, dayOfTheWeek);
    const maxTemp = addElement('minTemp', 'span', 'max-temp', minMaxTemperatures, data, dayOfTheWeek);
}

const addElement = (Name, eType, eClass, eAppendTo, data, dayOfTheWeek) => {
    const element = document.createElement(eType);
    element.classList.add(eClass);
    eAppendTo.appendChild(element);
    updateInnerHTML(Name, element, data, dayOfTheWeek)
    return element;
}

const updateInnerHTML = (Name, element, data, dayOfTheWeek) => {
    if(Name == 'cardImg') {
        element.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    } else if(Name == 'cardHeader') {
        element.innerHTML = dayOfTheWeek;
    } else if(Name == 'tempDescription') {
        element.innerHTML = data.weather[0].description;
    } else if(Name == 'currentTempHeader') {
        element.innerHTML = "Temp:"
    } else if(Name == 'currentTemp') {
        element.innerHTML = data.temp.day + "°C";
    } else if(Name == 'minMaxTempHeader') {
        element.innerHTML = "More:"
    } else if(Name == 'minTemp') {
        element.innerHTML = data.temp.min + "°C";
    } else if(Name == 'maxTemp') {
        element.innerHTML = data.temp.max + "°C";
    }
}

export {
    createElements
}