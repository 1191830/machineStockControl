import api from "../api/axiosConfig";
import type { CreateTipoEletrodomesticoModel, TipoEletrodomesticoModel, UpdateTipoEletrodomesticoModel } from "../models/TipoEletrodomesticoModel";

export class TipoEletrodomesticoService {
  static async getAll(): Promise<TipoEletrodomesticoModel[]> {
    const response = await api.get<TipoEletrodomesticoModel[]>("/tiposEletrodomesticos");
    return response.data;
  }

  static async create(data: CreateTipoEletrodomesticoModel): Promise<TipoEletrodomesticoModel> {
    const response = await api.post("/tiposEletrodomesticos", data);
    return response.data;
  }

  static async update(id: number, data: UpdateTipoEletrodomesticoModel): Promise<TipoEletrodomesticoModel> {
    const response = await api.put(`/tiposEletrodomesticos/${id}`, data);
    return response.data;
  }

  static async delete(id: number): Promise<void> {
    await api.delete(`/tiposEletrodomesticos/${id}`);
  }
}
