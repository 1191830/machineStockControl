import { useEffect, useState } from "react";
import { DashboardService } from "../services/DashboardService";
import type {
  TotalDashboardBalanceViewModel,
  MonthlyBalanceViewModel
} from "../viewModels/DashboardViewModel";

export function useDashboard() {
  const [total, setTotal] = useState<TotalDashboardBalanceViewModel | null>(null);
  const [monthly, setMonthly] = useState<MonthlyBalanceViewModel[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchDashboardData() {
    try {
      setLoading(true);
      const [totalRes, monthlyRes] = await Promise.all([
        DashboardService.getTotalBalances(),
        DashboardService.getMonthlyBalances()
      ]);
      setTotal(totalRes);
      setMonthly(Array.isArray(monthlyRes) ? monthlyRes : [monthlyRes]);
    } catch (error) {
      console.error("Erro ao carregar dados do dashboard:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    total,
    monthly,
    loading,
    refetch: fetchDashboardData,
  };
}
