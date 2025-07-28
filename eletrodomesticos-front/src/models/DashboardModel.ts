export interface TotalVendasBalance {
  balance: number;
  vendas: number;
  compras: number;
  gastos: number;
}

export interface TotalArranjosBalance {
  balance: number;
  recebidos: number;
  custos: number;
}

export interface TotalDashboardBalance {
  vendas: TotalVendasBalance;
  arranjos: TotalArranjosBalance;
}

export interface MonthlyBalance {
  month: string; // format: YYYY-MM
  vendas_balance: number;
  arranjos_balance: number;
}

export interface DashboardMonthlyBalances {
  months: MonthlyBalance[];
}
