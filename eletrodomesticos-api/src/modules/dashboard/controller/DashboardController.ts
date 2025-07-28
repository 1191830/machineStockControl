import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IDashboardService } from "../service/IDashboardService";

@injectable()
export class DashboardController {
  constructor(
    @inject("IDashboardService")
    private dashboardService: IDashboardService
  ) {}

  async getTotalDashboardBalance(req: Request, res: Response) {
    try {
      const balance = await this.dashboardService.getTotalDashboardBalance();
      return res.status(200).json(balance);
    } catch (error: any) {
      return res.status(500).json({
        message: "Erro ao buscar o saldo total do dashboard",
        error: error.message,
      });
    }
  }

  async getMonthlyDashboardBalances(req: Request, res: Response) {
    try {
      const balances = await this.dashboardService.getMonthlyDashboardBalances();
      return res.status(200).json(balances);
    } catch (error: any) {
      return res.status(500).json({
        message: "Erro ao buscar os saldos mensais do dashboard",
        error: error.message,
      });
    }
  }
}
