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
exports.vendaRoutes = void 0;
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const VendaController_1 = require("../controller/VendaController");
const vendaRoutes = (0, express_1.Router)();
exports.vendaRoutes = vendaRoutes;
const vendaController = tsyringe_1.container.resolve(VendaController_1.VendaController);
// Criar uma nova venda
vendaRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const venda = yield vendaController.create(req, res);
        res.status(201).json(venda);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao criar venda", error: error.message });
    }
}));
// Buscar todas as vendas
vendaRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendas = yield vendaController.getAll(req, res);
        res.status(200).json(vendas);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar vendas", error: error.message });
    }
}));
// Buscar venda por ID
vendaRoutes.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const venda = yield vendaController.getById(req, res);
        if (!venda) {
            res.status(404).json({ message: "Venda não encontrada" });
        }
        else {
            res.status(200).json(venda);
        }
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar venda", error: error.message });
    }
}));
// Atualizar venda
vendaRoutes.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const venda = yield vendaController.update(req, res);
        if (!venda) {
            res.status(404).json({ message: "Venda não encontrada" });
        }
        else {
            res.status(200).json(venda);
        }
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao atualizar venda", error: error.message });
    }
}));
// Remover venda
vendaRoutes.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield vendaController.delete(req, res);
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: "Venda não encontrada" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao excluir venda", error: error.message });
    }
}));
