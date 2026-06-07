import axios from 'axios';
import type { UserDTO } from '../dtos/user.dto';
import { Injectable, Logger } from '@nestjs/common';

export const USER_GATEWAY_TOKEN = Symbol('UserGateway');

@Injectable()
export class UserGateway {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger(UserGateway.name);
  }

  async createUser(userDto: UserDTO): Promise<UserDTO> {
    try {
      const user = await axios.post<UserDTO>(
        `${process.env.USER_SERVICE_URL}/user`,
        userDto,
      );

      return user.data;
    } catch (error: any) {
      this.logger.error(
        `Error creating user: ${error.message}`,
        UserGateway.name,
      );
      throw new Error('Failed to create user');
    }
  }

  async getUser(id: string): Promise<UserDTO> {
    this.logger.log(
      `Retrieving Information from user id: ${id}`,
      UserGateway.name,
    );
    try {
      const url = `${process.env.USER_SERVICE_URL}/user/${id}`;
      const response = await axios.get<UserDTO>(url);
      return response.data;
    } catch (error: any) {
      this.logger.error(`Error retrieving user information: ${error.message}`);
      throw new Error('Failed to retrieve user information');
    }
  }

  async getUsers(): Promise<UserDTO[]> {
    this.logger.log(`Retrieving all users`);
    try {
      const url = `${process.env.USER_SERVICE_URL}/user`;
      const response = await axios.get<UserDTO[]>(url);
      return response.data;
    } catch (error: any) {
      this.logger.error(`Error retrieving users information: ${error.message}`);
      throw new Error('Failed to retrieve users information');
    }
  }

  async updateUser(id: string, userDto: UserDTO): Promise<UserDTO> {
    this.logger.log(`Updating user id: ${id}`);
    try {
      const url = `${process.env.USER_SERVICE_URL}/user/${id}`;
      const response = await axios.put<UserDTO>(url, userDto);
      return response.data;
    } catch (error: any) {
      this.logger.error(`Error updating user information: ${error.message}`);
      throw new Error('Failed to update user information');
    }
  }

  async deleteUser(id: string): Promise<void> {
    this.logger.log(`Deleting user id: ${id}`);
    try {
      const url = `${process.env.USER_SERVICE_URL}/user/${id}`;
      await axios.delete(url);
    } catch (error: any) {
      this.logger.error(`Error deleting user: ${error.message}`);
      throw new Error('Failed to delete user');
    }
  }
}
