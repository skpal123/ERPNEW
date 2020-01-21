import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportModuleRoutingModule } from './support-module-routing.module';
import { SupportLayoutComponent } from './support-layout/support-layout.component';
import { QueryExecuterComponent } from './query-executer/query-executer.component';
import { TransactionCorrectionComponent } from './transaction-correction/transaction-correction.component';
import { VoucherCorrectionComponent } from './voucher-correction/voucher-correction.component';

@NgModule({
  imports: [
    CommonModule,
    SupportModuleRoutingModule
  ],
  declarations: [SupportLayoutComponent, QueryExecuterComponent, TransactionCorrectionComponent, VoucherCorrectionComponent]
})
export class SupportModuleModule { }
