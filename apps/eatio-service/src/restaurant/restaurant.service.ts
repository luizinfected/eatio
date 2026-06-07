import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import type { Restaurant } from '../../prisma/generated/client';

@Injectable()
export class RestaurantService {
  constructor(
    private readonly logger: Logger,
    private readonly prisma: PrismaService,
  ) {}

  async createRestaurant(data: Restaurant): Promise<Restaurant> {
    this.logger.log('Creating restaurant', RestaurantService.name);
    return this.prisma.restaurant.create({ data });
  }

  async getRestaurant(id: string): Promise<Restaurant | null> {
    return this.prisma.restaurant.findUnique({ where: { id } });
  }
}
