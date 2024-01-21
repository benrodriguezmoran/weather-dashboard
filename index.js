var apiKey = '1b18ce13c84e21faafb19c931bb29331';
var searches = [];

// Function to fetch weather data based on the city input
function searchCity() {
    const cityName = document.getElementById('cityInput').value;

    // Replace the following API URL with the one you are using for weather data
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Update current weather section
            document.getElementById('cityName').textContent = data.city.name;
            document.getElementById('currentDate').textContent = new Date().toLocaleDateString();
            document.getElementById('weatherIcon').src = `icons/${data.current.weather[0].icon}.png`;
            document.getElementById('temperature').textContent = `Temperature: ${data.current.temp}°C`;
            document.getElementById('humidity').textContent = `Humidity: ${data.current.humidity}%`;
            document.getElementById('windSpeed').textContent = `Wind Speed: ${data.current.wind.speed} m/s`;

            // Update 5-day forecast section
            const forecastDays = document.querySelectorAll('.forecastDay');
            for (let i = 0; i < forecastDays.length; i++) {
                const forecastData = data.daily[i];
                forecastDays[i].querySelector('.date').textContent = new Date(forecastData.dt * 1000).toLocaleDateString();
                forecastDays[i].querySelector('.weatherIcon').src = `icons/${forecastData.weather[0].icon}.png`;
                forecastDays[i].querySelector('.temperature').textContent = `Temperature: ${forecastData.temp.day}°C`;
                forecastDays[i].querySelector('.windSpeed').textContent = `Wind Speed: ${forecastData.wind_speed} m/s`;
                forecastDays[i].querySelector('.humidity').textContent = `Humidity: ${forecastData.humidity}%`;
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

