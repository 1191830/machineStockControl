import api from "../api/axiosConfig";
import type {
  ArranjoRealizadoModel,
  CreateArranjoRealizadoModel,
  UpdateArranjoRealizadoModel,
} from "../models/ArranjoRealizadoModel";

export class ArranjoRealizadoService {
  static async getAll(): Promise<ArranjoRealizadoModel[]> {
    const response = await api.get<ArranjoRealizadoModel[]>("/arranjosRealizados");
    return response.data;
  }

  static async create(data: CreateArranjoRealizadoModel): Promise<ArranjoRealizadoModel> {
    const response = await api.post("/arranjosRealizados", data);
    return response.data;
  }

  static async update(id: number, data: UpdateArranjoRealizadoModel): Promise<ArranjoRealizadoModel> {
    const response = await api.put(`/arranjosRealizados/${id}`, data);
    return response.data;
  }

  static async delete(id: number): Promise<void> {
    await api.delete(`/arranjosRealizados/${id}`);
  }
}
