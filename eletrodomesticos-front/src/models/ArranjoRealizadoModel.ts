import type { EletrodomesticoModel } from "./EletrodomesticoModel";

export interface ArranjoRealizadoModel {
  id: number;
  eletrodomestico: EletrodomesticoModel;
  data_arranjo: string; // ISO Date
  descricao?: string;
  custo_materiais: number;
  preco_pago_cliente: number;
}

export interface CreateArranjoRealizadoModel {
  eletrodomestico_id: number;
  data_arranjo: Date;
  descricao?: string;
  custo_materiais: number;
  preco_pago_cliente: number;
}

export interface UpdateArranjoRealizadoModel {
  data_arranjo?: Date;
  descricao?: string;
  custo_materiais?: number;
  preco_pago_cliente?: number;
}
