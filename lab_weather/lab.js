// Set constants for API key and URL endpoint
const api = {
    url: 'https://api.openweathermap.org/data/2.5/weather?q=',
    key: 'd973e0c4ff6b0596d384d2feda9aed83'
};

// Set constants for days of the week and months of the year
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Set constant for the DOM element that holds the city name (input field in HTML)
const cityNameDom = document.querySelector('#enterCity');

// Format date in Day Date Month Year format
function formatDate() {
    let currentDate = new Date();
    let day = days[currentDate.getDay()];
    let month = months[currentDate.getMonth()];
    let date = currentDate.getDate();
    let year = currentDate.getFullYear();
    return `${day} ${date} ${month} ${year}`;
}

// Map response from the API to valid DOM elements
// If data is wrong (response.ok is false from the API and null is passed from getResult()), blank values are placed on the page
function mapResponse(urlResponse) {
    let outputCityDom = document.querySelector('#outputCity');
    let outputDateDom = document.querySelector('#outputDate');
    let outputTempDom = document.querySelector('#outputTemp');
    let outputWeatherDom = document.querySelector('#outputWeather');
    let outputHighTempDom = document.querySelector('#outputHighTemp');
    let outputLowTempDom = document.querySelector('#outputLowTemp');
    if (urlResponse) {
        outputCityDom.innerText = `${urlResponse.name}, ${urlResponse.sys.country}`;
        outputDateDom.innerText = formatDate();
        outputTempDom.innerText = `${Math.floor(urlResponse.main.temp)} °C`;
        outputWeatherDom.innerText = urlResponse.weather[0].main;
        outputHighTempDom.innerText = `${Math.floor(urlResponse.main.temp_max)} °C / `;
        outputLowTempDom.innerText = `${Math.floor(urlResponse.main.temp_min)} °C`;
    }
    else {
        outputCityDom.innerText = '';
        outputDateDom.innerText = '';
        outputTempDom.innerText = '';
        outputWeatherDom.innerText = '';
        outputHighTempDom.innerText = '';
        outputLowTempDom.innerText = '';
    }

}

// Get results from the API
function getResult(cityName) {
    console.log(cityName);
    fetch(`${api.url}${cityName}&appid=${api.key}&units=metric`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                mapResponse(null);
                setTimeout(() => alert("City not found. Enter a valid city name."), 100);
            }
        })
        .then((responseBody) => {
            mapResponse(responseBody);
        });
}

// Function to add event listeners
function addEventListeners() {
    cityNameDom.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            getResult(e.target.value);
        }
    })
}

// On load, add event listenders and populate weather details of Delhi
window.onload = () => {
    addEventListeners();
    getResult('Delhi');
}