// src/container/index.ts
import { container } from "tsyringe";
import { EletrodomesticoController } from "../modules/eletrodomesticos/controllers/EletrodomesticoController";
import { EletrodomesticoService } from "../modules/eletrodomesticos/services/EletrodomesticoService";
import { IEletrodomesticoRepository } from "../modules/eletrodomesticos/repositories/IEletrodomesticoRepository";
import { EletrodomesticoRepository } from "../modules/eletrodomesticos/repositories/EletrodomesticoRepository";
import { IEletrodomesticoService } from "../modules/eletrodomesticos/services/IEletrodomesticoService";
import { MarcaController } from "../modules/marcas/controllers/MarcaController";
import { IMarcaRepository } from "../modules/marcas/repositories/IMarcaRepository";
import { MarcaRepository } from "../modules/marcas/repositories/MarcaRepository";
import { IMarcaService } from "../modules/marcas/services/IMarcaService";
import { MarcaService } from "../modules/marcas/services/MarcaService";
import { TipoEletrodomesticoController } from "../modules/tipoEletrodomestico/controllers/TipoEletrodomesticoController";
import { ITipoEletrodomesticoRepository } from "../modules/tipoEletrodomestico/repositories/ITipoEletrodomesticoRepository";
import { TipoEletrodomesticoRepository } from "../modules/tipoEletrodomestico/repositories/TipoEletrodomesticoRepository";
import { ITipoEletrodomesticoService } from "../modules/tipoEletrodomestico/services/ITipoEletrodomesticoService";
import { TipoEletrodomesticoService } from "../modules/tipoEletrodomestico/services/TipoEletrodomesticoService";
import { HistoricoPrecoController } from "../modules/historicoPreco/controllers/HistoricoPrecoController";
import { HistoricoPrecoRepository } from "../modules/historicoPreco/repositories/HistoricoPrecoRepository";
import { IHistoricoPrecoRepository } from "../modules/historicoPreco/repositories/IHistoricoPrecoRepository";
import { HistoricoPrecoService } from "../modules/historicoPreco/services/HistoricoPrecoService";
import { IHistoricoPrecoService } from "../modules/historicoPreco/services/IHistoricoPrecoService";
// ELETRODOMESTICOS
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

// MARCAS
// Registrar o serviço com a interface
container.registerSingleton<IMarcaService>(
  "IMarcaService",
  MarcaService
);

// Registrar o repositório com a interface
container.registerSingleton<IMarcaRepository>(
  "IMarcaRepository",
  MarcaRepository
);

// Registrar o controller
container.registerSingleton<MarcaController>(
  MarcaController
);

// TIPOS ELETRODOMESTICO
// Registrar o serviço com a interface
container.registerSingleton<ITipoEletrodomesticoService>(
  "ITipoEletrodomesticoService",
  TipoEletrodomesticoService
);

// Registrar o repositório com a interface
container.registerSingleton<ITipoEletrodomesticoRepository>(
  "ITipoEletrodomesticoRepository",
  TipoEletrodomesticoRepository
);

// Registrar o controller
container.registerSingleton<TipoEletrodomesticoController>(
  TipoEletrodomesticoController
);

// HISTORICO
// Registrar o serviço com a interface
container.registerSingleton<IHistoricoPrecoService>(
  "IHistoricoPrecoService",
  HistoricoPrecoService
);

// Registrar o repositório com a interface
container.registerSingleton<IHistoricoPrecoRepository>(
  "IHistoricoPrecoRepository",
  HistoricoPrecoRepository
);

// Registrar o controller
container.registerSingleton<HistoricoPrecoController>(
  HistoricoPrecoController
);