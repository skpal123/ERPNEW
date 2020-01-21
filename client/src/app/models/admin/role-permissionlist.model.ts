import { Role } from "./role.model";
import { RolePermission } from "./role-permission.model";

export class RolePermissionDataInfo{
    roleInfo:Role;
    RolePermissionList:RolePermission[];
}