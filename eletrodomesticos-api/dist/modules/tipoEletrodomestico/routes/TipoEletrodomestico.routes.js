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
exports.tipoEletrodomesticoRoutes = void 0;
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const TipoEletrodomesticoController_1 = require("../controllers/TipoEletrodomesticoController");
const tipoEletrodomesticoRoutes = (0, express_1.Router)();
exports.tipoEletrodomesticoRoutes = tipoEletrodomesticoRoutes;
const tipoEletrodomesticoController = tsyringe_1.container.resolve(TipoEletrodomesticoController_1.TipoEletrodomesticoController);
// Rota POST - Criar um novo eletrodoméstico
tipoEletrodomesticoRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const TipoEletrodomestico = yield tipoEletrodomesticoController.create(req, res);
        res.status(201).json(TipoEletrodomestico);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao criar eletrodoméstico", error: error.message });
    }
}));
// Rota GET - Buscar todos os eletrodomésticos
tipoEletrodomesticoRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const TipoEletrodomesticos = yield tipoEletrodomesticoController.getAll(req, res);
        res.status(200).json(TipoEletrodomesticos);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar eletrodomésticos", error: error.message });
    }
}));
// Rota GET - Buscar eletrodoméstico pelo ID
tipoEletrodomesticoRoutes.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const TipoEletrodomestico = yield tipoEletrodomesticoController.getById(req, res);
        if (!TipoEletrodomestico) {
            res.status(404).json({ message: "Eletrodoméstico não encontrado" });
        }
        else {
            res.status(200).json(TipoEletrodomestico);
        }
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar eletrodoméstico", error: error.message });
    }
}));
// Rota PUT - Atualizar um eletrodoméstico pelo ID
tipoEletrodomesticoRoutes.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const TipoEletrodomestico = yield tipoEletrodomesticoController.update(req, res);
        if (!TipoEletrodomestico) {
            res.status(404).json({ message: "Eletrodoméstico não encontrado" });
        }
        else {
            res.status(200).json(TipoEletrodomestico);
        }
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao atualizar eletrodoméstico", error: error.message });
    }
}));
// Rota DELETE - Remover um eletrodoméstico pelo ID
tipoEletrodomesticoRoutes.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield tipoEletrodomesticoController.delete(req, res);
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: "Eletrodoméstico não encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao excluir eletrodoméstico", error: error.message });
    }
}));
