import type { EletrodomesticoViewModel } from "./EletrodomesticoViewModel";

export interface ArranjoRealizadoViewModel {
  id?: number;
  eletrodomestico: EletrodomesticoViewModel;
  dataArranjo: string;
  descricao?: string;
  custoMateriais: number;
  precoPagoCliente: number;
}
