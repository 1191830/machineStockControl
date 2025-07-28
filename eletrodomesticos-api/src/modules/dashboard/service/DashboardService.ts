import { inject, injectable } from "tsyringe";
import { IDashboardService } from "./IDashboardService";
import { IDashboardRepository } from "../repositories/IDashboardRepository";

@injectable()
export class DashboardService implements IDashboardService {
  constructor(
    @inject("IDashboardRepository")
    private dashboardRepository: IDashboardRepository
  ) {}

  async getTotalDashboardBalance(): Promise<{
    vendas: {
      balance: number;
      vendas: number;
      compras: number;
      gastos: number;
    };
    arranjos: {
      balance: number;
      receita: number;
      custo: number;
    };
  }> {
    return this.dashboardRepository.getTotalDashboardBalance();
  }

  async getMonthlyDashboardBalances(): Promise<
    {
      month: string;
      vendas: number;
      arranjos: number;
    }[]
  > {
    return this.dashboardRepository.getMonthlyDashboardBalances();
  }
}
