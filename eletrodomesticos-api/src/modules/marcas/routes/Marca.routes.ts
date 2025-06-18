import { Router } from "express";
import { container } from "tsyringe";
import { MarcaController } from "../controllers/MarcaController";

const marcaRoutes = Router();
const marcaController = container.resolve(MarcaController);

// Rota POST - Criar um novo marca
marcaRoutes.post("/", async (req, res) => {
  try {
    const Marca = await marcaController.create(req, res);
    res.status(201).json(Marca);
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao criar marca", error: error.message });
  }
});

// Rota GET - Procurar todas as marcas
marcaRoutes.get("/", async (req, res) => {
  try {
    const Marcas = await marcaController.getAll(req, res);
    res.status(200).json(Marcas);
  } catch (error:any) {
    res.status(500).json({ message: "Erro ao procurar marcas", error: error.message });
  }
});

// Rota GET - Procurar marca pelo ID
marcaRoutes.get("/:id", async (req, res) => {
  try {
    const Marca = await marcaController.getById(req, res);
    if (!Marca) {
      res.status(404).json({ message: "Marca não encontrada" });
    } else {
      res.status(200).json(Marca);
    }
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao procurar marca", error: error.message });
  }
});

// Rota PUT - Atualizar uma marca pelo ID
marcaRoutes.put("/:id", async (req, res) => {
  try {
    const Marca = await marcaController.update(req, res);
    if (!Marca) {
      res.status(404).json({ message: "Marca não encontrada" });
    } else {
      res.status(200).json(Marca);
    }
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao atualizar marca", error: error.message });
  }
});

// Rota DELETE - Remover uma marca pelo ID
marcaRoutes.delete("/:id", async (req, res) => {
  try {
    const deleted = await marcaController.delete(req, res);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Marca não encontrada" });
    }
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao excluir marca", error: error.message });
  }
});

export { marcaRoutes };
