import { Marca } from "../../../entities/marca.entity";
import { CreateMarcaDTO } from "../dtos/CreateMarcaDTO";
import { UpdateMarcaDTO } from "../dtos/UpdateMarcaDTO";

export interface IMarcaService {
  create(data: CreateMarcaDTO): Promise<Marca>;
  findAll(): Promise<Marca[]>;
  findById(id: number): Promise<Marca | null>;
  update(id: number, data: UpdateMarcaDTO): Promise<Marca | null>;
  delete(id: number): Promise<boolean>;
}
