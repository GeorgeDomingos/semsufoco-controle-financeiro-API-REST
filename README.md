
# Semsufoco API REST
![](https://github.com/GeorgeDomingos/semsufoco-controle-financeiro-API-REST/assets/136137653/93b0fc7a-9266-428f-b0f8-7cb0d49b6521)

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/GeorgeDomingos/semsufoco-controle-financeiro-API-REST?color=%2304D361">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/GeorgeDomingos/semsufoco-controle-financeiro-API-REST">
  
  <a href="https://github.com/cubos-academy/academy-template-readme-projects/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/GeorgeDomingos/semsufoco-controle-financeiro-API-REST">
  </a>

  
   <a href="https://github.com/GeorgeDomingos">
    <img alt="Feito por George Domingos" src="https://img.shields.io/badge/feito-por%20George%20Domingos-D818A5?style=social">
   </a>
   
   <a href="https://github.com/GeorgeDomingos/semsufoco-controle-financeiro-API-REST/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/GeorgeDomingos/semsufoco-controle-financeiro-API-REST?style=social">
  </a>

[Sobre o Projeto](-sobre-o-projeto)•
[Funcionalidades](-funcionalidades)•
[Como Executar o Projeto](#como-executar-o-projeto)•
[Tecnologias](#tecnologias)•
[Endpoints da API](#endpoints-da-api)•
[Implementações Futuras](#implementações-futuras)•
[Referências](#referências)•
[Contribuidores](#contribuidores)
  
<p align="center">
  <a href="#-sobre-o-projeto">Sobre</a> •
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-como-executar-o-projeto">Como executar</a> • 
  <a href="#-tecnologias">Tecnologias</a> •
  <a href="#-endpoints-da-api">Endpoins da API</a> •
  <a href="#-implementações-futuras">  Implementações futuras</a> •
  <a href="#-referências">Referências</a> •
  <a href="#-contribuidores">Contribuidores</a>
</p>

## 💻 Sobre o projeto

O Sem$ufoco foi desenvolvido durante o desafio do terceiro módulo do Curso de Desenvolvimento de Software da Cubos Academy. O projeto foi criado para aplicar os conceitos de APIRESTful em JavaScript realizando as operações básicas como listagem, registro de transações e categorias, atualização de dados, exclusão e extrato de transações.

## ⚙️ Funcionalidades
- Usuários:
  - [x] Cadastrar usuário
  - [X] Login
  - [X] Detalhar usuário
  - [X] Atualizar usuário
- Categorias:  
  - [x] Listar categorias
- Transações:
  - [x] Listar transaçoes
  - [x] Detalhar uma transação
  - [x] Cadastrar transação
  - [X] Atualizar transação
  - [X] Excluir transação
  - [X] Obter extrato
  - [X] Filtrar transação por categoria

## 🛣️ Como executar o projeto
### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é recomendável utilizar um editor para trabalhar com o código como o [VSCode](https://code.visualstudio.com/)

### Instalação

1. Clone este repositório:

    ```bash
    git clone git@github.com:GeorgeDomingos/semsufoco-controle-financeiro-API-REST.git
    ```
2. Acesse a pasta do projeto no terminal/cmd:
    ```bash
    cd semsufoco-controle-financeiro-API-REST
    ```
3. Instale as bibliotecas necessárias utilizando o comando:
    ```bash
    npm i
    ```
4. Crie um arquivo chamado sensitiveDate.js com todas as variáveis listadas no arquivo sensitiveDateExample.js

5. Execute a aplicação em modo de desenvolvimento
    ```bash
    npm run dev
    ```
- O servidor inciará na porta:3000 - acesse http://localhost:3000 

## 🛠 Tecnologias
![](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

As seguintes ferramentas foram usadas na construção do projeto:
- Node.js
- Express.js
- PostgreSQL
- Node-postgres (pg)
- Bcrypt
- JSON Web Tokens (JWT) 
- Nodemon

## 📝 Endpoints da API
### Cadastrar usuário:

**POST** `/usuario`
- Cria uma nova conta de usuário.
- A requisição é feita com um objeto Json informando o nome, email e senha do usuário, conforme o exemplo:

    ```bash
    {
    "nome": "Gilberto Gil", //exemplo
    "email": "gilbertogil@email.com", //exemplo
    "senha": "123456", //exemplo
    }
    ```


### Login:

**POST** `/login`

- Realiza o login do usuário com base nas credenciais fornecidas.
- A requisição é feita com um objeto Json informando email e senha do usuário, conforme o exemplo:
  
    ```bash
    {
    "email": "itamar_assumpcao@email.com", //exemplo
    "senha": "123456", //exemplo
    }
    ```

___
  > As rotas a seguir exigem o token de autenticação do usuário logado, a intormação deve se informada no header em formato Bearer Token
  > 
___

### Detalhar usuário:

**GET** `/usuario`

- Detalha os dados do usuário logado.

### Atualizar usuário:

**PUT** `/usuario`
- Atualiza os dados do usuário logado
- Analisa se o e-mail inserido está sendo utilizado por outro usuário e impede caso essa situação seja verificada
- A requisição é feita com um objeto Json informando nome, email ou senha do usuário, conforme o exemplo:
  
    ```bash
    {
    "nome": "Jorge Ben Jor", //exemplo
    "email": "jorge_ben@email.com", //exemplo
    "senha": "123456", //exemplo
    }
    ```
### Listar categorias:
**GET** `/categoria`
- Lista os nomes de todas as categorias de transações cadastradas na Sem$ufoco.

### Listar transações:
**GET** `/transacao`
- Lista todas as transações cadastradas do usuário.
- Poderá ser passado parâmetro tipo query para filtrar transações, conforme o exemplo:
  
  <pre>
    GET/transacao?filtro[]=roupas&filtro[]=salários
  </pre>

### Detalhar transações:
**GET** `/transacao/:id`
- Detalha uma transação específica a partir do seu id de cadastro;
- O id da transação deverá ser passado como parâmetro de rota.

### Cadastrar transação:
**POST** `/transacao`
- Registra uma nova transação.
- A requisição é feita com um objeto Json informando a descrição, valor, data, id da categoria e tipo, conforme o exemplo:

    ```bash
    {
    "descricao": "Salário", //exemplo
    "valor": 500000, //exemplo (valor em centavos)
    "data": "2022-03-24T15:30:00.000Z", //exemplo
    "categoria_id": 6,
    "tipo": "entrada 
    }
    ```
### Atualizar transação 
**PUT** `/transacao/:id`
- Atualiza uma transação cadastrada
- O id da transação deverá ser passado como parâmetro de rota.

### Excluir transação:
**DELETE** `/transacao/:id`
- Exclui uma transação cadastrada
- O id da transação deverá ser passado como parâmetro de rota.

### Obter extrato de transações:
**GET** `/transacao/extrato`
- Exibe o extrato financeiro do usuário.


## Implementações futuras

- [ ] Incluir verificações para validação de entradas utilizando a biblioteca Joi
- [ ] Refatorar as querys utilizando a biblioteca QueryBuilder Knex
- [ ] Utilizar a biblioteca DotEnv para criação das variáveis de ambiente
- [ ] Fazer o deploy da API 



## 📚 Referências
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Node.js](https://nodejs.org/pt-br/docs) 
- [Express](https://expressjs.com/pt-br/4x/api.html)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [Node-postgres (pg)](https://node-postgres.com/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [JSON Web Tokens](https://jwt.io/introduction)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Git](https://git-scm.com/docs)


## 👨‍💻 Contribuidores

<table>
  <tr>
    <td align="center"><a href="https://github.com/GeorgeDomingos"><img style="border-radius: 50%;" src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" width="100px;" alt=""/><br /><sub><b>George Domingos</b></sub></a><br/></td>
    <td align="center"><a href="https://github.com/EdEddAEddy"><img style="border-radius: 50%;" src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" width="100px;" alt=""/><br /><sub><b>Edevando Alves</b></sub></a><br /></td>

  </tr>
</table>










