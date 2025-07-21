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
exports.arranjoRealizadoRoutes = void 0;
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const ArranjoRealizadoController_1 = require("../controller/ArranjoRealizadoController");
const arranjoRealizadoRoutes = (0, express_1.Router)();
exports.arranjoRealizadoRoutes = arranjoRealizadoRoutes;
const arranjoController = tsyringe_1.container.resolve(ArranjoRealizadoController_1.ArranjoRealizadoController);
// Criar um novo arranjo
arranjoRealizadoRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const arranjo = yield arranjoController.create(req, res);
        res.status(201).json(arranjo);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao criar arranjo", error: error.message });
    }
}));
// Buscar todos os arranjos
arranjoRealizadoRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const arranjos = yield arranjoController.getAll(req, res);
        res.status(200).json(arranjos);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar arranjos", error: error.message });
    }
}));
// Buscar arranjo por ID
arranjoRealizadoRoutes.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const arranjo = yield arranjoController.getById(req, res);
        if (!arranjo) {
            res.status(404).json({ message: "Arranjo não encontrado" });
        }
        else {
            res.status(200).json(arranjo);
        }
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar arranjo", error: error.message });
    }
}));
// Atualizar arranjo
arranjoRealizadoRoutes.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const arranjo = yield arranjoController.update(req, res);
        if (!arranjo) {
            res.status(404).json({ message: "Arranjo não encontrado" });
        }
        else {
            res.status(200).json(arranjo);
        }
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao atualizar arranjo", error: error.message });
    }
}));
// Remover arranjo
arranjoRealizadoRoutes.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield arranjoController.delete(req, res);
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: "Arranjo não encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao excluir arranjo", error: error.message });
    }
}));
