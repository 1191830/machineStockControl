export interface VendaFormData {
  eletrodomestico_id: number;
  data_venda: string;
  preco_venda: number;
  gastos: number;
  garantia_meses: number;
  contacto_comprador?: string;
}