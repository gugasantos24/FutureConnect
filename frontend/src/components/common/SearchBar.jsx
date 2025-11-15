import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");
  const [area, setArea] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(term, area);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-stretch gap-3 bg-white/70 dark:bg-gray-800/60 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300"
    >
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Buscar por nome, cargo ou skill..."
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100/70 dark:bg-gray-700/70 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
      </div>

      <select
        className="px-4 py-3 rounded-xl bg-gray-100/70 dark:bg-gray-700/70 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-800 dark:text-gray-200 w-full md:w-56"
        value={area}
        onChange={(e) => setArea(e.target.value)}
      >
        <option value="">Todas as Áreas</option>
        <option value="Desenvolvimento">Desenvolvimento</option>
        <option value="Design">Design</option>
        <option value="Dados">Dados</option>
        <option value="Saúde">Saúde</option>
      </select>

      <button
        type="submit"
        className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-medium shadow-md transition-all duration-200"
      >
        Buscar
      </button>
    </form>
  );
}
