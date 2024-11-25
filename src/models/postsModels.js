import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js"

// Conectar ao banco de dados usando a string de conexão fornecida no ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts do banco de dados
export async function getTodosPosts() {
    // Acessar a conexão com o banco de dados
    const db = conexao.db("nodejs-imersao");  // Obter o banco de dados chamado "nodejs-imersao"
    // Acessar a coleção "posts" dentro do banco de dados
    const colecao = db.collection("posts");
    // Usar o método find para recuperar todos os documentos da coleção
    // e convertê-los em um array usando toArray
    return colecao.find().toArray();
  }
  
  export async function criarPost(novoPost) {
     const db = conexao.db("nodejs-imersao"); 
     const colecao = db.collection("posts");
     return colecao.insertOne(novoPost);  
  }

  export async function atualizarPost(id, novoPost) {
   const db = conexao.db("nodejs-imersao"); 
   const colecao = db.collection("posts");
   const objID = ObjectId.createFromHexString(id)
   return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});  
}