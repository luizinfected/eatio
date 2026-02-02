import type { User } from '../prisma/generated/client';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private logger: Logger) {}
  getHello(): string {
    return 'Hello World!';
  }

  createUser(user: User): User {
    this.logger.log('userPayload: ', user);
    return user;
    // throw Error('i want error');
  }
}
