import React, { useState, useEffect } from 'react';
// REMOVEMOS: import profilesData from './data/profiles.json';
import ProfileCard from "./components/ProfileCard.jsx";
import ProfileModal from "./components/ProfileModal.jsx";
import SearchBar from "./components/SearchBar.jsx";
import { Sun, Moon } from 'lucide-react';

export default function App() {
  const [allProfiles, setAllProfiles] = useState([]); // Começa vazio
  const [filteredProfiles, setFilteredProfiles] = useState([]); // Começa vazio
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento

  // useEffect para buscar os dados da API quando o componente montar
  useEffect(() => {
    fetch('http://localhost:5000/api/profiles') // Busca dados do nosso backend
      .then(response => response.json())
      .then(data => {
        setAllProfiles(data);
        setFilteredProfiles(data);
        setIsLoading(false); // Terminou de carregar
      })
      .catch(error => {
        console.error("Erro ao buscar dados da API:", error);
        setIsLoading(false); // Falhou em carregar
      });
  }, []); // O array vazio [] significa que isso roda apenas UMA vez

  // Efeito para aplicar o Dark Mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Função de Busca e Filtro (sem alteração na lógica)
  const handleSearch = (term, area) => {
    let results = allProfiles;
    if (term) {
      results = results.filter(p =>
        p.nome.toLowerCase().includes(term.toLowerCase()) ||
        p.cargo.toLowerCase().includes(term.toLowerCase()) ||
        p.habilidadesTecnicas.some(skill => skill.toLowerCase().includes(term.toLowerCase()))
      );
    }
    if (area) {
      results = results.filter(p => p.area === area);
    }
    setFilteredProfiles(results);
  };

  // Funções do Modal
  const openModal = (profile) => setSelectedProfile(profile);
  const closeModal = () => setSelectedProfile(null);

  // Toggle Dark Mode
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      <header className="container mx-auto p-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">FutureConnect</h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      <main className="container mx-auto p-6">
        <SearchBar onSearch={handleSearch} />

        {/* Mostra um aviso de "Carregando..." */}
        {isLoading && (
          <p className="text-center mt-8">Carregando perfis...</p>
        )}

        {/* Grid de Cards */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map(profile => (
                <ProfileCard
                  key={profile.Id}
                  profile={profile}
                  onCardClick={() => openModal(profile)}
                />
              ))
            ) : (
              <p>Nenhum perfil encontrado.</p>
            )}
          </div>
        )}

        {/* Modal Interativo */}
        {selectedProfile && (
          <ProfileModal
            profile={selectedProfile}
            onClose={closeModal}
          />
        )}
      </main>
    </div>
  );
}