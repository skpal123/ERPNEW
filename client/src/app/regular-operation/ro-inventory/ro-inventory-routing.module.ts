import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoInventoryLayoutComponent } from './ro-inventory-layout/ro-inventory-layout.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ItemPurchaseListComponent } from './item-purchase-list/item-purchase-list.component';
import { ItemSalesListComponent } from './item-sales-list/item-sales-list.component';
import { SupplierTransactionComponent } from './supplier-transaction/supplier-transaction.component';
import { CustomerTransactionComponent } from './customer-transaction/customer-transaction.component';
import { CustomerTransactionListComponent } from './customer-transaction-list/customer-transaction-list.component';
import { SupplierTransactionListComponent } from './supplier-transaction-list/supplier-transaction-list.component';

const routes: Routes = [
  {
    path:'',
    component:RoInventoryLayoutComponent,
    children:[
      {path:'',component:ItemPurchaseListComponent},
      {path:'add-item',component:ItemPurchaseListComponent},
      {path:'sales-item',component:ItemSalesListComponent},
      {path:'supplier-transaction',component:SupplierTransactionListComponent},
      {path:'customer-transaction',component:CustomerTransactionListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoInventoryRoutingModule { }
