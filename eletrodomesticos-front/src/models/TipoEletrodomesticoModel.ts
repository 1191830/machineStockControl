export interface TipoEletrodomesticoModel {
  id: number;
  nome: string;
}

export interface CreateTipoEletrodomesticoModel {
  nome: string;
}

export interface UpdateTipoEletrodomesticoModel {
  nome?: string;
}
