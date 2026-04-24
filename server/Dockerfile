# server/Dockerfile
FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
# We need to build the TypeScript files
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
