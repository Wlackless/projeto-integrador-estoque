import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 style={{ marginBottom: '10px' }}>Sistema de Controle de Estoque</h1>
      <p style={{ marginBottom: '40px', color: '#a8a8b3' }}>Selecione um módulo para começar a gerenciar.</p>

      <div className="dashboard-grid">
        <div className="card" onClick={() => navigate('/fornecedores')}>
          <h3>🏢 Fornecedores</h3>
          <p style={{ marginTop: '10px', color: '#a8a8b3' }}>Cadastre e gerencie seus parceiros de negócio.</p>
        </div>

        <div className="card" onClick={() => navigate('/produtos')}>
          <h3>📦 Produtos</h3>
          <p style={{ marginTop: '10px', color: '#a8a8b3' }}>Controle de inventário, cadastro e estoque.</p>
        </div>

        <div className="card" onClick={() => navigate('/associacao')}>
          <h3>🔗 Associações</h3>
          <p style={{ marginTop: '10px', color: '#a8a8b3' }}>Vincule fornecedores aos produtos correspondentes.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;