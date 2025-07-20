import api from "../api/axiosConfig";
import type { VendaModel, CreateVendaModel, UpdateVendaModel } from "../models/VendaModel";

export class VendaService {
  static async getAll(): Promise<VendaModel[]> {
    const response = await api.get<VendaModel[]>("/vendas");
    return response.data;
  }

  static async create(data: CreateVendaModel): Promise<VendaModel> {
    const response = await api.post("/vendas", data);
    return response.data;
  }

  static async update(id: number, data: UpdateVendaModel): Promise<VendaModel> {
    const response = await api.put(`/vendas/${id}`, data);
    return response.data;
  }

  static async delete(id: number): Promise<void> {
    await api.delete(`/vendas/${id}`);
  }
}
