import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';
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

  @Get()
  getUsers(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ): Promise<User[]> {
    const skipValue = skip ? Number(skip) : 0;
    const takeValue = take ? Number(take) : 10;
    this.logger.log(`Retrieving all users`, UserController.name);
    return this.userService.getUsers(skipValue, takeValue);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<void> {
    this.logger.log(`Deleting user id: ${id}`, UserController.name);
    return this.userService.deleteUser(id);
  }
}
