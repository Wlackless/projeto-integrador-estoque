# Sistema de Controle de Estoque - Full Stack

> Projeto Integrador desenvolvido para a disciplina de Full Stack da Gran Faculdade.

## Sobre o Projeto

Este projeto consiste em uma aplicação web completa (Full Stack) para gerenciamento de estoque, permitindo o controle de fornecedores, produtos e a relação entre eles.

[cite_start]O desenvolvimento foi guiado por **Histórias de Usuário** e cenários **BDD** (Behavior Driven Development), garantindo que as regras de negócio (como validação de CNPJ e duplicidade de produtos) fossem atendidas[cite: 11, 62].

### Objetivos
O objetivo principal foi construir uma aplicação utilizando **Node.js** e **React.js**, aplicando conceitos de:
* Construção de API RESTful.
* Modelagem de Banco de Dados Relacional (Muitos-para-Muitos).
* Integração Front-Back.
* Interface Responsiva e Moderna (Dark Mode).

---

## Funcionalidades

[cite_start]O sistema atende aos seguintes requisitos funcionais[cite: 14, 16, 17]:

### 1. Cadastro de Fornecedores 
* Registro de novos fornecedores com validação de campos obrigatórios.
* **Regra de Negócio:** O sistema impede o cadastro de CNPJs duplicados.
* Feedback visual de sucesso ou erro via Modal.

### 2. Cadastro de Produtos 
* Registro de itens de estoque com controle de quantidade e categoria.
* **Regra de Negócio:** Validação de código de barras único no sistema.

### 3. Associação (Fornecedor x Produto) 
* Interface para vincular um fornecedor a um produto específico.
* Listagem de fornecedores por produto.
* Possibilidade de desassociar (remover vínculo) com confirmação de segurança.

---

## 🛠 Tecnologias Utilizadas

### Backend (API)
* **Node.js & Express:** Servidor e rotas da API.
* **Prisma ORM:** Manipulação do banco de dados e migrações.
* **SQLite:** Banco de dados relacional (arquivo local `dev.db`).
* **CORS:** Permissão de acesso para o Frontend.

### Frontend (Interface)
* **React.js (via Vite):** Construção da interface SPA (Single Page Application).
* **Axios:** Consumo da API.
* **React Router DOM:** Navegação entre páginas.
* **CSS Modules:** Estilização customizada (Dark Mode).

---

## Como Executar o Projeto

Pré-requisitos: Você precisa ter o **Node.js** e o **Git** instalados em sua máquina.

### 1. Clonar o repositório
```bash
git clone [https://github.com/Wlackless/projeto-integrador-estoque.git]
cd projeto-integrador-estoque

FACULDADE GRAN (https://faculdade.grancursosonline.com.br/)

Projeto Disciplina Projeto Integrador