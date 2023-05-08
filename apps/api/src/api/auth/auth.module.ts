import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {PrismaService} from "../../prisma/prisma.service";
import {UserService} from "../user/user.service";

@Module({
  providers: [PrismaService, AuthService, UserService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
