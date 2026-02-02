import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { lastValueFrom } from 'rxjs';

interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  // Add other fields from your Prisma User model
}
@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    const userObservable = this.appService.getUser(id);
    return await lastValueFrom(userObservable);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() userDto: User) {
    await lastValueFrom(this.appService.createUser(userDto));
    return { message: 'User created successfully' };
  }
}
