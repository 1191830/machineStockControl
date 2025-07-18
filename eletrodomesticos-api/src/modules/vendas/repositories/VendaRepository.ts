import { Repository } from "typeorm";
import { AppDataSource } from "../../../AppDataSource";
import { Venda } from "../../../entities/venda.entity";
import { CreateVendaDTO } from "../dtos/CreateVendaDTO";
import { UpdateVendaDTO } from "../dtos/UpdateVendaDTO";
import { IVendaRepository } from "./IVendaRepository";
import { Eletrodomestico } from "../../../entities/eletrodomestico.entity";
import { injectable } from "tsyringe";

@injectable()
export class VendaRepository implements IVendaRepository {
  private repository: Repository<Venda>;
  private eletroRepository: Repository<Eletrodomestico>;

  constructor() {
    this.repository = AppDataSource.getRepository(Venda);
    this.eletroRepository = AppDataSource.getRepository(Eletrodomestico);
  }

  async create(data: CreateVendaDTO): Promise<Venda> {
    const eletro = await this.eletroRepository.findOne({ where: { id: data.eletrodomestico_id } });

    if (!eletro) {
      throw new Error("Eletrodoméstico não encontrado");
    }

    const venda = this.repository.create({
      eletrodomestico: eletro,
      data_venda: data.data_venda,
      preco_venda: data.preco_venda,
      garantia_meses: data.garantia_meses,
      contacto_comprador: data.contacto_comprador,
    });

    const saved = await this.repository.save(venda);

    await this.eletroRepository.update(eletro.id, { finalizado: true });

    return saved;
  }

  async findAll(): Promise<Venda[]> {
    return await this.repository.find({ relations: ["eletrodomestico"] });
  }

  async findById(id: number): Promise<Venda | null> {
    return await this.repository.findOne({ where: { id }, relations: ["eletrodomestico"] });
  }

  async update(id: number, data: UpdateVendaDTO): Promise<Venda | null> {
    await this.repository.update(id, data);
    return await this.findById(id);
  }

    async delete(id: number): Promise<boolean> {
    const venda = await this.repository.findOne({
        where: { id },
        relations: ["eletrodomestico"],
    });

    if (!venda) {
        return false;
    }

    const result = await this.repository.delete(id);

    if (result.affected) {
        const eletro = venda.eletrodomestico;
        eletro.finalizado = false;
        await this.eletroRepository.save(eletro);
        return true;
    }

    return false;
    }
}
