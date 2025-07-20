// services/EletrodomesticoService.ts
import api from "../api/axiosConfig";
import type { CreateEletrodomesticoModel, EletrodomesticoModel, UpdateEletrodomesticoModel } from "../models/EletrodomesticoModel";

export class EletrodomesticoService {
  static async getAll(): Promise<EletrodomesticoModel[]> {
    const response = await api.get<EletrodomesticoModel[]>("/eletrodomesticos");
    return response.data;
  }

  static async create(data: CreateEletrodomesticoModel): Promise<EletrodomesticoModel> {
    const response = await api.post("/eletrodomesticos", data);
    return response.data;
  }

  static async update(id: number, data: UpdateEletrodomesticoModel): Promise<EletrodomesticoModel> {
    const response = await api.put(`/eletrodomesticos/${id}`, data);
    return response.data;
  }

  static async delete(id: number): Promise<void> {
    await api.delete(`/eletrodomesticos/${id}`);
  }

  static async getAllNaoFinalizados(): Promise<EletrodomesticoModel[]> {
    const response = await api.get<EletrodomesticoModel[]>("/eletrodomesticos/nao-finalizados");
    return response.data;
  }
}
