import React from 'react';

function ForecastCard({ forecast, unit }) {
  const date = new Date(forecast.dt * 1000).toLocaleDateString();
  const temp = unit === 'metric' ? forecast.main.temp + '°C' : (forecast.main.temp * 9/5) + 32 + '°F';
  const iconUrl = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;

  return (
    <div className="forecast-card"  data-aos="flip-left">
      <h4>{date}</h4>
      <img src={iconUrl} alt={forecast.weather[0].description} />
      <p>{forecast.weather[0].description}</p>
      <p>Temperature: {temp}</p>
    </div>
  );
}

export default ForecastCard;
