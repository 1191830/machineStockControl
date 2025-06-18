import { Repository } from "typeorm";
import { AppDataSource } from "../../../AppDataSource";
import { Marca } from "../../../entities/marca.entity";
import { CreateMarcaDTO } from "../dtos/CreateMarcaDTO";
import { UpdateMarcaDTO } from "../dtos/UpdateMarcaDTO";
import { IMarcaRepository } from "./IMarcaRepository";
import { injectable } from "tsyringe";

@injectable()
export class MarcaRepository implements IMarcaRepository {
  private repository: Repository<Marca>;

  constructor() {
    this.repository = AppDataSource.getRepository(Marca);
  }

  async create(data: CreateMarcaDTO): Promise<Marca> {
    const marca = this.repository.create(data);
    return await this.repository.save(marca);
  }

  async findAll(): Promise<Marca[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<Marca | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, data: UpdateMarcaDTO): Promise<Marca | null> {
    await this.repository.update(id, data);
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? true : false;
  }
}
