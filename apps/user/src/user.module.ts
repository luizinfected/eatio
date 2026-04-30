import { Logger, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, Logger, PrismaService],
})
export class UserModule {}
