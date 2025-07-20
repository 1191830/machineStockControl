import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Eletrodomesticos from '../pages/Eletrodomesticos';
import Vendas from '../pages/Vendas';
import ArranjosRealizadosPage from '../pages/ArranjosRealizados';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/eletrodomesticos" element={<Eletrodomesticos />} />
      <Route path="/vendas" element={<Vendas />} />
      <Route path="/arranjos-realizados" element={<ArranjosRealizadosPage />} />
      {/* Future routes go here */}
    </Routes>
  );
};

export default AppRoutes;
