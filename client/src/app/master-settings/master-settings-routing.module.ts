import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterSettingsMenuComponent } from './master-settings-menu/master-settings-menu.component';

const routes: Routes = [
  {
    path:'',
    component:MasterSettingsMenuComponent,
    children:[
      {
        path:'',
        loadChildren:'src/app/master-settings/accounts-defination-module/accounts-defination-module.module#AccountsDefinationModuleModule'
      },
      {
        path:'accounts-defination/:id',
        loadChildren:'src/app/master-settings/accounts-defination-module/accounts-defination-module.module#AccountsDefinationModuleModule'
      },
      {
        path:'fixed-asset-defination/:id',
        loadChildren:'src/app/master-settings/fixed-asset-defination-module/fixed-asset-defination-module.module#FixedAssetDefinationModuleModule'
      },
      {
        path:'hr-payroll-defination/:id',
        loadChildren:'src/app/master-settings/hr-payroll-defination-module/hr-payroll-defination-module.module#HrPayrollDefinationModuleModule'
      },
      {
        path:'inventory-defination/:id',
        loadChildren:'src/app/master-settings/inventory-defination-module/inventory-defination-module.module#InventoryDefinationModuleModule'
      },
      {
        path:'geographical-area-defination/:id',
        loadChildren:'src/app/master-settings/geographic-area-module/geographic-area-module.module#GeographicAreaModuleModule'
      },
      {
        path:'master-entry/:id',
        loadChildren:'src/app/master-settings/master-entry-module/master-entry-module.module#MasterEntryModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterSettingsRoutingModule { }
