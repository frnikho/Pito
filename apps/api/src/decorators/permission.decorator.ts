import {SetMetadata} from "@nestjs/common";
import {AllPermissions} from "@pito/types";

export const PermissionDecorator = (...requiredPermission: AllPermissions[]) => SetMetadata('REQUIRED_PERMISSIONS', requiredPermission);