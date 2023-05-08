import { Injectable } from '@nestjs/common';
import {ApiException, exclude, RegisterUser, UpdateUser, UpdateUserPassword} from "@pito/types";
import {PrismaService} from "../../prisma/prisma.service";

import { User, Prisma } from '@pito/db';
import {UserNotFoundException} from "@pito/types";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {
  }

  public excludeFields(user: User | null) {
    if (!user)
      throw new UserNotFoundException();
    return exclude<User & Prisma.UserInclude, keyof (User & Prisma.UserInclude)>(user, ['password', 'authMethod', 'roleId', 'role']);
  }

  public async create(user: RegisterUser) {
    const defaultRole = await this.prisma.role.findFirst({where: {default: true}});
    if (!defaultRole)
      throw new ApiException({message: 'NO DEFAULT ROLE !', code: 'PIT_500050', statusCode: 500});
    return this.prisma.user.create({
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        authMethod: 'NATIVE',
        password: user.password,
        role: {
          connect: {
            id: defaultRole.id,
          }
        }
      }
    });
  }

  public async findById(userId: string) {
    return this.excludeFields(await this.prisma.user.findFirst({
        where: {
          id: userId
        }
      })
    );
  }

  public async findByEmail(email: string) {
    return this.excludeFields(await this.prisma.user.findFirst({
        where: {
          email: email,
        }
      })
    );
  }

  public async updateUser(userId: string, body: UpdateUser) {
    return this.excludeFields(await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          firstname: body.firstname,
          lastname: body.lastname,
          city: body.city,
          phone: body.phone,
          crn: body.crn,
          address: body.address,
          ahr: body.ahr,
        }
      })
    )
  }

  public async updateUserPassword(userId: string, body: UpdateUserPassword) {
    const salt = await bcrypt.genSalt();
    return this.excludeFields(await this.prisma.user.update({
        where: {
          id: userId
        },
        data: {
          password: bcrypt.hashSync(body.password, salt)
        },
      })
    )
  }

}
