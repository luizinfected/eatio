FROM node:20-alpine
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
CMD ["npx", "nest", "start", "eatio-service", "--watch"]

# prod
# RUN npx nest build eatio-service
# CMD ["node", "dist/apps/eatio-service/main.js"]
