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
exports.marcaRoutes = void 0;
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const MarcaController_1 = require("../controllers/MarcaController");
const marcaRoutes = (0, express_1.Router)();
exports.marcaRoutes = marcaRoutes;
const marcaController = tsyringe_1.container.resolve(MarcaController_1.MarcaController);
// Rota POST - Criar um novo marca
marcaRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Marca = yield marcaController.create(req, res);
        res.status(201).json(Marca);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao criar marca", error: error.message });
    }
}));
// Rota GET - Procurar todas as marcas
marcaRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Marcas = yield marcaController.getAll(req, res);
        res.status(200).json(Marcas);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao procurar marcas", error: error.message });
    }
}));
// Rota GET - Procurar marca pelo ID
marcaRoutes.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Marca = yield marcaController.getById(req, res);
        if (!Marca) {
            res.status(404).json({ message: "Marca não encontrada" });
        }
        else {
            res.status(200).json(Marca);
        }
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao procurar marca", error: error.message });
    }
}));
// Rota PUT - Atualizar uma marca pelo ID
marcaRoutes.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Marca = yield marcaController.update(req, res);
        if (!Marca) {
            res.status(404).json({ message: "Marca não encontrada" });
        }
        else {
            res.status(200).json(Marca);
        }
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao atualizar marca", error: error.message });
    }
}));
// Rota DELETE - Remover uma marca pelo ID
marcaRoutes.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield marcaController.delete(req, res);
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: "Marca não encontrada" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao excluir marca", error: error.message });
    }
}));
