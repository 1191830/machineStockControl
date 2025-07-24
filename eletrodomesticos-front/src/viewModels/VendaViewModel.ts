import type { EletrodomesticoViewModel } from "./EletrodomesticoViewModel";

export interface VendaViewModel {
  id?: number;
  eletrodomestico: EletrodomesticoViewModel;
  dataVenda: string;
  precoVenda: number;
  gastos: number;
  garantiaMeses: number;
  contactoComprador: string;
}