import React, { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard.jsx";
import ProfileModal from "../components/ProfileModal.jsx";
import SearchBar from "../components/common/SearchBar.jsx";
import Header from "../components/common/Header.jsx";

export default function FeedPage() {
  const [allProfiles, setAllProfiles] = useState([]); // Começa vazio
  const [filteredProfiles, setFilteredProfiles] = useState([]); // Começa vazio
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [darkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento

  // useEffect para buscar os dados da API quando o componente montar
  useEffect(() => {
    fetch("http://localhost:5000/api/profiles") // Busca dados do nosso backend
      .then((response) => response.json())
      .then((data) => {
        setAllProfiles(data);
        setFilteredProfiles(data);
        setIsLoading(false); // Terminou de carregar
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da API:", error);
        setIsLoading(false); // Falhou em carregar
      });
  }, []); // O array vazio [] significa que isso roda apenas UMA vez

  // Efeito para aplicar o Dark Mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Função de Busca e Filtro (sem alteração na lógica)
  const handleSearch = (term, area) => {
    let results = allProfiles;
    if (term) {
      results = results.filter(
        (p) =>
          p.nome.toLowerCase().includes(term.toLowerCase()) ||
          p.cargo.toLowerCase().includes(term.toLowerCase()) ||
          p.habilidadesTecnicas.some((skill) =>
            skill.toLowerCase().includes(term.toLowerCase())
          )
      );
    }
    if (area) {
      results = results.filter((p) => p.area === area);
    }
    setFilteredProfiles(results);
  };

  // Funções do Modal
  const openModal = (profile) => setSelectedProfile(profile);
  const closeModal = () => setSelectedProfile(null);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="container mx-auto p-6">
        <SearchBar onSearch={handleSearch} />

        {/* Mostra um aviso de "Carregando..." */}
        {isLoading && <p className="text-center mt-8">Carregando perfis...</p>}

        {/* Grid de Cards */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map((profile) => (
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
          <ProfileModal profile={selectedProfile} onClose={closeModal} />
        )}
      </main>
    </div>
  );
}
