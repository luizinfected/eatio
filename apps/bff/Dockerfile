FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx nest build bff

CMD ["node", "dist/apps/bff/main.js"]
