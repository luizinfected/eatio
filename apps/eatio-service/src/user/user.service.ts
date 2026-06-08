import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { User } from '../../prisma/generated/client';

@Injectable()
export class UserService {
  constructor(
    private readonly logger: Logger,
    private readonly prisma: PrismaService,
  ) {}

  async createUser(user: User): Promise<User> {
    this.logger.log('Creating user', UserService.name);

    if (user.type === 'ADMIN' || user.type === 'OWNER') {
      throw new Error('Cannot create user with type admin or owner');
    }

    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ documentNumber: user.documentNumber }, { email: user.email }],
      },
      select: { documentNumber: true, email: true },
    });

    if (existingUser) {
      if (existingUser.documentNumber === user.documentNumber) {
        throw new Error('User with this document number already exists');
      }
      throw new Error('User with this email already exists');
    }

    return this.prisma.user.create({ data: user });
  }

  async getUser(
    id: string,
    include?: 'order' | 'address',
  ): Promise<User | null> {
    const includeOptions = {
      address: include === 'address' ? true : false,
      order: include === 'order' ? true : false, // need to work better on the order query TBD.
    };
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        address: includeOptions.address,
      },
    });
  }

  async getUsers(skip: number, take: number): Promise<User[]> {
    return this.prisma.user.findMany({
      skip,
      take,
    });
  }

  async deleteUser(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
