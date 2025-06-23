import React, { useState } from 'react'; // LINHA CORRIGIDA
import { useToast } from '../contexts/ToastContext';

const JurosCompostos = () => {
  const [capitalInicial, setCapitalInicial] = useState('');
  const [taxaJuros, setTaxaJuros] = useState('');
  const [tempo, setTempo] = useState('');
  const [resultado, setResultado] = useState(null);
  const { addToast } = useToast();

  const handleCalcularJurosCompostos = () => {
    const C = parseFloat(capitalInicial);
    const i = parseFloat(taxaJuros) / 100;
    const t = parseFloat(tempo);

    if (isNaN(C) || C <= 0 || isNaN(i) || i <= 0 || isNaN(t) || t <= 0) {
      addToast('Por favor, preencha todos os campos corretamente para Juros Compostos (valores positivos).', 'error');
      setResultado(null);
      return;
    }

    const M = C * Math.pow((1 + i), t);
    const J = M - C;

    setResultado({ J, M });
    addToast('Cálculo de Juros Compostos realizado com sucesso!', 'success');

    setCapitalInicial('');
    setTaxaJuros('');
    setTempo('');
  };

  const handleCopiarResultado = () => {
    if (resultado) {
      const texto = `Cálculo de Juros Compostos:\n` +
                    `Capital Inicial: R$ ${parseFloat(capitalInicial).toFixed(2)}\n` +
                    `Taxa de Juros: ${parseFloat(taxaJuros).toFixed(2)}% ao mês\n` +
                    `Tempo: ${parseFloat(tempo).toFixed(0)} meses\n` +
                    `Juros: R$ ${resultado.J.toFixed(2)}\n` +
                    `Montante Final: R$ ${resultado.M.toFixed(2)}`;
      navigator.clipboard.writeText(texto);
      addToast('Resultado copiado para a área de transferência!', 'success');
    } else {
      addToast('Não há resultado para copiar.', 'info');
    }
  };

  return (
    <section data-active="true">
      <h2>Cálculo de Juros Compostos</h2>

      <div className="entrada">
        <input
          type="number"
          placeholder="Capital inicial (R$)"
          value={capitalInicial}
          onChange={(e) => setCapitalInicial(e.target.value)}
        />
        <input
          type="number"
          placeholder="Taxa de juros (% ao mês)"
          value={taxaJuros}
          onChange={(e) => setTaxaJuros(e.target.value)}
        />
        <input
          type="number"
          placeholder="Tempo (em meses)"
          value={tempo}
          onChange={(e) => setTempo(e.target.value)}
        />
        <button onClick={handleCalcularJurosCompostos}>Calcular Juros Compostos</button>
      </div>

      {resultado && (
        <div className="resultado">
          <strong>Resultado:</strong><br/>
          Juros: R$ {resultado.J.toFixed(2)}<br/>
          Montante Final: R$ {resultado.M.toFixed(2)}
        </div>
      )}

      <div className="acoes">
        <button onClick={handleCopiarResultado} disabled={!resultado}>Copiar Resultado</button>
      </div>
    </section>
  );
};

export default JurosCompostos;