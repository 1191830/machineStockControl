import { useEffect, useState } from "react";
import type { CreateTipoEletrodomesticoModel, TipoEletrodomesticoModel, UpdateTipoEletrodomesticoModel } from "../models/TipoEletrodomesticoModel";
import { TipoEletrodomesticoService } from "../services/TipoEletrodomesticoService";

export function useTipoEletrodomesticos() {
  const [tipoEletrodomesticos, setTipoEletrodomesticos] = useState<TipoEletrodomesticoModel[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      setLoading(true);
      const data = await TipoEletrodomesticoService.getAll();
      setTipoEletrodomesticos(data);
    } catch (error) {
      console.error("Erro ao carregar TipoEletrodomesticos:", error);
    } finally {
      setLoading(false);
    }
  }

  async function createTipoEletrodomestico(data: CreateTipoEletrodomesticoModel) {
    const created = await TipoEletrodomesticoService.create(data);
    setTipoEletrodomesticos(prev => [...prev, created]);
  }

  async function updateTipoEletrodomestico(id: number, data: UpdateTipoEletrodomesticoModel) {
    const updated = await TipoEletrodomesticoService.update(id, data);
    setTipoEletrodomesticos(prev => prev.map(item => item.id === id ? updated : item));
  }

  async function deleteTipoEletrodomestico(id: number) {
    await TipoEletrodomesticoService.delete(id);
    setTipoEletrodomesticos(prev => prev.filter(item => item.id !== id));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {
    tipoEletrodomesticos,
    loading,
    createTipoEletrodomestico,
    updateTipoEletrodomestico,
    deleteTipoEletrodomestico,
    refetch: fetchData
  };
}
