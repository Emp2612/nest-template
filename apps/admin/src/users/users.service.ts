import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByUsername(username: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async findByUserId(userId: number): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
    });
  }
}
