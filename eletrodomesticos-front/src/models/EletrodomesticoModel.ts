export type TipoEletrodomesticoEnum = "VENDA" | "ARRANJO";

export interface MarcaModel {
  id: number;
  nome: string;
  categoria: string;
}

export interface TipoEletrodomesticoModel {
  id: number;
  nome: string;
}

export interface EletrodomesticoModel {
  id: number;
  nome: string;
  descricao: string;
  data_compra: string; // ISO Date
  preco_compra?: number;
  preco_anunciado_atual?: number;
  tipo: TipoEletrodomesticoEnum;
  tipoEletrodomestico: TipoEletrodomesticoModel;
  marca: MarcaModel;
}

export interface CreateEletrodomesticoModel {
  nome: string;
  descricao?: string;
  data_compra: Date;
  preco_compra?: number;
  preco_anunciado_atual?: number;
  tipo: TipoEletrodomesticoEnum;
  tipo_id: number;
  marca_id: number;
}

export interface UpdateEletrodomesticoModel {
  nome?: string;
  descricao?: string;
  preco_anunciado_atual?: number;
}
