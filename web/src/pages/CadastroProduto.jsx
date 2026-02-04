import { useState } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';

function CadastroProduto() {
  const [form, setForm] = useState({
    nome: '', codigoBarras: '', descricao: '', quantidade: '', categoria: '', dataValidade: '', imagem: ''
  });
  const [modal, setModal] = useState({ open: false, title: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Caminho relativo
      await axios.post('/produtos', form);
      setModal({ open: true, title: 'Sucesso!', message: 'Produto cadastrado no estoque.' });
      setForm({ nome: '', codigoBarras: '', descricao: '', quantidade: '', categoria: '', dataValidade: '', imagem: '' });
    } catch (error) {
      setModal({ open: true, title: 'Erro', message: error.response?.data?.error || 'Erro ao cadastrar' });
    }
  };

  return (
    <div>
      <h2>Cadastro de Produto</h2>
      <form onSubmit={handleSubmit}>
        <input name="nome" placeholder="Nome do Produto" value={form.nome} onChange={handleChange} required />
        
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
            <input name="codigoBarras" placeholder="Cód. Barras" value={form.codigoBarras} onChange={handleChange} required />
            <input name="quantidade" type="number" placeholder="Qtd." value={form.quantidade} onChange={handleChange} required />
        </div>

        <textarea name="descricao" rows="3" placeholder="Descrição detalhada" value={form.descricao} onChange={handleChange} required />
        
        <select name="categoria" value={form.categoria} onChange={handleChange} required>
          <option value="">Selecione Categoria...</option>
          <option value="Eletrônicos">Eletrônicos</option>
          <option value="Alimentos">Alimentos</option>
          <option value="Vestuário">Vestuário</option>
          <option value="Outro">Outro</option>
        </select>

        <label style={{ fontSize: '0.9rem', color: '#a8a8b3', marginTop: '0.5rem' }}>Data de Validade (Opcional)</label>
        <input name="dataValidade" type="date" value={form.dataValidade} onChange={handleChange} />
        
        <button type="submit">Cadastrar Produto</button>
      </form>

      <Modal isOpen={modal.open} onClose={() => setModal({...modal, open: false})} title={modal.title} message={modal.message} />
    </div>
  );
}

export default CadastroProduto;