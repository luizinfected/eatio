import { Logger, Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { PrismaService } from '../services/prisma.service';

@Module({
  controllers: [RestaurantController],
  providers: [RestaurantService, PrismaService, Logger],
})
export class RestaurantModule {}
