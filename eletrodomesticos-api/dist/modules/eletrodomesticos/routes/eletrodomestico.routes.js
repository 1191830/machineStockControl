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
exports.eletrodomesticoRoutes = void 0;
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const EletrodomesticoController_1 = require("../controllers/EletrodomesticoController");
const eletrodomesticoRoutes = (0, express_1.Router)();
exports.eletrodomesticoRoutes = eletrodomesticoRoutes;
const eletrodomesticoController = tsyringe_1.container.resolve(EletrodomesticoController_1.EletrodomesticoController);
// Rota POST - Criar um novo eletrodoméstico
eletrodomesticoRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eletrodomestico = yield eletrodomesticoController.create(req, res);
        res.status(201).json(eletrodomestico);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao criar eletrodoméstico", error: error.message });
    }
}));
// Rota GET - Buscar todos os eletrodomésticos
eletrodomesticoRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eletrodomesticos = yield eletrodomesticoController.getAll(req, res);
        res.status(200).json(eletrodomesticos);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar eletrodomésticos", error: error.message });
    }
}));
// Rota GET - Buscar eletrodoméstico pelo ID
eletrodomesticoRoutes.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eletrodomestico = yield eletrodomesticoController.getById(req, res);
        if (!eletrodomestico) {
            res.status(404).json({ message: "Eletrodoméstico não encontrado" });
        }
        else {
            res.status(200).json(eletrodomestico);
        }
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar eletrodoméstico", error: error.message });
    }
}));
// Rota PUT - Atualizar um eletrodoméstico pelo ID
eletrodomesticoRoutes.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eletrodomestico = yield eletrodomesticoController.update(req, res);
        if (!eletrodomestico) {
            res.status(404).json({ message: "Eletrodoméstico não encontrado" });
        }
        else {
            res.status(200).json(eletrodomestico);
        }
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao atualizar eletrodoméstico", error: error.message });
    }
}));
// Rota DELETE - Remover um eletrodoméstico pelo ID
eletrodomesticoRoutes.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield eletrodomesticoController.delete(req, res);
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
