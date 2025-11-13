import {
  X,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  Award,
  Globe,
  Link as LinkIcon,
  Building,
  Calendar,
  Layers,
} from "lucide-react";

// --- Sub-componentes para Boa Prática ---

// Componente para Título de Seção
function ModalSection({ title, icon, children }) {
  const Icon = icon; // Permite usar o ícone como um componente
  return (
    <div className="mt-6">
      <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200 border-b dark:border-gray-700 pb-2 mb-3">
        <Icon size={20} className="text-blue-600 dark:text-blue-400" />
        {title}
      </h4>
      {children}
    </div>
  );
}

// Componente para "Pills" (Skills, Interesses)
function Pill({ text, color = "blue" }) {
  const colors = {
    blue: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
    green: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
    purple:
      "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200",
    yellow:
      "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
  };
  return (
    <span
      className={`text-sm font-medium px-3 py-1 rounded-full ${colors[color]}`}
    >
      {text}
    </span>
  );
}

// Componente para linha de informação (Ex: Localização, Área)
function InfoItem({ icon, text }) {
  const Icon = icon;
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
      <Icon size={14} />
      <span>{text}</span>
    </div>
  );
}

export default function ProfileModal({ profile, onClose }) {
  // Fallback para o "arealnteresses" no seu JSON de exemplo
  const interesses = profile.areaInteresses || profile.arealnteresses || [];

  return (
    // Overlay
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 cursor-pointer"
      onClick={onClose} // Fecha ao clicar fora
    >
      {/* Conteúdo do Modal */}
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ scrollbarWidth: "thin" }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 px-6 py-4 flex justify-between items-center border-b dark:border-gray-700 z-10">
          <h2 className="text-xl font-bold">{profile.nome}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Corpo do Modal*/}
        <div className="p-6">
          {/* Seção de Perfil Principal */}
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={profile.foto}
              alt={profile.nome}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">
                {profile.cargo}
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                {profile.resumo}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4">
                <InfoItem icon={MapPin} text={profile.localizacao} />
                <InfoItem icon={Layers} text={profile.area} />
              </div>
            </div>
          </div>

          {/* Habilidades Técnicas */}
          <ModalSection title="Habilidades Técnicas" icon={Briefcase}>
            <div className="flex flex-wrap gap-2">
              {profile.habilidadesTecnicas.map((skill) => (
                <Pill key={skill} text={skill} color="blue" />
              ))}
            </div>
          </ModalSection>

          {/* Soft Skills */}
          <ModalSection title="Soft Skills" icon={Sparkles}>
            <div className="flex flex-wrap gap-2">
              {profile.softSkills.map((skill) => (
                <Pill key={skill} text={skill} color="green" />
              ))}
            </div>
          </ModalSection>

          {/* Experiências */}
          <ModalSection title="Experiências" icon={Briefcase}>
            {profile.experiencias.map((exp, index) => (
              <div key={index} className="mb-4 last:mb-0 relative pl-6">
                {/* Linha do tempo minimalista */}
                <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                <div className="absolute left-[3px] top-1 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>

                <p className="font-bold text-gray-800 dark:text-gray-200">
                  {exp.cargo}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Building size={14} />
                  <span>{exp.empresa}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                  <Calendar size={14} />
                  <span>
                    {exp.inicio} - {exp.fim}
                  </span>
                </div>
                <p className="text-sm mt-1">{exp.descricao}</p>
              </div>
            ))}
          </ModalSection>

          {/* Formação Acadêmica */}
          <ModalSection title="Formação Acadêmica" icon={GraduationCap}>
            {profile.formacao.map((form, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <p className="font-bold">{form.curso}</p>
                <p className="text-sm">
                  {form.instituicao} - {form.ano}
                </p>
              </div>
            ))}
          </ModalSection>

          {/* Projetos */}
          {profile.projetos && profile.projetos.length > 0 && (
            <ModalSection title="Projetos" icon={LinkIcon}>
              {profile.projetos.map((proj, index) => (
                <div key={index} className="mb-3 last:mb-0">
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    {proj.titulo} <LinkIcon size={14} />
                  </a>
                  <p className="text-sm">{proj.descricao}</p>
                </div>
              ))}
            </ModalSection>
          )}

          {/* Certificações */}
          {profile.certificacoes && profile.certificacoes.length > 0 && (
            <ModalSection title="Certificações" icon={Award}>
              <div className="flex flex-wrap gap-2">
                {profile.certificacoes.map((cert) => (
                  <Pill key={cert} text={cert} color="yellow" />
                ))}
              </div>
            </ModalSection>
          )}

          {/* Idiomas */}
          {profile.idiomas && profile.idiomas.length > 0 && (
            <ModalSection title="Idiomas" icon={Globe}>
              {profile.idiomas.map((lang, index) => (
                <p key={index} className="text-sm">
                  <span className="font-bold">{lang.idioma}:</span> {lang.nivel}
                </p>
              ))}
            </ModalSection>
          )}

          {/* Interesses */}
          {interesses.length > 0 && (
            <ModalSection title="Tópicos de Interesse" icon={Sparkles}>
              <div className="flex flex-wrap gap-2">
                {interesses.map((item) => (
                  <Pill key={item} text={item} color="purple" />
                ))}
              </div>
            </ModalSection>
          )}
        </div>

        {/*Botões*/}
        <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900 p-4 border-t dark:border-gray-700 flex justify-end gap-3 z-10">
          <button
            onClick={() => alert(`Enviando mensagem para ${profile.nome}`)}
            className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Enviar Mensagem
          </button>
          <button
            onClick={() => alert(`Recomendando ${profile.nome}`)}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Recomendar
          </button>
        </div>
      </div>
    </div>
  );
}
