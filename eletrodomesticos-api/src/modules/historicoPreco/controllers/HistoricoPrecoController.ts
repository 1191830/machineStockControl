import { Request, Response } from "express";
import { IHistoricoPrecoService } from "../services/IHistoricoPrecoService";
import { inject, injectable } from "tsyringe";
@injectable()
export class HistoricoPrecoController {
  constructor(
    @inject("IHistoricoPrecoService") private historicoPrecoService: IHistoricoPrecoService
  ) {}

  async create(req: Request, res: Response) {
    return await this.historicoPrecoService.create(req.body);
  }

  async getAll(req: Request, res: Response) {
    return await this.historicoPrecoService.findAll();
  }

  async getById(req: Request, res: Response) {
    return await this.historicoPrecoService.findById(Number(req.params.id));
  }

  async delete(req: Request, res: Response) {
    return await this.historicoPrecoService.delete(Number(req.params.id));
  }
}
