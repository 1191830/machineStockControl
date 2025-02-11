import { Request, Response } from "express";
import { IEletrodomesticoService } from "../services/IEletrodomesticoService";
import { inject, injectable } from "tsyringe";
import { EletrodomesticoService } from "../services/EletrodomesticoService";
@injectable()
export class EletrodomesticoController {
  constructor(
    @inject("IEletrodomesticoService") private eletrodomesticoService: IEletrodomesticoService
  ) {}

  async create(req: Request, res: Response) {
    return await this.eletrodomesticoService.create(req.body);
  }

  async getAll(req: Request, res: Response) {
    return await this.eletrodomesticoService.findAll();
  }

  async getById(req: Request, res: Response) {
    return await this.eletrodomesticoService.findById(Number(req.params.id));
  }

  async update(req: Request, res: Response) {
    return await this.eletrodomesticoService.update(Number(req.params.id), req.body);
  }

  async delete(req: Request, res: Response) {
    return await this.eletrodomesticoService.delete(Number(req.params.id));
  }
}
