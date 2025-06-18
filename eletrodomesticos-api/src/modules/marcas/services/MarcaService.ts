import { IMarcaRepository } from "../repositories/IMarcaRepository";
import { Marca } from "../../../entities/marca.entity";
import { CreateMarcaDTO } from "../dtos/CreateMarcaDTO";
import { UpdateMarcaDTO } from "../dtos/UpdateMarcaDTO";
import { IMarcaService } from "./IMarcaService";
import { inject, injectable } from "tsyringe";

@injectable()
export class MarcaService implements IMarcaService {
  constructor(
    @inject("IMarcaRepository")
    private marcaRepository: IMarcaRepository
  ) {}
  async create(data: CreateMarcaDTO): Promise<Marca> {
    return this.marcaRepository.create(data);
  }

  async findAll(): Promise<Marca[]> {
    return this.marcaRepository.findAll();
  }

  async findById(id: number): Promise<Marca | null> {
    return this.marcaRepository.findById(id);
  }

  async update(id: number, data: UpdateMarcaDTO): Promise<Marca | null> {
    return this.marcaRepository.update(id, data);
  }

  async delete(id: number): Promise<boolean> {
    return this.marcaRepository.delete(id);
  }
}
