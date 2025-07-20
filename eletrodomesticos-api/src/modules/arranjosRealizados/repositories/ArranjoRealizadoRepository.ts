import { Repository } from "typeorm";
import { AppDataSource } from "../../../AppDataSource";
import { ArranjoRealizado } from "../../../entities/arranjoRealizado.entity";
import { CreateArranjoRealizadoDTO } from "../dtos/CreateArranjoRealizadoDTO";
import { UpdateArranjoRealizadoDTO } from "../dtos/UpdateArranjoRealizadoDTO";
import { IArranjoRealizadoRepository } from "./IArranjoRealizadoRepository";
import { Eletrodomestico } from "../../../entities/eletrodomestico.entity";
import { injectable } from "tsyringe";

@injectable()
export class ArranjoRealizadoRepository implements IArranjoRealizadoRepository {
  private repository: Repository<ArranjoRealizado>;
  private eletroRepository: Repository<Eletrodomestico>;

  constructor() {
    this.repository = AppDataSource.getRepository(ArranjoRealizado);
    this.eletroRepository = AppDataSource.getRepository(Eletrodomestico);
  }

  async create(data: CreateArranjoRealizadoDTO): Promise<ArranjoRealizado> {
    const eletro = await this.eletroRepository.findOne({ where: { id: data.eletrodomestico_id } });

    if (!eletro) {
      throw new Error("Eletrodoméstico não encontrado");
    }

    const arranjo = this.repository.create({
      eletrodomestico: eletro,
      data_arranjo: data.data_arranjo,
      custo_materiais: data.custo_materiais,
      preco_pago_cliente: data.preco_pago_cliente,
      descricao: data.descricao,
    });

    const saved = await this.repository.save(arranjo);

    await this.eletroRepository.update(eletro.id, { finalizado: true });

    return saved;
  }

  async findAll(): Promise<ArranjoRealizado[]> {
    return await this.repository.find({ relations: ["eletrodomestico"] });
  }

  async findById(id: number): Promise<ArranjoRealizado | null> {
    return await this.repository.findOne({ where: { id }, relations: ["eletrodomestico"] });
  }

  async update(id: number, data: UpdateArranjoRealizadoDTO): Promise<ArranjoRealizado | null> {
    await this.repository.update(id, data);
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const exists = await this.repository.findOne({ where: { id } });

    if (!exists) {
      return false;
    }

    const result = await this.repository.delete(id);
    return result.affected ? true : false;
  }
}
