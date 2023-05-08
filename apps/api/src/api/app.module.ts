import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../guards/auth.guard';
import { RoleModule } from './role/role.module';
import { PermissionGuard } from '../guards/permission.guard';
import { PermissionService } from '../service/permission.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({ secret: process.env.JWT_SECRET, global: true }),
    PrismaModule,
    WorkspaceModule,
    UserModule,
    AuthModule,
    RoleModule,
  ],
  controllers: [],
  providers: [
    PermissionService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule {}
