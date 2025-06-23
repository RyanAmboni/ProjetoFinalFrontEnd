import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import CalculadoraFinanceira from './components/CalculadoraFinanceira';
import SimuladorCompra from './components/SimuladorCompra';
import JurosSimples from './components/JurosSimples';
import JurosCompostos from './components/JurosCompostos';
import './App.css';

const AnimatedRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Header activePath={location.pathname} navigate={navigate} />
      <main>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<CalculadoraFinanceira />} />
          <Route path="/simulador" element={<SimuladorCompra />} />
          <Route path="/juros-simples" element={<JurosSimples />} />
          <Route path="/juros-compostos" element={<JurosCompostos />} />
          <Route path="*" element={<h2>404 - Página Não Encontrada</h2>} />
        </Routes>
      </main>
    </>
  );
};

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;