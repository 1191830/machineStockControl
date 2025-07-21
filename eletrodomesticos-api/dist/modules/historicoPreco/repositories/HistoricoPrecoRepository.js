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
exports.HistoricoPrecoRepository = void 0;
const AppDataSource_1 = require("../../../AppDataSource");
const historicoPrecoAnunciado_entity_1 = require("../../../entities/historicoPrecoAnunciado.entity");
const tsyringe_1 = require("tsyringe");
const eletrodomestico_entity_1 = require("../../../entities/eletrodomestico.entity");
let HistoricoPrecoRepository = class HistoricoPrecoRepository {
    constructor() {
        this.repository = AppDataSource_1.AppDataSource.getRepository(historicoPrecoAnunciado_entity_1.HistoricoPrecoAnunciado);
        this.eletrodomesticoRepository = AppDataSource_1.AppDataSource.getRepository(eletrodomestico_entity_1.Eletrodomestico);
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const eletrodomestico = yield this.eletrodomesticoRepository.findOne({ where: { id: data.eletrodomestico } });
            if (!eletrodomestico) {
                throw new Error("Eletrodoméstico não encontrado");
            }
            const historicoPreco = this.repository.create({
                eletrodomestico,
                preco_anunciado: data.preco_anunciado,
                data_alteracao: data.data_alteracao,
            });
            return yield this.repository.save(historicoPreco);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find({ relations: ["eletrodomestico"] });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne({ where: { id }, relations: ["eletrodomestico"] });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repository.delete(id);
            return result.affected ? true : false;
        });
    }
};
exports.HistoricoPrecoRepository = HistoricoPrecoRepository;
exports.HistoricoPrecoRepository = HistoricoPrecoRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], HistoricoPrecoRepository);
