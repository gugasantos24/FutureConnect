import React, { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard.jsx";
import ProfileModal from "../components/ProfileModal.jsx";
import SearchBar from "../components/common/SearchBar.jsx";
import Header from "../components/common/Header.jsx";

export default function FeedPage({ isDarkMode, toggleDarkMode }) {
  const [allProfiles, setAllProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect para buscar os dados
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

  // Lógica de busca
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

  const openModal = (profile) => setSelectedProfile(profile);
  const closeModal = () => setSelectedProfile(null);

  return (
    <div>
      <Header IsDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="container mx-auto p-6">
        <SearchBar onSearch={handleSearch} />

        {isLoading && <p className="text-center mt-8">Carregando perfis...</p>}

        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map((profile) => (
                <ProfileCard
                  key={profile.id}
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
