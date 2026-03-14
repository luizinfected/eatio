import type { User } from '../prisma/generated/client';
import { Body, Controller, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {}

  @MessagePattern('getUser')
  getUser(data: { id: string }) {
    this.logger.log(`Get User by Id: ${data.id}`, UserController.name);
    const newData = { id: data.id, microservice: 'user' };
    return newData;
  }

  @MessagePattern('createUser')
  createUser(@Body() createUser: User): User {
    return this.userService.createUser(createUser);
  }
}
