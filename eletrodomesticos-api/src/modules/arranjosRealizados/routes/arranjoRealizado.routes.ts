import { Router } from "express";
import { container } from "tsyringe";
import { ArranjoRealizadoController } from "../controller/ArranjoRealizadoController";

const arranjoRealizadoRoutes = Router();
const arranjoController = container.resolve(ArranjoRealizadoController);

// Criar um novo arranjo
arranjoRealizadoRoutes.post("/", async (req, res) => {
  try {
    const arranjo = await arranjoController.create(req, res);
    res.status(201).json(arranjo);
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao criar arranjo", error: error.message });
  }
});

// Buscar todos os arranjos
arranjoRealizadoRoutes.get("/", async (req, res) => {
  try {
    const arranjos = await arranjoController.getAll(req, res);
    res.status(200).json(arranjos);
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao buscar arranjos", error: error.message });
  }
});

// Buscar arranjo por ID
arranjoRealizadoRoutes.get("/:id", async (req, res) => {
  try {
    const arranjo = await arranjoController.getById(req, res);
    if (!arranjo) {
      res.status(404).json({ message: "Arranjo não encontrado" });
    } else {
      res.status(200).json(arranjo);
    }
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao buscar arranjo", error: error.message });
  }
});

// Atualizar arranjo
arranjoRealizadoRoutes.put("/:id", async (req, res) => {
  try {
    const arranjo = await arranjoController.update(req, res);
    if (!arranjo) {
      res.status(404).json({ message: "Arranjo não encontrado" });
    } else {
      res.status(200).json(arranjo);
    }
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao atualizar arranjo", error: error.message });
  }
});

// Remover arranjo
arranjoRealizadoRoutes.delete("/:id", async (req, res) => {
  try {
    const deleted = await arranjoController.delete(req, res);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Arranjo não encontrado" });
    }
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao excluir arranjo", error: error.message });
  }
});

export { arranjoRealizadoRoutes };
