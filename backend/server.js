import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const __dirname = path.resolve(path.dirname(""));

const app = express();
const port = 5000;

// Habilita o CORS
app.use(cors());

// Habilita o Express para entender JSON no corpo das requisições
app.use(express.json());

// --- Endpoint existente para buscar perfis ---
app.get("/api/profiles", (req, res) => {
  const filePath = path.join(__dirname, "data", "profiles.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo profiles.json:", err);
      return res.status(500).send("Erro interno do servidor");
    }
    res.json(JSON.parse(data)); // Envia o JSON como resposta
  });
});

app.post("/api/save-message", (req, res) => {
  const messagesFilePath = path.join(__dirname, "data", "messages.json");

  // 1. Pega os dados enviados pelo frontend
  const newMessage = {
    profileId: req.body.profileId,
    profileName: req.body.profileName,
    messageType: req.body.messageType,
    conteudo: req.body.messageText, 
    timestamp: new Date().toISOString(), 
  };

  // 2. Lê o arquivo de mensagens existente
  fs.readFile(messagesFilePath, "utf8", (err, data) => {
    let messages = [];
    if (!err && data) {
      try {
        messages = JSON.parse(data); // Converte a string JSON em array
      } catch (parseErr) {
        console.error("Erro ao parsear messages.json:", parseErr);
        return res.status(500).send("Erro ao processar dados existentes.");
      }
    }

    // 3. Adiciona a nova mensagem ao array
    messages.push(newMessage);

    // 4. Escreve o array completo de volta no arquivo
    fs.writeFile(
      messagesFilePath,
      JSON.stringify(messages, null, 2),
      "utf8",
      (writeErr) => {
        if (writeErr) {
          console.error("Erro ao salvar a mensagem:", writeErr);
          return res.status(500).send("Erro ao salvar a mensagem.");
        }

        console.log("Mensagem  enviada com sucesso!");
        // 5. Envia uma resposta de sucesso para o frontend
        res
          .status(201)
          .json({ success: true, message: "Mensagem enviada com sucesso!" });
      }
    );
  });
});

app.listen(port, () => {
  console.log(`🚀 Backend rodando em http://localhost:${port}`);
});
