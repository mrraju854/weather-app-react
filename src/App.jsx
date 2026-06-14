import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchBox from "./components/SearchBox";
import WeatherCard from "./components/WeatherCard";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [history, setHistory] = useState([]);

  const apiKey = "ff0db0549b37ee1d3d1186fc562de170";

  const isDark = theme === "dark";

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );

      const data = res.data;

      setWeather({
        city: data.name,
        temp: data.main.temp,
        desc: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        wind: data.wind.speed,
      });
    });
  }, []);

  const fetchWeather = async (city) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      const data = res.data;

      setWeather({
        city: data.name,
        temp: data.main.temp,
        desc: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        wind: data.wind.speed,
      });

      const newHistory = [data.name, ...history.filter((c) => c !== data.name)];
      setHistory(newHistory);
      localStorage.setItem("history", JSON.stringify(newHistory));

    } catch {
      alert("City not found");
    }
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(saved);
  }, []);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center px-4 py-10 transition-all duration-500
      ${isDark ? "bg-[#1e293b]" : "bg-sky-200"}`}
    >
      <button
        onClick={toggleTheme}
        className={`absolute top-5 right-5 px-4 py-2 rounded-lg font-semibold
        ${isDark ? "bg-white text-black" : "bg-black text-white"}`}
      >
        {isDark ? "Light" : "Dark"}
      </button>

      <h1
        className={`text-4xl font-bold mb-6 tracking-wide
        ${isDark ? "text-white" : "text-black"}`}
      >
        Weather App ☁️
      </h1>

      <SearchBox onSearch={fetchWeather} theme={theme} />

      <div className="flex flex-wrap gap-2 mt-4">
        {history.map((city, i) => (
          <button
            key={i}
            onClick={() => fetchWeather(city)}
            className={`px-3 py-1 rounded-lg text-sm
            ${isDark ? "bg-white/20 text-white" : "bg-black/10 text-black"}`}
          >
            {city}
          </button>
        ))}
      </div>

      <WeatherCard weather={weather} theme={theme} />
    </div>
  );
};

export default App;