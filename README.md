# Desafio Técnico Fullstack - Ponto Ilumeo

Este repositório contém a solução do backend + testes para o desafio técnico do sistema de controle de ponto da Ilumeo.

A aplicação foi desenvolvida em Node.js com TypeScript, seguindo os princípios S.O.L.I.D. para uma arquitetura limpa e testável. A persistência de dados é feita com PostgreSQL, gerenciado pelo ORM Prisma, e todo o ambiente é containerizado com Docker.

## Funcionalidades Implementadas

-   **Login de Usuário:** Autenticação de colaborador via código de acesso.
-   **Controle de Ponto:** Endpoints para registro de entrada (`clock-in`) e saída (`clock-out`).
-   **Histórico de Registros:** Endpoint para listar todos os registros de ponto de um usuário.

---

## Tecnologias Utilizadas

-   **Backend:** Node.js, Express, TypeScript
-   **Banco de Dados:** PostgreSQL, Prisma (ORM)
-   **Testes:** Jest, ts-jest
-   **Containerização:** Docker, Docker Compose
-   **Qualidade de Código:** ESLint, Prettier

---

## Pré-requisitos

Para executar este projeto, você precisará ter instalado em sua máquina:
-   [Docker](https://www.docker.com/products/docker-desktop/)
-   [Docker Compose](https://docs.docker.com/compose/install/) (geralmente já vem com o Docker Desktop)

---

## Como Executar a Aplicação (Ambiente Docker)

O projeto é totalmente containerizado para facilitar a execução e garantir a consistência do ambiente.

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd ilumeo-ponto-app
    ```

2.  **Suba os containers da API e do Banco de Dados:**
    Este comando irá construir a imagem da API e iniciar os dois serviços em background.
    ```bash
    docker-compose up -d
    ```

3.  **Execute as migrações do banco de dados:**
    Com os containers rodando, este comando irá criar as tabelas necessárias no banco de dados PostgreSQL.
    ```bash
    docker-compose exec api npx prisma migrate dev
    ```
    *Será solicitado um nome para a migração, você pode usar `initial-setup`.*

A aplicação backend estará disponível em `http://localhost:3333`.

---

## Como Executar os Testes

Os testes unitários foram criados com Jest para validar as regras de negócio de cada caso de uso.

1.  **Garanta que os containers estejam de pé** (seguindo o passo anterior).
2.  **Execute os testes dentro do container da API:**
    ```bash
    docker-compose exec api npm test
    ```

Você verá a saída do Jest com o resultado de todos os testes passando.

---

## Endpoints da API

A coleção de endpoints pode ser testada com ferramentas como Postman ou Insomnia.

### Usuários

-   **`POST /users/login`**: Autentica um usuário.
    -   **Body:**
        ```json
        {
          "accessCode": "SEU_CODIGO_AQUI"
        }
        ```

### Registros de Ponto

-   **`POST /records/clock-in`**: Registra um ponto de entrada.
    -   **Body:**
        ```json
        {
          "accessCode": "SEU_CODIGO_AQUI"
        }
        ```

-   **`POST /records/clock-out`**: Registra um ponto de saída.
    -   **Body:**
        ```json
        {
          "accessCode": "SEU_CODIGO_AQUI"
        }
        ```

-   **`GET /records/:userId`**: Lista todos os registros de um usuário.
    -   **Parâmetro de URL:** `userId` (o ID do usuário retornado no login).

---

## Ferramentas Úteis

### Prisma Studio

Para visualizar e gerenciar o banco de dados que está rodando no Docker, execute:
```bash
docker-compose exec api npx prisma studio
