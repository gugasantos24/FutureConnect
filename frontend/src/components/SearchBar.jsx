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
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-3"
    >
      <input
        type="text"
        placeholder="Buscar por nome, cargo ou skill..."
        className="grow p-2 border rounded-md bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <select
        className="p-2 border rounded-md bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 w-full md:w-48"
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
        className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
      >
        Buscar
      </button>
    </form>
  );
}
