import type { TipoEletrodomesticoEnum } from "../models/EletrodomesticoModel";

export interface MarcaViewModel {
  id: number;
  nome: string;
  categoria?: string;
}

export interface TipoEletrodomesticoViewModel {
  id: number;
  nome: string;
}

export interface EletrodomesticoViewModel {
  id: number;
  nome: string;
  descricao: string;
  dataCompra: string;
  precoCompra?: number;
  precoAnunciadoAtual?: number;
  tipo: TipoEletrodomesticoEnum;
  tipoEletrodomestico: TipoEletrodomesticoViewModel;
  marca: MarcaViewModel;
}
