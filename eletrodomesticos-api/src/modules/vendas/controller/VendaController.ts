import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IVendaService } from "../service/IVendaService";

@injectable()
export class VendaController {
  constructor(
    @inject("IVendaService") private vendaService: IVendaService
  ) {}

  async create(req: Request, res: Response) {
    return await this.vendaService.create(req.body);
  }

  async getAll(req: Request, res: Response) {
    return await this.vendaService.findAll(); 
  }

  async getById(req: Request, res: Response) {
    return await this.vendaService.findById(Number(req.params.id));
  }

  async update(req: Request, res: Response) {
    return await this.vendaService.update(Number(req.params.id), req.body);
  }

  async delete(req: Request, res: Response) {
    return await this.vendaService.delete(Number(req.params.id));
  }
}
