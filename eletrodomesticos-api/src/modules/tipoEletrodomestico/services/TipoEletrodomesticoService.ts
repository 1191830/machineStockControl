import { ITipoEletrodomesticoRepository } from "../repositories/ITipoEletrodomesticoRepository";
import { TipoEletrodomestico } from "../../../entities/tipoEletrodomestico.entity";
import { CreateTipoEletrodomesticoDTO } from "../dtos/CreateTipoEletrodomesticoDTO";
import { UpdateTipoEletrodomesticoDTO } from "../dtos/UpdateTipoEletrodomesticoDTO";
import { ITipoEletrodomesticoService } from "./ITipoEletrodomesticoService";
import { inject, injectable } from "tsyringe";

@injectable()
export class TipoEletrodomesticoService implements ITipoEletrodomesticoService {
  constructor(
    @inject("ITipoEletrodomesticoRepository")
    private tipoEletrodomesticoRepository: ITipoEletrodomesticoRepository
  ) {}
  async create(data: CreateTipoEletrodomesticoDTO): Promise<TipoEletrodomestico> {
    return this.tipoEletrodomesticoRepository.create(data);
  }

  async findAll(): Promise<TipoEletrodomestico[]> {
    return this.tipoEletrodomesticoRepository.findAll();
  }

  async findById(id: number): Promise<TipoEletrodomestico | null> {
    return this.tipoEletrodomesticoRepository.findById(id);
  }

  async update(id: number, data: UpdateTipoEletrodomesticoDTO): Promise<TipoEletrodomestico | null> {
    return this.tipoEletrodomesticoRepository.update(id, data);
  }

  async delete(id: number): Promise<boolean> {
    return this.tipoEletrodomesticoRepository.delete(id);
  }
}
