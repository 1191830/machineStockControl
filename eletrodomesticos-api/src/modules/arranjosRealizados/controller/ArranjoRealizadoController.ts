import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IArranjoRealizadoService } from "../service/IArranjoRealizadoService";

@injectable()
export class ArranjoRealizadoController {
  constructor(
    @inject("IArranjoRealizadoService") private arranjoRealizadoService: IArranjoRealizadoService
  ) {}

  async create(req: Request, res: Response) {
    return await this.arranjoRealizadoService.create(req.body);
  }

  async getAll(req: Request, res: Response) {
    return await this.arranjoRealizadoService.findAll(); 
  }

  async getById(req: Request, res: Response) {
    return await this.arranjoRealizadoService.findById(Number(req.params.id));
  }

  async update(req: Request, res: Response) {
    return await this.arranjoRealizadoService.update(Number(req.params.id), req.body);
  }

  async delete(req: Request, res: Response) {
    return await this.arranjoRealizadoService.delete(Number(req.params.id));
  }
}
