import React, { useEffect, useRef, useState } from "react";
import "./weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };
  const search = async (long, lat) => {
    try {
      const url = `https://api.openweathermap.org/data/3.0/onecall/overview?lon=${long}&lat=${lat}.509865&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();

      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humudity: data.main.humidity,
        windSpeed: data.wind.speed,
        temp: data.main.temp,
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    search(26.4525, 87.2718);
  }, []);

  return (
    <div className="weather">
      <div className="searchbar">
        <input type="text" placeholder="Search for a city" ref={inputRef} />
        <img
          src={search_icon}
          alt="search"
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      <img src={clear_icon} alt="weather" className="weather-icon" />
      <p className="temperature">{weatherData.temp}°C</p>
      <p className="location">{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div className="">
            <p>{weatherData.humudity}%</p>
            <span>Humudity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="" />
          <div className="">
            <p>{weatherData.windSpeed}km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default weather;
