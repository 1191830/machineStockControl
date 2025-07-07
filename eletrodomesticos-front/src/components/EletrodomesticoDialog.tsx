import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";
import type { EletrodomesticoFormData } from "../models/EletrodomesticoFormModel";
import type { MarcaModel, TipoEletrodomesticoModel } from "../models/EletrodomesticoModel";


interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: EletrodomesticoFormData) => void;
  initialData?: EletrodomesticoFormData;
  marcas: MarcaModel[];
  tipos: TipoEletrodomesticoModel[];
}

export default function EletrodomesticoDialog({ open, onClose, onSubmit, initialData, marcas, tipos }: Props) {
  const [formData, setFormData] = useState<EletrodomesticoFormData>({
    nome: "",
    descricao: "",
    dataCompra: "",
    precoCompra: 0,
    precoAnunciadoAtual: 0,
    tipoId: 0,
    marcaId: 0,
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "precoCompra" || name === "precoAnunciadoAtual" ? Number(value) : value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? "Editar Eletrodoméstico" : "Criar Eletrodoméstico"}</DialogTitle>
      <DialogContent className="space-y-4">
        <TextField label="Nome" name="nome" value={formData.nome} onChange={handleChange} fullWidth />
        <TextField label="Descrição" name="descricao" value={formData.descricao} onChange={handleChange} fullWidth />
        <TextField label="Data de Compra" name="dataCompra" type="date" value={formData.dataCompra} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />
        <TextField label="Preço Compra" name="precoCompra" type="number" value={formData.precoCompra} onChange={handleChange} fullWidth />
        <TextField label="Preço Anunciado" name="precoAnunciadoAtual" type="number" value={formData.precoAnunciadoAtual} onChange={handleChange} fullWidth />
        <TextField select label="Tipo" name="tipoId" value={formData.tipoId} onChange={handleSelectChange} fullWidth>
          {tipos.map(tipo => (
            <MenuItem key={tipo.id} value={tipo.id}>{tipo.nome}</MenuItem>
          ))}
        </TextField>
        <TextField select label="Marca" name="marcaId" value={formData.marcaId} onChange={handleSelectChange} fullWidth>
          {marcas.map(marca => (
            <MenuItem key={marca.id} value={marca.id}>{marca.nome}</MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">{initialData ? "Guardar" : "Criar"}</Button>
      </DialogActions>
    </Dialog>
  );
}
