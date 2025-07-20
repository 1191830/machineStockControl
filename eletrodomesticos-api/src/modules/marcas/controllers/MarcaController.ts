import { Request, Response } from "express";
import { IMarcaService } from "../services/IMarcaService";
import { inject, injectable } from "tsyringe";

@injectable()
export class MarcaController {
  constructor(
    @inject("IMarcaService") private marcaService: IMarcaService
  ) {}

  async create(req: Request, res: Response) {
    return await this.marcaService.create(req.body);
  }

  async getAll(req: Request, res: Response) {
    return await this.marcaService.findAll();
  }

  async getById(req: Request, res: Response) {
    return await this.marcaService.findById(Number(req.params.id));
  }

  async update(req: Request, res: Response) {
    return await this.marcaService.update(Number(req.params.id), req.body);
  }

  async delete(req: Request, res: Response) {
    return await this.marcaService.delete(Number(req.params.id));
  }
}
