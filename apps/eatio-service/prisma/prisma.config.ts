import { config } from 'dotenv';
import path from 'path';
import { defineConfig } from 'prisma/config';

config({ path: path.resolve('apps/eatio-service/.env') });

export default defineConfig({
  schema: 'schema.prisma',
  migrations: {
    path: 'migrations',
  },
  datasource: {
    url: process.env['DATABASE_URL'],
  },
});
