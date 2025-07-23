import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Typography,
  Stack,
} from "@mui/material";

import type { SelectChangeEvent } from "@mui/material/Select";
import type { EletrodomesticoFormData } from "../models/EletrodomesticoFormModel";
import type { TipoEletrodomesticoModel } from "../models/EletrodomesticoModel";
import type { EletrodomesticoViewModel } from "../viewModels/EletrodomesticoViewModel";
import type { MarcaModel } from "../models/MarcaModel";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: EletrodomesticoFormData, id?: number) => void;
  marcas: MarcaModel[];
  tiposEletrodomesticos: TipoEletrodomesticoModel[];
  initialData?: EletrodomesticoViewModel | null;
}

export default function EletrodomesticoDialog({
  open,
  onClose,
  onSave,
  marcas,
  tiposEletrodomesticos,
  initialData,
}: Props) {
  const isEditMode = !!initialData;

  const [form, setForm] = useState<EletrodomesticoFormData>({
    nome: "",
    descricao: "",
    dataCompra: "",
    precoCompra: 0,
    precoAnunciadoAtual: 0,
    tipo: null,
    tipoEletrodomesticoId: 0,
    marcaId: 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialData) {
      setForm({
        nome: initialData.nome,
        descricao: initialData.descricao,
        dataCompra: initialData.dataCompra.split("T")[0],
        precoCompra: initialData.precoCompra || 0,
        precoAnunciadoAtual: initialData.precoAnunciadoAtual || 0,
        tipo: initialData.tipo ? (initialData.tipo as "VENDA" | "ARRANJO") : null,
        tipoEletrodomesticoId: initialData.tipoEletrodomestico.id,
        marcaId: initialData.marca.id,
      });
    } else {
      setForm({
        nome: "",
        descricao: "",
        dataCompra: "",
        precoCompra: 0,
        precoAnunciadoAtual: 0,
        tipo: null,
        tipoEletrodomesticoId: 0,
        marcaId: 0,
      });
    }
    setErrors({});
  }, [initialData, open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "precoCompra" || name === "precoAnunciadoAtual" ? Number(value) : value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<number | string>) => {
    const { name, value } = e.target;

    if (name === "tipo") {
      const selectedTipo = value as "VENDA" | "ARRANJO";
      setForm((prev) => ({
        ...prev,
        tipo: selectedTipo,
        precoCompra: selectedTipo === "ARRANJO" ? 0 : prev.precoCompra,
        precoAnunciadoAtual: selectedTipo === "ARRANJO" ? 0 : prev.precoAnunciadoAtual,
      }));
    } else if (name === "tipoEletrodomesticoId" || name === "marcaId") {
      setForm((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!isEditMode && !form.dataCompra) newErrors.dataCompra = "Data de compra é obrigatória";
    if (!isEditMode && !form.tipo) newErrors.tipo = "Tipo é obrigatório";
    if (!isEditMode && form.tipoEletrodomesticoId === 0) newErrors.tipoEletrodomesticoId = "Tipo Eletrodoméstico é obrigatório";
    if (!isEditMode && form.marcaId === 0) newErrors.marcaId = "Marca é obrigatória";

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
          {isEditMode ? "Editar Eletrodoméstico" : "Adicionar Eletrodoméstico"}
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          <TextField
            label="Nome"
            name="nome"
            value={form.nome}
            onChange={handleInputChange}
            fullWidth
            error={!!errors.nome}
            helperText={errors.nome}
          />

          <TextField
            label="Descrição"
            name="descricao"
            value={form.descricao}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={3}
          />

          
          <TextField
            label="Preço Anunciado Atual"
            name="precoAnunciadoAtual"
            type="number"
            value={form.precoAnunciadoAtual}
            onChange={handleInputChange}
            fullWidth
          />
          

          {!isEditMode && (
            <>
              <TextField
                label="Data de Compra"
                name="dataCompra"
                type="date"
                value={form.dataCompra}
                onChange={handleInputChange}
                fullWidth
                error={!!errors.dataCompra}
                helperText={errors.dataCompra}
                InputLabelProps={{ shrink: true }}
              />

              <FormControl fullWidth error={!!errors.tipo}>
                <InputLabel>Tipo</InputLabel>
                <Select
                  name="tipo"
                  value={form.tipo || ""}
                  label="Tipo"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="VENDA">VENDA</MenuItem>
                  <MenuItem value="ARRANJO">ARRANJO</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth error={!!errors.tipoEletrodomesticoId}>
                <InputLabel>Tipo Eletrodoméstico</InputLabel>
                <Select
                  name="tipoEletrodomesticoId"
                  value={form.tipoEletrodomesticoId}
                  label="Tipo Eletrodoméstico"
                  onChange={handleSelectChange}
                >
                  {tiposEletrodomesticos.map((tipo) => (
                    <MenuItem key={tipo.id} value={tipo.id}>
                      {tipo.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth error={!!errors.marcaId}>
                <InputLabel>Marca</InputLabel>
                <Select
                  name="marcaId"
                  value={form.marcaId}
                  label="Marca"
                  onChange={handleSelectChange}
                >
                  {marcas.map((marca) => (
                    <MenuItem key={marca.id} value={marca.id}>
                      {marca.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Preço de Compra"
                name="precoCompra"
                type="number"
                value={form.precoCompra}
                onChange={handleInputChange}
                fullWidth
                disabled={form.tipo === "ARRANJO"}
              />
            </>
          )}
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
