import React from 'react';

function WeatherCard({ weather, unit }) {
  const { main, weather: weatherDetails, wind } = weather;
  const temp = unit === 'metric' ? main.temp + '°C' : (main.temp * 9/5) + 32 + '°F';
  const iconUrl = `http://openweathermap.org/img/wn/${weatherDetails[0].icon}.png`;

  return (
    <div className="weather-card">
      <h2>{weather.name}</h2>
      <img src={iconUrl} alt={weatherDetails[0].description} />
      <p>{weatherDetails[0].description}</p>
      <p>Temperature: {temp}</p>
      <p>Wind: {wind.speed} m/s</p>
    </div>
  );
}

export default WeatherCard;
