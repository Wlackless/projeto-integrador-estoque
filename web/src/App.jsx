import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CadastroFornecedor from './pages/CadastroFornecedor';
import CadastroProduto from './pages/CadastroProduto';
import Associacao from './pages/Associacao';


function NavBar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav>
      <Link to="/" className={isActive('/')}>Início</Link>
      <Link to="/fornecedores" className={isActive('/fornecedores')}>Fornecedores</Link>
      <Link to="/produtos" className={isActive('/produtos')}>Produtos</Link>
      <Link to="/associacao" className={isActive('/associacao')}>Associação</Link>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fornecedores" element={<CadastroFornecedor />} />
        <Route path="/produtos" element={<CadastroProduto />} />
        <Route path="/associacao" element={<Associacao />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;