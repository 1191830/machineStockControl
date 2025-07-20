import api from "../api/axiosConfig";
import type { TipoEletrodomesticoModel } from "../models/EletrodomesticoModel";

export class TipoEletrodomesticoService {
  static async getAll(): Promise<TipoEletrodomesticoModel[]> {
    const response = await api.get<TipoEletrodomesticoModel[]>("/tiposEletrodomesticos");
    return response.data;
  }
}
