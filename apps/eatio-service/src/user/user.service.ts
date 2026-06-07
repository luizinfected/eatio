import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { User, Role } from '../../prisma/generated/client';

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

    const userPayload = {
      ...user,
      type: Role.USER,
    };

    return this.prisma.user.create({ data: userPayload });
  }

  async getUser(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
