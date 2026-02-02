import { NestFactory } from '@nestjs/core';
import { RestaurantModule } from './restaurant.module';
import { Transport, type MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RestaurantModule,
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
