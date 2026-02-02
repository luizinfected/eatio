import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { Transport, type MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
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
