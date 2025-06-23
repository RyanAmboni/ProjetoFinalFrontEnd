import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from '../contexts/ToastContext';

const api = {
  getReceitas: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const storedReceitas = localStorage.getItem('receitas');
    return storedReceitas ? JSON.parse(storedReceitas) : [];
  },
  saveReceitas: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    localStorage.setItem('receitas', JSON.stringify(data));
    return data;
  },
  getDespesas: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const storedDespesas = JSON.parse(localStorage.getItem('despesas') || '[]');
    return storedDespesas;
  },
  saveDespesas: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    localStorage.setItem('despesas', JSON.stringify(data));
    return data;
  },
};

const CalculadoraFinanceira = () => {
  const [receitas, setReceitas] = useState([]);
  const [despesas, setDespesas] = useState([]);
  const [descReceita, setDescReceita] = useState('');
  const [valorReceita, setValorReceita] = useState('');
  const [descDespesa, setDescDespesa] = useState('');
  const [valorDespesa, setValorDespesa] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editingDesc, setEditingDesc] = useState('');
  const [editingValor, setEditingValor] = useState('');
  const [editingType, setEditingType] = useState(null);

  const { addToast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      setReceitas(await api.getReceitas());
      setDespesas(await api.getDespesas());
    };
    loadData();
  }, []);

  useEffect(() => {
    api.saveReceitas(receitas);
  }, [receitas]);

  useEffect(() => {
    api.saveDespesas(despesas);
  }, [despesas]);

  const calcularTotais = useCallback(() => {
    const totalReceitas = receitas.reduce((soma, r) => soma + r.valor, 0);
    const totalDespesas = despesas.reduce((soma, d) => soma + d.valor, 0);
    const saldo = totalReceitas - totalDespesas;
    return { totalReceitas, totalDespesas, saldo };
  }, [receitas, despesas]);

  const { totalReceitas, totalDespesas, saldo } = calcularTotais();

  const handleAddReceita = () => {
    const valor = parseFloat(valorReceita);
    if (!descReceita.trim() || isNaN(valor) || valor <= 0) {
      addToast('Por favor, preencha a descrição e um valor positivo para a receita.', 'error');
      return;
    }
    setReceitas([...receitas, { id: Date.now(), desc: descReceita.trim(), valor }]);
    setDescReceita('');
    setValorReceita('');
    addToast('Receita adicionada com sucesso!', 'success');
  };

  const handleAddDespesa = () => {
    const valor = parseFloat(valorDespesa);
    if (!descDespesa.trim() || isNaN(valor) || valor <= 0) {
      addToast('Por favor, preencha a descrição e um valor positivo para a despesa.', 'error');
      return;
    }
    setDespesas([...despesas, { id: Date.now(), desc: descDespesa.trim(), valor }]);
    setDescDespesa('');
    setValorDespesa('');
    addToast('Despesa adicionada com sucesso!', 'success');
  };

  const handleDeleteReceita = (id) => {
    setReceitas(receitas.filter(r => r.id !== id));
    addToast('Receita removida!', 'info');
  };

  const handleDeleteDespesa = (id) => {
    setDespesas(despesas.filter(d => d.id !== id));
    addToast('Despesa removida!', 'info');
  };

  const handleEditItem = (item, type) => {
    setEditingId(item.id);
    setEditingDesc(item.desc);
    setEditingValor(String(item.valor));
    setEditingType(type);
  };

  const handleSaveEdit = () => {
    const valor = parseFloat(editingValor);
    if (!editingDesc.trim() || isNaN(valor) || valor <= 0) {
      addToast('Por favor, preencha a descrição e um valor positivo para salvar a edição.', 'error');
      return;
    }

    if (editingType === 'receita') {
      setReceitas(receitas.map(r =>
        r.id === editingId ? { ...r, desc: editingDesc.trim(), valor } : r
      ));
    } else if (editingType === 'despesa') {
      setDespesas(despesas.map(d =>
        d.id === editingId ? { ...d, desc: editingDesc.trim(), valor } : d
      ));
    }

    setEditingId(null);
    setEditingDesc('');
    setEditingValor('');
    setEditingType(null);
    addToast('Item editado com sucesso!', 'success');
  };

  const handleCopiarResumo = () => {
    const situacao = saldo > 0 ? 'Positiva' : saldo < 0 ? 'Negativa' : 'Neutra';
    const resumo = `Resumo do Orçamento:\n\n` +
                   `Receitas: R$ ${totalReceitas.toFixed(2)}\n` +
                   `Despesas: R$ ${totalDespesas.toFixed(2)}\n` +
                   `Saldo: R$ ${saldo.toFixed(2)}\n` +
                   `Situação: ${situacao}`;
    navigator.clipboard.writeText(resumo);
    addToast('Resumo do orçamento copiado para a área de transferência!', 'success');
  };

  const getSaldoClass = () => {
    if (saldo > 0) return 'positivo';
    if (saldo < 0) return 'negativo';
    return 'neutro';
  };

  return (
    <section id="calculadora" data-active="true">
      <h2>Calculadora Financeira</h2>

      <div className="entrada">
        <h3>Receita</h3>
        <input
          type="text"
          placeholder="Descrição da receita"
          value={descReceita}
          onChange={(e) => setDescReceita(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor da receita"
          value={valorReceita}
          onChange={(e) => setValorReceita(e.target.value)}
        />
        <button onClick={handleAddReceita}>Adicionar Receita</button>
      </div>

      <div className="entrada">
        <h3>Despesa</h3>
        <input
          type="text"
          placeholder="Descrição da despesa"
          value={descDespesa}
          onChange={(e) => setDescDespesa(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor da despesa"
          value={valorDespesa}
          onChange={(e) => setValorDespesa(e.target.value)}
        />
        <button onClick={handleAddDespesa}>Adicionar Despesa</button>
      </div>

      <div className="listas">
        <div>
          <h4>Receitas</h4>
          <ul id="listaReceitas">
            {receitas.map((r) => (
              <li key={r.id}>
                {editingId === r.id && editingType === 'receita' ? (
                  <div className="edit-item">
                    <input
                      type="text"
                      value={editingDesc}
                      onChange={(e) => setEditingDesc(e.target.value)}
                      placeholder="Descrição"
                    />
                    <input
                      type="number"
                      value={editingValor}
                      onChange={(e) => setEditingValor(e.target.value)}
                      placeholder="Valor"
                    />
                    <div className="edit-actions">
                      <button onClick={handleSaveEdit}>Salvar</button>
                      <button onClick={() => setEditingId(null)}>Cancelar</button>
                    </div>
                  </div>
                ) : (
                  <>
                    {r.desc}: R$ {r.valor.toFixed(2)}
                    <div className="item-actions">
                      <button onClick={() => handleEditItem(r, 'receita')}>Editar</button>
                      <button onClick={() => handleDeleteReceita(r.id)}>Remover</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Despesas</h4>
          <ul id="listaDespesas">
            {despesas.map((d) => (
              <li key={d.id}>
                {editingId === d.id && editingType === 'despesa' ? (
                  <div className="edit-item">
                    <input
                      type="text"
                      value={editingDesc}
                      onChange={(e) => setEditingDesc(e.target.value)}
                      placeholder="Descrição"
                    />
                    <input
                      type="number"
                      value={editingValor}
                      onChange={(e) => setEditingValor(e.target.value)}
                      placeholder="Valor"
                    />
                    <div className="edit-actions">
                      <button onClick={handleSaveEdit}>Salvar</button>
                      <button onClick={() => setEditingId(null)}>Cancelar</button>
                    </div>
                  </div>
                ) : (
                  <>
                    {d.desc}: R$ {d.valor.toFixed(2)}
                    <div className="item-actions">
                      <button onClick={() => handleEditItem(d, 'despesa')}>Editar</button>
                      <button onClick={() => handleDeleteDespesa(d.id)}>Remover</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="totais">
        <p>Total de Receitas: R$ <span>{totalReceitas.toFixed(2)}</span></p>
        <p>Total de Despesas: R$ <span>{totalDespesas.toFixed(2)}</span></p>
        <p>Saldo: <span id="saldo" className={getSaldoClass()}>{saldo.toFixed(2)}</span></p>
      </div>

      <div className="acoes">
        <button onClick={handleCopiarResumo}>Copiar Resumo</button>
      </div>
    </section>
  );
};

export default CalculadoraFinanceira;