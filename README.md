# Construção e Otimização de uma Imagem Docker para Aplicação Node.js

Este projeto foi desenvolvido para a disciplina ministrada pelo professor Tercio de Morais na Universidade Federal de Alagoas - Campus Arapiraca, pelos alunos **Caio Teixeira da Silva** e **Gustavo Henrique dos Santos Malaquias**.

A aplicação tem como finalidade calcular o fatorial de um número fornecido pelo usuário, salvando os resultados em um arquivo de forma persistente, utilizando volumes Docker. Além disso, o projeto utiliza a técnica de _multi-stage build_ no Docker para otimizar a imagem final, deixando apenas os arquivos necessários para a execução.

---

## Sumário

- [Descrição](#descrição)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Requisitos](#requisitos)
- [Como Executar](#como-executar)
- [Detalhes Técnicos](#detalhes-técnicos)
- [Autores](#autores)

---

## Descrição

Este projeto consiste em uma aplicação Node.js escrita em TypeScript que:
- Calcula o fatorial de um número utilizando recursividade.
- Persiste os resultados em um arquivo (`fatoriais.txt`) localizado no diretório `/app/data` do container.
- Utiliza Docker e Docker Compose para facilitar o ambiente de desenvolvimento e execução.
- Implementa um _multi-stage build_ para separar o processo de build da imagem final, garantindo que somente os artefatos necessários (arquivos compilados e dependências de runtime) estejam presentes na imagem final.

---

## Funcionalidades

- **Cálculo de Fatorial:** A função `factorial` recebe um número e retorna o fatorial correspondente ou uma mensagem de erro para números negativos.
- **Persistência de Dados:** Os resultados são armazenados no arquivo `fatoriais.txt` que é mapeado para um volume Docker, garantindo a persistência mesmo após a parada do container.
- **Multi-stage Build:** O Dockerfile está dividido em duas etapas:
  - **Stage 1:** Ambiente de build onde os arquivos são compilados (TypeScript → JavaScript) e as dependências são instaladas.
  - **Stage 2:** Imagem final que contém apenas o necessário para a execução da aplicação.
- **Uso via Docker Compose:** O ambiente é facilitado por meio do Docker Compose, possibilitando o gerenciamento e execução do container de forma simples e prática.

---

## Estrutura do Projeto

```plaintext
├── Dockerfile
├── docker-compose.yml
├── package.json
├── package-lock.json
├── tsconfig.json
├── src
│   └── index.ts          # Código principal da aplicação
└── data                  # Diretorio para persistência dos resultados (criado em runtime)
```

- **Dockerfile:** Responsável por definir o processo de _multi-stage build_.
- **docker-compose.yml:** Define o serviço `factorial-cli` com os mapeamentos de volume e configuração do container.
- **tsconfig.json:** Configuração do compilador TypeScript.
- **src/index.ts:** Contém o código para calcular o fatorial e salvar o resultado em um arquivo.
- **data/**: Diretório onde os resultados são armazenados de forma persistente.

---

## Requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- (Opcional) [Node.js](https://nodejs.org/) e [npm](https://www.npmjs.com/) para testes locais e desenvolvimento fora do container.

---

## Como Executar

### Passo a Passo:

1. **Build e Criação dos Containers:**

   No diretório raiz do projeto, execute o comando:

   ```bash
   docker-compose up --build
   ```

   Esse comando irá:
   - Construir as imagens Docker utilizando o _multi-stage build_.
   - Criar e iniciar o container `factorial-cli`.

2. **Acessar o Container:**

   Abra um terminal interativo dentro do container:

   ```bash
   docker exec -it factorial-cli sh
   ```

3. **Executar a Aplicação:**

   Dentro do container, execute a aplicação passando o número desejado como argumento:

   ```bash
   node dist/index.js <número>
   ```

   Exemplo:

   ```bash
   node dist/index.js 5
   ```

   O resultado será exibido no terminal e o cálculo (ex.: `5! = 120`) será persistido no arquivo `/app/data/fatoriais.txt`.

4. **Verificar os Resultados:**

   O arquivo `fatoriais.txt` estará disponível no host dentro da pasta `data`, permitindo acompanhar todos os cálculos realizados, mesmo após a parada ou reinicialização do container.

---