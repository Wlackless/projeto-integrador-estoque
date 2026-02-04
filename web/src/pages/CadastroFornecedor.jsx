import { useState } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';

function CadastroFornecedor() {
  const [form, setForm] = useState({
    nomeEmpresa: '', cnpj: '', endereco: '', telefone: '', email: '', contatoPrincipal: ''
  });
  
  const [modal, setModal] = useState({ open: false, title: '', message: '', type: 'info' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Caminho relativo (sem http://localhost)
      await axios.post('/fornecedores', form);
      setModal({ open: true, title: 'Sucesso!', message: 'Fornecedor cadastrado com sucesso.' });
      setForm({ nomeEmpresa: '', cnpj: '', endereco: '', telefone: '', email: '', contatoPrincipal: '' });
    } catch (error) {
      setModal({ open: true, title: 'Erro', message: error.response?.data?.error || 'Erro desconhecido.' });
    }
  };

  return (
    <div>
      <h2>Cadastro de Fornecedor</h2>
      <form onSubmit={handleSubmit}>
        <input name="nomeEmpresa" placeholder="Nome da Empresa" value={form.nomeEmpresa} onChange={handleChange} required />
        <input name="cnpj" placeholder="CNPJ (00.000.000/0000-00)" value={form.cnpj} onChange={handleChange} required />
        <input name="endereco" placeholder="Endereço Completo" value={form.endereco} onChange={handleChange} required />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} required />
            <input name="email" placeholder="E-mail" type="email" value={form.email} onChange={handleChange} required />
        </div>
        <input name="contatoPrincipal" placeholder="Nome do Contato Principal" value={form.contatoPrincipal} onChange={handleChange} required />
        <button type="submit">Cadastrar Fornecedor</button>
      </form>

      <Modal 
        isOpen={modal.open} 
        onClose={() => setModal({ ...modal, open: false })} 
        title={modal.title} 
        message={modal.message} 
      />
    </div>
  );
}

export default CadastroFornecedor;