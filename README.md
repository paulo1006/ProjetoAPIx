🏪 API de Gerenciamento de Estoques e Produtos
Esta API foi desenvolvida em Node.js com Express e Prisma.
Ela gerencia dois recursos principais:

- Estoques
- Produtos

🚀 Tecnologias Utilizadas

- Node.js — ambiente de execução JavaScript.
- Express.js — framework para criação de rotas HTTP.
- Prisma ORM — para comunicação com o banco de dados.
- MongoDB — banco de dados NoSQL.
- Thunder Client /Insomnia / Postman — para testar os endpoints.

⚙️ Instalação e Execução
1️⃣ - Clonar o repositório
a. git clone https://github.com/paulo1006/ProjetoAPIx.git
b. cd ProjetoAPIx

2️⃣ - Instalar dependências
a. npm install

3️⃣ Configurar o banco de dados
DATABASE_URL="mongodb+srv://paulosilveira1006:alcindo03@users.fwjqpsx.mongodb.net/users?retryWrites=true&w=majority&appName=users"

4️⃣ Rodar as migrações do Prisma e Servidor
a. npx prisma generate
b. node Server.js



----- 📚 Endpoints da API -----

A API é dividida em dois módulos principais:  Produtos & Estoques

🧩 ROTAS DE ESTOQUES
1️⃣Criar um novo estoque -  POST https://projetoapix.onrender.com/estoques
  {
    "nome": "Estoque de Produtos",
    "descricao": "Somente eletrodomésticos",
    "centro":"Fortaleza -CE"
  }
2️⃣ Listar todos os estoques - GET https://projetoapix.onrender.com/estoques
  RESPOSTA
 {
    "id": "68ee90d9013c3849cd2a7e43",
    "nome": "Estoque de Produtos",
    "centro": "Fortaleza -CE",
    "criadoEm": "2025-10-14T18:05:13.027Z",
    "atualizadoEm": "2025-10-14T18:05:13.027Z",
    "produtos": []
  }


3️⃣ Atualizar um estoque - PUT https://projetoapix.onrender.com/estoques/68ee90d9013c3849cd2a7e43
---- Exemplo
{
   {
    "nome": "Estoque de Produtos Atualizado",
    "descricao": "Eletrodomésticos e outros",
    "centro":"Caucaia -CE"
  }
}

----- Resposta
{
  "id": "68ee95cf013c3849cd2a7e44",
  "nome": "Estoque de Produtos Atualizado",
  "centro": "Caucaia -CE",
  "criadoEm": "2025-10-14T18:05:13.027Z",
  "atualizadoEm": "2025-10-14T18:16:35.194Z"
}


4️⃣ Deletar o Estoque - DELETE https://projetoapix.onrender.com/estoques/68ee95cf013c3849cd2a7e44
--- RESPOSTA
{
  "message": "Estoque deletado com sucesso!"
}



📦 ROTAS DE PRODUTOS
1️⃣ Criar um produto no estoque - POST https://projetoapix.onrender.com/produtos
--- Exemplo
{
  "nome": "Televisão",
  "descricao":"22 polegadas",
  "quantidade":5,
  "estoqueId":"68ee95cf013c3849cd2a7e44"
}

2️⃣ Listar o produto que está vinculado ao estoque - GET https://projetoapix.onrender.com/produtos

--- Resposta
  {
    "id": "68ee9b37013c3849cd2a7e45",
    "nome": "Televisão",
    "descricao": "22 polegadas",
    "quantidade": 5,
    "estoqueId": "68ee95cf013c3849cd2a7e44",
    "criadoEm": "2025-10-14T18:49:27.523Z",
    "atualizadoEm": "2025-10-14T18:49:27.523Z",
    "estoque": {
      "id": "68ee95cf013c3849cd2a7e44",
      "nome": "Estoque de Produtos atualizado",
      "centro": "Caucaia -CE",
      "criadoEm": "2025-10-14T18:26:23.626Z",
      "atualizadoEm": "2025-10-14T18:32:31.967Z"
    }
  }

3️⃣ Atualizar o produto - PUT https://projetoapix.onrender.com/produtos/68ee9b37013c3849cd2a7e45


---Entrada 
{
    "nome":  "Televisão Atualizada",
    "descricao": "25 polegadas",
    "quantidade": 10,
    "estoqueId": "68ee95cf013c3849cd2a7e44"
}

--- Resposta
{
  "id": "68ee9b37013c3849cd2a7e45",
  "nome": "Televisão Atualizada",
  "descricao": "25 polegadas",
  "quantidade": 10,
  "estoqueId": "68ee95cf013c3849cd2a7e44",
  "criadoEm": "2025-10-14T18:49:27.523Z",
  "atualizadoEm": "2025-10-14T19:43:32.061Z"
}

4️⃣ Deletar o Produto - DELETE https://projetoapix.onrender.com/produtos/68ee9b37013c3849cd2a7e45
---Resposta
{
  "message": "Produto deletado com sucesso!"
}

E agora vamos deletar o estoque que está vinculado a ele, voltando ao 4° comando das Rotas do Estoque.
