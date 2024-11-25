import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const corsOptions = {
  origin:"http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configuração do armazenamento de arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para os uploads (pasta 'uploads/')
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo enviado
    cb(null, file.originalname);
  }
})

// Configuração do middleware Multer
const upload = multer({ dest: "./uploads" , storage})
// Linux ou macOS (comentado): caso queira salvar diretamente na pasta uploads, descomente a linha abaixo
// const upload = multer({dest:"./uploads"})

// Função para definir as rotas da aplicação
const routes = (app) => {
  // Habilitar o parse de dados JSON em requisições
  app.use(express.json());

  app.use(cors(corsOptions));

  // Rota GET /posts: recupera todos os posts (implementada em postsController.js)
  app.get("/posts", listarPosts);

  // Rota POST /posts: cria um novo post (implementada em postsController.js)
  app.post("/posts", postarNovoPost);

  // Rota POST /upload: realiza upload de imagem e cria um novo post (implementada em postsController.js)
  app.post("/upload", upload.single("imagem"), uploadImagem);
  app.put("/upload/:id", atualizarNovoPost)
};

export default routes;