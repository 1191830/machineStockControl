"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const marca_entity_1 = require("./entities/marca.entity");
const tipoEletrodomestico_entity_1 = require("./entities/tipoEletrodomestico.entity");
const eletrodomestico_entity_1 = require("./entities/eletrodomestico.entity");
const historicoPrecoAnunciado_entity_1 = require("./entities/historicoPrecoAnunciado.entity");
const venda_entity_1 = require("./entities/venda.entity");
const arranjo_entity_1 = require("./entities/arranjo.entity");
const arranjoRealizado_entity_1 = require("./entities/arranjoRealizado.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true, // Só para desenvolvimento!
    logging: true,
    entities: [
        marca_entity_1.Marca,
        tipoEletrodomestico_entity_1.TipoEletrodomestico,
        eletrodomestico_entity_1.Eletrodomestico,
        historicoPrecoAnunciado_entity_1.HistoricoPrecoAnunciado,
        venda_entity_1.Venda,
        arranjo_entity_1.Arranjo,
        arranjoRealizado_entity_1.ArranjoRealizado,
    ],
    migrations: ["src/migrations/*.ts"],
});
