import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from '../components/WeatherCard';
import SearchBar from '../components/SearchBar';
import ForecastCard from '../components/ForecastCard';
import { useNavigate } from 'react-router-dom';
import '../Pages/Home.css';

function Home({ unit, setUnit, isDarkMode, setIsDarkMode }) {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [city, setCity] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const API_KEY = 'a0100807a73fb249166c2a9a6a982e1b';

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const storedSearches = localStorage.getItem('recentSearches');
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError('Please enter a city name');
      setWeatherData(null);
      return;
    }

    try {
      const encodedCity = encodeURIComponent(city);
      const weatherResponse = await fetchWeatherData(encodedCity);
      const forecastResponse = await fetchForecastData(encodedCity);

      if (weatherResponse && forecastResponse) {
        setWeatherData(weatherResponse);
        setForecastData(forecastResponse);

        // Add to recent searches if successful
        const updatedSearches = [city, ...recentSearches].slice(0, 5);
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

        setError('');
      } else {
        setError('City not found');
        setWeatherData(null);
        setForecastData(null);
      }
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
      setWeatherData(null);
      setForecastData(null);
    }
  };

  const fetchWeatherData = async (city) => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`);
    return response.status === 200 ? response.data : null;
  };

  const fetchForecastData = async (city) => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`);
    return response.status === 200 ? response.data.list.filter((item, index) => index % 8 === 0) : null;
  };

  // Function to get background image based on weather condition
  const getBackgroundStyle = (weatherData) => {
    if (!weatherData) return {};

    const weatherCondition = weatherData.weather[0].main.toLowerCase();
    const backgroundImages = {
      clear: 'url(./images/sunny.jpg)',
      clouds: 'url(./images/cloudy.webp)',
      rain: 'url(./images/rainy.jpg)',
      snow: 'url(./images/snowy.jpg)',
      thunderstorm: 'url(./images/thunderstorm.jpg)',
      mist: 'url(./images/misty.jpg)',
      fog: 'url(./images/foggy.jpg)',
    };

    return {
      backgroundImage: backgroundImages[weatherCondition] || 'url(./images/default.jpg)', // Default fallback
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transition: 'background-image 0.5s ease', // Optional smooth transition
    };
  };

  return (
    <div className={`home ${isDarkMode ? 'dark-mode' : ''}`} style={getBackgroundStyle(weatherData)}>
      <SearchBar 
        city={city} 
        setCity={setCity} 
        handleSearch={handleSearch}
        recentSearches={recentSearches} // Pass recent searches
        setRecentSearches={setRecentSearches} // Pass setRecentSearches function
      />
      
      {error && <p className="error">{error}</p>}
      
      {weatherData && <WeatherCard weather={weatherData} unit={unit} />}
      
      {forecastData && (
        <div className="forecast">
          {forecastData.map((forecast) => (
            <ForecastCard key={forecast.dt} forecast={forecast} unit={unit} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
