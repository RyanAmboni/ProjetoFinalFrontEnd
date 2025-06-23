import React from 'react';

const Header = ({ activePath, navigate }) => {
  const getButtonClass = (path) => {
    return activePath === path ? 'active-tab' : '';
  };

  return (
    <header>
      <button
        onClick={() => navigate('/')}
        className={getButtonClass('/')}
      >
        Calculadora Financeira
      </button>
      <button
        onClick={() => navigate('/simulador')}
        className={getButtonClass('/simulador')}
      >
        Compro ou Espero?
      </button>
      <button
        onClick={() => navigate('/juros-simples')}
        className={getButtonClass('/juros-simples')}
      >
        Juros Simples
      </button>
      <button
        onClick={() => navigate('/juros-compostos')}
        className={getButtonClass('/juros-compostos')}
      >
        Juros Compostos
      </button>
    </header>
  );
};

export default Header;