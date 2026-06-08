/**
 * Local test script for upload-image-handler Lambda.
 * Loads .env from apps/eatio-service/.env automatically.
 *
 * Run from the repo root:
 *   npx ts-node -P apps/eatio-service/tsconfig.app.json apps/eatio-service/src/lambdas/upload-image-handler.local.ts
 */

import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../..', '.env') });

import { SQSEvent } from 'aws-lambda';

// ── Mock SQS Event ───────────────────────────────────────────────────────────
const mockEvent: SQSEvent = {
  Records: [
    {
      messageId: 'test-message-id-001',
      receiptHandle: 'test-receipt-handle',
      body: JSON.stringify({
        productId: '12345',
        name: 'Sample Product',
        description: 'This is a sample product description.',
        restaurantId: '67890',
      }),
      attributes: {
        ApproximateReceiveCount: '1',
        SentTimestamp: Date.now().toString(),
        SenderId: 'test-sender',
        ApproximateFirstReceiveTimestamp: Date.now().toString(),
      },
      messageAttributes: {},
      md5OfBody: '',
      eventSource: 'aws:sqs',
      eventSourceARN: 'arn:aws:sqs:us-east-1:000000000000:test-queue',
      awsRegion: process.env.AWS_REGION!,
    },
  ],
};

// ── Run ──────────────────────────────────────────────────────────────────────
import { handler } from './upload-image-handler';

(async () => {
  console.log('Invoking Lambda handler locally...\n');
  try {
    const result = await handler(mockEvent);
    console.log('Result:', JSON.stringify(result, null, 2));

    if (result?.body) {
      const body = JSON.parse(result.body) as { uploadUrl: string; key: string };
      console.log('\nPre-signed upload URL:');
      console.log(body.uploadUrl);
      console.log('\nObject key:', body.key);

      // ── Upload test image (1x1 blank pixel PNG) ──────────────────────────
      const testImageBase64 =
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=';
      const imageBuffer = Buffer.from(testImageBase64, 'base64');

      console.log('\nUploading test image via pre-signed URL...');
      const uploadResponse = await fetch(body.uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'image/jpeg',
        },
        body: imageBuffer,
      });

      if (uploadResponse.ok) {
        console.log(`Upload successful! HTTP ${uploadResponse.status}`);
        console.log(
          `\nView on S3: https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${body.key}`,
        );
      } else {
        const responseText = await uploadResponse.text();
        console.error(`Upload failed! HTTP ${uploadResponse.status}: ${responseText}`);
      }
    }
  } catch (error) {
    console.error('Handler threw an error:', error);
    process.exit(1);
  }
})();
