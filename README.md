# My Library

Este repositório contém duas pastas principais:

- `/library-api` — backend em Node.js com Express, para gerenciar autenticação, usuários e aluguel de livros.
- `/library-frontEnd` — front-end em React, site estilizado com Tailwind CSS para interação do usuário.

---

## Como rodar o projeto

### 1. API (backend)

Entre na pasta `/library-api`, instale as dependências e rode o servidor.

cd library-api
npm install
npm start

 Crie um arquivo .env na pasta library-api com as variáveis de ambiente necessárias, por exemplo:

PORT=3000
MONGO_URI=mongodb://localhost:27017/my-library
JWT_SECRET=suaChaveJWT

### 2. Front-End

Entre na pasta /library-frontEnd, instale as dependências e rode o site.

cd library-frontEnd
npm install
npm run dev

## Detalhes

- A API usa JWT para autenticação e controle de acesso.

- O front armazena o token JWT no localStorage para manter a sessão.

- O front é estilizado com Tailwind CSS para uma interface moderna e responsiva.

- Certifique-se que o backend esteja rodando para que o front funcione corretamente.

## Repositório

Clone o repositório

git clone https://github.com/diasmurillo/Library.git