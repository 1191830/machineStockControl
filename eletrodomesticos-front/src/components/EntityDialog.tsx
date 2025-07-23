import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Stack,
} from "@mui/material";

interface EntitySimpleDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { nome: string }, id?: number) => void;
  initialData?: { id: number; nome: string } | null;
  entityName?: string; // Ex: "Marca", "Tipo de Eletrodoméstico"
}

export default function EntitySimpleDialog({
  open,
  onClose,
  onSave,
  initialData,
  entityName = "Entidade",
}: EntitySimpleDialogProps) {
  const isEditMode = !!initialData;

  const [nome, setNome] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setNome(initialData.nome);
    } else {
      setNome("");
    }
    setError("");
  }, [initialData, open]);

  const handleSave = () => {
    if (!nome.trim()) {
      setError("Nome é obrigatório");
      return;
    }

    onSave({ nome: nome.trim() }, initialData?.id);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h5" fontWeight="bold">
          {isEditMode ? `Editar ${entityName}` : `Adicionar ${entityName}`}
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          <TextField
            label="Nome"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            fullWidth
            error={!!error}
            helperText={error}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ padding: "16px" }}>
        <Button onClick={onClose} variant="outlined" color="secondary" sx={{ borderRadius: 2 }}>
          Cancelar
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary" sx={{ borderRadius: 2 }}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
