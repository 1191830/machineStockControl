import { useState, useMemo } from "react";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEletrodomesticos } from "../hooks/useEletrodomesticos";
import { useMarcas } from "../hooks/useMarcas";
import { EletrodomesticoService } from "../services/EletrodomesticoService";
import EletrodomesticoDialog from "../components/EletrodomesticoDialog";
import { useTiposEletrodomestico } from "../hooks/useTiposEletrodomestico";
import type { EletrodomesticoViewModel } from "../viewModels/EletrodomesticoViewModel";
import type { EletrodomesticoFormData } from "../models/EletrodomesticoFormModel";
import ConfirmDeleteDialog from "../components/DeleteEletrodomesticoDialog";
import EletrodomesticoCard from "../components/EletrodomesticoCard";

export default function EletrodomesticosPage() {
  const { eletrodomesticos, loading, refetch } = useEletrodomesticos();
  const { marcas } = useMarcas();
  const { tiposEletrodomestico } = useTiposEletrodomestico();

  const [selectedTipo, setSelectedTipo] = useState<string>("");
  const [selectedMarca, setSelectedMarca] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEletrodomestico, setSelectedEletrodomestico] =
    useState<EletrodomesticoViewModel | null>(null);

  // Estado para controlar o popup de confirmação delete
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<EletrodomesticoViewModel | null>(
    null
  );

  const tipos = useMemo(() => {
    const uniqueTipos = new Set(
      eletrodomesticos.map((item) => item.tipoEletrodomestico.nome)
    );
    return Array.from(uniqueTipos);
  }, [eletrodomesticos]);

  const marcasList = useMemo(() => {
    const uniqueMarcas = new Set(eletrodomesticos.map((item) => item.marca.nome));
    return Array.from(uniqueMarcas);
  }, [eletrodomesticos]);

  const filteredEletrodomesticos = useMemo(() => {
    return eletrodomesticos.filter((item) => {
      const matchesTipo = selectedTipo
        ? item.tipoEletrodomestico.nome === selectedTipo
        : true;
      const matchesMarca = selectedMarca
        ? item.marca.nome === selectedMarca
        : true;
      const matchesText = searchText
        ? item.nome.toLowerCase().includes(searchText.toLowerCase()) ||
          item.descricao.toLowerCase().includes(searchText.toLowerCase())
        : true;

      return matchesTipo && matchesMarca && matchesText;
    });
  }, [eletrodomesticos, selectedTipo, selectedMarca, searchText]);

  const groupedByType = useMemo(() => {
    const grupos: { [tipo: string]: EletrodomesticoViewModel[] } = {};

    filteredEletrodomesticos.forEach((item) => {
      if (!grupos[item.tipoEletrodomestico.nome]) {
        grupos[item.tipoEletrodomestico.nome] = [];
      }
      grupos[item.tipoEletrodomestico.nome].push(item);
    });

    Object.keys(grupos).forEach((tipo) => {
      grupos[tipo].sort((a, b) => a.marca.nome.localeCompare(b.marca.nome));
    });

    return grupos;
  }, [filteredEletrodomesticos]);

  const handleCreate = () => {
    setSelectedEletrodomestico(null);
    setDialogOpen(true);
  };

  const handleEdit = (eletro: EletrodomesticoViewModel) => {
    setSelectedEletrodomestico(eletro);
    setDialogOpen(true);
  };

  // Abre o popup de confirmação para eliminar
  const openDeleteDialog = (item: EletrodomesticoViewModel) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  // Fecha popup de confirmação delete
  const closeDeleteDialog = () => {
    setItemToDelete(null);
    setDeleteDialogOpen(false);
  };

  // Função que efetivamente elimina
  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      await EletrodomesticoService.delete(itemToDelete.id);
      await refetch();
    } catch (error) {
      console.error("Erro ao eliminar eletrodoméstico:", error);
    } finally {
      closeDeleteDialog();
    }
  };

  const handleSave = async (formData: EletrodomesticoFormData, id?: number) => {
    try {
      const tipoEnumValue = formData.tipo;

      if (!tipoEnumValue) {
        console.error("Tipo é obrigatório.");
        return;
      }

      if (!id) {
        const dataToSend = {
          nome: formData.nome,
          descricao: formData.descricao?.trim() || undefined,
          data_compra: new Date(formData.dataCompra),
          preco_compra: formData.precoCompra || undefined,
          preco_anunciado_atual: formData.precoAnunciadoAtual || undefined,
          tipo: tipoEnumValue,
          tipo_id: formData.tipoEletrodomesticoId,
          marca_id: formData.marcaId,
        };

        await EletrodomesticoService.create(dataToSend);
      } else {
        const updateData = {
          nome: formData.nome,
          descricao: formData.descricao?.trim() || undefined,
          preco_anunciado_atual: formData.precoAnunciadoAtual || undefined,
        };

        await EletrodomesticoService.update(id, updateData);
      }

      await refetch();
    } catch (error) {
      console.error("Erro ao guardar eletrodoméstico:", error);
    }
  };

  if (loading) return <p>A carregar eletrodomésticos...</p>;

  return (
    <div className="p-4 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Eletrodomésticos</h1>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>
          Adicionar
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <FormControl className="w-full md:w-1/3">
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

        <FormControl className="w-full md:w-1/3">
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
          className="w-full md:w-1/3"
          label="Pesquisar"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Lista Agrupada */}
      {Object.entries(groupedByType).map(([tipo, items]) => (
              <div key={tipo}>
                <h2 className="text-2xl font-bold mb-4">{tipo}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((item) => (
                    <EletrodomesticoCard
                      key={item.nome}
                      item={item}
                      onEdit={handleEdit}
                      onDelete={() => openDeleteDialog(item)}
                    />
            ))}
          </div>
        </div>
      ))}

      <EletrodomesticoDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        marcas={marcas}
        tiposEletrodomesticos={tiposEletrodomestico}
        initialData={selectedEletrodomestico}
      />

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.nome}
      />
    </div>
  );
}
