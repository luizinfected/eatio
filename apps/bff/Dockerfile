FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
CMD ["npx", "nest", "start", "bff", "--watch"]

# COPY . .
# RUN npx nest build bff
# CMD ["node", "dist/apps/bff/main.js"]
