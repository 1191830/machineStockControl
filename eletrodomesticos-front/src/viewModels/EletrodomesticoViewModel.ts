export interface MarcaViewModel {
  nome: string;
  categoria?: string;
}

export interface TipoEletrodomesticoViewModel {
  nome: string;
}

export interface EletrodomesticoViewModel {
  nome: string;
  descricao: string;
  dataCompra: string;
  precoCompra: string;
  precoAnunciadoAtual: string;
  tipo: TipoEletrodomesticoViewModel;
  marca: MarcaViewModel;
}
