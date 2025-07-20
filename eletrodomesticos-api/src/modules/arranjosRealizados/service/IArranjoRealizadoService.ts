import { ArranjoRealizado } from "../../../entities/arranjoRealizado.entity";
import { CreateArranjoRealizadoDTO } from "../dtos/CreateArranjoRealizadoDTO";
import { UpdateArranjoRealizadoDTO } from "../dtos/UpdateArranjoRealizadoDTO";

export interface IArranjoRealizadoService {
  create(data: CreateArranjoRealizadoDTO): Promise<ArranjoRealizado>;
  findAll(): Promise<ArranjoRealizado[]>;
  findById(id: number): Promise<ArranjoRealizado | null>;
  update(id: number, data: UpdateArranjoRealizadoDTO): Promise<ArranjoRealizado | null>;
  delete(id: number): Promise<boolean>;
}
