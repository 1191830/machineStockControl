import { useState, useMemo } from "react";
import { Card, CardContent, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useEletrodomesticos } from "../hooks/useEletrodomesticos";

export default function EletrodomesticosPage() {
  const { eletrodomesticos, loading } = useEletrodomesticos();

  const [selectedTipo, setSelectedTipo] = useState<string>("");
  const [selectedMarca, setSelectedMarca] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  // Listar todos os tipos únicos
  const tipos = useMemo(() => {
    const uniqueTipos = new Set(eletrodomesticos.map(item => item.tipo.nome));
    return Array.from(uniqueTipos);
  }, [eletrodomesticos]);

  // Listar todas as marcas únicas
  const marcas = useMemo(() => {
    const uniqueMarcas = new Set(eletrodomesticos.map(item => item.marca.nome));
    return Array.from(uniqueMarcas);
  }, [eletrodomesticos]);

  // Filtrar os eletrodomésticos conforme os filtros
  const filteredEletrodomesticos = useMemo(() => {
    return eletrodomesticos.filter(item => {
      const matchesTipo = selectedTipo ? item.tipo.nome === selectedTipo : true;
      const matchesMarca = selectedMarca ? item.marca.nome === selectedMarca : true;
      const matchesText = searchText
        ? item.nome.toLowerCase().includes(searchText.toLowerCase()) ||
          item.descricao.toLowerCase().includes(searchText.toLowerCase())
        : true;

      return matchesTipo && matchesMarca && matchesText;
    });
  }, [eletrodomesticos, selectedTipo, selectedMarca, searchText]);

  // Agrupar por tipo e ordenar por marca
  const groupedByType = useMemo(() => {
    const grupos: { [tipo: string]: typeof eletrodomesticos } = {};

    filteredEletrodomesticos.forEach((item) => {
      if (!grupos[item.tipo.nome]) {
        grupos[item.tipo.nome] = [];
      }
      grupos[item.tipo.nome].push(item);
    });

    Object.keys(grupos).forEach((tipo) => {
      grupos[tipo].sort((a, b) => a.marca.nome.localeCompare(b.marca.nome));
    });

    return grupos;
  }, [filteredEletrodomesticos]);

  if (loading) return <p>A carregar eletrodomésticos...</p>;

  return (
    <div className="p-4 space-y-8">
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
            {marcas.map((marca) => (
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
            {items.map((item, index) => (
              <Card key={index}>
                <CardContent className="space-y-2">
                  <h3 className="text-xl font-semibold">{item.nome}</h3>
                  <p className="text-gray-700">{item.descricao}</p>
                  <p>Data de Compra: {item.dataCompra ? new Date(item.dataCompra).toLocaleDateString() : ''}</p>
                  <p>Preço Compra: {item.precoCompra}</p>
                  <p>Preço Anunciado: {item.precoAnunciadoAtual}</p>
                  <p>Marca: {item.marca.nome} ({item.marca.categoria})</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
