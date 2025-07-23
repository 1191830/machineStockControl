import { Card, CardContent, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Entity {
  id: number;
  nome: string;
}

interface Props<T extends Entity> {
  item: T;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
}

export default function EntityCard<T extends Entity>({
  item,
  onEdit,
  onDelete,
}: Props<T>) {
  return (
    <Card sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {item.nome}
        </Typography>

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
