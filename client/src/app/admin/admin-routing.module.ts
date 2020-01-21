import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
const routes: Routes = [
  {
    path:'',
    component:AdminMenuComponent,
    children:[
        {
          path:'',
          loadChildren:'src/app/admin/security/security.module#SecurityModule'
        },
        {
          path:'security/:id',
          loadChildren:'src/app/admin/security/security.module#SecurityModule'
        },
        {
          path:'support/:id',
          loadChildren:'src/app/admin/support-module/support-module.module#SupportModuleModule'
        },
        {
          path:'general-settings/:id',
          loadChildren:'src/app/admin/general-settings/general-settings.module#GeneralSettingsModule'
        }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
