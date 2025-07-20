import { Card, CardContent, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { ArranjoRealizadoViewModel } from "../viewModels/ArranjoRealizadoviewModel";

interface Props {
  item: ArranjoRealizadoViewModel;
  onEdit: (item: ArranjoRealizadoViewModel) => void;
  onDelete: (item: ArranjoRealizadoViewModel) => void;
}

export default function ArranjoRealizadoCard({ item, onEdit, onDelete }: Props) {
  const custoMateriais = Number(item.custoMateriais) || 0;
  const precoPagoCliente = Number(item.precoPagoCliente) || 0;

  const borderColor = (() => {
    if (precoPagoCliente < custoMateriais) return "#d32f2f"; // vermelho -> prejuizo no arranjo
    if (precoPagoCliente > custoMateriais) return "#388e3c"; // verde -> lucro no arranjo
    return "transparent"; // neutro
  })();

  return (
    <Card
      className="relative"
      sx={{
        border: `2px solid ${borderColor}`,
        borderRadius: 2,
      }}
    >
      <CardContent className="space-y-2">
        <h3 className="text-xl font-semibold">{item.eletrodomestico.nome}</h3>
        <p className="text-gray-700">{item.eletrodomestico.descricao}</p>
        <p>Tipo Eletrodoméstico: {item.eletrodomestico.tipoEletrodomestico.nome}</p>
        <p>Marca: {item.eletrodomestico.marca.nome} ({item.eletrodomestico.marca.categoria})</p>
        <p>Data do Arranjo: {new Date(item.dataArranjo).toLocaleDateString()}</p>
        <p>Custo dos Materiais: {custoMateriais.toFixed(2)} €</p>
        <p>Valor Pago pelo Cliente: {precoPagoCliente.toFixed(2)} €</p>
        {item.descricao && <p>Descrição: {item.descricao}</p>}

        <div className="flex justify-end space-x-2 mt-2">
          <IconButton onClick={() => onEdit(item)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(item)}>
            <DeleteIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
}
