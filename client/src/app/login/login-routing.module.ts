import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PostloginComponent } from './postlogin/postlogin.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'postlogin',component:PostloginComponent},
  {
    path:'mainlayout',
    component:MainLayoutComponent,
    children:[
      {
        path: '',
        loadChildren: 'src/app/regular-operation/regular-operation.module#RegularOperationModule'
      },
      {
        path: 'admin/:id',
        loadChildren: 'src/app/admin/admin.module#AdminModule'
      },
      {
        path: 'regular-operation/:id',
        loadChildren: 'src/app/regular-operation/regular-operation.module#RegularOperationModule'
      },
      {  
        path: 'master-settings/:id',
        loadChildren: 'src/app/master-settings/master-settings.module#MasterSettingsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }  
