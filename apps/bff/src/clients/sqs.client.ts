import { SendMessageCommand, SendMessageCommandOutput, SQSClient } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SqsClient {
  private readonly client: SQSClient;

  constructor() {
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID ?? 'test';
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY ?? 'test';
    const region = process.env.AWS_REGION || 'us-east-1';

    const endpoint = process.env.SQS_ENDPOINT;

    const clientConfig: any = {
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    };

    if (endpoint) {
      clientConfig.endpoint = endpoint;
    }

    this.client = new SQSClient(clientConfig);
  }

  async sendMessage(
    message: any,
    queueUrl: string,
  ): Promise<SendMessageCommandOutput> {
    const body = typeof message === 'string' ? message : JSON.stringify(message);
    const command = new SendMessageCommand({
      QueueUrl: queueUrl,
      MessageBody: body,
    });

    return await this.client.send(command);
  }
}
