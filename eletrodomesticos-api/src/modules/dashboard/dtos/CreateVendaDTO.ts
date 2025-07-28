export interface CreateVendaDTO {
  eletrodomestico_id: number;
  data_venda: Date;
  preco_venda: number;
  gastos: number;
  garantia_meses: number;
  contacto_comprador?: string;
}