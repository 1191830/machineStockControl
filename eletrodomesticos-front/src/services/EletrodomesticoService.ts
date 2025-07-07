// services/EletrodomesticoService.ts
import api from "../api/axiosConfig";
import type { EletrodomesticoModel } from "../models/EletrodomesticoModel";

export class EletrodomesticoService {
  static async getAll(): Promise<EletrodomesticoModel[]> {
    const response = await api.get<EletrodomesticoModel[]>("/eletrodomesticos");
    return response.data;
  }

  static async create(data: EletrodomesticoModel): Promise<EletrodomesticoModel> {
    const response = await api.post("/eletrodomesticos", data);
    return response.data;
  }

  static async update(id: number, data: EletrodomesticoModel): Promise<EletrodomesticoModel> {
    const response = await api.put(`/eletrodomesticos/${id}`, data);
    return response.data;
  }

  static async delete(id: number): Promise<void> {
    await api.delete(`/eletrodomesticos/${id}`);
  }
}
