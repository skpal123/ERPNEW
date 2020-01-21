import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinanceLayoutComponent } from './finance-layout/finance-layout.component';
import { VoucherListComponent } from './voucher-list/voucher-list.component';
import { VoucherEntryComponent } from './voucher-entry/voucher-entry.component';
import {AccountsDefinationModuleModule} from '../../master-settings/accounts-defination-module/accounts-defination-module.module'
const routes: Routes = [
  {
    path:'',
    component:FinanceLayoutComponent,
    children:[
      {path:'',component:VoucherListComponent},
      {path:'voucher',component:VoucherListComponent},
      {path:'voucher-list',component:VoucherListComponent}
    ]
  },

];

@NgModule({
  imports: [
    AccountsDefinationModuleModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RoFinanceRoutingModule { }
