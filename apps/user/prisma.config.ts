import { config } from 'dotenv';
import 'dotenv/config';
import path from 'path';
import { defineConfig } from 'prisma/config';

config({ path: path.resolve('apps/user/.env') });

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env['DATABASE_URL'],
  },
});
