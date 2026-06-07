FROM node:20-alpine
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
CMD ["npx", "nest", "start", "bff", "--watch"]

# COPY . .
# RUN npx nest build bff
# CMD ["node", "dist/apps/bff/main.js"]
