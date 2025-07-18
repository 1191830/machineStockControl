import { useState, useMemo } from "react";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useVendas } from "../hooks/useVendas";
import { VendaService } from "../services/VendaService";
import VendaDialog from "../components/VendaDialog";
import VendaCard from "../components/VendaCard";
import ConfirmDeleteDialog from "../components/DeleteDialog";
import type { VendaViewModel } from "../viewModels/VendaViewModel";
import type { VendaFormData } from "../models/VendaFormModel";

export default function VendasPage() {
  const { vendas, loading, refetch } = useVendas();

  // Filtros
  const [selectedTipo, setSelectedTipo] = useState<string>("");
  const [selectedMarca, setSelectedMarca] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  // Filtro preço
  const [priceFilterOperator, setPriceFilterOperator] = useState<string>("=");
  const [priceFilterValue, setPriceFilterValue] = useState<string>("");

  // Filtro data venda
  const [saleDate, setSaleDate] = useState<string>("");

  // Estados dialog e delete
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedVenda, setSelectedVenda] = useState<VendaViewModel | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<VendaViewModel | null>(null);

  const tipos = useMemo(() => {
    const uniqueTipos = new Set(vendas.map((v) => v.eletrodomestico.tipoEletrodomestico.nome));
    return Array.from(uniqueTipos);
  }, [vendas]);

  const marcasList = useMemo(() => {
    const uniqueMarcas = new Set(vendas.map((v) => v.eletrodomestico.marca.nome));
    return Array.from(uniqueMarcas);
  }, [vendas]);

  // Filtragem
  const filteredVendas = useMemo(() => {
    return vendas.filter((v) => {
      const matchesTipo = selectedTipo
        ? v.eletrodomestico.tipoEletrodomestico.nome === selectedTipo
        : true;

      const matchesMarca = selectedMarca
        ? v.eletrodomestico.marca.nome === selectedMarca
        : true;

      const matchesText = searchText
        ? v.eletrodomestico.nome.toLowerCase().includes(searchText.toLowerCase()) ||
          v.contactoComprador.toLowerCase().includes(searchText.toLowerCase())
        : true;

      let matchesPrice = true;
      if (priceFilterValue !== "") {
        const preco = v.precoVenda;
        const val = Number(priceFilterValue);
        if (isNaN(val)) matchesPrice = true;
        else {
          if (priceFilterOperator === ">") matchesPrice = preco > val;
          else if (priceFilterOperator === "<") matchesPrice = preco < val;
          else matchesPrice = preco === val;
        }
      }

      const matchesDate = saleDate
        ? v.dataVenda.startsWith(saleDate) // Assuming data_venda is ISO date string
        : true;

      return matchesTipo && matchesMarca && matchesText && matchesPrice && matchesDate;
    });
  }, [vendas, selectedTipo, selectedMarca, searchText, priceFilterOperator, priceFilterValue, saleDate]);

  // Agrupar por tipo
  const groupedByType = useMemo(() => {
    const groups: Record<string, typeof filteredVendas> = {};
    filteredVendas.forEach((v) => {
      const tipo = v.eletrodomestico.tipoEletrodomestico.nome;
      if (!groups[tipo]) groups[tipo] = [];
      groups[tipo].push(v);
    });
    return groups;
  }, [filteredVendas]);

  const handleEdit = (venda: VendaViewModel) => {
    setSelectedVenda(venda);
    setDialogOpen(true);
  };

  const openDeleteDialog = (venda: VendaViewModel) => {
    setItemToDelete(venda);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setItemToDelete(null);
    setDeleteDialogOpen(false);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      await VendaService.delete(itemToDelete.id);
      await refetch();
    } catch (error) {
      console.error("Erro ao eliminar venda:", error);
    } finally {
      closeDeleteDialog();
    }
  };

  const handleSave = async (formData: VendaFormData, id?: number) => {
  try {
    if (!id) {
      // Create new venda
      await VendaService.create({
        eletrodomestico_id: formData.eletrodomestico_id,
        data_venda: new Date(formData.data_venda),
        preco_venda: formData.preco_venda,
        garantia_meses: formData.garantia_meses,
        contacto_comprador: formData.contacto_comprador?.trim() || "",
      });
    } else {
      // Update existing venda
      await VendaService.update(id, {
        data_venda: new Date(formData.data_venda),
        preco_venda: formData.preco_venda,
        garantia_meses: formData.garantia_meses,
        contacto_comprador: formData.contacto_comprador?.trim() || undefined,
      });
    }

    await refetch();
  } catch (error) {
    console.error("Erro ao guardar venda:", error);
  }
};

  if (loading) return <p>Loading vendas...</p>;

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Vendas</h1>

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
          label="Pesquisar (nome ou comprador)"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {/* Preço filter */}
        <FormControl className="w-20 md:w-1/10">
          <InputLabel>Op.</InputLabel>
          <Select
            value={priceFilterOperator}
            label="Op."
            onChange={(e) => setPriceFilterOperator(e.target.value)}
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
          value={priceFilterValue}
          onChange={(e) => setPriceFilterValue(e.target.value)}
          inputProps={{ min: 0 }}
        />
      </div>

      {/* Data venda */}
      <div className="mb-6 w-1/3">
        <TextField
          label="Data de Venda"
          type="date"
          value={saleDate}
          onChange={(e) => setSaleDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </div>

      {/* Lista agrupada por tipo */}
      {Object.entries(groupedByType).map(([tipo, items]) => (
        <div key={tipo}>
          <h2 className="text-2xl font-bold mb-4">{tipo}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <VendaCard
                key={item.id}
                item={item}
                onEdit={() => handleEdit(item)}
                onDelete={() => openDeleteDialog(item)}
              />
            ))}
          </div>
        </div>
      ))}

      <VendaDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        initialData={selectedVenda}
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
