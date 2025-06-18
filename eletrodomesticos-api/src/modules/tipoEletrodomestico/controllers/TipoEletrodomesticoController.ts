import { Request, Response } from "express";
import { ITipoEletrodomesticoService } from "../services/ITipoEletrodomesticoService";
import { inject, injectable } from "tsyringe";

@injectable()
export class TipoEletrodomesticoController {
  constructor(
    @inject("ITipoEletrodomesticoService") private tipoEletrodomesticoService: ITipoEletrodomesticoService
  ) {}

  async create(req: Request, res: Response) {
    return await this.tipoEletrodomesticoService.create(req.body);
  }

  async getAll(req: Request, res: Response) {
    return await this.tipoEletrodomesticoService.findAll();
  }

  async getById(req: Request, res: Response) {
    return await this.tipoEletrodomesticoService.findById(Number(req.params.id));
  }

  async update(req: Request, res: Response) {
    return await this.tipoEletrodomesticoService.update(Number(req.params.id), req.body);
  }

  async delete(req: Request, res: Response) {
    return await this.tipoEletrodomesticoService.delete(Number(req.params.id));
  }
}
