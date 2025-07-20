import { Card, CardContent, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { VendaViewModel } from "../viewModels/VendaViewModel";

interface Props {
  item: VendaViewModel;
  onEdit: (item: VendaViewModel) => void;
  onDelete: (item: VendaViewModel) => void;
}

export default function VendaCard({ item, onEdit, onDelete }: Props) {
  const precoCompra = Number(item.eletrodomestico.precoCompra) || 0;
  const precoVenda = Number(item.precoVenda) || 0;

  const borderColor = (() => {
    if (precoVenda < precoCompra) return "#d32f2f"; // vermelho (lucro negativo)
    if (precoVenda > precoCompra) return "#388e3c"; // verde (lucro positivo)
    return "transparent";
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
        <p>Data de Venda: {new Date(item.dataVenda).toLocaleDateString()}</p>
        <p>Preço Compra: {precoCompra.toFixed(2)} €</p>
        <p>Preço Venda: {precoVenda.toFixed(2)} €</p>
        <p>Garantia: {item.garantiaMeses} meses</p>
        <p>Contacto Comprador: {item.contactoComprador}</p>

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
