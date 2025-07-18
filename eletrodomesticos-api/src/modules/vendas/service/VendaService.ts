import { inject, injectable } from "tsyringe";
import { IVendaRepository } from "../repositories/IVendaRepository";
import { IVendaService } from "./IVendaService";
import { Venda } from "../../../entities/venda.entity";
import { CreateVendaDTO } from "../dtos/CreateVendaDTO";
import { UpdateVendaDTO } from "../dtos/UpdateVendaDTO";

@injectable()
export class VendaService implements IVendaService {
  constructor(
    @inject("IVendaRepository")
    private vendaRepository: IVendaRepository
  ) {}

  async create(data: CreateVendaDTO): Promise<Venda> {
    return this.vendaRepository.create(data);
  }

  async findAll(): Promise<Venda[]> {
    return this.vendaRepository.findAll();
  }

  async findById(id: number): Promise<Venda | null> {
    return this.vendaRepository.findById(id);
  }

  async update(id: number, data: UpdateVendaDTO): Promise<Venda | null> {
    return this.vendaRepository.update(id, data);
  }

  async delete(id: number): Promise<boolean> {
    return this.vendaRepository.delete(id);
  }
}
