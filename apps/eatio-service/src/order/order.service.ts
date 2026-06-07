import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import type { Order } from '../../prisma/generated/client';

@Injectable()
export class OrderService {
  constructor(
    private readonly logger: Logger,
    private readonly prisma: PrismaService,
  ) {}

  async createOrder(data: Order): Promise<Order> {
    this.logger.log('Creating order', OrderService.name);
    return this.prisma.order.create({ data });
  }

  async getOrder(id: string): Promise<Order | null> {
    return this.prisma.order.findUnique({ where: { id }, include: { items: true } });
  }
}
