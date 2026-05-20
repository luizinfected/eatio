import { Logger, Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { UserModule } from './user.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
      port: 3001,
    }),
    HttpModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
