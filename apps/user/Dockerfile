FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
CMD ["npx", "nest", "start", "user", "--watch"]

# COPY . .
# RUN npx nest build user
# CMD ["node", "dist/apps/user/main.js"]
