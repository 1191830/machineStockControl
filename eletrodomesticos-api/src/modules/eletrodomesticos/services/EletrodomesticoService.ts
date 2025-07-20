import { IEletrodomesticoRepository } from "../repositories/IEletrodomesticoRepository";
import { Eletrodomestico } from "../../../entities/eletrodomestico.entity";
import { CreateEletrodomesticoDTO } from "../dtos/CreateEletrodomesticoDTO";
import { UpdateEletrodomesticoDTO } from "../dtos/UpdateEletrodomesticoDTO";
import { IEletrodomesticoService } from "./IEletrodomesticoService";
import { inject, injectable } from "tsyringe";

@injectable()
export class EletrodomesticoService implements IEletrodomesticoService {
  constructor(
    @inject("IEletrodomesticoRepository")
    private eletrodomesticoRepository: IEletrodomesticoRepository
  ) {}
  async create(data: CreateEletrodomesticoDTO): Promise<Eletrodomestico> {
    return this.eletrodomesticoRepository.create(data);
  }

  async findAll(): Promise<Eletrodomestico[]> {
    return this.eletrodomesticoRepository.findAll();
  }

  async findById(id: number): Promise<Eletrodomestico | null> {
    return this.eletrodomesticoRepository.findById(id);
  }

  async update(id: number, data: UpdateEletrodomesticoDTO): Promise<Eletrodomestico | null> {
    return this.eletrodomesticoRepository.update(id, data);
  }

  async delete(id: number): Promise<boolean> {
    return this.eletrodomesticoRepository.delete(id);
  }

  async findAllNaoFinalizados(): Promise<Eletrodomestico[]> {
    return this.eletrodomesticoRepository.findAllNaoFinalizados();
  }
}
