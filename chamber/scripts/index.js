// ========== Weather Fetch (OpenWeatherMap) ==========
const apiKey = '79c0ceae4f9d73b952d59786029584bb'; 
const cityId = '993800';

async function fetchWeather() {
  try {
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=${apiKey}`
    );
    const weatherData = await weatherRes.json();

    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=metric&appid=${apiKey}`
    );
    const forecastData = await forecastRes.json();

    displayCurrentWeather(weatherData);
    displayForecast(forecastData);
  } catch (error) {
    document.getElementById('current-weather').textContent = 'Weather data unavailable.';
    document.getElementById('forecast').textContent = '';
    console.error('Weather fetch error:', error);
  }
}

function displayCurrentWeather(data) {
  const container = document.getElementById('current-weather');
  container.innerHTML = `
    <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
    <p><strong>Conditions:</strong> ${data.weather[0].description}</p>
  `;
}

function displayForecast(data) {
  const container = document.getElementById('forecast');

  const forecastItems = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

  let forecastHTML = '<h3>3-Day Forecast</h3><ul>';
  forecastItems.forEach(day => {
    const date = new Date(day.dt_txt);
    forecastHTML += `
      <li>
        <strong>${date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</strong>: 
        ${day.main.temp}°C, ${day.weather[0].description}
      </li>
    `;
  });
  forecastHTML += '</ul>';
  container.innerHTML = forecastHTML;
}

// ========== Spotlight Members ==========
async function loadSpotlights() {
  try {
    const res = await fetch('data/members.json');
    const members = await res.json();

    const spotlightMembers = members.filter(m => m.membership === 1 || m.membership === 2);

    shuffleArray(spotlightMembers);
    const selected = spotlightMembers.slice(0, 3);

    displaySpotlights(selected);
  } catch (error) {
    console.error('Error loading spotlights:', error);
  }
}

function displaySpotlights(members) {
  const container = document.getElementById('spotlight-cards');
  container.innerHTML = '';

  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member');

    card.innerHTML = `
      <h3>${member.name}</h3>
      <img src="${member.image}" alt="Logo of ${member.name}" />
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
      <p><strong>Membership Level:</strong> ${member.membership === 1 ? 'Gold' : 'Silver'}</p>
    `;
    container.appendChild(card);
  });
}

function shuffleArray(arr) {
  for(let i = arr.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i +1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

window.addEventListener('DOMContentLoaded', () => {
  fetchWeather();
  loadSpotlights();
});