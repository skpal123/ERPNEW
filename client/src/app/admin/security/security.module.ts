import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityRoutingModule } from './security-routing.module';
import {CommonModuleModule} from 'src/app/common-module/common-module.module'
import { UsersComponent } from './users/users.component';
import { RolePermissionComponent } from './role-permission/role-permission.component';
import { SecurityLayoutComponent } from './security-layout/security-layout.component';
import { RoleListComponent } from './role-list/role-list.component';
import { AddRolePermissionComponent } from './add-role-permission/add-role-permission.component';
@NgModule({
  imports: [
    CommonModule,
    SecurityRoutingModule,
    CommonModuleModule
  ],
  declarations: [UsersComponent, RolePermissionComponent, 
    SecurityLayoutComponent, 
    RoleListComponent, 
    AddRolePermissionComponent],
  entryComponents:[AddRolePermissionComponent]
})
export class SecurityModule { }
