"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.historicoPrecoRoutes = void 0;
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const HistoricoPrecoController_1 = require("../controllers/HistoricoPrecoController");
const historicoPrecoRoutes = (0, express_1.Router)();
exports.historicoPrecoRoutes = historicoPrecoRoutes;
const historicoPrecoController = tsyringe_1.container.resolve(HistoricoPrecoController_1.HistoricoPrecoController);
// Rota POST - Criar um novo historico
historicoPrecoRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const HistoricoPreco = yield historicoPrecoController.create(req, res);
        res.status(201).json(HistoricoPreco);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao criar historico", error: error.message });
    }
}));
// Rota GET - Procurar todos os historico
historicoPrecoRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const HistoricoPrecos = yield historicoPrecoController.getAll(req, res);
        res.status(200).json(HistoricoPrecos);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao procurar historico", error: error.message });
    }
}));
// Rota GET - Procurar historico pelo ID
historicoPrecoRoutes.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const HistoricoPreco = yield historicoPrecoController.getById(req, res);
        if (!HistoricoPreco) {
            res.status(404).json({ message: "Historico não encontrado" });
        }
        else {
            res.status(200).json(HistoricoPreco);
        }
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao procurar historico", error: error.message });
    }
}));
// Rota DELETE - Remover um historico pelo ID
historicoPrecoRoutes.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield historicoPrecoController.delete(req, res);
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: "Historico não encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao excluir Historico", error: error.message });
    }
}));
