import { Router } from "express";
import { container } from "tsyringe";
import { VendaController } from "../controller/VendaController";

const vendaRoutes = Router();
const vendaController = container.resolve(VendaController);

// Criar uma nova venda
vendaRoutes.post("/", async (req, res) => {
  try {
    const venda = await vendaController.create(req, res);
    res.status(201).json(venda);
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao criar venda", error: error.message });
  }
});

// Buscar todas as vendas
vendaRoutes.get("/", async (req, res) => {
  try {
    const vendas = await vendaController.getAll(req, res);
    res.status(200).json(vendas);
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao buscar vendas", error: error.message });
  }
});

// Buscar venda por ID
vendaRoutes.get("/:id", async (req, res) => {
  try {
    const venda = await vendaController.getById(req, res);
    if (!venda) {
      res.status(404).json({ message: "Venda não encontrada" });
    } else {
      res.status(200).json(venda);
    }
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao buscar venda", error: error.message });
  }
});

// Atualizar venda
vendaRoutes.put("/:id", async (req, res) => {
  try {
    const venda = await vendaController.update(req, res);
    if (!venda) {
      res.status(404).json({ message: "Venda não encontrada" });
    } else {
      res.status(200).json(venda);
    }
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao atualizar venda", error: error.message });
  }
});

// Remover venda
vendaRoutes.delete("/:id", async (req, res) => {
  try {
    const deleted = await vendaController.delete(req, res);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Venda não encontrada" });
    }
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao excluir venda", error: error.message });
  }
});

export { vendaRoutes };
