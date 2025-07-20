// services/MarcaService.ts
import api from "../api/axiosConfig";
import type { MarcaModel } from "../models/EletrodomesticoModel";

export class MarcaService {
  static async getAll(): Promise<MarcaModel[]> {
    const response = await api.get<MarcaModel[]>("/marcas");
    return response.data;
  }
}
