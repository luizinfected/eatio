import { User } from '../../prisma/generated/client';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(
    private logger: Logger,
    private prismaService: PrismaService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async createUser(user: User): Promise<User> {
    this.logger.log('userPayload: ', user);
    await this.prismaService.user.create({ data: { ...user } });
    return user;
  }
}
