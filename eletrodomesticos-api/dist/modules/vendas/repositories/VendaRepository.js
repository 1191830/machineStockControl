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
exports.VendaRepository = void 0;
const AppDataSource_1 = require("../../../AppDataSource");
const venda_entity_1 = require("../../../entities/venda.entity");
const eletrodomestico_entity_1 = require("../../../entities/eletrodomestico.entity");
const tsyringe_1 = require("tsyringe");
let VendaRepository = class VendaRepository {
    constructor() {
        this.repository = AppDataSource_1.AppDataSource.getRepository(venda_entity_1.Venda);
        this.eletroRepository = AppDataSource_1.AppDataSource.getRepository(eletrodomestico_entity_1.Eletrodomestico);
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const eletro = yield this.eletroRepository.findOne({ where: { id: data.eletrodomestico_id } });
            if (!eletro) {
                throw new Error("Eletrodoméstico não encontrado");
            }
            const venda = this.repository.create({
                eletrodomestico: eletro,
                data_venda: data.data_venda,
                preco_venda: data.preco_venda,
                garantia_meses: data.garantia_meses,
                contacto_comprador: data.contacto_comprador,
            });
            const saved = yield this.repository.save(venda);
            yield this.eletroRepository.update(eletro.id, { finalizado: true });
            return saved;
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
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.update(id, data);
            return yield this.findById(id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const venda = yield this.repository.findOne({
                where: { id },
                relations: ["eletrodomestico"],
            });
            if (!venda) {
                return false;
            }
            const result = yield this.repository.delete(id);
            if (result.affected) {
                const eletro = venda.eletrodomestico;
                eletro.finalizado = false;
                yield this.eletroRepository.save(eletro);
                return true;
            }
            return false;
        });
    }
};
exports.VendaRepository = VendaRepository;
exports.VendaRepository = VendaRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], VendaRepository);
