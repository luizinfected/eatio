# Eatio - Microserviços

## Visão Geral

Este projeto contém microserviços para um sistema de delivery de comida, construídos com NestJS e Prisma com SQLite.

## Microserviços

- **BFF** (Backend for Frontend) - Porta 3000
- **User** - Porta 3002 (banco: `user.db`)
- **Restaurant** - Porta 3003 (banco: `restaurant.db`)
- **Order** - Porta 3004 (banco: `order.db`)

## Como usar

### 1. Executar Migrações

Para cada microserviço, execute as migrações do Prisma:

```bash
cd apps/user
npx prisma migrate deploy

cd ../order
npx prisma migrate deploy

cd ../restaurant
npx prisma migrate deploy
```

### 2. Construir e Executar com Docker

```bash
# Construir todas as imagens
docker compose build

# Executar os serviços
docker compose up -d
```

### 3. Ou executar localmente

```bash
# Instalar dependências
npm install

# Executar um microserviço específico
npm run start:dev user
npm run start:dev order
npm run start:dev restaurant
npm run start:dev bff
```

## Imagens Docker

As imagens são otimizadas com multi-stage build:

- Baseadas em `node:20-alpine`
- Apenas dependências de produção na imagem final
- Tamanho reduzido em ~70%
- Bancos SQLite persistidos em volumes Docker

## Comunicação

Os microserviços se comunicam via NATS (porta 4222) para mensagens assíncronas.

## Bancos de Dados

Cada microserviço tem seu próprio banco SQLite:
- `user.db` - Dados de usuários
- `restaurant.db` - Dados de restaurantes
- `order.db` - Dados de pedidos

Os bancos são persistidos em volumes Docker nomeados.
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
