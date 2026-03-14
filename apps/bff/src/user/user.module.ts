import { Logger, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Microservices } from '../types/microservices';

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
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, Logger],
})
export class UserModule {}
