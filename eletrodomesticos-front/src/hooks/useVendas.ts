import { useEffect, useState } from "react";
import { VendaService } from "../services/VendaService";
import type { VendaModel, CreateVendaModel, UpdateVendaModel } from "../models/VendaModel";
import type { VendaViewModel } from "../viewModels/VendaViewModel";

function toInputDateString(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00`);
  return isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0];
}

function mapModelToViewModel(item: VendaModel): VendaViewModel & { id: number } {
  return {
    id: item.id,
    dataVenda: toInputDateString(item.data_venda),
    precoVenda: item.preco_venda,
    gastos: item.gastos,
    garantiaMeses: item.garantia_meses,
    contactoComprador: item.contacto_comprador,
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


function mapViewModelToCreateModel(item: VendaViewModel): CreateVendaModel {
  return {
    eletrodomestico_id: item.eletrodomestico.id,
    data_venda: new Date(item.dataVenda),
    preco_venda: item.precoVenda,
    gastos: item.gastos,
    garantia_meses: item.garantiaMeses,
    contacto_comprador: item.contactoComprador,
  };
}

function mapViewModelToUpdateModel(item: VendaViewModel): UpdateVendaModel {
  return {
    data_venda: new Date(item.dataVenda),
    preco_venda: item.precoVenda,
    gastos: item.gastos,
    garantia_meses: item.garantiaMeses,
    contacto_comprador: item.contactoComprador,
  };
}

export function useVendas() {
  const [vendas, setVendas] = useState<(VendaViewModel & { id: number })[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      setLoading(true);
      const data = await VendaService.getAll();
      const mapped = data.map(mapModelToViewModel);
      setVendas(mapped);
    } catch (error) {
      console.error("Erro ao carregar as vendas:", error);
    } finally {
      setLoading(false);
    }
  }

  async function createVenda(data: VendaViewModel) {
    const model = mapViewModelToCreateModel(data);
    const created = await VendaService.create(model);
    setVendas(prev => [...prev, mapModelToViewModel(created)]);
  }

  async function updateVenda(id: number, data: VendaViewModel) {
    const model = mapViewModelToUpdateModel(data);
    const updated = await VendaService.update(id, model);
    setVendas(prev => prev.map(item => item.id === id ? mapModelToViewModel(updated) : item));
  }

  async function deleteVenda(id: number) {
    await VendaService.delete(id);
    setVendas(prev => prev.filter(item => item.id !== id));
  }

  useEffect(() => { fetchData(); }, []);

  return { vendas, loading, createVenda, updateVenda, deleteVenda, refetch: fetchData };
}
