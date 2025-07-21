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
exports.ArranjoRealizadoController = void 0;
const tsyringe_1 = require("tsyringe");
let ArranjoRealizadoController = class ArranjoRealizadoController {
    constructor(arranjoRealizadoService) {
        this.arranjoRealizadoService = arranjoRealizadoService;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.arranjoRealizadoService.create(req.body);
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.arranjoRealizadoService.findAll();
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.arranjoRealizadoService.findById(Number(req.params.id));
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.arranjoRealizadoService.update(Number(req.params.id), req.body);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.arranjoRealizadoService.delete(Number(req.params.id));
        });
    }
};
exports.ArranjoRealizadoController = ArranjoRealizadoController;
exports.ArranjoRealizadoController = ArranjoRealizadoController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IArranjoRealizadoService")),
    __metadata("design:paramtypes", [Object])
], ArranjoRealizadoController);
