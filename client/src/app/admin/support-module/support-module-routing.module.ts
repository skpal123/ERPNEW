import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportLayoutComponent } from './support-layout/support-layout.component';
import { QueryExecuterComponent } from './query-executer/query-executer.component';
import { VoucherCorrectionComponent } from './voucher-correction/voucher-correction.component';
import { TransactionCorrectionComponent } from './transaction-correction/transaction-correction.component';

const routes: Routes = [
  {
    path:'',
    component:SupportLayoutComponent,
    children:[
      {path:'query-builder',component:QueryExecuterComponent},
      {path:'voucher-correction',component:VoucherCorrectionComponent},
      {path:'transaction-correction',component:TransactionCorrectionComponent},
      {path:'',component:QueryExecuterComponent}
    ]
  },
  {
    path:'support',
    component:SupportLayoutComponent,
    children:[
      {path:'query-builder',component:QueryExecuterComponent},
      {path:'voucher-correction',component:VoucherCorrectionComponent},
      {path:'transaction-correction',component:TransactionCorrectionComponent},
      {path:'',component:QueryExecuterComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportModuleRoutingModule { }
