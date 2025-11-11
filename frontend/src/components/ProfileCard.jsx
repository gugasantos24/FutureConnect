import React from 'react';

export default function ProfileCard({ profile, onCardClick }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
      onClick={onCardClick}
    >
      <img 
        className="w-full h-48 object-cover" 
        src={profile.foto} 
        alt={`Foto de ${profile.nome}`} 
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{profile.nome}</h3>
        <p className="text-blue-600 dark:text-blue-400 text-sm mb-2">{profile.cargo}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {/* Mostra as 3 primeiras skills */}
          {profile.habilidadesTecnicas.slice(0, 3).map(skill => (
            <span 
              key={skill}
              className="text-xs bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}