"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const EletrodomesticoRepository_1 = require("../../modules/eletrodomesticos/repositories/EletrodomesticoRepository");
const EletrodomesticoService_1 = require("../../modules/eletrodomesticos/services/EletrodomesticoService");
const EletrodomesticoController_1 = require("../../modules/eletrodomesticos/controllers/EletrodomesticoController");
tsyringe_1.container.register('EletrodomesticoRepository', {
    useClass: EletrodomesticoRepository_1.EletrodomesticoRepository,
});
tsyringe_1.container.register('EletrodomesticoService', {
    useClass: EletrodomesticoService_1.EletrodomesticoService,
});
tsyringe_1.container.register('EletrodomesticoController', {
    useClass: EletrodomesticoController_1.EletrodomesticoController,
});
