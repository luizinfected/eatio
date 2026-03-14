import {
  Get,
  Param,
  Logger,
  Post,
  HttpCode,
  Body,
  HttpStatus,
  Controller,
} from '@nestjs/common';
import type { User } from 'apps/user/prisma/generated/browser';
import { lastValueFrom } from 'rxjs';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    this.logger.log(`Get user by id: ${id}`, UserController.name);
    const userObservable = this.userService.getUser(id);
    return await lastValueFrom(userObservable);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() userDto: User) {
    await lastValueFrom(this.userService.createUser(userDto));
    return { message: 'User created successfully' };
  }
}
