export interface MarcaModel {
  id: number;
  nome: string;
}

export interface CreateMarcaModel {
  nome: string;
}

export interface UpdateMarcaModel {
  nome?: string;
}
