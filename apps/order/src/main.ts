import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import { Transport, type MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderModule,
    {
      transport: Transport.NATS,
      options: {
        servers: ['nats://nats:4222'],
      },
    },
  );

  await app.listen();
}
void bootstrap();
