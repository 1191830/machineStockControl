import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import AppRoutes from './router';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
