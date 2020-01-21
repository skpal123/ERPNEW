import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryLayoutComponent } from './inventory-layout/inventory-layout.component';
import { CategoryComponent } from './category/category.component';
import { AddSubcategoryComponent } from './add-subcategory/add-subcategory.component';
import { AddUnitComponent } from './add-unit/add-unit.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { UnitListComponent } from './unit-list/unit-list.component';
import { InventoryLocationListComponent } from './inventory-location-list/inventory-location-list.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemCategoryListComponent } from './item-category-list/item-category-list.component';
import { ItemSubcategoryListComponent } from './item-subcategory-list/item-subcategory-list.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { PartyListComponent } from './party-list/party-list.component';
import { ManufactureListComponent } from './manufacture-list/manufacture-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { SettingPriceComponent } from './setting-price/setting-price.component';
import { OfferSetupComponent } from './offer-setup/offer-setup.component';
import { OfferListComponent } from './offer-list/offer-list.component';

const routes: Routes = [
  {
    path:'',
    component:InventoryLayoutComponent,
    children:[
      {path:'',component:ItemCategoryListComponent},
      {path:'add-category',component:ItemCategoryListComponent},
      {path:'add-subCategory',component:ItemSubcategoryListComponent},
      {path:'add-unit',component:UnitListComponent},
      {path:'location-entry',component:InventoryLocationListComponent},
      {path:'item-entry',component:ItemListComponent},
      {path:'add-supplier',component:SupplierListComponent},
      {path:'add-party',component:PartyListComponent},
      {path:'add-manufacture',component:ManufactureListComponent},
      {path:'add-customer',component:CustomerListComponent},
      {path:'setting-price',component:SettingPriceComponent},
      {path:'offer-setup',component:OfferSetupComponent},
      {path:'offer-entry',component:OfferListComponent}
    ]

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryDefinationModuleRoutingModule { }
