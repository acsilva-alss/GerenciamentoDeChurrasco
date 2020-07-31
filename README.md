# Gerenciamento de Churrasco
![desafioTrinca](https://user-images.githubusercontent.com/22202588/89032480-29f14480-d30b-11ea-8ba2-6780c452e8d9.png)

Este projeto consiste em um sistema que permite gerenciamento de eventos, sendo possível convidar amigos cadastrados no sistema, criar novos eventos etc.

## Requisitos do sistema
- Incluir um novo churrasco com data, descrição e observações adicionais;
- Adicionar e remover participantes (colocando o seu valor de contribuição);
- Colocar um valor sugerido por usuário de contribuição 
- Visualizar os detalhes do churrasco, total de participantes e valor arrecadado.


## Demonstração

## Backend
### Tecnologias, frameworks e bibliotecas utilizadas
- Node
- Express
- Postgress
- Sequelize (ORM para conexão com banco de dados)
- JWT (Json web tokens para segurança das rotas)

### Modelagem do banco de dados
Apesar de ser muito comum a utilização de bancos NoSql em API's feitas em node, para esse projeto resolvi utilizar um banco de dados relacional por conta dos relacionamentos existentes entre as entidades do projeto. Quando se tem relacionamentos entre tabelas, utilizar um banco SQL pode ser a melhor escolha.

Conceitualmente existem duas tabelas, uma de usuários e outra de eventos. Analisando o problema, pude mapear dois relacionamentos entre essas tabelas, relacionamento administrador e relacionamento convidados. Um evento pode ter somente um usuário administrador, mas um usuário pode ser adminitrador de vários eventos, configurando assim um relacionamento 1:N entre usuários e eventos. Outro relacionamento existente é o de convidados onde um evento pode ter vários usuários convidados e um usuário pode ser convidado para vários eventos, configurando um relacionamento N:N.
Com o sequelize, um relacionamento N:N vira uma nova tabela, chamada tabela pivô, que contém os ids das duas tabelas relacionadas. Abaixo podemos ver uma figura ilustrando a modelagem do banco de dados:

![modelagemBanco](https://user-images.githubusercontent.com/22202588/89043027-43e85280-d31e-11ea-9aa4-d24d22c558f5.png)

### Rotas

A Api disponibiliza ao todo 13 rotas, sendo 2 delas de autenticação, 6 delas relacionadas a eventos e 5 delas relacionadas a usuários.
#### Rotas de autenticação:
```javascript
api.post('/register', {
    name,
    email,
    password
}); //Retorna um objeto com o nome do usuário e um token de autenticação
```

```javascript
api.post('/authenticate', {
    email,
    password
}); //Retorna um objeto com o nome do usuário e um token de autenticação
```
#### Rotas de eventos:
```javascript
api.get('/events/queryAll'); // Retorna um objeto com todos os eventos cadastrados no sistema
```
```javascript
api.post('/events/store', {
    eventName, 
    eventDescription, 
    eventDate, 
    amount, 
    arrayGuests
}); // Espera um objeto com as informações do evento e retorna um objeto com os dados do evento recém criado
```
```javascript
api.get('/events/:eventId/query'); //Retorna o evento que tem id igual a eventId
```
```javascript
api.put('/events/:eventId/edit', {
    nameEventEdited, 
    descriptionEventEdited, 
    dateEventEdited, 
    amountEdited, 
    arrayGuests
}); // Espera um objeto com as informações editadas do evento, e retorna o evento recém editado
```
```javascript
api.delete('/events/:eventId/delete'); // Deleta o evento que tem id igual a eventId
```
```javascript
api.get('/events/queryByAdministrator'); //Retorna os eventos que o usuário logado é administrador
```

Para verificar todas as rotas existentes no sistema, segue abaixo o link para que você importe os dados no insomminia:

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Gerenciamento%20de%20Churrasco&uri=https%3A%2F%2Fraw.githubusercontent.com%2Facsilva-alss%2FGerenciamentoDeChurrasco%2Fmaster%2FBackend%2Fexport.json)

### Instalação e execução
- Faça um clone desse repositório;
- Entre na pasta cd Backend;
- Rode yarn para instalar as dependências;
- Crie um arquivo .env na raiz da pasta Backend e coloque as seguintes informações:
    - DATABASE_HOST=NomeDoHostPostgres
    - DATABASE_USERNAME=NomeDoSeuUsuarioPostgres
    - DATABASE_PASSWORD=SenhaDoSeuUsuarioPostgres
    - DATABASE_NAME=NomeDoBancoDeDados
    - PORT=PortaOndeOBackendVaiRodar
- Rode yarn sequelize db:create para criar o banco de dados;
- Rode yarn sequelize db:migrate para executar as migrations;
- Rode yarn dev para iniciar o servidor.

## FrontEnd
O Frontend do sistema é reponsável por fornecer a interação com o usuário.
Ao se logar no sistema, o frontend recebe o nome do usuário e um token de autenticação. Esses são gravados no Local Storage, e em cada requisição a api, o token é adicionado ao cabeçalho da requisição.
 
### Tecnologias, frameworks e bibliotecas utilizadas
- Reactjs
- Axios (para conexão com a api) 
- react-router-dom (Para navegação entre as rotas)
- React hooks (para construção dos componentes)

### Instalação e execução

- Faça um clone desse repositório (Se não tiver feito, conforme manda a descrição do backend acima);
- Entre na pasta cd frontend;
- Rode yarn para instalar as dependências;
- Crie um arquivo .env na raiz da pasta frontend e coloque as seguintes informações:
    - REACT_APP_API_URL=NomeDaUrlLocal
- Rode yarn start para abrir a página no navegador.