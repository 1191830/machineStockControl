import type { EletrodomesticoViewModel } from "./EletrodomesticoViewModel";

export interface VendaViewModel {
  id?: number;
  eletrodomestico: EletrodomesticoViewModel;
  dataVenda: string;
  precoVenda: number;
  garantiaMeses: number;
  contactoComprador: string;
}