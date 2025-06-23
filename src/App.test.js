// src/App.test.js
import { render, screen } from '@testing-library/react';
import App from './App.jsx'; // <--- CORRIGIDO AQUI

test('renders learn react link', () => {
  render(<App />);
  // Este teste procura por "learn react", que não existe mais no seu novo App.jsx
  // Você pode remover este teste ou alterá-lo para algo que exista no seu App.jsx,
  // como verificar se o Header está presente:
  const calculadoraButton = screen.getByText(/Calculadora Financeira/i);
  expect(calculadoraButton).toBeInTheDocument();
});