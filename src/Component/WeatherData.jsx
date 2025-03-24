import React, { useState } from "react";
import './WeatherData.css';

const WeatherData = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "de9ce07c068ed4d6c3126f3308f59e08"; 

  const fetchData = async () => {
    if (!city) {
      setError("Please enter a city name."); 
      return;
    }

    setError("");
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error("City not found or API limit reached");
      }
      const data = await response.json();
      setWeather({
        city: data.name,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed
      });
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="weather-container">
      <input 
        type="text" 
        className="weather-input" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        placeholder="Enter city name..."
      />
      <button className="weather-button" onClick={fetchData}>Get Weather</button>

      {error && <p className="weather-error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <div>🌆 <strong>City:</strong> {weather.city}</div>
          <div>🌡 <strong>Temperature:</strong> {weather.temperature}°C</div>
          <div>💧 <strong>Humidity:</strong> {weather.humidity}%</div>
          <div>💨 <strong>Wind Speed:</strong> {weather.windSpeed} m/s</div>
        </div>
      )}
    </div>
  );
};

export default WeatherData;
