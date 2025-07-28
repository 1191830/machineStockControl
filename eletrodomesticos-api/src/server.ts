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
import { seedDatabase } from './database/seeds';
import { initRedis } from './config/redis';
import { dashboardRoutes } from './modules/dashboard/routes/dashboard.routes';


// Inicializa o Express
const app = express();

// Middleware para parsear JSON
const allowedOrigins = [
  'http://localhost:5173',
  'https://machinestockcontrol.pages.dev',
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin like curl or Postman
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
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
app.use("/dashboard", dashboardRoutes);

// Rota de teste para verificar se o servidor está ok
app.get("/", (req: Request, res: Response) => {
  res.send("Servidor está UP!");
});

// Inicializa o TypeORM e inicia o servidor
AppDataSource.initialize()
  .then(async () => {
    console.log("✅ Conexão com o banco de dados estabelecida!");
    
    await initRedis();
    
    await seedDatabase();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Erro ao iniciar aplicação:", error);
  });