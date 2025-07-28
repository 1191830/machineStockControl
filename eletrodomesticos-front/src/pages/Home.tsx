import React from "react";
import {
  Container,
  Paper,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useDashboard } from "../hooks/useDashboard";

const SummaryCard: React.FC<{ title: string; value: number | string }> = ({
  title,
  value,
}) => (
  <Paper elevation={2} sx={{ p: 2 }}>
    <Typography variant="subtitle2" color="text.secondary">
      {title}
    </Typography>
    <Typography variant="h6">{value}</Typography>
  </Paper>
);

const Home: React.FC = () => {
  const { total, monthly, loading } = useDashboard();

  if (loading || !total) {
    return (
      <Container sx={{ mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  const totalLucro =
    total.vendas.balance + total.arranjos.balance;

  const months = monthly[0] ? monthly : [];
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Summary Cards Layout using CSS Grid */}
      <Box
        sx={{
          display: "grid",
          gap: 2,
          mb: 4,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(3, 1fr)",
          },
        }}
      >
        <SummaryCard title="💰 Total Lucro" value={totalLucro.toFixed(2)} />
        <SummaryCard title="📦 Total Vendas" value={total.vendas.vendas} />
        <SummaryCard
          title="🛠️ Total Arranjos Recebidos"
          value={total.arranjos.receita}
        />
        <SummaryCard
          title="🧾 Total Gastos (Vendas)"
          value={total.vendas.gastos.toFixed(2)}
        />
        <SummaryCard
          title="🧰 Total Custos (Arranjos)"
          value={total.arranjos.custo.toFixed(2)}
        />
        <SummaryCard
          title="🧮 Total Compras"
          value={total.vendas.compras}
        />
      </Box>

      {/* Chart */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          📊 Lucro Mensal (Vendas & Arranjos)
        </Typography>

        <BarChart
          height={300}
          xAxis={[
            {
              id: "months",
              data: months.map((m) => m.month),
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: months.map((m) => m.vendas),
              label: "Vendas",
            },
            {
              data: months.map((m) => m.arranjos),
              label: "Arranjos",
            },
          ]}
        />
      </Paper>
    </Container>
  );
};

export default Home;
