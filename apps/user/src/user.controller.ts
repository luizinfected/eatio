import type { User } from '../prisma/generated/client';
import { Body, Controller, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('getUser')
  getHello(data: { id: string }) {
    const newData = { id: data.id, microservice: 'user' };
    return newData;
  }

  @MessagePattern('createUser')
  createUser(@Body() createUser: User): User {
    return this.userService.createUser(createUser);
  }
}
