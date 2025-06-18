import { IHistoricoPrecoRepository } from "../repositories/IHistoricoPrecoRepository";
import { HistoricoPrecoAnunciado } from "../../../entities/historicoPrecoAnunciado.entity";
import { CreateHistoricoPrecoDTO } from "../dtos/CreateHistoricoPrecoDTO";
import { IHistoricoPrecoService } from "./IHistoricoPrecoService";
import { inject, injectable } from "tsyringe";

@injectable()
export class HistoricoPrecoService implements IHistoricoPrecoService {
  constructor(
    @inject("IHistoricoPrecoRepository")
    private HistoricoPrecoRepository: IHistoricoPrecoRepository
  ) {}
  async create(data: CreateHistoricoPrecoDTO): Promise<HistoricoPrecoAnunciado> {
    return this.HistoricoPrecoRepository.create(data);
  }

  async findAll(): Promise<HistoricoPrecoAnunciado[]> {
    return this.HistoricoPrecoRepository.findAll();
  }

  async findById(id: number): Promise<HistoricoPrecoAnunciado | null> {
    return this.HistoricoPrecoRepository.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    return this.HistoricoPrecoRepository.delete(id);
  }
}
