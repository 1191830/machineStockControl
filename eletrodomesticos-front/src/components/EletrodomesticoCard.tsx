import { Card, CardContent, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { EletrodomesticoViewModel } from "../viewModels/EletrodomesticoViewModel";

interface Props {
  item: EletrodomesticoViewModel;
  onEdit: (item: EletrodomesticoViewModel) => void;
  onDelete: (item: EletrodomesticoViewModel) => void;
}

export default function EletrodomesticoCard({ item, onEdit, onDelete }: Props) {
const borderColor = (() => {
    switch (item.tipo.toUpperCase()) {
      case "ARRANJO":
        return "#1976d2"; // azul MUI
      case "VENDA":
        return "#388e3c"; // verde MUI
      default:
        return "transparent"; // sem cor ou neutra
    }
  })();

  return (
    <Card className="relative" sx={{
        border: `2px solid ${borderColor}`,
        borderRadius: 2,
      }}>
      <CardContent className="space-y-2">
        <h3 className="text-xl font-semibold">{item.nome}</h3>
        <p className="text-gray-700">{item.descricao}</p>
        <p>Tipo Eletrodomestico: {item.tipoEletrodomestico.nome}</p>
        <p>Tipo: {item.tipo}</p>
        <p>
          Data de Compra:{" "}
          {item.dataCompra ? new Date(item.dataCompra).toLocaleDateString() : ""}
        </p>
        { item.tipo === "VENDA" && (
            <p>Preço Compra: {item.precoCompra}</p>
        )}
        <p>Preço Anunciado: {item.precoAnunciadoAtual}</p>
        <p>
          Marca: {item.marca.nome} ({item.marca.categoria})
        </p>

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
