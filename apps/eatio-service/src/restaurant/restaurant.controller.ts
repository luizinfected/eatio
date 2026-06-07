import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import type { Restaurant } from '../../prisma/generated/client';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly logger: Logger,
  ) {}

  @Get(':id')
  getRestaurant(@Param('id') id: string): Promise<Restaurant | null> {
    this.logger.log(`Get restaurant by id: ${id}`, RestaurantController.name);
    return this.restaurantService.getRestaurant(id);
  }

  @Post()
  createRestaurant(@Body() data: Restaurant): Promise<Restaurant> {
    return this.restaurantService.createRestaurant(data);
  }
}
