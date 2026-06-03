import React, { useState } from "react";

const SearchBox = ({ onSearch, theme }) => {
  const [city, setCity] = useState("");
  const isDark = theme === "dark";

  const handleSearch = () => {
    if (!city.trim()) return;
    onSearch(city);
    setCity("");
  };

  return (
    <div
      className={`flex w-full max-w-lg mt-4 rounded-xl overflow-hidden shadow-lg
      ${isDark ? "bg-white/10 backdrop-blur-lg" : "bg-white"}`}
    >
      <input
        type="text"
        placeholder="Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className={`flex-1 p-4 outline-none
        ${isDark ? "bg-transparent text-white placeholder-gray-300" : "bg-white text-black"}`}
      />

      <button
        onClick={handleSearch}
        className="bg-blue-500 px-6 text-white font-semibold hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBox;