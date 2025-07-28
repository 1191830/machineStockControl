import api from "../api/axiosConfig";
import type { MonthlyBalanceViewModel, TotalDashboardBalanceViewModel } from "../viewModels/DashboardViewModel";

export class DashboardService {
  static async getTotalBalances(): Promise<TotalDashboardBalanceViewModel> {
    const response = await api.get<TotalDashboardBalanceViewModel>("/dashboard/total-dashboard-balance");
    
    return response.data;
  }

  static async getMonthlyBalances(): Promise<MonthlyBalanceViewModel[]> {
    const response = await api.get<MonthlyBalanceViewModel[]>("/dashboard/monthly-dashboard-balances");
    return response.data;
  }
}
