// server.ts
import express, { Request, Response } from "express";
import "reflect-metadata"
import "./container"
import { AppDataSource } from "./AppDataSource"; // Importe a configuração do TypeORM
import { marcaRoutes } from "./modules/marcas/routes/Marca.routes";
import { tipoEletrodomesticoRoutes } from "./modules/tipoEletrodomestico/routes/TipoEletrodomestico.routes";
import { eletrodomesticoRoutes } from "./modules/eletrodomesticos/routes/Eletrodomestico.routes";
import { historicoPrecoRoutes } from "./modules/historicoPreco/routes/HistoricoPreco.routes";

// Inicializa o Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Registra as rotas
app.use("/marcas", marcaRoutes);
app.use("/tiposEletrodomesticos", tipoEletrodomesticoRoutes);
app.use("/eletrodomesticos", eletrodomesticoRoutes);
app.use("/historico", historicoPrecoRoutes);

// Rota de teste para verificar se o servidor está ok
app.get("/", (req: Request, res: Response) => {
  res.send("Servidor está UP!");
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