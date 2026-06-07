import { Get, Param, Logger, Post, Body, Controller } from '@nestjs/common';
import type { UserDTO } from '../dtos/user.dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserDTO | null> {
    this.logger.log(`Get user by id: ${id}`, UserController.name);
    return await this.userService.getUser(id);
  }

  @Get()
  async getUsers(): Promise<UserDTO[]> {
    this.logger.log(`Retrieving all users`, UserController.name);
    return await this.userService.getUsers();
  }

  @Post()
  async createUser(@Body() userDto: UserDTO): Promise<UserDTO> {
    return await this.userService.createUser(userDto);
  }

  async updateUser(
    @Param('id') id: string,
    @Body() userDto: UserDTO,
  ): Promise<UserDTO> {
    this.logger.log(`Updating user id: ${id}`, UserController.name);
    return await this.userService.updateUser(id, userDto);
  }

  async deleteUser(@Param('id') id: string): Promise<void> {
    this.logger.log(`Deleting user id: ${id}`, UserController.name);
    await this.userService.deleteUser(id);
  }
}
