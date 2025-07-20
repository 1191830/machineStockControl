export interface CreateArranjoRealizadoDTO {
  eletrodomestico_id: number;
  data_arranjo: Date;
  descricao?: string;
  custo_materiais: number;
  preco_pago_cliente: number;
}
