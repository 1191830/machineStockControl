import { inject, injectable } from "tsyringe";
import { IArranjoRealizadoRepository } from "../repositories/IArranjoRealizadoRepository";
import { IArranjoRealizadoService } from "./IArranjoRealizadoService";
import { ArranjoRealizado } from "../../../entities/arranjoRealizado.entity";
import { CreateArranjoRealizadoDTO } from "../dtos/CreateArranjoRealizadoDTO";
import { UpdateArranjoRealizadoDTO } from "../dtos/UpdateArranjoRealizadoDTO";

@injectable()
export class ArranjoRealizadoService implements IArranjoRealizadoService {
  constructor(
    @inject("IArranjoRealizadoRepository")
    private arranjoRepository: IArranjoRealizadoRepository
  ) {}

  async create(data: CreateArranjoRealizadoDTO): Promise<ArranjoRealizado> {
    return this.arranjoRepository.create(data);
  }

  async findAll(): Promise<ArranjoRealizado[]> {
    return this.arranjoRepository.findAll();
  }

  async findById(id: number): Promise<ArranjoRealizado | null> {
    return this.arranjoRepository.findById(id);
  }

  async update(id: number, data: UpdateArranjoRealizadoDTO): Promise<ArranjoRealizado | null> {
    return this.arranjoRepository.update(id, data);
  }

  async delete(id: number): Promise<boolean> {
    return this.arranjoRepository.delete(id);
  }
}
