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
exports.Eletrodomestico = exports.TipoEletrodomesticoEnum = void 0;
const typeorm_1 = require("typeorm");
const marca_entity_1 = require("./marca.entity");
const tipoEletrodomestico_entity_1 = require("./tipoEletrodomestico.entity");
var TipoEletrodomesticoEnum;
(function (TipoEletrodomesticoEnum) {
    TipoEletrodomesticoEnum["VENDA"] = "VENDA";
    TipoEletrodomesticoEnum["ARRANJO"] = "ARRANJO";
})(TipoEletrodomesticoEnum || (exports.TipoEletrodomesticoEnum = TipoEletrodomesticoEnum = {}));
let Eletrodomestico = class Eletrodomestico {
};
exports.Eletrodomestico = Eletrodomestico;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Eletrodomestico.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], Eletrodomestico.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Eletrodomestico.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], Eletrodomestico.prototype, "data_compra", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Eletrodomestico.prototype, "preco_compra", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Eletrodomestico.prototype, "preco_anunciado_atual", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: TipoEletrodomesticoEnum
    }),
    __metadata("design:type", String)
], Eletrodomestico.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => marca_entity_1.Marca, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: "marca_id" }),
    __metadata("design:type", marca_entity_1.Marca)
], Eletrodomestico.prototype, "marca", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tipoEletrodomestico_entity_1.TipoEletrodomestico, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: "tipo_id" }),
    __metadata("design:type", tipoEletrodomestico_entity_1.TipoEletrodomestico)
], Eletrodomestico.prototype, "tipoEletrodomestico", void 0);
exports.Eletrodomestico = Eletrodomestico = __decorate([
    (0, typeorm_1.Entity)("eletrodomesticos")
], Eletrodomestico);
