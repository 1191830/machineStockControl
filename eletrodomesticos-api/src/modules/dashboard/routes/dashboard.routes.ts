import { Router } from "express";
import { container } from "tsyringe";
import { DashboardController } from "../controller/DashboardController";

const dashboardRoutes = Router();
const dashboardController = container.resolve(DashboardController);

// GET total dashboard balance (vendas + arranjos)
dashboardRoutes.get("/total-dashboard-balance", async (req, res) => {
  await dashboardController.getTotalDashboardBalance(req, res);
});

// GET monthly dashboard balances (vendas + arranjos)
dashboardRoutes.get("/monthly-dashboard-balances", async (req, res) => {
  await dashboardController.getMonthlyDashboardBalances(req, res);
});

export { dashboardRoutes };
