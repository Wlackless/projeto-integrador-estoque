import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';

function Associacao() {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [selectedProduto, setSelectedProduto] = useState('');
  const [selectedFornecedor, setSelectedFornecedor] = useState('');
  
  const [infoModal, setInfoModal] = useState({ open: false, title: '', message: '' });
  const [confirmModal, setConfirmModal] = useState({ open: false, item: null });

  const fetchData = async () => {
    try {
      // Caminhos relativos
      const prodRes = await axios.get('/produtos');
      const fornRes = await axios.get('/fornecedores');
      setProdutos(prodRes.data);
      setFornecedores(fornRes.data);
    } catch (error) {
      console.error("Erro ao carregar dados");
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleAssociar = async () => {
    if (!selectedProduto || !selectedFornecedor) {
        return setInfoModal({ open: true, title: 'Atenção', message: 'Selecione um produto e um fornecedor.' });
    }
    try {
      await axios.post('/associacao', {
        produtoId: selectedProduto,
        fornecedorId: selectedFornecedor
      });
      setInfoModal({ open: true, title: 'Sucesso', message: 'Associação realizada!' });
      fetchData();
    } catch (error) {
      setInfoModal({ open: true, title: 'Erro', message: error.response?.data?.error });
    }
  };

  const handleDesassociarClick = (produtoId, fornecedorId) => {
    setConfirmModal({ open: true, item: { produtoId, fornecedorId } });
  };

  const confirmDesassociar = async () => {
    if (!confirmModal.item) return;
    try {
      await axios.delete('/associacao', {
        data: confirmModal.item
      });
      fetchData();
      setInfoModal({ open: true, title: 'Removido', message: 'Associação removida com sucesso.' });
    } catch (error) {
      setInfoModal({ open: true, title: 'Erro', message: 'Erro ao remover associação.' });
    }
  };

  const produtoAtual = produtos.find(p => p.id === selectedProduto);

  return (
    <div>
      <h2>Gerenciar Associações</h2>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
                <label>Produto</label>
                <select value={selectedProduto} onChange={e => setSelectedProduto(e.target.value)} style={{ width: '100%' }}>
                <option value="">Selecione...</option>
                {produtos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                </select>
            </div>
            <div>
                <label>Fornecedor</label>
                <select value={selectedFornecedor} onChange={e => setSelectedFornecedor(e.target.value)} style={{ width: '100%' }}>
                <option value="">Selecione...</option>
                {fornecedores.map(f => <option key={f.id} value={f.id}>{f.nomeEmpresa}</option>)}
                </select>
            </div>
        </div>
        <button onClick={handleAssociar}>🔗 Vincular Fornecedor ao Produto</button>
      </div>

      {produtoAtual && (
        <div>
          <h3>Fornecedores de: <span style={{color: '#8257e5'}}>{produtoAtual.nome}</span></h3>
          {produtoAtual.fornecedores.length === 0 ? <p style={{marginTop: '1rem', color: '#a8a8b3'}}>Nenhum fornecedor vinculado.</p> : (
            <table>
              <thead>
                <tr>
                  <th>Empresa</th>
                  <th>CNPJ</th>
                  <th style={{textAlign: 'right'}}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtoAtual.fornecedores.map(item => (
                  <tr key={item.fornecedor.id}>
                    <td>{item.fornecedor.nomeEmpresa}</td>
                    <td>{item.fornecedor.cnpj}</td>
                    <td style={{textAlign: 'right'}}>
                      <button 
                        className="danger" 
                        style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                        onClick={() => handleDesassociarClick(produtoAtual.id, item.fornecedor.id)}
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      <Modal isOpen={infoModal.open} onClose={() => setInfoModal({...infoModal, open: false})} title={infoModal.title} message={infoModal.message} />

      <Modal 
        isOpen={confirmModal.open} 
        onClose={() => setConfirmModal({ open: false, item: null })} 
        title="Confirmar remoção" 
        message="Tem certeza que deseja desvincular este fornecedor?"
        onConfirm={confirmDesassociar}
      />
    </div>
  );
}

export default Associacao;