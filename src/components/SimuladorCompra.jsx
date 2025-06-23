import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from '../contexts/ToastContext';

const getCalculadoraData = async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const receitas = JSON.parse(localStorage.getItem('receitas') || '[]');
  const despesas = JSON.parse(localStorage.getItem('despesas') || '[]');
  
  const totalReceitas = receitas.reduce((soma, r) => soma + r.valor, 0);
  const totalDespesas = despesas.reduce((soma, d) => soma + d.valor, 0);
  
  return { totalReceitas, totalDespesas, saldo: totalReceitas - totalDespesas };
};

const SimuladorCompra = () => {
  const [valorItem, setValorItem] = useState('');
  const [parcelas, setParcelas] = useState('');
  const [resultadoSimulacao, setResultadoSimulacao] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const handleSimular = async () => {
    const itemValue = parseFloat(valorItem);
    const numParcelas = parseInt(parcelas, 10);

    if (isNaN(itemValue) || itemValue <= 0 || isNaN(numParcelas) || numParcelas <= 0) {
      addToast('Por favor, preencha o valor do item e o número de parcelas corretamente.', 'error');
      return;
    }

    setIsLoading(true);
    setResultadoSimulacao('Analisando...');
    addToast('Simulando compra...', 'info');

    await new Promise(resolve => setTimeout(resolve, 1500));

    const { totalReceitas, totalDespesas, saldo: economia } = await getCalculadoraData();

    const valorParcela = itemValue / numParcelas;

    let recomendacao = '';
    if (valorParcela <= economia * 0.4) {
      recomendacao = 'Compra Consciente';
    } else if (valorParcela > economia * 0.4 && valorParcela <= economia * 0.7) {
      recomendacao = 'Pensar mais';
    } else {
      recomendacao = 'Nem pensar nisso agora';
    }

    setResultadoSimulacao(`
      <strong>Decisão de Compra:</strong><br>
      Valor do item: R$ ${itemValue.toFixed(2)}<br>
      Parcelas: ${numParcelas} x R$ ${valorParcela.toFixed(2)}<br>
      Renda mensal: R$ ${totalReceitas.toFixed(2)}<br>
      Economia líquida: R$ ${economia.toFixed(2)}<br>
      Recomendação: ${recomendacao}
    `);
    setIsLoading(false);
    addToast('Simulação de compra realizada com sucesso!', 'success');
    setValorItem('');
    setParcelas('');
  };

  const handleCopiarSimulacao = () => {
    if (resultadoSimulacao.trim() && !isLoading) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = resultadoSimulacao;
      const textOnly = tempDiv.textContent || tempDiv.innerText || '';
      
      navigator.clipboard.writeText(textOnly.trim());
      addToast('Relatório da simulação copiado para a área de transferência!', 'success');
    } else if (!resultadoSimulacao.trim()) {
      addToast('Nenhum relatório para copiar.', 'info');
    } else if (isLoading) {
      addToast('Ainda analisando, aguarde para copiar.', 'info');
    }
  };

  return (
    <section id="simulador" data-active="true">
      <h2>Simulador: Compro ou Espero?</h2>

      <div className="entrada">
        <input
          type="number"
          placeholder="Valor do item desejado"
          value={valorItem}
          onChange={(e) => setValorItem(e.target.value)}
        />
        <input
          type="number"
          placeholder="Número de parcelas"
          value={parcelas}
          onChange={(e) => setParcelas(e.target.value)}
        />
        <button onClick={handleSimular}>Simular</button>
      </div>

      {resultadoSimulacao && (
        <div 
            id="resultadoSimulacao" 
            className={`resultado ${isLoading ? 'loading' : ''}`}
            dangerouslySetInnerHTML={{ __html: resultadoSimulacao }} 
        />
      )}

      <div className="acoes">
        <button onClick={handleCopiarSimulacao} disabled={!resultadoSimulacao || isLoading}>Copiar Relatório</button>
      </div>
    </section>
  );
};

export default SimuladorCompra;
