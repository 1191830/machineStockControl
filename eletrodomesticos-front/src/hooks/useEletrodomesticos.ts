import { useEffect, useState } from "react";
import { EletrodomesticoService } from "../services/EletrodomesticoService";
import type { EletrodomesticoViewModel } from "../viewModels/EletrodomesticoViewModel";
import type { CreateEletrodomesticoModel, EletrodomesticoModel, UpdateEletrodomesticoModel } from "../models/EletrodomesticoModel";

function toInputDateString(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);
  return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
}

function mapModelToViewModel(item: EletrodomesticoModel): EletrodomesticoViewModel & { id: number } {
  return {
    id: item.id,
    nome: item.nome,
    descricao: item.descricao,
    dataCompra: toInputDateString(item.data_compra),
    precoCompra: item.preco_compra,
    precoAnunciadoAtual: item.preco_anunciado_atual,
    tipo: item.tipo,
    tipoEletrodomestico: { id: item.tipoEletrodomestico?.id ?? 0, nome: item.tipoEletrodomestico?.nome },
    marca: { id: item.marca?.id ?? 0, nome: item.marca?.nome, categoria: item.marca?.categoria }
  };
}

function mapViewModelToCreateModel(item: EletrodomesticoViewModel): CreateEletrodomesticoModel {
  return {
    nome: item.nome,
    descricao: item.descricao,
    data_compra: new Date(item.dataCompra),
    preco_compra: item.precoCompra,
    preco_anunciado_atual: item.precoAnunciadoAtual,
    tipo: item.tipo,
    tipo_id: item.tipoEletrodomestico.id,
    marca_id: item.marca.id,
  };
}

function mapViewModelToUpdateModel(item: EletrodomesticoViewModel): UpdateEletrodomesticoModel {
  return {
    nome: item.nome,
    descricao: item.descricao,
    preco_anunciado_atual: item.precoAnunciadoAtual,
  };
}

export function useEletrodomesticos() {
  const [eletrodomesticos, setEletrodomesticos] = useState<(EletrodomesticoViewModel & { id: number })[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      setLoading(true);
      const data = await EletrodomesticoService.getAllNaoFinalizados();
      const mapped = data.map(mapModelToViewModel);
      setEletrodomesticos(mapped);
    } catch (error) {
      console.error("Erro ao carregar os eletrodomésticos:", error);
    } finally {
      setLoading(false);
    }
  }

  async function createEletrodomestico(data: EletrodomesticoViewModel) {
    const model = mapViewModelToCreateModel(data);
    const created = await EletrodomesticoService.create(model);
    setEletrodomesticos(prev => [...prev, mapModelToViewModel(created)]);
  }

  async function updateEletrodomestico(id: number, data: EletrodomesticoViewModel) {
    const model = mapViewModelToUpdateModel(data);
    const updated = await EletrodomesticoService.update(id, model);
    setEletrodomesticos(prev => prev.map(item => item.id === id ? mapModelToViewModel(updated) : item));
  }

  async function deleteEletrodomestico(id: number) {
    await EletrodomesticoService.delete(id);
    setEletrodomesticos(prev => prev.filter(item => item.id !== id));
  }

  useEffect(() => { fetchData(); }, []);

  return { eletrodomesticos, loading, createEletrodomestico, updateEletrodomestico, deleteEletrodomestico, refetch: fetchData };
}
