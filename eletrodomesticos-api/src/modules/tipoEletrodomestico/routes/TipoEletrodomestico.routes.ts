import { Router } from "express";
import { container } from "tsyringe";
import { TipoEletrodomesticoController } from "../controllers/TipoEletrodomesticoController";

const tipoEletrodomesticoRoutes = Router();
const tipoEletrodomesticoController = container.resolve(TipoEletrodomesticoController);

// Rota POST - Criar um novo eletrodoméstico
tipoEletrodomesticoRoutes.post("/", async (req, res) => {
  try {
    const TipoEletrodomestico = await tipoEletrodomesticoController.create(req, res);
    res.status(201).json(TipoEletrodomestico);
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao criar eletrodoméstico", error: error.message });
  }
});

// Rota GET - Buscar todos os eletrodomésticos
tipoEletrodomesticoRoutes.get("/", async (req, res) => {
  try {
    const TipoEletrodomesticos = await tipoEletrodomesticoController.getAll(req, res);
    res.status(200).json(TipoEletrodomesticos);
  } catch (error:any) {
    res.status(500).json({ message: "Erro ao buscar eletrodomésticos", error: error.message });
  }
});

// Rota GET - Buscar eletrodoméstico pelo ID
tipoEletrodomesticoRoutes.get("/:id", async (req, res) => {
  try {
    const TipoEletrodomestico = await tipoEletrodomesticoController.getById(req, res);
    if (!TipoEletrodomestico) {
      res.status(404).json({ message: "Eletrodoméstico não encontrado" });
    } else {
      res.status(200).json(TipoEletrodomestico);
    }
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao buscar eletrodoméstico", error: error.message });
  }
});

// Rota PUT - Atualizar um eletrodoméstico pelo ID
tipoEletrodomesticoRoutes.put("/:id", async (req, res) => {
  try {
    const TipoEletrodomestico = await tipoEletrodomesticoController.update(req, res);
    if (!TipoEletrodomestico) {
      res.status(404).json({ message: "Eletrodoméstico não encontrado" });
    } else {
      res.status(200).json(TipoEletrodomestico);
    }
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao atualizar eletrodoméstico", error: error.message });
  }
});

// Rota DELETE - Remover um eletrodoméstico pelo ID
tipoEletrodomesticoRoutes.delete("/:id", async (req, res) => {
  try {
    const deleted = await tipoEletrodomesticoController.delete(req, res);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Eletrodoméstico não encontrado" });
    }
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao excluir eletrodoméstico", error: error.message });
  }
});

export { tipoEletrodomesticoRoutes };
