// hooks/useEletrodomesticos.ts
import { useEffect, useState } from "react";
import { EletrodomesticoService } from "../services/EletrodomesticoService";
import type { EletrodomesticoViewModel } from "../viewModels/EletrodomesticoViewModel";
import type { EletrodomesticoModel } from "../models/EletrodomesticoModel";

function mapModelToViewModel(item: EletrodomesticoModel): EletrodomesticoViewModel & { id: number } {
  return {
    id: item.id,
    nome: item.nome,
    descricao: item.descricao,
    dataCompra: new Date(item.data_compra).toLocaleDateString(),
    precoCompra: `${Number(item.preco_compra).toFixed(2)} €`,
    precoAnunciadoAtual: `${Number(item.preco_anunciado_atual).toFixed(2)} €`,
    tipo: { nome: item.tipoEletrodomestico?.nome },
    marca: { nome: item.marca?.nome, categoria: item.marca?.categoria }
  };
}

function mapViewModelToModel(item: EletrodomesticoViewModel): EletrodomesticoModel {
  return {
    id: 0, // Placeholder, backend should ignore or assign a real id
    nome: item.nome,
    descricao: item.descricao,
    data_compra: new Date(item.dataCompra).toISOString(),
    preco_compra: parseFloat(item.precoCompra.replace("€", "").trim()),
    preco_anunciado_atual: parseFloat(item.precoAnunciadoAtual.replace("€", "").trim()),
    tipoEletrodomestico: { id: 0, nome: item.tipo.nome },
    marca: { id: 0, nome: item.marca.nome, categoria: item.marca.categoria ?? "" }
  };
}

export function useEletrodomesticos() {
  const [eletrodomesticos, setEletrodomesticos] = useState<(EletrodomesticoViewModel & { id: number })[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const data = await EletrodomesticoService.getAll();
      const mapped = data.map(mapModelToViewModel);
      setEletrodomesticos(mapped);
    } catch (error) {
      console.error("Erro ao carregar os eletrodomésticos:", error);
    } finally {
      setLoading(false);
    }
  }

  async function createEletrodomestico(data: EletrodomesticoViewModel) {
    const model = mapViewModelToModel(data);
    const created = await EletrodomesticoService.create(model);
    setEletrodomesticos(prev => [...prev, mapModelToViewModel(created)]);
  }

  async function updateEletrodomestico(id: number, data: EletrodomesticoViewModel) {
    const model = mapViewModelToModel(data);
    const updated = await EletrodomesticoService.update(id, model);
    setEletrodomesticos(prev => prev.map(item => item.id === id ? mapModelToViewModel(updated) : item));
  }

  async function deleteEletrodomestico(id: number) {
    await EletrodomesticoService.delete(id);
    setEletrodomesticos(prev => prev.filter(item => item.id !== id));
  }

  useEffect(() => { fetchData(); }, []);

  return { eletrodomesticos, loading, createEletrodomestico, updateEletrodomestico, deleteEletrodomestico };
}
