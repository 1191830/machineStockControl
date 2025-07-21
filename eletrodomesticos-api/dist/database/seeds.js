"use strict";
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
require("reflect-metadata");
const AppDataSource_1 = require("../AppDataSource");
const eletrodomestico_entity_1 = require("../entities/eletrodomestico.entity");
const marca_entity_1 = require("../entities/marca.entity");
const tipoEletrodomestico_entity_1 = require("../entities/tipoEletrodomestico.entity");
const historicoPrecoAnunciado_entity_1 = require("../entities/historicoPrecoAnunciado.entity");
const arranjo_entity_1 = require("../entities/arranjo.entity");
const arranjoRealizado_entity_1 = require("../entities/arranjoRealizado.entity");
const venda_entity_1 = require("../entities/venda.entity");
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("🚀 Conectando ao banco de dados...");
        yield AppDataSource_1.AppDataSource.initialize();
        const marcaRepo = AppDataSource_1.AppDataSource.getRepository(marca_entity_1.Marca);
        const tipoRepo = AppDataSource_1.AppDataSource.getRepository(tipoEletrodomestico_entity_1.TipoEletrodomestico);
        const eletroRepo = AppDataSource_1.AppDataSource.getRepository(eletrodomestico_entity_1.Eletrodomestico);
        const historicoRepo = AppDataSource_1.AppDataSource.getRepository(historicoPrecoAnunciado_entity_1.HistoricoPrecoAnunciado);
        const vendasRepo = AppDataSource_1.AppDataSource.getRepository(venda_entity_1.Venda);
        const arranjosRepo = AppDataSource_1.AppDataSource.getRepository(arranjo_entity_1.Arranjo);
        const arranjosRealizadosRepo = AppDataSource_1.AppDataSource.getRepository(arranjoRealizado_entity_1.ArranjoRealizado);
        // Inserir marcas
        const marcas = yield marcaRepo.save([
            { nome: "Samsung", categoria: "WW90T554DAN " },
            { nome: "LG", categoria: "GBF61PZJZN " },
            { nome: "Whirpool", categoria: "WFC 3C26" },
        ]);
        // Inserir tipos
        const tipos = yield tipoRepo.save([
            { nome: "Maquina Lavar Roupa" },
            { nome: "Frigorifico" },
            { nome: "Maquina Lavar Louça" },
        ]);
        // Inserir eletrodomésticos
        const eletrodomesticos = yield eletroRepo.save([
            {
                nome: "Maquina lavar roupa samsung 10kg",
                descricao: "Maquina lavar roupa samsung 10kg 1200 RPM",
                data_compra: new Date("2023-01-10"),
                preco_compra: 500.0,
                preco_anunciado_atual: 800.0,
                tipo: eletrodomestico_entity_1.TipoEletrodomesticoEnum.VENDA,
                marca: marcas[0],
                tipoEletrodomestico: tipos[0],
            },
            {
                nome: "Frigorifico Compbinado LG",
                descricao: "Frigorifico Compbinado LG escangalhado",
                data_compra: new Date("2023-02-15"),
                preco_compra: 200.0,
                preco_anunciado_atual: 400.0,
                tipo: eletrodomestico_entity_1.TipoEletrodomesticoEnum.VENDA,
                marca: marcas[1],
                tipoEletrodomestico: tipos[1],
            },
            {
                nome: "Maquina Lavar Louça Americana Whirpool",
                descricao: "Maquina Lavar Louça Americana Whirpool",
                data_compra: new Date("2023-02-15"),
                tipo: eletrodomestico_entity_1.TipoEletrodomesticoEnum.ARRANJO,
                marca: marcas[2],
                tipoEletrodomestico: tipos[2],
            },
        ]);
        // Inserir histórico de preços anunciados
        yield historicoRepo.save([
            {
                eletrodomestico: eletrodomesticos[0],
                preco_anunciado: 700.0,
                data_alteracao: new Date("2023-05-01"),
            },
            {
                eletrodomestico: eletrodomesticos[1],
                preco_anunciado: 350.0,
                data_alteracao: new Date("2023-06-10"),
            },
        ]);
        // Inserir vendas
        yield vendasRepo.save([
            {
                eletrodomestico: eletrodomesticos[0],
                data_venda: new Date("2023-07-10"),
                preco_venda: 750.0,
                garantia_meses: 12,
                contacto_comprador: "Cliente A",
            },
        ]);
        // Inserir arranjos
        const arranjos = yield arranjosRepo.save([
            {
                eletrodomestico: eletrodomesticos[1],
                data_arranjo: new Date("2023-08-20"),
                descricao: "troca condensador",
                preco_pago: 200.0,
            },
        ]);
        // Inserir arranjos realizados
        yield arranjosRealizadosRepo.save([
            {
                eletrodomestico: eletrodomesticos[2],
                data_arranjo: new Date("2023-08-21"),
                descricao: "Substituição de peças",
                custo_materiais: 100.0,
                preco_pago_cliente: 300.0,
            },
        ]);
        console.log("✅ Seeds inseridos com sucesso!");
        yield AppDataSource_1.AppDataSource.destroy();
    }
    catch (error) {
        console.error("❌ Erro ao rodar os seeds:", error);
    }
});
// Executar a função de seed
seedDatabase();
