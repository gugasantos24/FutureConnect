import { X } from 'lucide-react';

export default function ProfileModal({ profile, onClose }) {
  
  // Funções para os botões de ação
  const handleRecommend = () => {
    alert(`Você recomendou ${profile.nome}!`);
  };

  const handleSendMessage = () => {
    alert(`Você está enviando uma mensagem para ${profile.nome}!`);
  };

  return (
    // Overlay
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 cursor-pointer"
      onClick={onClose} // Fecha ao clicar fora
    >
      {/* Conteúdo do Modal */}
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()} // Impede de fechar ao clicar dentro
      >
        {/* Header do Modal */}
        <div className="flex justify-end p-1">
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <X size={16} />
          </button>
        </div>

        {/* Corpo do Modal */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img 
              src={profile.foto} 
              alt={profile.nome} 
              className="w-32 h-32 rounded-full object-cover" 
            />
            <div>
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">{profile.nome}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{profile.cargo}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{profile.localizacao}</p>
              <p className="mt-2">{profile.resumo}</p>
            </div>
          </div>

          {/* Informações Pessoais e Acadêmicas*/}
          <div className="mt-6">
            <h4 className="text-lg font-semibold border-b dark:border-gray-700 pb-1 mb-2">Formação Acadêmica</h4>
            {profile.formacao.map((form) => (
              <div key={`${form.instituicao}-${form.curso}`} className="mb-2">
                <p className="font-bold">{form.curso}</p>
                <p className="text-sm">{form.instituicao} - {form.ano}</p>
              </div>
            ))}
          </div>

          {/* Experiências e Habilidades [cite: 22] */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold border-b dark:border-gray-700 pb-1 mb-2">Experiências</h4>
            {profile.experiencias.map((exp) => (
              <div key={`${exp.empresa}-${exp.cargo}`} className="mb-2">
                <p className="font-bold">{exp.cargo} @ {exp.empresa}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{exp.inicio} - {exp.fim}</p>
                <p className="text-sm">{exp.descricao}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <h4 className="text-lg font-semibold border-b dark:border-gray-700 pb-1 mb-2">Habilidades Técnicas</h4>
            <div className="flex flex-wrap gap-2">
              {profile.habilidadesTecnicas.map(skill => (
                <span key={skill} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          {/* Soft Skills e Hobbies (Interesses) [cite: 23] */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold border-b dark:border-gray-700 pb-1 mb-2">Soft Skills</h4>
            <div className="flex flex-wrap gap-2">
              {profile.softSkills.map(skill => (
                <span key={skill} className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer com Botões [cite: 24] */}
        <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-700 flex justify-end gap-3">
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Enviar Mensagem
          </button>
          <button
            onClick={handleRecommend}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Recomendar Profissional
          </button>
        </div>
      </div>
    </div>
  );
}