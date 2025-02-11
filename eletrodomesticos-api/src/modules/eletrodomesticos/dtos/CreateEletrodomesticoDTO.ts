import { TipoEletrodomesticoEnum } from "../../../entities/eletrodomestico.entity";

export interface CreateEletrodomesticoDTO {
  nome: string;
  descricao?: string;
  data_compra: Date;
  preco_compra?: number;
  preco_anunciado_atual?: number;
  tipo: TipoEletrodomesticoEnum;
  marca_id: number;
  tipo_id: number;
}
