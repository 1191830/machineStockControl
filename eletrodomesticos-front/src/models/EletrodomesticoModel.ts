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
  preco_compra: number;
  preco_anunciado_atual: number;
  tipoEletrodomestico: TipoEletrodomesticoModel;
  marca: MarcaModel;
}
