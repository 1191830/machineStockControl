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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venda = void 0;
const typeorm_1 = require("typeorm");
const eletrodomestico_entity_1 = require("./eletrodomestico.entity");
let Venda = class Venda {
};
exports.Venda = Venda;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Venda.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => eletrodomestico_entity_1.Eletrodomestico, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: "eletrodomestico_id" }),
    __metadata("design:type", eletrodomestico_entity_1.Eletrodomestico)
], Venda.prototype, "eletrodomestico", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], Venda.prototype, "data_venda", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Venda.prototype, "preco_venda", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], Venda.prototype, "garantia_meses", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
    __metadata("design:type", String)
], Venda.prototype, "contacto_comprador", void 0);
exports.Venda = Venda = __decorate([
    (0, typeorm_1.Entity)("vendas")
], Venda);
