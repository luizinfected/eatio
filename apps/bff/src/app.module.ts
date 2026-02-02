import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DevtoolsModule } from '@nestjs/devtools-integration';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://nats:4222'],
        },
      },
      {
        name: 'RESTAURANT_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://nats:4222'],
        },
      },
      {
        name: 'USER_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://nats:4222'],
        },
      },
    ]),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
      port: 3001,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
