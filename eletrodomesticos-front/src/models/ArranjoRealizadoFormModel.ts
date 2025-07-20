export interface ArranjoRealizadoFormData {
  eletrodomestico_id: number;
  data_arranjo: string; // formato YYYY-MM-DD (ex: vindo de um date input)
  descricao?: string;
  custo_materiais: number;
  preco_pago_cliente: number;
}
