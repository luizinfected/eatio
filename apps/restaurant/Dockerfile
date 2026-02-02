FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
CMD ["npx", "nest", "start", "restaurant", "--watch"]

# prod
# COPY . .
# RUN npx nest build restaurant
# CMD ["node", "dist/apps/restaurant/main.js"]
