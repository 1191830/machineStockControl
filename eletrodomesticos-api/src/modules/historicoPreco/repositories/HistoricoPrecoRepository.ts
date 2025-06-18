import { Repository } from "typeorm";
import { AppDataSource } from "../../../AppDataSource";
import { HistoricoPrecoAnunciado } from "../../../entities/historicoPrecoAnunciado.entity";
import { CreateHistoricoPrecoDTO } from "../dtos/CreateHistoricoPrecoDTO";
import { IHistoricoPrecoRepository } from "./IHistoricoPrecoRepository";
import { injectable } from "tsyringe";
import { Eletrodomestico } from "../../../entities/eletrodomestico.entity";

@injectable()
export class HistoricoPrecoRepository implements IHistoricoPrecoRepository {
  private repository: Repository<HistoricoPrecoAnunciado>;
  private eletrodomesticoRepository: Repository<Eletrodomestico>;

  constructor() {
    this.repository = AppDataSource.getRepository(HistoricoPrecoAnunciado);
    this.eletrodomesticoRepository = AppDataSource.getRepository(Eletrodomestico);
  }

  async create(data: CreateHistoricoPrecoDTO): Promise<HistoricoPrecoAnunciado> {
    const eletrodomestico = await this.eletrodomesticoRepository.findOne({ where: { id: data.eletrodomestico } });
  
    if (!eletrodomestico) {
      throw new Error("Eletrodoméstico não encontrado");
    }
  
    const historicoPreco = this.repository.create({
      eletrodomestico,
      preco_anunciado: data.preco_anunciado,
      data_alteracao: data.data_alteracao,
    });
  
    return await this.repository.save(historicoPreco);
  }

  async findAll(): Promise<HistoricoPrecoAnunciado[]> {
    return await this.repository.find({ relations: ["eletrodomestico"] });
  }

  async findById(id: number): Promise<HistoricoPrecoAnunciado | null> {
    return await this.repository.findOne({ where: { id }, relations: ["eletrodomestico"] });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? true : false;
  }
}
