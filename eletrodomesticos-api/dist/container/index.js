"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/container/index.ts
const tsyringe_1 = require("tsyringe");
const EletrodomesticoController_1 = require("../modules/eletrodomesticos/controllers/EletrodomesticoController");
const EletrodomesticoService_1 = require("../modules/eletrodomesticos/services/EletrodomesticoService");
const EletrodomesticoRepository_1 = require("../modules/eletrodomesticos/repositories/EletrodomesticoRepository");
const MarcaController_1 = require("../modules/marcas/controllers/MarcaController");
const MarcaRepository_1 = require("../modules/marcas/repositories/MarcaRepository");
const MarcaService_1 = require("../modules/marcas/services/MarcaService");
const TipoEletrodomesticoController_1 = require("../modules/tipoEletrodomestico/controllers/TipoEletrodomesticoController");
const TipoEletrodomesticoRepository_1 = require("../modules/tipoEletrodomestico/repositories/TipoEletrodomesticoRepository");
const TipoEletrodomesticoService_1 = require("../modules/tipoEletrodomestico/services/TipoEletrodomesticoService");
const HistoricoPrecoController_1 = require("../modules/historicoPreco/controllers/HistoricoPrecoController");
const HistoricoPrecoRepository_1 = require("../modules/historicoPreco/repositories/HistoricoPrecoRepository");
const HistoricoPrecoService_1 = require("../modules/historicoPreco/services/HistoricoPrecoService");
const VendaController_1 = require("../modules/vendas/controller/VendaController");
const VendaService_1 = require("../modules/vendas/service/VendaService");
const VendaRepository_1 = require("../modules/vendas/repositories/VendaRepository");
const ArranjoRealizadoController_1 = require("../modules/arranjosRealizados/controller/ArranjoRealizadoController");
const ArranjoRealizadoService_1 = require("../modules/arranjosRealizados/service/ArranjoRealizadoService");
const ArranjoRealizadoRepository_1 = require("../modules/arranjosRealizados/repositories/ArranjoRealizadoRepository");
// ELETRODOMESTICOS
// Registrar o serviço com a interface
tsyringe_1.container.registerSingleton("IEletrodomesticoService", EletrodomesticoService_1.EletrodomesticoService);
// Registrar o repositório com a interface
tsyringe_1.container.registerSingleton("IEletrodomesticoRepository", EletrodomesticoRepository_1.EletrodomesticoRepository);
// Registrar o controller
tsyringe_1.container.registerSingleton(EletrodomesticoController_1.EletrodomesticoController);
// MARCAS
// Registrar o serviço com a interface
tsyringe_1.container.registerSingleton("IMarcaService", MarcaService_1.MarcaService);
// Registrar o repositório com a interface
tsyringe_1.container.registerSingleton("IMarcaRepository", MarcaRepository_1.MarcaRepository);
// Registrar o controller
tsyringe_1.container.registerSingleton(MarcaController_1.MarcaController);
// TIPOS ELETRODOMESTICO
// Registrar o serviço com a interface
tsyringe_1.container.registerSingleton("ITipoEletrodomesticoService", TipoEletrodomesticoService_1.TipoEletrodomesticoService);
// Registrar o repositório com a interface
tsyringe_1.container.registerSingleton("ITipoEletrodomesticoRepository", TipoEletrodomesticoRepository_1.TipoEletrodomesticoRepository);
// Registrar o controller
tsyringe_1.container.registerSingleton(TipoEletrodomesticoController_1.TipoEletrodomesticoController);
// HISTORICO
// Registrar o serviço com a interface
tsyringe_1.container.registerSingleton("IHistoricoPrecoService", HistoricoPrecoService_1.HistoricoPrecoService);
// Registrar o repositório com a interface
tsyringe_1.container.registerSingleton("IHistoricoPrecoRepository", HistoricoPrecoRepository_1.HistoricoPrecoRepository);
// Registrar o controller
tsyringe_1.container.registerSingleton(HistoricoPrecoController_1.HistoricoPrecoController);
//VENDAS
// Registrar o serviço com a interface
tsyringe_1.container.registerSingleton("IVendaService", VendaService_1.VendaService);
// Registrar o repositório com a interface
tsyringe_1.container.registerSingleton("IVendaRepository", VendaRepository_1.VendaRepository);
// Registrar o controller
tsyringe_1.container.registerSingleton(VendaController_1.VendaController);
//ARRANJOS REALIZADOS
// Registrar o serviço com a interface
tsyringe_1.container.registerSingleton("IArranjoRealizadoService", ArranjoRealizadoService_1.ArranjoRealizadoService);
// Registrar o repositório com a interface
tsyringe_1.container.registerSingleton("IArranjoRealizadoRepository", ArranjoRealizadoRepository_1.ArranjoRealizadoRepository);
// Registrar o controller
tsyringe_1.container.registerSingleton(ArranjoRealizadoController_1.ArranjoRealizadoController);
