import "reflect-metadata";
import { AppDataSource } from "../AppDataSource";
import { Eletrodomestico, TipoEletrodomesticoEnum } from "../entities/eletrodomestico.entity";
import { Marca } from "../entities/marca.entity";
import { TipoEletrodomestico } from "../entities/tipoEletrodomestico.entity";
import { HistoricoPrecoAnunciado } from "../entities/historicoPrecoAnunciado.entity";
import { Arranjo } from "../entities/arranjo.entity";
import { ArranjoRealizado } from "../entities/arranjoRealizado.entity";
import { Venda } from "../entities/venda.entity";

const seedDatabase = async () => {
  try {
    console.log("🚀 Conectando ao banco de dados...");
    await AppDataSource.initialize();

    const marcaRepo = AppDataSource.getRepository(Marca);
    const tipoRepo = AppDataSource.getRepository(TipoEletrodomestico);
    const eletroRepo = AppDataSource.getRepository(Eletrodomestico);
    const historicoRepo = AppDataSource.getRepository(HistoricoPrecoAnunciado);
    const vendasRepo = AppDataSource.getRepository(Venda);
    const arranjosRepo = AppDataSource.getRepository(Arranjo);
    const arranjosRealizadosRepo = AppDataSource.getRepository(ArranjoRealizado);

    // Inserir marcas
    const marcas = await marcaRepo.save([
      { nome: "Samsung", categoria: "WW90T554DAN " },
      { nome: "LG", categoria: "GBF61PZJZN " },
      { nome: "Whirpool", categoria: "WFC 3C26" },
    ]);

    // Inserir tipos
    const tipos = await tipoRepo.save([
      { nome: "Maquina Lavar Roupa" },
      { nome: "Frigorifico" },
      { nome: "Maquina Lavar Louça" },
    ]);

    // Inserir eletrodomésticos
    const eletrodomesticos = await eletroRepo.save([
      {
        nome: "Maquina lavar roupa samsung 10kg",
        descricao: "Maquina lavar roupa samsung 10kg 1200 RPM",
        data_compra: new Date("2023-01-10"),
        preco_compra: 500.0,
        preco_anunciado_atual: 800.0,
        tipo: TipoEletrodomesticoEnum.VENDA,
        marca_id: marcas[0].id,
        tipo_id: tipos[0].id,
      },
      {
        nome: "Frigorifico Compbinado LG",
        descricao: "Frigorifico Compbinado LG escangalhado",
        data_compra: new Date("2023-02-15"),
        preco_compra: 200.0,
        preco_anunciado_atual: 400.0,
        tipo: TipoEletrodomesticoEnum.VENDA,
        marca_id: marcas[1].id,
        tipo_id: tipos[1].id,
      },
      {
        nome: "Maquina Lavar Louça Americana Whirpool",
        descricao: "Maquina Lavar Louça Americana Whirpool",
        data_compra: new Date("2023-02-15"),
        tipo: TipoEletrodomesticoEnum.ARRANJO,
        marca_id: marcas[2].id,
        tipo_id: tipos[2].id,
      },
    ]);

    // Inserir histórico de preços anunciados
    await historicoRepo.save([
      {
        eletrodomestico_id: eletrodomesticos[0].id,
        preco_anunciado: 700.0,
        data_alteracao: new Date("2023-05-01"),
      },
      {
        eletrodomestico_id: eletrodomesticos[1].id,
        preco_anunciado: 350.0,
        data_alteracao: new Date("2023-06-10"),
      },
    ]);

    // Inserir vendas
    await vendasRepo.save([
      {
        eletrodomestico_id: eletrodomesticos[0].id,
        data_venda: new Date("2023-07-10"),
        preco_venda: 750.0,
        garantia_meses: 12,
        contacto_comprador: "Cliente A",
      },
    ]);

    // Inserir arranjos
    const arranjos = await arranjosRepo.save([
      {
        eletrodomestico_id: eletrodomesticos[1].id,
        data_arranjo: new Date("2023-08-20"),
        descricao: "troca condensador",
        preco_pago: 200.0,
      },
    ]);

    // Inserir arranjos realizados
    await arranjosRealizadosRepo.save([
      {
        eletrodomestico_id: eletrodomesticos[2].id,
        data_arranjo: new Date("2023-08-21"),
        descricao: "Substituição de peças",
        custo_materiais: 100.0,
        preco_pago_cliente: 300.0,
      },
    ]);

    console.log("✅ Seeds inseridos com sucesso!");
    await AppDataSource.destroy();
  } catch (error) {
    console.error("❌ Erro ao rodar os seeds:", error);
  }
};

// Executar a função de seed
seedDatabase();
