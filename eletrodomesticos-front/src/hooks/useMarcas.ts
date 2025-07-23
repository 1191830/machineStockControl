import { useEffect, useState } from "react";
import { MarcaService } from "../services/MarcaService";
import type { MarcaModel, CreateMarcaModel, UpdateMarcaModel } from "../models/MarcaModel";

export function useMarcas() {
  const [marcas, setMarcas] = useState<MarcaModel[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      setLoading(true);
      const data = await MarcaService.getAll();
      setMarcas(data);
    } catch (error) {
      console.error("Erro ao carregar marcas:", error);
    } finally {
      setLoading(false);
    }
  }

  async function createMarca(data: CreateMarcaModel) {
    const created = await MarcaService.create(data);
    setMarcas(prev => [...prev, created]);
  }

  async function updateMarca(id: number, data: UpdateMarcaModel) {
    const updated = await MarcaService.update(id, data);
    setMarcas(prev => prev.map(item => item.id === id ? updated : item));
  }

  async function deleteMarca(id: number) {
    await MarcaService.delete(id);
    setMarcas(prev => prev.filter(item => item.id !== id));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {
    marcas,
    loading,
    createMarca,
    updateMarca,
    deleteMarca,
    refetch: fetchData
  };
}
