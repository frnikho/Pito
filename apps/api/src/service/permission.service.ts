import {Injectable} from "@nestjs/common";
import {AllPermissions} from "@pito/types";

@Injectable()
export class PermissionService {

  public checkPermission(user: any, permission: AllPermissions): boolean {
    const [parent, p1, p2] = permission.split('.');
    if (p2)
      return Boolean(user.role[parent][p1][p2]);
    if (p1)
      return Boolean(user.role[parent][p1]);
    return user.role[parent] === true;
  }

}