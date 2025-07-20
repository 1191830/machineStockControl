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
exports.ArranjoRealizado = void 0;
const typeorm_1 = require("typeorm");
const eletrodomestico_entity_1 = require("./eletrodomestico.entity");
let ArranjoRealizado = class ArranjoRealizado {
};
exports.ArranjoRealizado = ArranjoRealizado;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ArranjoRealizado.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => eletrodomestico_entity_1.Eletrodomestico, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: "eletrodomestico_id" }),
    __metadata("design:type", eletrodomestico_entity_1.Eletrodomestico)
], ArranjoRealizado.prototype, "eletrodomestico", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], ArranjoRealizado.prototype, "data_arranjo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], ArranjoRealizado.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ArranjoRealizado.prototype, "custo_materiais", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ArranjoRealizado.prototype, "preco_pago_cliente", void 0);
exports.ArranjoRealizado = ArranjoRealizado = __decorate([
    (0, typeorm_1.Entity)("arranjos_realizados")
], ArranjoRealizado);
