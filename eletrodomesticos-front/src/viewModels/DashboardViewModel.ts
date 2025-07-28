export interface TotalVendasBalanceViewModel {
  balance: number;
  vendas: number;
  compras: number;
  gastos: number;
}

export interface TotalArranjosBalanceViewModel {
  balance: number;
  receita: number;
  custo: number;
}

export interface TotalDashboardBalanceViewModel {
  vendas: TotalVendasBalanceViewModel;
  arranjos: TotalArranjosBalanceViewModel;
}

export interface MonthlyBalanceViewModel {
  month: string; // format: YYYY-MM
  vendas: number;
  arranjos: number;
}
