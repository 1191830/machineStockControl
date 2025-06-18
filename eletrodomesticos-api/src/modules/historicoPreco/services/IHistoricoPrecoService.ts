import { HistoricoPrecoAnunciado } from "../../../entities/historicoPrecoAnunciado.entity";
import { CreateHistoricoPrecoDTO } from "../dtos/CreateHistoricoPrecoDTO";

export interface IHistoricoPrecoService {
  create(data: CreateHistoricoPrecoDTO): Promise<HistoricoPrecoAnunciado>;
  findAll(): Promise<HistoricoPrecoAnunciado[]>;
  findById(id: number): Promise<HistoricoPrecoAnunciado | null>;
  delete(id: number): Promise<boolean>;
}
