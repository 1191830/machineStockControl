"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppDataSource_1 = require("./AppDataSource");
AppDataSource_1.AppDataSource.initialize()
    .then(() => {
    console.log("Banco de dados conectado com sucesso!");
})
    .catch((error) => console.error("Erro ao conectar no banco:", error));
