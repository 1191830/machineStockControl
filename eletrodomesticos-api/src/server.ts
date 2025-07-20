import 'dotenv/config';
import express, { Request, Response } from "express";
import "reflect-metadata"
import "./container"
import cors from 'cors';
import { AppDataSource } from "./AppDataSource"; // Importe a configuração do TypeORM
import { marcaRoutes } from "./modules/marcas/routes/Marca.routes";
import { tipoEletrodomesticoRoutes } from "./modules/tipoEletrodomestico/routes/TipoEletrodomestico.routes";
import { historicoPrecoRoutes } from "./modules/historicoPreco/routes/HistoricoPreco.routes";
import { vendaRoutes } from './modules/vendas/routes/venda.routes';
import { eletrodomesticoRoutes } from './modules/eletrodomesticos/routes/eletrodomestico.routes';
import { arranjoRealizadoRoutes } from './modules/arranjosRealizados/routes/arranjoRealizado.routes';

// Inicializa o Express
const app = express();

// Middleware para parsear JSON
app.use(cors({
  origin: 'http://localhost:5173', // Apenas permitir frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Registra as rotas
app.use("/marcas", marcaRoutes);
app.use("/tiposEletrodomesticos", tipoEletrodomesticoRoutes);
app.use("/eletrodomesticos", eletrodomesticoRoutes);
app.use("/historico", historicoPrecoRoutes);
app.use("/vendas", vendaRoutes);
app.use("/arranjosRealizados", arranjoRealizadoRoutes);

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