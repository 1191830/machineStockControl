// server.ts
import express, { Request, Response } from "express";
import "reflect-metadata"
import "./container"
import { eletrodomesticoRoutes } from "./modules/eletrodomesticos/routes/eletrodomestico.routes";
import { AppDataSource } from "./AppDataSource"; // Importe a configuração do TypeORM

// Inicializa o Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Registra as rotas
app.use("/eletrodomesticos", eletrodomesticoRoutes);

// Rota de teste para verificar se o servidor está funcionando
app.get("/", (req: Request, res: Response) => {
  res.send("Servidor está rodando!");
});

// Inicializa o TypeORM e inicia o servidor
AppDataSource.initialize()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");

    // Inicia o servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });