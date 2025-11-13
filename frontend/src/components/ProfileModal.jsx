import { X } from "lucide-react";
import { useState } from "react"; // 1. IMPORTAR O useSTATE

export default function ProfileModal({ profile, onClose }) {
  // 2. ESTADOS PARA CONTROLAR O FORMULÁRIO
  const [messageMode, setMessageMode] = useState(null); // 'message', 'recommend', ou null
  const [messageText, setMessageText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 3. FUNÇÃO PARA ENVIAR A MENSAGEM AO BACKEND
  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim()) {
      alert("Por favor, escreva uma mensagem.");
      return;
    }

    setIsSubmitting(true);

    // Objeto da mensagem que será salvo no JSON
    const messageData = {
      profileId: profile.Id,
      profileName: profile.nome,
      type: messageMode, // 'message' ou 'recommend'
      text: messageText,
      timestamp: new Date().toISOString(),
    };

    try {
      // Faz a requisição POST para o backend
      const response = await fetch("http://localhost:5000/api/save-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      if (!response.ok) {
        throw new Error("Falha ao salvar a mensagem.");
      }

      await response.json();

      alert(
        `Sua ${
          messageMode === "message" ? "mensagem" : "recomendação"
        } foi enviada!`
      );

      // Limpa e fecha o formulário
      setMessageText("");
      setMessageMode(null);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      alert("Houve um erro ao enviar sua mensagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. COMPONENTE INTERNO DO FORMULÁRIO DE MENSAGEM
  const MessageForm = () => (
    <form onSubmit={handleSubmitMessage} className="mt-4">
      <h5 className="text-lg font-semibold mb-2">
        {messageMode === "message"
          ? `Enviar Mensagem para ${profile.nome}`
          : `Recomendar ${profile.nome}`}
      </h5>
      <textarea
        className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        rows="4"
        placeholder="Digite sua mensagem aqui..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        autoFocus
      />
      <div className="flex justify-end gap-3 mt-3">
        <button
          type="button"
          onClick={() => {
            setMessageMode(null);
            setMessageText("");
          }}
          className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Confirmar Envio"}
        </button>
      </div>
    </form>
  );

  return (
    // Overlay
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 cursor-pointer"
      onClick={onClose} // Fecha ao clicar fora
    >
      {/* Conteúdo do Modal */}
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Impede de fechar ao clicar dentro
      >
        {/* Header do Modal */}
        <div className="flex justify-end p-1">
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X size={16} />
          </button>
        </div>

        {/* --- CORPO DO MODAL (NÃO FOI ALTERADO) --- */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={profile.foto}
              alt={profile.nome}
              className="w-32 h-32 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">
                {profile.nome}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {profile.cargo}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {profile.localizacao}
              </p>
              <p className="mt-2">{profile.resumo}</p>
            </div>
          </div>

          {/* Informações Pessoais e Acadêmicas*/}
          <div className="mt-6">
            <h4 className="text-lg font-semibold border-b dark:border-gray-700 pb-1 mb-2">
              Formação Acadêmica
            </h4>
            {profile.formacao.map((form) => (
              <div key={`${form.instituicao}-${form.curso}`} className="mb-2">
                <p className="font-bold">{form.curso}</p>
                <p className="text-sm">
                  {form.instituicao} - {form.ano}
                </p>
              </div>
            ))}
          </div>

          {/* Experiências e Habilidades */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold border-b dark:border-gray-700 pb-1 mb-2">
              Experiências
            </h4>
            {profile.experiencias.map((exp) => (
              <div key={`${exp.empresa}-${exp.cargo}`} className="mb-2">
                <p className="font-bold">
                  {exp.cargo} @ {exp.empresa}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {exp.inicio} - {exp.fim}
                </p>
                <p className="text-sm">{exp.descricao}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-semibold border-b dark:border-gray-700 pb-1 mb-2">
              Habilidades Técnicas
            </h4>
            <div className="flex flex-wrap gap-2">
              {profile.habilidadesTecnicas.map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Soft Skills e Hobbies */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold border-b dark:border-gray-700 pb-1 mb-2">
              Soft Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {profile.softSkills.map((skill) => (
                <span
                  key={skill}
                  className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-700">
          {/* Mostra o formulário se messageMode NÃO for nulo */}
          {messageMode ? (
            <MessageForm />
          ) : (
            // Mostra os botões originais se messageMode FOR nulo
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setMessageMode("message")} // <--- Lógica alterada
                className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Enviar Mensagem
              </button>
              <button
                onClick={() => setMessageMode("recommend")} // <--- Lógica alterada
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Recomendar Profissional
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
