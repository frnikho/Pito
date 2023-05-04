import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../api/auth/auth.service';
import {Reflector} from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<string[]>('PUBLIC', context.getHandler());
    const request = context.switchToHttp().getRequest();
    if (isPublic)
      return true;
    request.user = await this.authService.validate({token: request.headers.authorization?.replace('Bearer ', '') ?? ''});
    return true;
  }
}
