FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx nest build user

CMD ["node", "dist/apps/user/main.js"]
