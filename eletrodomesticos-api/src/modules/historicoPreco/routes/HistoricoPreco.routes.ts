import { Router } from "express";
import { container } from "tsyringe";
import { HistoricoPrecoController } from "../controllers/HistoricoPrecoController";

const historicoPrecoRoutes = Router();
const historicoPrecoController = container.resolve(HistoricoPrecoController);

// Rota POST - Criar um novo historico
historicoPrecoRoutes.post("/", async (req, res) => {
  try {
    const HistoricoPreco = await historicoPrecoController.create(req, res);
    res.status(201).json(HistoricoPreco);
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao criar historico", error: error.message });
  }
});

// Rota GET - Procurar todos os historico
historicoPrecoRoutes.get("/", async (req, res) => {
  try {
    const HistoricoPrecos = await historicoPrecoController.getAll(req, res);
    res.status(200).json(HistoricoPrecos);
  } catch (error:any) {
    res.status(500).json({ message: "Erro ao procurar historico", error: error.message });
  }
});

// Rota GET - Procurar historico pelo ID
historicoPrecoRoutes.get("/:id", async (req, res) => {
  try {
    const HistoricoPreco = await historicoPrecoController.getById(req, res);
    if (!HistoricoPreco) {
      res.status(404).json({ message: "Historico não encontrado" });
    } else {
      res.status(200).json(HistoricoPreco);
    }
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao procurar historico", error: error.message });
  }
});

// Rota DELETE - Remover um historico pelo ID
historicoPrecoRoutes.delete("/:id", async (req, res) => {
  try {
    const deleted = await historicoPrecoController.delete(req, res);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Historico não encontrado" });
    }
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao excluir Historico", error: error.message });
  }
});

export { historicoPrecoRoutes };
