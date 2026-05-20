import { NestFactory } from '@nestjs/core';
import { UserModule } from './modules/user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule, {
    snapshot: true,
  });

  await app.listen(process.env.PORT ?? 3001);
}

void bootstrap();