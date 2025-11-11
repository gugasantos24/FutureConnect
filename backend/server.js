import express from 'express';
import cors from 'cors';
import fs from 'fs'; // File System para ler o arquivo
import path from 'path'; // Para lidar com caminhos de arquivos

// __dirname não existe em "type": "module", então usamos isso:
const __dirname = path.resolve(path.dirname(''));

const app = express();
const port = 5000; // O backend rodará na porta 5000

// Habilita o CORS para que seu app React (na porta 3000) possa fazer requisições
app.use(cors());

// Nosso endpoint principal da API
app.get('/api/profiles', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'profiles.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo profiles.json:", err);
      return res.status(500).send('Erro interno do servidor');
    }
    res.json(JSON.parse(data)); // Envia o JSON como resposta
  });
});

app.listen(port, () => {
  console.log(`🚀 Backend rodando em http://localhost:${port}`);
});