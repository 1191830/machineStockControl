// hooks/useMarcas.ts
import { useEffect, useState } from "react";
import { MarcaService } from "../services/MarcaService";
import type { MarcaModel } from "../models/EletrodomesticoModel";

export function useMarcas() {
  const [marcas, setMarcas] = useState<MarcaModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await MarcaService.getAll();
        setMarcas(data);
      } catch (error) {
        console.error("Erro ao carregar marcas:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { marcas, loading };
}
