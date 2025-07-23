import api from "../api/axiosConfig";
import type { MarcaModel, CreateMarcaModel, UpdateMarcaModel } from "../models/MarcaModel";

export class MarcaService {
  static async getAll(): Promise<MarcaModel[]> {
    const response = await api.get<MarcaModel[]>("/marcas");
    return response.data;
  }

  static async create(data: CreateMarcaModel): Promise<MarcaModel> {
    const response = await api.post("/marcas", data);
    return response.data;
  }

  static async update(id: number, data: UpdateMarcaModel): Promise<MarcaModel> {
    const response = await api.put(`/marcas/${id}`, data);
    return response.data;
  }

  static async delete(id: number): Promise<void> {
    await api.delete(`/marcas/${id}`);
  }
}
