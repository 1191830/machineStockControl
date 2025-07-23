import { useState, useMemo } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useMarcas } from "../hooks/useMarcas";

import EntityDialog from "../components/EntityDialog";
import ConfirmDeleteDialog from "../components/DeleteDialog";
import EntityCard from "../components/EntityCard";
import { useTipoEletrodomesticos } from "../hooks/useTipoEletrodomestico";

interface Entity {
  id: number;
  nome: string;
}

export default function EntidadesPage() {
  const { marcas, refetch: refetchMarcas, createMarca, updateMarca, deleteMarca } = useMarcas();
  const { tipoEletrodomesticos, refetch: refetchTipoEletrodomesticos, createTipoEletrodomestico, updateTipoEletrodomestico, deleteTipoEletrodomestico } = useTipoEletrodomesticos();

  const [marcaSearchText, setMarcaSearchText] = useState("");
  const [selectedMarcaId, setSelectedMarcaId] = useState<number | "">("");

  const [tipoSearchText, setTipoSearchText] = useState("");
  const [selectedTipoId, setSelectedTipoId] = useState<number | "">("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEntity, setEditingEntity] = useState<Entity | null>(null);
  const [editingType, setEditingType] = useState<"marca" | "tipo" | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [entityToDelete, setEntityToDelete] = useState<Entity | null>(null);
  const [deleteType, setDeleteType] = useState<"marca" | "tipo" | null>(null);

  const filteredMarcas = useMemo(() => {
    return marcas.filter((m) =>
      m.nome.toLowerCase().includes(marcaSearchText.toLowerCase()) &&
      (selectedMarcaId === "" || m.id === selectedMarcaId)
    );
  }, [marcas, marcaSearchText, selectedMarcaId]);

  const filteredTipos = useMemo(() => {
    return tipoEletrodomesticos.filter((t: Entity) =>
      t.nome.toLowerCase().includes(tipoSearchText.toLowerCase()) &&
      (selectedTipoId === "" || t.id === selectedTipoId)
    );
  }, [tipoEletrodomesticos, tipoSearchText, selectedTipoId]);

  const openDialog = (type: "marca" | "tipo", entity?: Entity) => {
    setEditingType(type);
    if (entity) setEditingEntity(entity);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingEntity(null);
    setEditingType(null);
  };

  const openDelete = (type: "marca" | "tipo", entity: Entity) => {
    setDeleteType(type);
    setEntityToDelete(entity);
    setDeleteDialogOpen(true);
  };

  const closeDelete = () => {
    setDeleteDialogOpen(false);
    setEntityToDelete(null);
    setDeleteType(null);
  };

  const handleSave = async (data: { nome: string }, id?: number) => {
    try {
      if (editingType === "marca") {
        if (id) {
          await updateMarca(id, data);
        } else {
          await createMarca(data);
        }
        await refetchMarcas();
      }
console.log(editingType)
      if (editingType === "tipo") {
        if (id) {
          await updateTipoEletrodomestico(id, data);
        } else {
          console.log(data)
          await createTipoEletrodomestico(data);
        }
        await refetchTipoEletrodomesticos();
      }
    } catch (e) {
      console.error("Erro ao guardar entidade", e);
    } finally {
      closeDialog();
    }
  };

  const handleDelete = async () => {
    try {
      if (!entityToDelete || !deleteType) return;

      if (deleteType === "tipo") {
        await deleteTipoEletrodomestico(entityToDelete.id);
        await refetchTipoEletrodomesticos();
      }

      if (deleteType === "marca") {
        await deleteMarca(entityToDelete.id);
        await refetchMarcas();
      }

    } catch (e) {
      console.error("Erro ao eliminar entidade", e);
    } finally {
      closeDelete();
    }
  };

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-3xl font-bold">Entidades</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* MARCAS */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Marcas</h2>
            <Button variant="contained" onClick={() => openDialog("marca")} startIcon={<AddIcon />}>
              Adicionar
            </Button>
          </div>

          <TextField
            label="Pesquisar nome"
            value={marcaSearchText}
            onChange={(e) => setMarcaSearchText(e.target.value)}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Filtrar por marca</InputLabel>
            <Select
              label="Filtrar por marca"
              value={selectedMarcaId}
              onChange={(e) => setSelectedMarcaId(e.target.value as number | "")}
            >
              <MenuItem value="">Todas</MenuItem>
              {marcas.map((m) => (
                <MenuItem key={m.id} value={m.id}>
                  {m.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="grid grid-cols-1 gap-3">
            {filteredMarcas.map((m) => (
              <EntityCard
                key={m.id}
                item={m}
                onEdit={() => openDialog("marca", m)}
                onDelete={() => openDelete("marca", m)}
              />
            ))}
          </div>
        </div>

        {/* TIPOS */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Tipos de Eletrodoméstico</h2>
            <Button variant="contained" onClick={() => openDialog("tipo")} startIcon={<AddIcon />}>
              Adicionar
            </Button>
          </div>

          <TextField
            label="Pesquisar tipo"
            value={tipoSearchText}
            onChange={(e) => setTipoSearchText(e.target.value)}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Filtrar por tipo</InputLabel>
            <Select
              label="Filtrar por tipo"
              value={selectedTipoId}
              onChange={(e) => setSelectedTipoId(e.target.value as number | "")}
            >
              <MenuItem value="">Todos</MenuItem>
              {tipoEletrodomesticos.map((t: Entity) => (
                <MenuItem key={t.id} value={t.id}>
                  {t.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="grid grid-cols-1 gap-3">
            {filteredTipos.map((t: Entity) => (
              <EntityCard
                key={t.id}
                item={t}
                onEdit={() => openDialog("tipo", t)}
                onDelete={() => openDelete("tipo", t)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <EntityDialog
        open={dialogOpen}
        onClose={closeDialog}
        onSave={handleSave}
        initialData={editingEntity}
        entityName={editingType ?? ""}
      />

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onClose={closeDelete}
        onConfirm={handleDelete}
        itemName={entityToDelete?.nome}
      />
    </div>
  );
}
