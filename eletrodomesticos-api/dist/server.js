"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
require("./container");
const cors_1 = __importDefault(require("cors"));
const AppDataSource_1 = require("./AppDataSource"); // Importe a configuração do TypeORM
const Marca_routes_1 = require("./modules/marcas/routes/Marca.routes");
const TipoEletrodomestico_routes_1 = require("./modules/tipoEletrodomestico/routes/TipoEletrodomestico.routes");
const HistoricoPreco_routes_1 = require("./modules/historicoPreco/routes/HistoricoPreco.routes");
const venda_routes_1 = require("./modules/vendas/routes/venda.routes");
const eletrodomestico_routes_1 = require("./modules/eletrodomesticos/routes/eletrodomestico.routes");
const arranjoRealizado_routes_1 = require("./modules/arranjosRealizados/routes/arranjoRealizado.routes");
// Inicializa o Express
const app = (0, express_1.default)();
// Middleware para parsear JSON
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // Apenas permitir frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express_1.default.json());
// Registra as rotas
app.use("/marcas", Marca_routes_1.marcaRoutes);
app.use("/tiposEletrodomesticos", TipoEletrodomestico_routes_1.tipoEletrodomesticoRoutes);
app.use("/eletrodomesticos", eletrodomestico_routes_1.eletrodomesticoRoutes);
app.use("/historico", HistoricoPreco_routes_1.historicoPrecoRoutes);
app.use("/vendas", venda_routes_1.vendaRoutes);
app.use("/arranjosRealizados", arranjoRealizado_routes_1.arranjoRealizadoRoutes);
// Rota de teste para verificar se o servidor está ok
app.get("/", (req, res) => {
    res.send("Servidor está UP!");
});
// Inicializa o TypeORM e inicia o servidor
AppDataSource_1.AppDataSource.initialize()
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
