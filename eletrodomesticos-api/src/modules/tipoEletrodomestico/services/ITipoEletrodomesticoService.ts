import { TipoEletrodomestico } from "../../../entities/tipoEletrodomestico.entity";
import { CreateTipoEletrodomesticoDTO } from "../dtos/CreateTipoEletrodomesticoDTO";
import { UpdateTipoEletrodomesticoDTO } from "../dtos/UpdateTipoEletrodomesticoDTO";

export interface ITipoEletrodomesticoService {
  create(data: CreateTipoEletrodomesticoDTO): Promise<TipoEletrodomestico>;
  findAll(): Promise<TipoEletrodomestico[]>;
  findById(id: number): Promise<TipoEletrodomestico | null>;
  update(id: number, data: UpdateTipoEletrodomesticoDTO): Promise<TipoEletrodomestico | null>;
  delete(id: number): Promise<boolean>;
}
