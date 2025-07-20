import type { TipoEletrodomesticoEnum } from "./EletrodomesticoModel";

export interface EletrodomesticoFormData {
  nome: string;
  descricao: string;
  dataCompra: string; // ISO string (ex: "2024-06-28")
  precoCompra?: number;
  precoAnunciadoAtual?: number;
  tipo: TipoEletrodomesticoEnum | null;
  tipoEletrodomesticoId: number;
  marcaId: number;
}
