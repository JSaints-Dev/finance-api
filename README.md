# API de Gestão Financeira

Essa é uma API RESTful de um sistema de gestão financeira. A API foi desenvolvida em Node.js com o framework Nest.js e um banco de dados relacional.

## Documentação da API

Caso queira ver a documentação da API, acesse o link abaixo:
- [Documentação da API](https://finance-api-bgor.onrender.com/api)

**Obs:** O carregamento da página pode demorar um pouco, pois está em servidor gratuito, então a instância é desligada após alguns minutos de inatividade.

## Executando a API Localmente

### Pré-requisitos

- Docker
- Docker Compose

### Passos para execução

1. Clone o repositório:

    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd <NOME_DO_REPOSITORIO>
    ```

2. Copie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente:

    ```bash
    cp .env.example .env
    ```

    Preencha a variável [`POSTGRES_HOST`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fjeanjorgedesaintesarles%2FDevelopment%2Festudos%2Ffincheck%2Ffinance-app-api%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A18%2C%22character%22%3A23%7D%7D%5D%2C%22a33ed5db-ef8b-4be9-ae5a-caa9a13fbd6b%22%5D "Go to definition") com o valor [`db`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fjeanjorgedesaintesarles%2FDevelopment%2Festudos%2Ffincheck%2Ffinance-app-api%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A18%2C%22character%22%3A51%7D%7D%5D%2C%22a33ed5db-ef8b-4be9-ae5a-caa9a13fbd6b%22%5D "Go to definition") e as outras variáveis de acordo com o seu ambiente.

3. Execute o comando abaixo para criar a imagem da aplicação e do banco de dados:

    ```bash
    docker compose -f docker-compose.dev.yaml up --build
    ```

4. Acesse a documentação da API em `http://localhost:3000/api`

## Observações

- Certifique-se de que as variáveis de ambiente estão corretamente configuradas no arquivo [.env](http://_vscodecontentref_/#%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fjeanjorgedesaintesarles%2FDevelopment%2Festudos%2Ffincheck%2Ffinance-app-api%2F.env%22%2C%22path%22%3A%22%2FUsers%2Fjeanjorgedesaintesarles%2FDevelopment%2Festudos%2Ffincheck%2Ffinance-app-api%2F.env%22%2C%22scheme%22%3A%22file%22%7D%7D).
- O banco de dados será iniciado automaticamente junto com a aplicação.
- Para parar os containers, utilize o comando:

    ```bash
    docker compose -f docker-compose.dev.yaml down
    ```

## Contribuição

Sinta-se à vontade para contribuir com este projeto. Para isso, siga os passos abaixo:

1. Faça um fork do projeto
2. Crie uma nova branch (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -am 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.