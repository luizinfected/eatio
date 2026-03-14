import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { Microservices } from './types/microservices';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: Microservices.userService,
        transport: Transport.NATS,
        options: {
          servers: ['nats://nats:4222'],
        },
      },
      {
        name: Microservices.restaurantService,
        transport: Transport.NATS,
        options: {
          servers: ['nats://nats:4222'],
        },
      },
      {
        name: Microservices.orderService,
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
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
