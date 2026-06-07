import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [UserModule, RestaurantModule, OrderModule],
})
export class AppModule {}
