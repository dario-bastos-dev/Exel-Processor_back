# Use a imagem oficial do Node.js como base
FROM node:23-alpine as builder

# Crie e defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos de package.json e package-lock.json (se disponível)
COPY package*.json ./

RUN npm install -g bun

# Instale as dependências do projeto
RUN npm install && bun install

# Copie os arquivos do projeto
COPY . .

# Configurando Prisma
RUN bun run build

# Crie a pasta de uploads
RUN mkdir -p uploads

# Expõe a porta que a aplicação usa
EXPOSE 3000

# Comando para executar a aplicação
CMD ["bun", "start"]
