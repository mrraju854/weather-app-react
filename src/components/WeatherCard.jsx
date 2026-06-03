import React, { useEffect, useState } from "react";

const WeatherCard = ({ weather, theme }) => {
  const [image, setImage] = useState("");
  const isDark = theme === "dark";

  useEffect(() => {
    if (!weather) return;

    const desc = weather.desc.toLowerCase();

    if (desc.includes("rain")) {
      setImage("https://cdn-icons-png.flaticon.com/512/1163/1163657.png");
    } else if (desc.includes("clear")) {
      setImage("https://cdn-icons-png.flaticon.com/512/869/869869.png");
    } else if (desc.includes("cloud")) {
      setImage("https://cdn-icons-png.flaticon.com/512/414/414825.png");
    } else if (desc.includes("snow")) {
      setImage("https://cdn-icons-png.flaticon.com/512/642/642102.png");
    } else {
      setImage("https://cdn-icons-png.flaticon.com/512/1163/1163624.png");
    }
  }, [weather]);

  if (!weather) {
    return (
      <div className={`${isDark ? "text-gray-300" : "text-gray-700"} mt-10`}>
        🔍 Search a city to see weather
      </div>
    );
  }

  const date = new Date();

  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`mt-10 w-full max-w-lg rounded-2xl shadow-2xl p-8 text-center
      ${isDark ? "bg-white/10 text-white" : "bg-white text-black"}`}
    >
      <h2 className="text-3xl font-bold">{weather.city}</h2>

      <p className={`${isDark ? "text-gray-300" : "text-gray-600"} mt-2`}>
        {date.toDateString()} | {time}
      </p>

      <img src={image} className="mx-auto w-28 mt-4" />

      <h1 className="text-6xl font-bold mt-4">{weather.temp}°C</h1>

      <p className="capitalize mt-2">{weather.desc}</p>

      <div className="flex justify-between mt-8">
        <div className={`p-4 rounded-xl w-1/2 mr-2 ${isDark ? "bg-white/10" : "bg-gray-100"}`}>
          <img src="https://cdn-icons-png.flaticon.com/512/728/728093.png" className="w-10 mx-auto mb-2" />
          <p>Humidity</p>
          <p className="font-bold text-blue-500">{weather.humidity}%</p>
        </div>

        <div className={`p-4 rounded-xl w-1/2 ml-2 ${isDark ? "bg-white/10" : "bg-gray-100"}`}>
          <img src="https://cdn-icons-png.flaticon.com/512/414/414974.png" className="w-10 mx-auto mb-2" />
          <p>Wind</p>
          <p className="font-bold text-green-500">{weather.wind} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;