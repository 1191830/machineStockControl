import React, { useEffect, useState } from "react";
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

import type { VendaViewModel } from "../viewModels/VendaViewModel";
import type { EletrodomesticoViewModel } from "../viewModels/EletrodomesticoViewModel";
import type { VendaFormData } from "../models/VendaFormModel";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: VendaFormData, id?: number) => void;
  initialData?: VendaViewModel | null;
  eletrodomestico?: EletrodomesticoViewModel; // obrigatório em criação
}

export default function VendaDialog({
  open,
  onClose,
  onSave,
  initialData,
  eletrodomestico,
}: Props) {
  const isEditMode = !!initialData;

  const [form, setForm] = useState<VendaFormData>({
    eletrodomestico_id: 0,
    data_venda: new Date().toISOString().split("T")[0],
    preco_venda: 0,
    gastos: 0,
    garantia_meses: 0,
    contacto_comprador: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isEditMode && initialData) {
      setForm({
        eletrodomestico_id: initialData.eletrodomestico.id,
        data_venda: new Date(initialData.dataVenda).toISOString().split("T")[0],
        preco_venda: initialData.precoVenda,
        gastos: initialData.gastos,
        garantia_meses: initialData.garantiaMeses,
        contacto_comprador: initialData.contactoComprador,
      });
    } else if (eletrodomestico) {
      setForm({
        eletrodomestico_id: eletrodomestico.id,
        data_venda: new Date().toISOString().split("T")[0],
        preco_venda: eletrodomestico.precoAnunciadoAtual || 0,
        gastos: 0,
        garantia_meses: 0,
        contacto_comprador: "",
      });
    }
    setErrors({});
  }, [initialData, eletrodomestico, open, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "preco_venda" || name === "garantia_meses"
          ? Number(value)
          : value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      data_venda: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.data_venda) newErrors.data_venda = "Data é obrigatória";
    if (form.preco_venda <= 0) newErrors.preco_venda = "Preço deve ser maior que 0";
    if (form.gastos < 0) newErrors.gastos = "Gastos não podem ser negativos";
    if (form.garantia_meses < 0) newErrors.garantia_meses = "Garantia não pode ser negativa";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSave(form, initialData?.id);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h5" fontWeight="bold">
          {isEditMode ? "Editar Venda" : "Registar Venda"}
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          {eletrodomestico && !isEditMode && (
            <Stack spacing={0.5}>
              <Typography variant="subtitle2">Eletrodoméstico:</Typography>
              <Typography variant="body1" fontWeight="bold">
                {eletrodomestico.nome}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {eletrodomestico.descricao}
              </Typography>
            </Stack>
          )}

          {initialData && (
            <Stack spacing={0.5}>
              <Typography variant="subtitle2">Eletrodoméstico:</Typography>
              <Typography variant="body1" fontWeight="bold">
                {initialData.eletrodomestico.nome}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {initialData.eletrodomestico.descricao}
              </Typography>
            </Stack>
          )}

          <TextField
            label="Data da Venda"
            type="date"
            name="data_venda"
            fullWidth
            value={form.data_venda}
            onChange={handleDateChange}
            error={!!errors.data_venda}
            helperText={errors.data_venda}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Preço de Venda"
            name="preco_venda"
            type="number"
            value={form.preco_venda}
            onChange={handleChange}
            fullWidth
            error={!!errors.preco_venda}
            helperText={errors.preco_venda}
          />

          <TextField
            label="Gastos"
            name="gastos"
            type="number"
            value={form.gastos}
            onChange={handleChange}
            fullWidth
            error={!!errors.gastos}
            helperText={errors.gastos}
          />

          <TextField
            label="Garantia (meses)"
            name="garantia_meses"
            type="number"
            value={form.garantia_meses}
            onChange={handleChange}
            fullWidth
            error={!!errors.garantia_meses}
            helperText={errors.garantia_meses}
          />

          <TextField
            label="Contacto do Comprador (opcional)"
            name="contacto_comprador"
            value={form.contacto_comprador}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ padding: "16px" }}>
        <Button onClick={onClose} variant="outlined" color="secondary" sx={{ borderRadius: 2 }}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ borderRadius: 2 }}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
