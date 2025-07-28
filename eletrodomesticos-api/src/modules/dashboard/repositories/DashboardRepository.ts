import { Repository } from "typeorm";
import { AppDataSource } from "../../../AppDataSource";
import { Venda } from "../../../entities/venda.entity";
import { redis } from "../../../config/redis";
import { injectable } from "tsyringe";
import { IDashboardRepository } from "./IDashboardRepository";
import { ArranjoRealizado } from "../../../entities/arranjoRealizado.entity";

@injectable()
export class DashboardRepository implements IDashboardRepository {
  private vendaRepository: Repository<Venda>;
  private arranjoRepository: Repository<ArranjoRealizado>;

  constructor() {
    this.vendaRepository = AppDataSource.getRepository(Venda);
    this.arranjoRepository = AppDataSource.getRepository(ArranjoRealizado);
  }

  private totalCacheKey = "dashboard:totalDashboardBalance";
  private monthlyCacheKey = "dashboard:monthlyDashboardBalances";

  async getTotalDashboardBalance(): Promise<{
    vendas: { balance: number; vendas: number; compras: number; gastos: number };
    arranjos: { balance: number; receita: number; custo: number };
  }> {
    const cached = await redis.get(this.totalCacheKey);
    if (cached) return JSON.parse(cached);

    // Vendas total
    const vendaResult = await this.vendaRepository
      .createQueryBuilder("venda")
      .leftJoin("venda.eletrodomestico", "eletro")
      .select("SUM(venda.preco_venda - eletro.preco_compra - venda.gastos)", "balance")
      .addSelect("SUM(venda.preco_venda)", "vendas")
      .addSelect("SUM(eletro.preco_compra)", "compras")
      .addSelect("SUM(venda.gastos)", "gastos")
      .getRawOne();

    const vendas = {
      balance: Number(vendaResult?.balance ?? 0),
      vendas: Number(vendaResult?.vendas ?? 0),
      compras: Number(vendaResult?.compras ?? 0),
      gastos: Number(vendaResult?.gastos ?? 0),
    };

    // Arranjos total
    const arranjoResult = await this.arranjoRepository
      .createQueryBuilder("arranjo")
      .select("SUM(arranjo.preco_pago_cliente - arranjo.custo_materiais)", "balance")
      .addSelect("SUM(arranjo.preco_pago_cliente)", "receita")
      .addSelect("SUM(arranjo.custo_materiais)", "custo")
      .getRawOne();

    const arranjos = {
      balance: Number(arranjoResult?.balance ?? 0),
      receita: Number(arranjoResult?.receita ?? 0),
      custo: Number(arranjoResult?.custo ?? 0),
    };

    const result = { vendas, arranjos };

    await redis.set(this.totalCacheKey, JSON.stringify(result), "EX", 300);
    return result;
  }

  async getMonthlyDashboardBalances(): Promise<
    { month: string; vendas: number; arranjos: number }[]
  > {
    const cached = await redis.get(this.monthlyCacheKey);
    if (cached) return JSON.parse(cached);

    // Monthly vendas
    const vendasData = await this.vendaRepository
      .createQueryBuilder("venda")
      .leftJoin("venda.eletrodomestico", "eletro")
      .select("TO_CHAR(venda.data_venda, 'YYYY-MM')", "month")
      .addSelect("SUM(venda.preco_venda - eletro.preco_compra - venda.gastos)", "vendas")
      .groupBy("month")
      .getRawMany();

    // Monthly arranjos
    const arranjosData = await this.arranjoRepository
      .createQueryBuilder("arranjo")
      .select("TO_CHAR(arranjo.data_arranjo, 'YYYY-MM')", "month")
      .addSelect("SUM(arranjo.preco_pago_cliente - arranjo.custo_materiais)", "arranjos")
      .groupBy("month")
      .getRawMany();

    // Merge months
    const map = new Map<string, { month: string; vendas: number; arranjos: number }>();

    for (const v of vendasData) {
      const month = v.month;
      map.set(month, {
        month,
        vendas: Number(v.vendas ?? 0),
        arranjos: 0,
      });
    }

    for (const a of arranjosData) {
      const month = a.month;
      if (map.has(month)) {
        map.get(month)!.arranjos = Number(a.arranjos ?? 0);
      } else {
        map.set(month, {
          month,
          vendas: 0,
          arranjos: Number(a.arranjos ?? 0),
        });
      }
    }

    const merged = Array.from(map.values()).sort((a, b) => a.month.localeCompare(b.month));

    await redis.set(this.monthlyCacheKey, JSON.stringify(merged), "EX", 300);
    return merged;
  }
}
