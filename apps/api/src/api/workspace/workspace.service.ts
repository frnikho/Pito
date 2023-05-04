import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Workspace, User } from '@pito/db';
import {CreateWorkspace, exclude} from "@pito/types";

@Injectable()
export class WorkspaceService {
  constructor(private prisma: PrismaService) {}

  public excludeFields(workspace: Workspace) {
    return exclude(workspace, ['history']);
  }

  public async create(user: User, body: CreateWorkspace) {
    this.prisma.workspace.create({
      data: {
        name: '',
        description: '',
        key: 'ABC',
        userId: '',
      },
      include: {
        _count: {
          select: {
            teams: true,
          },
        },
        createdBy: true,
      },
    });
  }

  public async find(user: User, id: string) {
    return this.prisma.workspace.findFirst({
      where: {
        id: id,
      },
      include: {
        teams: true,
        createdBy: true,
        labels: true,
        userStoryStatus: true,
      }
    })
  }

  public async list(user: User, userId: string) {
    return this.prisma.workspace.findMany({
      where: {
        OR: [
          {
            userId: userId,
          },
          {
            teams: {
              some: {
                members: {
                  some: {
                    id: userId,
                  },
                },
              },
            },
          },
        ],
      },
    });
  }
}
