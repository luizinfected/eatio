import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import type { Order } from '../../prisma/generated/client';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly logger: Logger,
  ) {}

  @Get(':id')
  getOrder(@Param('id') id: string): Promise<Order | null> {
    this.logger.log(`Get order by id: ${id}`, OrderController.name);
    return this.orderService.getOrder(id);
  }

  @Post()
  createOrder(@Body() data: Order): Promise<Order> {
    return this.orderService.createOrder(data);
  }
}
