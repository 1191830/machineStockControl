import { Router } from "express";
import { container } from "tsyringe";
import { EletrodomesticoController } from "../controllers/EletrodomesticoController";

const eletrodomesticoRoutes = Router();
const eletrodomesticoController = container.resolve(EletrodomesticoController);

// Rota POST - Criar um novo eletrodoméstico
eletrodomesticoRoutes.post("/", async (req, res) => {
  try {
    const eletrodomestico = await eletrodomesticoController.create(req, res);
    res.status(201).json(eletrodomestico);
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao criar eletrodoméstico", error: error.message });
  }
});

// Rota GET - Buscar todos os eletrodomésticos
eletrodomesticoRoutes.get("/", async (req, res) => {
  try {
    const eletrodomesticos = await eletrodomesticoController.getAll(req, res);
    res.status(200).json(eletrodomesticos);
  } catch (error:any) {
    res.status(500).json({ message: "Erro ao buscar eletrodomésticos", error: error.message });
  }
});

// Rota GET - Buscar eletrodoméstico pelo ID
eletrodomesticoRoutes.get("/:id", async (req, res) => {
  try {
    const eletrodomestico = await eletrodomesticoController.getById(req, res);
    if (!eletrodomestico) {
      res.status(404).json({ message: "Eletrodoméstico não encontrado" });
    } else {
      res.status(200).json(eletrodomestico);
    }
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao buscar eletrodoméstico", error: error.message });
  }
});

// Rota PUT - Atualizar um eletrodoméstico pelo ID
eletrodomesticoRoutes.put("/:id", async (req, res) => {
  try {
    const eletrodomestico = await eletrodomesticoController.update(req, res);
    if (!eletrodomestico) {
      res.status(404).json({ message: "Eletrodoméstico não encontrado" });
    } else {
      res.status(200).json(eletrodomestico);
    }
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao atualizar eletrodoméstico", error: error.message });
  }
});

// Rota DELETE - Remover um eletrodoméstico pelo ID
eletrodomesticoRoutes.delete("/:id", async (req, res) => {
  try {
    const deleted = await eletrodomesticoController.delete(req, res);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Eletrodoméstico não encontrado" });
    }
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao excluir eletrodoméstico", error: error.message });
  }
});

export { eletrodomesticoRoutes };
