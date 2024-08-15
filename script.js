function getWeather() {
    const apiKey = '3a7354bb75a6402c920221627241508'; // Replace with your actual WeatherAPI key
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&hours=8`; // 8-hour forecast

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.forecast.forecastday[0].hour);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    const cityName = data.location.name;
    const temperature = data.current.temp_c; // Temperature in Celsius
    const description = data.current.condition.text;
    const iconCode = data.current.condition.icon;
    const iconUrl = `https:${iconCode}`;

    const temperatureHTML = `
        <p>${temperature}°C</p>
    `;

    const weatherHtml = `
        <p>${cityName}</p>
        <p>${description}</p>
    `;

    tempDivInfo.innerHTML = temperatureHTML;
    weatherInfoDiv.innerHTML = weatherHtml;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;

    showImage();
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    hourlyData.forEach(item => {
        const time = item.time.split(' ')[1]; // Extract time from timestamp
        const temperature = item.temp_c; // Temperature in Celsius
        const iconCode = item.condition.icon;
        const iconUrl = `https:${iconCode}`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${time}</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
}
