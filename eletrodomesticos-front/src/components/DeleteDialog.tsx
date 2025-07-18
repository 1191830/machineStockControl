import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
}

export default function ConfirmDeleteDialog({ open, onClose, onConfirm, itemName }: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">
          Confirmar Eliminação
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Tens a certeza que queres eliminar {itemName ? `"${itemName}"` : "este item"}? Esta ação é irreversível.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ padding: "16px" }}>
        <Stack direction="row" spacing={2} justifyContent="flex-end" width="100%">
          <Button onClick={onClose} variant="outlined" color="secondary" sx={{ borderRadius: 2 }}>
            Cancelar
          </Button>
          <Button onClick={onConfirm} variant="contained" color="error" sx={{ borderRadius: 2 }}>
            Eliminar
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
