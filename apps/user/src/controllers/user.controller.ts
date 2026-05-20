import type { User } from '../../prisma/generated/client';
import { Body, Controller, Get, Logger, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {}

  @Get(':id')
  getUser(@Param('id') id: string) {
    this.logger.log(`Get User by Id: ${id}`, UserController.name);
    return { id: id, microservice: 'user' };
  }

  createUser(@Body() createUser: User): Promise<User> {
    return this.userService.createUser(createUser);
  }
}
