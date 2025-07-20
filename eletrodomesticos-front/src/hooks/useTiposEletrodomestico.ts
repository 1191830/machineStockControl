import { useEffect, useState } from "react";
import { TipoEletrodomesticoService } from "../services/TipoEletrodomesticoService";
import type { TipoEletrodomesticoModel } from "../models/EletrodomesticoModel";

export function useTiposEletrodomestico() {
  const [tiposEletrodomestico, setTipos] = useState<TipoEletrodomesticoModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await TipoEletrodomesticoService.getAll();
        setTipos(data);
      } catch (error) {
        console.error("Erro ao carregar tipos de eletrodomésticos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { tiposEletrodomestico, loading };
}
