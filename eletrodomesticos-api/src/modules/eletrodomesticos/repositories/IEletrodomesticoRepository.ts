import { Eletrodomestico } from "../../../entities/eletrodomestico.entity";
import { CreateEletrodomesticoDTO } from "../dtos/CreateEletrodomesticoDTO";
import { UpdateEletrodomesticoDTO } from "../dtos/UpdateEletrodomesticoDTO";

export interface IEletrodomesticoRepository {
  create(data: CreateEletrodomesticoDTO): Promise<Eletrodomestico>;
  findAll(): Promise<Eletrodomestico[]>;
  findById(id: number): Promise<Eletrodomestico | null>;
  update(id: number, data: UpdateEletrodomesticoDTO): Promise<Eletrodomestico | null>;
  delete(id: number): Promise<boolean>;
}
