import { SQSEvent, SQSRecord } from 'aws-lambda';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

interface ProductMetadata {
  productId: string;
  name: string;
  description: string;
  restaurantId: string;
}

export const handler = async (SQSEvent: SQSEvent) => {
  const { bucketName } = envVariables();
  const records: SQSRecord[] = SQSEvent.Records;
  try {
    for (const record of records) {
      const messageBody = JSON.parse(record.body) as ProductMetadata;
      console.log('Received SQS message:', messageBody);

      const s3ClientInstance = s3Client();

      const objectKey = `${messageBody.restaurantId}/${Date.now()}-image.jpg`;

      const putObjectCommand = new PutObjectCommand({
        Bucket: bucketName,
        Key: objectKey,
        ContentType: 'image/jpeg', // Adjust content type as needed TBD
      });

      const uploadUrl = await getSignedUrl(s3ClientInstance, putObjectCommand, {
        expiresIn: 60,
      });

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          uploadUrl,
          key: objectKey,
        }),
      };
    }
  } catch (error) {
    console.error('Error processing SQS message:', error);
    throw error; // Rethrow the error to ensure the message is not deleted from the queue
  }
};

const s3Client = () => {
  const { region, accessKeyId, secretAccessKey } = envVariables();
  return new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
};

const envVariables = () => {
  if (!process.env.S3_BUCKET_NAME) {
    throw new Error('S3_BUCKET_NAME environment variable is required');
  }
  if (!process.env.AWS_REGION) {
    throw new Error('AWS_REGION environment variable is required');
  }
  if (!process.env.AWS_ACCESS_KEY_ID) {
    throw new Error('AWS_ACCESS_KEY_ID environment variable is required');
  }
  if (!process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error('AWS_SECRET_ACCESS_KEY environment variable is required');
  }

  const bucketName = process.env.S3_BUCKET_NAME;
  const region = process.env.AWS_REGION;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  return { bucketName, region, accessKeyId, secretAccessKey };
};
