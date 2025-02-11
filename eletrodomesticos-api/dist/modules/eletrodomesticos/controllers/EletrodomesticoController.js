"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.EletrodomesticoController = void 0;
const tsyringe_1 = require("tsyringe");
const EletrodomesticoService_1 = require("../services/EletrodomesticoService");
let EletrodomesticoController = class EletrodomesticoController {
    constructor(eletrodomesticoService) {
        this.eletrodomesticoService = eletrodomesticoService;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const eletrodomestico = yield this.eletrodomesticoService.create(req.body);
            return res.status(201).json(eletrodomestico);
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const eletrodomesticos = yield this.eletrodomesticoService.findAll();
            return res.json(eletrodomesticos);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const eletrodomestico = yield this.eletrodomesticoService.findById(Number(req.params.id));
            if (!eletrodomestico)
                return res.status(404).json({ message: "Eletrodoméstico não encontrado" });
            return res.json(eletrodomestico);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const eletrodomestico = yield this.eletrodomesticoService.update(Number(req.params.id), req.body);
            if (!eletrodomestico)
                return res.status(404).json({ message: "Eletrodoméstico não encontrado" });
            return res.json(eletrodomestico);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield this.eletrodomesticoService.delete(Number(req.params.id));
            if (!deleted)
                return res.status(404).json({ message: "Eletrodoméstico não encontrado" });
            return res.status(204).send();
        });
    }
};
exports.EletrodomesticoController = EletrodomesticoController;
exports.EletrodomesticoController = EletrodomesticoController = __decorate([
    __param(0, (0, tsyringe_1.inject)('EletrodomesticoService')),
    __metadata("design:paramtypes", [EletrodomesticoService_1.EletrodomesticoService])
], EletrodomesticoController);
