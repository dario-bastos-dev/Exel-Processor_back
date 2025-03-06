# Use a imagem oficial do Node.js como base
FROM node:23-alpine

# Crie e defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos de package.json e package-lock.json (se disponível)
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie os arquivos do projeto
COPY . .

# Configurando Prisma
RUN npm run build

# Crie a pasta de uploads
RUN mkdir -p uploads

# Expõe a porta que a aplicação usa
EXPOSE 3000

# Comando para executar a aplicação
CMD ["npm", "start"]
