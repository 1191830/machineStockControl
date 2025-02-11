// src/container/index.ts
import { container } from "tsyringe";
import { EletrodomesticoController } from "../modules/eletrodomesticos/controllers/EletrodomesticoController";
import { EletrodomesticoService } from "../modules/eletrodomesticos/services/EletrodomesticoService";
import { IEletrodomesticoRepository } from "../modules/eletrodomesticos/repositories/IEletrodomesticoRepository";
import { EletrodomesticoRepository } from "../modules/eletrodomesticos/repositories/EletrodomesticoRepository";
import { IEletrodomesticoService } from "../modules/eletrodomesticos/services/IEletrodomesticoService";

// Registrar o serviço com a interface
container.registerSingleton<IEletrodomesticoService>(
  "IEletrodomesticoService",
  EletrodomesticoService
);

// Registrar o repositório com a interface
container.registerSingleton<IEletrodomesticoRepository>(
  "IEletrodomesticoRepository",
  EletrodomesticoRepository
);

// Registrar o controller
container.registerSingleton<EletrodomesticoController>(
  EletrodomesticoController
);