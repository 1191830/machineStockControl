import { useEffect, useState } from "react";
import { ArranjoRealizadoService } from "../services/ArranjoRealizadoService";
import type {
  ArranjoRealizadoModel,
  CreateArranjoRealizadoModel,
  UpdateArranjoRealizadoModel,
} from "../models/ArranjoRealizadoModel";
import type { ArranjoRealizadoViewModel } from "../viewModels/ArranjoRealizadoviewModel";

function toInputDateString(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00`);
  return isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0];
}

function mapModelToViewModel(item: ArranjoRealizadoModel): ArranjoRealizadoViewModel & { id: number } {
  return {
    id: item.id,
    dataArranjo: toInputDateString(item.data_arranjo),
    descricao: item.descricao ?? "",
    custoMateriais: item.custo_materiais,
    precoPagoCliente: item.preco_pago_cliente,
    eletrodomestico: {
      id: item.eletrodomestico.id,
      nome: item.eletrodomestico.nome,
      descricao: item.eletrodomestico.descricao,
      dataCompra: toInputDateString(item.eletrodomestico.data_compra),
      precoCompra: item.eletrodomestico.preco_compra,
      precoAnunciadoAtual: item.eletrodomestico.preco_anunciado_atual,
      tipo: item.eletrodomestico.tipo,
      tipoEletrodomestico: {
        id: item.eletrodomestico.tipoEletrodomestico?.id ?? 0,
        nome: item.eletrodomestico.tipoEletrodomestico?.nome ?? ""
      },
      marca: {
        id: item.eletrodomestico.marca?.id ?? 0,
        nome: item.eletrodomestico.marca?.nome ?? ""
      }
    }
  };
}

function mapViewModelToCreateModel(item: ArranjoRealizadoViewModel): CreateArranjoRealizadoModel {
  return {
    eletrodomestico_id: item.eletrodomestico.id,
    data_arranjo: new Date(item.dataArranjo),
    descricao: item.descricao,
    custo_materiais: item.custoMateriais,
    preco_pago_cliente: item.precoPagoCliente,
  };
}

function mapViewModelToUpdateModel(item: ArranjoRealizadoViewModel): UpdateArranjoRealizadoModel {
  return {
    data_arranjo: new Date(item.dataArranjo),
    descricao: item.descricao,
    custo_materiais: item.custoMateriais,
    preco_pago_cliente: item.precoPagoCliente,
  };
}

export function useArranjosRealizados() {
  const [arranjos, setArranjos] = useState<(ArranjoRealizadoViewModel & { id: number })[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      setLoading(true);
      const data = await ArranjoRealizadoService.getAll();
      const mapped = data.map(mapModelToViewModel);
      setArranjos(mapped);
    } catch (error) {
      console.error("Erro ao carregar os arranjos:", error);
    } finally {
      setLoading(false);
    }
  }

  async function createArranjo(data: ArranjoRealizadoViewModel) {
    const model = mapViewModelToCreateModel(data);
    const created = await ArranjoRealizadoService.create(model);
    setArranjos(prev => [...prev, mapModelToViewModel(created)]);
  }

  async function updateArranjo(id: number, data: ArranjoRealizadoViewModel) {
    const model = mapViewModelToUpdateModel(data);
    const updated = await ArranjoRealizadoService.update(id, model);
    setArranjos(prev => prev.map(item => item.id === id ? mapModelToViewModel(updated) : item));
  }

  async function deleteArranjo(id: number) {
    await ArranjoRealizadoService.delete(id);
    setArranjos(prev => prev.filter(item => item.id !== id));
  }

  useEffect(() => { fetchData(); }, []);

  return { arranjos, loading, createArranjo, updateArranjo, deleteArranjo, refetch: fetchData };
}
