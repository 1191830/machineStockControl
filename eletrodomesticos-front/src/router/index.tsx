import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Eletrodomesticos from '../pages/Eletrodomesticos';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/eletrodomesticos" element={<Eletrodomesticos />} />
      {/* Future routes go here */}
    </Routes>
  );
};

export default AppRoutes;
