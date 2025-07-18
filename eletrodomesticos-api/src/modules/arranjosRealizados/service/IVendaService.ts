import { Venda } from "../../../entities/venda.entity";
import { CreateVendaDTO } from "../dtos/CreateArranjoRealizadoDTO";
import { UpdateVendaDTO } from "../dtos/UpdateArranjoRealizadoDTO";

export interface IVendaService {
  create(data: CreateVendaDTO): Promise<Venda>;
  findAll(): Promise<Venda[]>;
  findById(id: number): Promise<Venda | null>;
  update(id: number, data: UpdateVendaDTO): Promise<Venda | null>;
  delete(id: number): Promise<boolean>;
}
