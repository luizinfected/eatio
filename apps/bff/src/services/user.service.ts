import { Injectable, Logger } from '@nestjs/common';
import { User } from 'apps/user/prisma/generated/client';
import { SqsClient } from '../clients/sqs.client';
import axios from 'axios';

@Injectable()
export class UserService {
  constructor(
    private readonly logger: Logger,
    private readonly sqsClient: SqsClient,
  ) {}

  createUser(userDto: User): void {
    this.logger.log('Creating User', UserService.name);
    this.sqsClient.sendMessage(userDto, `${process.env.USER_SQS_QUEUE_URL}`);
  }

  async getUser(id: string): Promise<User> {
    this.logger.log(`Retrieving Information from user microservice`);
    try {
      const url = `${process.env.USER_SERVICE_URL}/user/${id}`;
      this.logger.log(`Making GET request to ${url}`);
      const response = await axios.get(url);
      return response.data;
    } catch (error: any) {
      this.logger.error(`Error retrieving user information: ${error.message}`);
      throw new Error('Failed to retrieve user information');
    }
  }
}
