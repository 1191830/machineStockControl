import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Bem-vindo à Gestão de Eletrodomésticos
        </Typography>
        <Typography variant="body1">
          Esta aplicação permite gerir o stock, vendas e catálogo de eletrodomésticos de forma eficiente.
        </Typography>

        <Box mt={4}>
          <Typography variant="h6">Funcionalidades em destaque:</Typography>
          <ul>
            <li>📦 Controlo de stock</li>
            <li>🛒 Gestão de vendas</li>
            <li>📊 Relatórios e estatísticas</li>
          </ul>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
