// models/EletrodomesticoFormData.ts
export interface EletrodomesticoFormData {
  nome: string;
  descricao: string;
  dataCompra: string; // ISO string (ex: "2024-06-28")
  precoCompra: number;
  precoAnunciadoAtual: number;
  tipoId: number;
  marcaId: number;
}
