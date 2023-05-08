import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import {Reflector} from "@nestjs/core";
import {PermissionService} from "../service/permission.service";
import {AllPermissions, PermissionException} from "@pito/types";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private service: PermissionService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const requiredPermissions = this.reflector.get<AllPermissions[]>('REQUIRED_PERMISSIONS', context.getHandler());
    const req =  context.switchToHttp().getRequest();
    if (requiredPermissions === undefined || requiredPermissions.length <= 0)
      return true;
    requiredPermissions.forEach((perm) => {
      const response = this.service.checkPermission(req.user, perm);
      if (!response)
        throw new PermissionException({permissions: [perm]});
    });
    return true;
  }
}
