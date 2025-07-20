import { Repository } from "typeorm";
import { AppDataSource } from "../../../AppDataSource";
import { TipoEletrodomestico } from "../../../entities/tipoEletrodomestico.entity";
import { CreateTipoEletrodomesticoDTO } from "../dtos/CreateTipoEletrodomesticoDTO";
import { UpdateTipoEletrodomesticoDTO } from "../dtos/UpdateTipoEletrodomesticoDTO";
import { ITipoEletrodomesticoRepository } from "./ITipoEletrodomesticoRepository";
import { injectable } from "tsyringe";

@injectable()
export class TipoEletrodomesticoRepository implements ITipoEletrodomesticoRepository {
  private repository: Repository<TipoEletrodomestico>;

  constructor() {
    this.repository = AppDataSource.getRepository(TipoEletrodomestico);
  }

  async create(data: CreateTipoEletrodomesticoDTO): Promise<TipoEletrodomestico> {
    const tipoEletrodomestico = this.repository.create(data);
    return await this.repository.save(tipoEletrodomestico);
  }

  async findAll(): Promise<TipoEletrodomestico[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<TipoEletrodomestico | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, data: UpdateTipoEletrodomesticoDTO): Promise<TipoEletrodomestico | null> {
    await this.repository.update(id, data);
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? true : false;
  }
}
