import { Repository } from "typeorm";
import { AppDataSource } from "../../../AppDataSource";
import { Eletrodomestico } from "../../../entities/eletrodomestico.entity";
import { CreateEletrodomesticoDTO } from "../dtos/CreateEletrodomesticoDTO";
import { UpdateEletrodomesticoDTO } from "../dtos/UpdateEletrodomesticoDTO";
import { IEletrodomesticoRepository } from "./IEletrodomesticoRepository";
import { injectable } from "tsyringe";

@injectable()
export class EletrodomesticoRepository implements IEletrodomesticoRepository {
  private repository: Repository<Eletrodomestico>;

  constructor() {
    this.repository = AppDataSource.getRepository(Eletrodomestico);
  }

  async create(data: CreateEletrodomesticoDTO): Promise<Eletrodomestico> {
    const eletrodomestico = this.repository.create(data);
    return await this.repository.save(eletrodomestico);
  }

  async findAll(): Promise<Eletrodomestico[]> {
    return await this.repository.find({ relations: ["marca", "tipoEletrodomestico"] });
  }

  async findById(id: number): Promise<Eletrodomestico | null> {
    return await this.repository.findOne({ where: { id }, relations: ["marca", "tipoEletrodomestico"] });
  }

  async update(id: number, data: UpdateEletrodomesticoDTO): Promise<Eletrodomestico | null> {
    await this.repository.update(id, data);
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? true : false;
  }
}
