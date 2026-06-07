import { Inject, Injectable, Logger } from '@nestjs/common';
import type { UserDTO } from '../dtos/user.dto';
import { SqsClient } from '../clients/sqs.client';
import { UserGateway, USER_GATEWAY_TOKEN } from '../gateways/user.gateway';

@Injectable()
export class UserService {
  constructor(
    private readonly logger: Logger,
    private readonly sqsClient: SqsClient,
    @Inject(USER_GATEWAY_TOKEN)
    private readonly userGateway: UserGateway,
  ) {}

  async createUser(userDto: UserDTO): Promise<UserDTO> {
    this.logger.log('Creating User', UserService.name);
    return await this.userGateway.createUser(userDto);
  }

  async getUser(id: string): Promise<UserDTO> {
    this.logger.log(
      `Retrieving Information from user id: ${id}`,
      UserService.name,
    );
    return await this.userGateway.getUser(id);
  }

  async getUsers(): Promise<UserDTO[]> {
    this.logger.log(`Retrieving all users`);
    const users = await this.userGateway.getUsers();
    return users || [];
  }

  async updateUser(id: string, userDto: UserDTO): Promise<UserDTO> {
    this.logger.log(`Updating user id: ${id}`);
    return await this.userGateway.updateUser(id, userDto);
  }

  async deleteUser(id: string): Promise<void> {
    this.logger.log(`Deleting user id: ${id}`);
    await this.userGateway.deleteUser(id);
  }
}
