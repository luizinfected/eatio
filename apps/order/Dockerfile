FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
CMD ["npx", "nest", "start", "order", "--watch"]

# COPY . .
# RUN npx nest build order
# CMD ["node", "dist/apps/order/main.js"]
