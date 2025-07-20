import { Repository } from "typeorm";
import { AppDataSource } from "../../../AppDataSource";
import { Eletrodomestico } from "../../../entities/eletrodomestico.entity";
import { CreateEletrodomesticoDTO } from "../dtos/CreateEletrodomesticoDTO";
import { UpdateEletrodomesticoDTO } from "../dtos/UpdateEletrodomesticoDTO";
import { IEletrodomesticoRepository } from "./IEletrodomesticoRepository";
import { injectable } from "tsyringe";
import { TipoEletrodomestico } from "../../../entities/tipoEletrodomestico.entity";
import { Marca } from "../../../entities/marca.entity";

@injectable()
export class EletrodomesticoRepository implements IEletrodomesticoRepository {
  private repository: Repository<Eletrodomestico>;
  private marcaRepository: Repository<Marca>;
  private tipoEletrodomesticoRepository: Repository<TipoEletrodomestico>;

  constructor() {
    this.repository = AppDataSource.getRepository(Eletrodomestico);
    this.marcaRepository = AppDataSource.getRepository(Marca);
    this.tipoEletrodomesticoRepository = AppDataSource.getRepository(TipoEletrodomestico);
  }

    async create(data: CreateEletrodomesticoDTO): Promise<Eletrodomestico> {
      const marca = await this.marcaRepository.findOne({ where: { id: data.marca_id } });
      const tipoEletrodomestico = await this.tipoEletrodomesticoRepository.findOne({ where: { id: data.tipo_id } });

      if (!marca) {
        throw new Error("Marca não encontrada");
      }

      if(!tipoEletrodomestico) {
        throw new Error("Tipo de eletrodomestico não encontrado");
      }
    
      const eletrodomestico = this.repository.create({
        nome: data.nome,
        descricao: data.descricao,
        data_compra: data.data_compra,
        preco_compra: data.preco_compra,
        preco_anunciado_atual: data.preco_anunciado_atual,
        tipo: data.tipo,
        finalizado: false,
        marca: marca,
        tipoEletrodomestico: tipoEletrodomestico
      });
    
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

  async findAllNaoFinalizados(): Promise<Eletrodomestico[]> {
  return await this.repository.find({
    where: { finalizado: false },
    relations: ["marca", "tipoEletrodomestico"],
  });
}
}
