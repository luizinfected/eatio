import { Logger, Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { HttpModule } from '@nestjs/axios';
import { SqsClient } from '../clients/sqs.client';

@Module({
  imports: [HttpModule],
  controllers: [UserController],
  providers: [UserService, Logger, SqsClient],
})
export class UserModule {}
