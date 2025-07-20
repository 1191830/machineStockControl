import { useState, useMemo } from "react";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

import { ArranjoRealizadoService } from "../services/ArranjoRealizadoService";
import ArranjoRealizadoDialog from "../components/ArranjoRealizadoDialog";
import ConfirmDeleteDialog from "../components/DeleteDialog";
import type { ArranjoRealizadoFormData } from "../models/ArranjoRealizadoFormModel";
import type { ArranjoRealizadoViewModel } from "../viewModels/ArranjoRealizadoviewModel";
import ArranjoRealizadoCard from "../components/ArranjorealizadoCard";
import { useArranjosRealizados } from "../hooks/useArranjosrealizados";

export default function ArranjosRealizadosPage() {
  const { arranjos, loading, refetch } = useArranjosRealizados();

  const [selectedTipo, setSelectedTipo] = useState("");
  const [selectedMarca, setSelectedMarca] = useState("");
  const [searchText, setSearchText] = useState("");

  const [priceOperator, setPriceOperator] = useState("=");
  const [priceValue, setPriceValue] = useState("");

  const [arranjoDate, setArranjoDate] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedArranjo, setSelectedArranjo] = useState<ArranjoRealizadoViewModel | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ArranjoRealizadoViewModel | null>(null);

  const tipos = useMemo(() => {
    const uniqueTipos = new Set(arranjos.map((a) => a.eletrodomestico.tipoEletrodomestico.nome));
    return Array.from(uniqueTipos);
  }, [arranjos]);

  const marcasList = useMemo(() => {
    const uniqueMarcas = new Set(arranjos.map((a) => a.eletrodomestico.marca.nome));
    return Array.from(uniqueMarcas);
  }, [arranjos]);

  const filteredArranjos = useMemo(() => {
    return arranjos.filter((a) => {
      const matchesTipo = selectedTipo ? a.eletrodomestico.tipoEletrodomestico.nome === selectedTipo : true;
      const matchesMarca = selectedMarca ? a.eletrodomestico.marca.nome === selectedMarca : true;
      const matchesText = searchText
        ? a.eletrodomestico.nome.toLowerCase().includes(searchText.toLowerCase())
        : true;

      let matchesPrice = true;
      if (priceValue !== "") {
        const preco = a.precoPagoCliente;
        const val = Number(priceValue);
        if (!isNaN(val)) {
          if (priceOperator === ">") matchesPrice = preco > val;
          else if (priceOperator === "<") matchesPrice = preco < val;
          else matchesPrice = preco === val;
        }
      }

      const matchesDate = arranjoDate
        ? a.dataArranjo.startsWith(arranjoDate)
        : true;

      return matchesTipo && matchesMarca && matchesText && matchesPrice && matchesDate;
    });
  }, [arranjos, selectedTipo, selectedMarca, searchText, priceOperator, priceValue, arranjoDate]);

  const groupedByType = useMemo(() => {
    const groups: Record<string, typeof filteredArranjos> = {};
    filteredArranjos.forEach((a) => {
      const tipo = a.eletrodomestico.tipoEletrodomestico.nome;
      if (!groups[tipo]) groups[tipo] = [];
      groups[tipo].push(a);
    });
    return groups;
  }, [filteredArranjos]);

  const handleEdit = (arranjo: ArranjoRealizadoViewModel) => {
    setSelectedArranjo(arranjo);
    setDialogOpen(true);
  };

  const openDeleteDialog = (arranjo: ArranjoRealizadoViewModel) => {
    setItemToDelete(arranjo);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setItemToDelete(null);
    setDeleteDialogOpen(false);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await ArranjoRealizadoService.delete(itemToDelete.id);
      await refetch();
    } catch (error) {
      console.error("Erro ao eliminar arranjo:", error);
    } finally {
      closeDeleteDialog();
    }
  };

  const handleSave = async (formData: ArranjoRealizadoFormData, id?: number) => {
    try {
      if (!id) {
        await ArranjoRealizadoService.create({
          eletrodomestico_id: formData.eletrodomestico_id,
          data_arranjo: new Date(formData.data_arranjo),
          custo_materiais: formData.custo_materiais,
          preco_pago_cliente: formData.preco_pago_cliente,
          descricao: formData.descricao?.trim() || "",
        });
      } else {
        await ArranjoRealizadoService.update(id, {
          data_arranjo: new Date(formData.data_arranjo),
          custo_materiais: formData.custo_materiais,
          preco_pago_cliente: formData.preco_pago_cliente,
          descricao: formData.descricao?.trim() || "",
        });
      }

      await refetch();
    } catch (error) {
      console.error("Erro ao guardar arranjo:", error);
    }
  };

  if (loading) return <p>Loading arranjos realizados...</p>;

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Arranjos Realizados</h1>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <FormControl className="w-full md:w-1/5">
          <InputLabel>Tipo</InputLabel>
          <Select
            value={selectedTipo}
            label="Tipo"
            onChange={(e) => setSelectedTipo(e.target.value)}
          >
            <MenuItem value="">Todos</MenuItem>
            {tipos.map((tipo) => (
              <MenuItem key={tipo} value={tipo}>
                {tipo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="w-full md:w-1/5">
          <InputLabel>Marca</InputLabel>
          <Select
            value={selectedMarca}
            label="Marca"
            onChange={(e) => setSelectedMarca(e.target.value)}
          >
            <MenuItem value="">Todas</MenuItem>
            {marcasList.map((marca) => (
              <MenuItem key={marca} value={marca}>
                {marca}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          className="w-full md:w-2/5"
          label="Pesquisar nome"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <FormControl className="w-20 md:w-1/10">
          <InputLabel>Op.</InputLabel>
          <Select
            value={priceOperator}
            label="Op."
            onChange={(e) => setPriceOperator(e.target.value)}
          >
            <MenuItem value=">">{">"}</MenuItem>
            <MenuItem value="<">{"<"}</MenuItem>
            <MenuItem value="=">{"="}</MenuItem>
          </Select>
        </FormControl>

        <TextField
          className="w-full md:w-1/10"
          label="Preço"
          type="number"
          value={priceValue}
          onChange={(e) => setPriceValue(e.target.value)}
          inputProps={{ min: 0 }}
        />
      </div>

      {/* Data de arranjo */}
      <div className="mb-6 w-1/3">
        <TextField
          label="Data do Arranjo"
          type="date"
          value={arranjoDate}
          onChange={(e) => setArranjoDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </div>

      {/* Agrupados por tipo */}
      {Object.entries(groupedByType).map(([tipo, items]) => (
        <div key={tipo}>
          <h2 className="text-2xl font-bold mb-4">{tipo}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <ArranjoRealizadoCard
                key={item.id}
                item={item}
                onEdit={() => handleEdit(item)}
                onDelete={() => openDeleteDialog(item)}
              />
            ))}
          </div>
        </div>
      ))}

      <ArranjoRealizadoDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        initialData={selectedArranjo}
        onSave={handleSave}
      />

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.eletrodomestico?.nome || ""}
      />
    </div>
  );
}
