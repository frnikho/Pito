import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@pito/db';
import { CreateRole } from '@pito/types';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  public create(user: User, body: CreateRole) {
    console.log('abc');
  }

  public list(user: User) {
    return this.prisma.role.findMany({
      include: {
        createdBy: true,
      },
    });
  }

  public find(user: User, id: string) {}
}
