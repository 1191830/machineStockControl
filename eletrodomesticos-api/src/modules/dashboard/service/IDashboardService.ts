export interface IDashboardService {
  getTotalDashboardBalance(): Promise<{
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
  }>;

  getMonthlyDashboardBalances(): Promise<
    {
      month: string;
      vendas: number;
      arranjos: number;
    }[]
  >;
}
