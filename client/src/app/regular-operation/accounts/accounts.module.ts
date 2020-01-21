import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsLayoutComponent } from './accounts-layout/accounts-layout.component';
import { AccountEntryComponent } from './account-entry/account-entry.component';

@NgModule({
  imports: [
    CommonModule,
    AccountsRoutingModule
  ],
  declarations: [AccountsLayoutComponent, AccountEntryComponent]
})
export class AccountsModule { }
