import type { EletrodomesticoModel } from "./EletrodomesticoModel";

export interface VendaModel {
  id: number;
  eletrodomestico: EletrodomesticoModel;
  data_venda: string; // ISO Date
  preco_venda: number;
  garantia_meses: number;
  contacto_comprador: string;
}

export interface CreateVendaModel {
  eletrodomestico_id: number;
  data_venda: Date;
  preco_venda: number;
  garantia_meses: number;
  contacto_comprador: string;
}

export interface UpdateVendaModel {
  data_venda?: Date;
  preco_venda?: number;
  garantia_meses?: number;
  contacto_comprador?: string;
}