#stage 1: building
FROM node:lts-alpine AS builder
WORKDIR /app

# copiando os arquivos e instalando dependencias
COPY package.json package-lock.json ./
RUN npm install
COPY tsconfig.json ./
COPY src ./src

# compilando o arquivo index.ts

RUN npm run build

#stage 2: exec

FROM node:lts-alpine
WORKDIR /app

# copiando os arquivos necessarios

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

#criando diretorio para persistencia
RUN mkdir -p /app/data
VOLUME ["/app/data"]

# comando padrao
ENTRYPOINT ["sh", "-c", "while true; do sleep 1000; done"]



