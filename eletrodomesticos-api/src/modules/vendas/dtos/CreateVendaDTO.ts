export interface CreateVendaDTO {
  eletrodomestico_id: number;
  data_venda: Date;
  preco_venda: number;
  garantia_meses: number;
  contacto_comprador?: string;
}