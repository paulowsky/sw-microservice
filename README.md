# sw-express-project
Atividades da disciplina de Serviços Web.

### Pré-requisitos
- [Node.js LTS](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)
- [VSCode](https://code.visualstudio.com/download)
- [Docker](https://www.docker.com/products/docker-desktop)

### Postgres
A configuração do postgres e pgadmin está feita através do docker.

Basta rodar o comando para inicialização do docker-compose.
```sh
docker-compose up -d
```

### Instalação de dependências
```sh
yarn
```

### Execução local
```sh
yarn dev
```

### Execução build
```sh
yarn start
```

### Requests

As requisições estão implementadas no arquivo `api.http`.

Para executar, é necessário ter a extensão `humao.rest-client` instalada do VSCode.