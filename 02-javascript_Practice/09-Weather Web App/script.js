
console.log("Weather application is running...");

// ============================== 1. Select HTML Elements ==============================

const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-box input");

const cityName = document.querySelector(".weather-location h2");
const cityDate = document.querySelector(".weather-location p");

const weatherIcon = document.querySelector(".day-icon");
const temperature = document.querySelector(".temperature");

const feel = document.querySelector("#feel");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const perception = document.querySelector("#perception");

const forecastContainer = document.querySelector(".daily-forecast");

// ============================== 2. Display Current Date ==============================

function myDate() {
    const today = new Date();

    const options = {
        weekday: "long",
        month: "short",
        day: "2-digit",
        year: "numeric"
    };

    cityDate.textContent = today.toLocaleDateString("en-GB", options);
}

myDate();

// ============================== 3. Weather Code to Emoji ==============================

function getWeatherIcon(code) {
    if (code === 0) return "☀️";
    if (code === 1) return "🌤️";
    if (code === 2) return "⛅";
    if (code === 3) return "☁️";

    if (code === 45 || code === 48) return "🌫️";

    if ([51, 53, 55, 56, 57].includes(code)) {
        return "🌦️";
    }

    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
        return "🌧️";
    }

    if ([71, 73, 75, 77, 85, 86].includes(code)) {
        return "🌨️";
    }

    if ([95, 96, 99].includes(code)) {
        return "⛈️";
    }

    return "🌡️";
}

// ============================== 4. Search City ==============================

async function searchCity(event) {
    event.preventDefault();

    const city = searchInput.value.trim();

    if (city === "") {
        cityName.textContent = "Enter your city name";
        return;
    }

    cityName.textContent = "Loading weather...";

    try {
        //Find city coordinates

        const geoURL =
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=5&language=en&format=json`;

        const geoResponse = await fetch(geoURL);

        if (!geoResponse.ok) {
            throw new Error("Unable to find city");
        }

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            cityName.textContent = "City not found";
            return;
        }

        const result = geoData.results[0];

        // Display city and country

        cityName.textContent =
            `${result.name}, ${result.country || ""}`;

        // Get weather data

        const weatherURL =
            `https://api.open-meteo.com/v1/forecast?latitude=${result.latitude}&longitude=${result.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=7`;

        const weatherResponse = await fetch(weatherURL);

        if (!weatherResponse.ok) {
            throw new Error("Unable to fetch weather");
        }

        const weatherData = await weatherResponse.json();

        // Display current weather

        weatherBroh(weatherData);

        // Display 7-day forecast

        renderForecast(weatherData);

        // Display date using the searched location's timezone

        const weatherDate = new Date(
            weatherData.current.time
        );

        cityDate.textContent = weatherDate.toLocaleDateString(
            "en-GB",
            {
                weekday: "long",
                month: "short",
                day: "2-digit",
                year: "numeric"
            }
        );

    } catch (error) {
        console.error("Weather error:", error);
        cityName.textContent = "Something went wrong. Try again.";
    }
}

// Search button and Enter keys

searchForm.addEventListener("submit", searchCity);

// ============================== 5. Display Current Weather ==============================

function weatherBroh(weatherData) {
    const current = weatherData.current;

    temperature.textContent =
        `${Math.round(current.temperature_2m)}°C`;

    feel.textContent =
        `${current.apparent_temperature}°C`;

    humidity.textContent =
        `${current.relative_humidity_2m}%`;

    wind.textContent =
        `${current.wind_speed_10m} km/h`;

    perception.textContent =
        `${current.precipitation} mm`;

    weatherIcon.textContent =
        getWeatherIcon(current.weather_code);
}

// ============================== 6. Display 7-Day Forecast ==============================

function renderForecast(weatherData) {
    const daily = weatherData.daily;

    // Remove old forecast cards

    forecastContainer.innerHTML = "";

    // Generate each day Date

    daily.time.forEach(function(date, index) {

        // Get day name: Mon, Tue, Wed...

        const dayName = new Date(date + "T12:00:00")
            .toLocaleDateString("en-US", {
                weekday: "short"
            });

        // Get weather emoji

        const icon = getWeatherIcon(
            daily.weather_code[index]
        );

        // Get maximum and minimum temperatures

        const maxTemp = Math.round(
            daily.temperature_2m_max[index]
        );

        const minTemp = Math.round(
            daily.temperature_2m_min[index]
        );

        // Create forecast card

        const card = document.createElement("div");

        card.className = "day-card";

        card.innerHTML = `
            <p class="day-name">${dayName}</p>

            <span class="day-icon">${icon}</span>

            <div class="day-temperatures">
                <span>${maxTemp}°</span>
                <span>${minTemp}°</span>
            </div>
        `;

        // Add card to the page

        forecastContainer.appendChild(card);
    });
}

// ============================== 7. Load Default City on Startup ==============================

// Show Patna's weather when the page opens

searchInput.value = "Patna";

searchForm.requestSubmit();
