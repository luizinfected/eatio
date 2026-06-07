import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import type { User } from '../../prisma/generated/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {}

  @Get(':id')
  getUser(@Param('id') id: string): Promise<User | null> {
    this.logger.log(`Get user by id: ${id}`, UserController.name);
    return this.userService.getUser(id);
  }

  @Post()
  createUser(@Body() createUser: User): Promise<User> {
    return this.userService.createUser(createUser);
  }
}
