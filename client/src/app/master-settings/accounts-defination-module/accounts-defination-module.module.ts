import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommonModuleModule} from 'src/app/common-module/common-module.module'
import { AccountsDefinationModuleRoutingModule } from './accounts-defination-module-routing.module';
import { AcountLayoutComponent } from './acount-layout/acount-layout.component';
import { ChartOfAccountComponent } from './chart-of-account/chart-of-account.component';
import { AccountOpeningComponent } from './account-opening/account-opening.component';
import { CoaTreeComponent } from './coa-tree/coa-tree.component';
import { SubledgerOpeningComponent } from './subledger-opening/subledger-opening.component';
import { AddSubledgerComponent } from './add-subledger/add-subledger.component';
import { AddChartOfAccountComponent } from './add-chart-of-account/add-chart-of-account.component';

@NgModule({
  imports: [
    CommonModule,
    AccountsDefinationModuleRoutingModule,
    CommonModuleModule,
  ],
  declarations: [AcountLayoutComponent, ChartOfAccountComponent, 
    AccountOpeningComponent, CoaTreeComponent,
  SubledgerOpeningComponent, AddSubledgerComponent, AddChartOfAccountComponent],
  entryComponents:[AddSubledgerComponent,AddChartOfAccountComponent],
  exports:[
    AddSubledgerComponent
  ]
})
export class AccountsDefinationModuleModule { }
