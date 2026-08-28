const apiKey = '33ae30428b7bf235d718a0f41a666d58'; 
const lat = 50.4501; 
const lon = 30.5234;

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const els = {
    date: document.getElementById('current-date'),
    time: document.getElementById('current-time'),
    ampm: document.getElementById('current-ampm'),
    humidity: document.getElementById('humidity'),
    pressure: document.getElementById('pressure'),
    windSpeed: document.getElementById('wind-speed'),
    windDir: document.getElementById('wind-dir'),
    icon: document.getElementById('weather-icon'),
    temp: document.getElementById('temp'),
    feelsLike: document.getElementById('feels-like'),
    desc: document.getElementById('description'),
    lastUpdate: document.getElementById('last-update'),
    refreshBtn: document.getElementById('refresh-btn')
};

function formatDate(date) {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const mainDate = date.toLocaleDateString('en-US', options);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
    return `${mainDate} - ${dayOfWeek}`;
}

function getWindDirection(deg) {
    const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    const index = Math.round(deg / 22.5) % 16;
    return directions[index];
}

async function fetchWeather() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            console.error(`Помилка HTTP: ${response.status}. Можливо, ключ ще не активований.`);
            throw new Error("Помилка завантаження даних");
        }
        const data = await response.json();

        els.temp.textContent = Math.round(data.main.temp);
        els.feelsLike.textContent = Math.round(data.main.feels_like);
        els.humidity.textContent = data.main.humidity;
        els.pressure.textContent = data.main.pressure;
        
        const speedKmh = Math.round(data.wind.speed * 3.6);
        els.windSpeed.textContent = speedKmh;
        els.windDir.textContent = getWindDirection(data.wind.deg);
        
        els.desc.textContent = data.weather[0].description;

        const iconCode = data.weather[0].icon;
        els.icon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        els.icon.style.display = 'block';

        const now = new Date();
        const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
        
        els.date.textContent = formatDate(now);
        const timeString = now.toLocaleTimeString('en-US', timeOptions); 
        const [timeParts, ampm] = timeString.split(' ');
        
        els.time.textContent = timeParts;
        els.ampm.textContent = ampm;
        
        els.lastUpdate.textContent = `${formatDate(now).split('-')[0].trim()} ${timeString}`;

    } catch (error) {
        console.error("Помилка API:", error);
        els.desc.textContent = "Зачекайте 10-30 хв (Ключ активується)"; 
    }
}

els.refreshBtn.addEventListener('click', () => {
    els.refreshBtn.classList.add('spin');
    
    fetchWeather().then(() => {
        setTimeout(() => els.refreshBtn.classList.remove('spin'), 500);
    });
});

fetchWeather();