# API - My Library

Este projeto é a API do My Library, feita com Node.js e Express, que utiliza autenticação JWT.

---

## Requisitos

- Node.js (versão 16+ recomendada)
- npm
- MongoDB rodando localmente ou uma URL MongoDB Atlas

---

## Configuração

1. Clone este repositório:

git clone https://github.com/diasmurillo/Library.git
cd Library/library-api

2. Instale as dependências:

npm install

3. Crie um arquivo .env na pasta library-api com as variáveis de ambiente necessárias, por exemplo:

PORT=3000
MONGO_URI=mongodb://localhost:27017/my-library
JWT_SECRET=suaChaveJWT

## Executando a API

npm run dev

## Endpoints principais

- POST /api/users/login - Login do usuário

- POST /api/users/register - Cadastro de usuário

- GET /api/users/profile - Perfil do usuário (requere token JWT)

- POST /api/rentals - Criar aluguel de livro (requere token JWT)

- GET /api/rentals - Listar aluguéis do usuário (requere token JWT)

# Nota
- Para consumir esta API utilize o front-end disponível neste repositório na pasta library-frontEnd.