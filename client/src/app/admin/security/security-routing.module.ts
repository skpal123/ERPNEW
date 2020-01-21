import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { RolePermissionComponent } from './role-permission/role-permission.component';
import { SecurityLayoutComponent } from './security-layout/security-layout.component';

const routes: Routes = [
  {
    path:'',
    component:SecurityLayoutComponent,
    children:[
      {path:'',component:UsersComponent},
      {path:'role-permission',component:RolePermissionComponent},  
      {path:'users',component:UsersComponent},
     // {path:'actioneditlock',component:action},
    ]
  },
  {
    path:'security',
    component:SecurityLayoutComponent,
    children:[
      {path:'',component:UsersComponent},
      {path:'role-permission',component:RolePermissionComponent},  
      {path:'users',component:UsersComponent},
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
