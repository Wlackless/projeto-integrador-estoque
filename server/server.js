import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { fileURLToPath } from 'url';

// Configurações para ler pastas no ES Modules (necessário para o __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// --- ROTAS DE FORNECEDOR ---

// 1. Cadastrar Fornecedor
app.post('/fornecedores', async (req, res) => {
  try {
    const { nomeEmpresa, cnpj, endereco, telefone, email, contatoPrincipal } = req.body;

    // Validação básica (Campos obrigatórios)
    if (!nomeEmpresa || !cnpj || !endereco || !telefone || !email || !contatoPrincipal) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    // Verificar CNPJ duplicado
    const existe = await prisma.fornecedor.findUnique({ where: { cnpj } });
    if (existe) {
      return res.status(409).json({ error: 'Fornecedor com esse CNPJ já está cadastrado!' });
    }

    // Criar Fornecedor
    const fornecedor = await prisma.fornecedor.create({
      data: { nomeEmpresa, cnpj, endereco, telefone, email, contatoPrincipal }
    });

    return res.status(201).json({ message: 'Fornecedor cadastrado com sucesso!', fornecedor });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Listar Fornecedores
app.get('/fornecedores', async (req, res) => {
  const fornecedores = await prisma.fornecedor.findMany();
  res.json(fornecedores);
});

// --- ROTAS DE PRODUTO ---

// 2. Cadastrar Produto
app.post('/produtos', async (req, res) => {
  try {
    const { nome, codigoBarras, descricao, quantidade, categoria, dataValidade, imagem } = req.body;

    // Validação
    if (!nome || !codigoBarras || !descricao || quantidade === undefined || !categoria) {
      return res.status(400).json({ error: 'Campos obrigatórios inválidos ou em branco.' });
    }

    // Verificar Código de Barras duplicado
    const existe = await prisma.produto.findUnique({ where: { codigoBarras } });
    if (existe) {
      return res.status(409).json({ error: 'Produto com este código de barras já está cadastrado!' });
    }

    // Criar Produto
    const produto = await prisma.produto.create({
      data: {
        nome,
        codigoBarras,
        descricao,
        quantidade: Number(quantidade),
        categoria,
        dataValidade: dataValidade ? new Date(dataValidade) : null,
        imagem
      }
    });

    return res.status(201).json({ message: 'Produto cadastrado com sucesso!', produto });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Listar Produtos
app.get('/produtos', async (req, res) => {
  const produtos = await prisma.produto.findMany({
    include: { fornecedores: { include: { fornecedor: true } } }
  });
  res.json(produtos);
});

// --- ROTAS DE ASSOCIAÇÃO ---

// 3. Associar Fornecedor a Produto
app.post('/associacao', async (req, res) => {
  try {
    const { produtoId, fornecedorId } = req.body;

    // Verificar se já existe a associação
    const existe = await prisma.produtoFornecedor.findUnique({
      where: {
        produtoId_fornecedorId: { produtoId, fornecedorId }
      }
    });

    if (existe) {
      return res.status(409).json({ error: 'Fornecedor já está associado a este produto!' });
    }

    // Criar Associação
    await prisma.produtoFornecedor.create({
      data: { produtoId, fornecedorId }
    });

    return res.status(201).json({ message: 'Fornecedor associado com sucesso ao produto!' });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// 4. Desassociar
app.delete('/associacao', async (req, res) => {
  try {
    const { produtoId, fornecedorId } = req.body;
    
    await prisma.produtoFornecedor.delete({
      where: {
        produtoId_fornecedorId: { produtoId, fornecedorId }
      }
    });

    return res.status(200).json({ message: 'Fornecedor desassociado com sucesso!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// --- SERVIR O FRONTEND (React) ---

app.use(express.static(path.join(__dirname, 'public')));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// --- INICIALIZAR O SERVIDOR ---
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});