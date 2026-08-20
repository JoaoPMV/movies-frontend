# Movies

Aplicação web para ajudar pessoas a praticar inglês através de filmes. O usuário assiste ao trailer e precisa preencher as lacunas com as palavras faltantes.

### Objetivo

Oferecer uma experiência interativa de estudo com foco em:

- compreensão auditiva (listening)
- ampliação de vocabulário
- aprendizado contextualizado com palavras e expressões faladas no dia a dia

---

## Tecnologias Utilizadas

### Frontend

- React + Vite
- JavaScript
- CSS
- React Router
- Bootstrap

### Backend (API)

- Node.js
- Express
- JWT (autenticação)
- MongoDB
- bcrypt

---

## Funcionalidades

- Cadastro de usuários
- Login com autenticação JWT
- Rotas protegidas por token
- Listagem de filmes
- Exercícios de legenda com palavras faltantes
- Interface responsiva

---

## Melhorias Futuras

- [ ] Pontuação por acertos
- [ ] Histórico de desempenho do usuário
- [ ] Níveis de dificuldade (fácil/médio/difícil)
- [ ] Suporte a múltiplos idiomas
- [ ] Modo revisão de palavras aprendidas

---

## Como Executar o Projeto

### Pré-requisitos

- Node.js instalado
- Backend da aplicação em execução

### 1. Clonar o repositório

```bash
git clone https://github.com/JoaoPMV/movies-frontend.git
```

### 2. Acessar a pasta do projeto

```bash
cd frontend
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Configurar variáveis de ambiente

Crie um arquivo `.env.development` na raiz do projeto com:

```env
VITE_API_URL=http://SEU_BACKEND_HOST:PORTA
```

Exemplo:

```env
VITE_API_URL=http://localhost:3000
```

### 5. Executar o projeto

```bash
npm run dev
```

A aplicação ficará disponível em:

```bash
http://localhost:5173
```

---

## Backend da Aplicação

Este repositório contém apenas o frontend da aplicação.  
O backend (API) está disponível em:  
https://github.com/JoaoPMV/movies-backend

---

## Autor

Desenvolvido por **JoaoPMV**  
GitHub: https://github.com/JoaoPMV
