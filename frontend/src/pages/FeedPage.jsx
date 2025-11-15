import React, { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard.jsx";
import ProfileModal from "../components/ProfileModal.jsx";
import SearchBar from "../components/common/SearchBar.jsx";
import Header from "../components/common/Header.jsx";

// 1. Recebe 'isDarkMode' e 'toggleDarkMode' como props
export default function FeedPage({ isDarkMode, toggleDarkMode }) {
  const [allProfiles, setAllProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect para buscar os dados (sem alteração)
  useEffect(() => {
    fetch("http://localhost:5000/api/profiles")
      .then((response) => response.json())
      .then((data) => {
        setAllProfiles(data);
        setFilteredProfiles(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da API:", error);
        setIsLoading(false);
      });
  }, []);

  // Lógica de busca (sem alteração)
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

  // Funções do Modal (sem alteração)
  const openModal = (profile) => setSelectedProfile(profile);
  const closeModal = () => setSelectedProfile(null);

  // 2. O 'return' JÁ NÃO TEM o div com "min-h-screen..."
  return (
    <div>
      {/* 3. Passa as props recebidas para o Header */}
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="container mx-auto p-6">
        <SearchBar onSearch={handleSearch} />

        {isLoading && <p className="text-center mt-8">Carregando perfis...</p>}

        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map((profile) => (
                <ProfileCard
                  key={profile.id} // <-- Já inclui a correção do 'key'
                  profile={profile}
                  onCardClick={() => openModal(profile)}
                />
              ))
            ) : (
              <p>Nenhum perfil encontrado.</p>
            )}
          </div>
        )}

        {selectedProfile && (
          <ProfileModal profile={selectedProfile} onClose={closeModal} />
        )}
      </main>
    </div>
  );
}
