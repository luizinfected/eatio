import {
  Get,
  Param,
  Logger,
  Post,
  HttpCode,
  Body,
  HttpStatus,
  Controller,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import type { User } from 'apps/user/prisma/generated/browser';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    this.logger.log(`Get user by id: ${id}`, UserController.name);
    const user = await this.userService.getUser(id);
    return user;
  }

  @Get('')
  async getUsers(): Promise<User[]> {
    this.logger.log(`Retrieving all users`, UserController.name);
    // Implementation for retrieving all users
    return [];
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() userDto: User, @Res() res: Response): Promise<any> {
    this.userService.createUser(userDto);
    return res.status(HttpStatus.CREATED).send();
  }
}
