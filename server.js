// Importar o framework Express para criar o servidor
import express from "express";
import routes from "./src/routes/postsRoutes.js";


// Criar uma instância do aplicativo Express
const app = express();
app.use(express.static("uploads"))
routes(app)

// Habilitar o parse de dados JSON em requisições
app.use(express.json());

// Iniciar o servidor ouvindo na porta 3000
app.listen(3000, () => {
  console.log("Servidor escutando na porta 3000..."); // Mensagem de log indicando que o servidor está ouvindo
});




