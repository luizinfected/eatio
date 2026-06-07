import { Logger, Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { HttpModule } from '@nestjs/axios';
import { SqsClient } from '../clients/sqs.client';
import { UserGateway, USER_GATEWAY_TOKEN } from '../gateways/user.gateway';

@Module({
  imports: [HttpModule],
  controllers: [UserController],
  providers: [
    UserService,
    Logger,
    SqsClient,
    { provide: USER_GATEWAY_TOKEN, useClass: UserGateway },
  ],
})
export class UserModule {}
