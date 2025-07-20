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

import type { EletrodomesticoViewModel } from "../viewModels/EletrodomesticoViewModel";
import type { ArranjoRealizadoFormData } from "../models/ArranjoRealizadoFormModel";
import type { ArranjoRealizadoViewModel } from "../viewModels/ArranjoRealizadoviewModel";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: ArranjoRealizadoFormData, id?: number) => void;
  initialData?: ArranjoRealizadoViewModel | null;
  eletrodomestico?: EletrodomesticoViewModel; // obrigatório em criação
}

export default function ArranjoRealizadoDialog({
  open,
  onClose,
  onSave,
  initialData,
  eletrodomestico,
}: Props) {
  const isEditMode = !!initialData;

  const [form, setForm] = useState<ArranjoRealizadoFormData>({
    eletrodomestico_id: 0,
    data_arranjo: new Date().toISOString().split("T")[0],
    custo_materiais: 0,
    preco_pago_cliente: 0,
    descricao: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isEditMode && initialData) {
      setForm({
        eletrodomestico_id: initialData.eletrodomestico.id,
        data_arranjo: new Date(initialData.dataArranjo).toISOString().split("T")[0],
        custo_materiais: initialData.custoMateriais,
        preco_pago_cliente: initialData.precoPagoCliente,
        descricao: initialData.descricao || "",
      });
    } else if (eletrodomestico) {
      setForm({
        eletrodomestico_id: eletrodomestico.id,
        data_arranjo: new Date().toISOString().split("T")[0],
        custo_materiais: 0,
        preco_pago_cliente: 0,
        descricao: "",
      });
    }
    setErrors({});
  }, [initialData, eletrodomestico, open, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "custo_materiais" || name === "preco_pago_cliente"
          ? Number(value)
          : value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      data_arranjo: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.data_arranjo) newErrors.data_arranjo = "Data é obrigatória";
    if (form.custo_materiais < 0) newErrors.custo_materiais = "Custo não pode ser negativo";
    if (form.preco_pago_cliente < 0) newErrors.preco_pago_cliente = "Preço pago deve ser >= 0";

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
          {isEditMode ? "Editar Arranjo Realizado" : "Registar Arranjo Realizado"}
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          {(eletrodomestico && !isEditMode) || initialData ? (
            <Stack spacing={0.5}>
              <Typography variant="subtitle2">Eletrodoméstico:</Typography>
              <Typography variant="body1" fontWeight="bold">
                {eletrodomestico?.nome ?? initialData?.eletrodomestico.nome}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {eletrodomestico?.descricao ?? initialData?.eletrodomestico.descricao}
              </Typography>
            </Stack>
          ) : null}

          <TextField
            label="Data do Arranjo"
            type="date"
            name="data_arranjo"
            fullWidth
            value={form.data_arranjo}
            onChange={handleDateChange}
            error={!!errors.data_arranjo}
            helperText={errors.data_arranjo}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Custo dos Materiais"
            name="custo_materiais"
            type="number"
            value={form.custo_materiais}
            onChange={handleChange}
            fullWidth
            error={!!errors.custo_materiais}
            helperText={errors.custo_materiais}
          />

          <TextField
            label="Preço Pago pelo Cliente"
            name="preco_pago_cliente"
            type="number"
            value={form.preco_pago_cliente}
            onChange={handleChange}
            fullWidth
            error={!!errors.preco_pago_cliente}
            helperText={errors.preco_pago_cliente}
          />

          <TextField
            label="Descrição (opcional)"
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            fullWidth
            multiline
            minRows={2}
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
