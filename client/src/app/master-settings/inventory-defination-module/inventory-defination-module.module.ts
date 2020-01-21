import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommonModuleModule} from 'src/app/common-module/common-module.module'
import { InventoryDefinationModuleRoutingModule } from './inventory-defination-module-routing.module';
import { InventoryLayoutComponent } from './inventory-layout/inventory-layout.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddSubcategoryComponent } from './add-subcategory/add-subcategory.component';
import { AddUnitComponent } from './add-unit/add-unit.component';
import { UnitListComponent } from './unit-list/unit-list.component';
import { ItemCategoryListComponent } from './item-category-list/item-category-list.component';
import { ItemSubcategoryListComponent } from './item-subcategory-list/item-subcategory-list.component';
import { ItemListComponent } from './item-list/item-list.component';
import { InventoryLocationListComponent } from './inventory-location-list/inventory-location-list.component';
import { ItemEntryComponent } from './item-entry/item-entry.component';
import { LocationEntryComponent } from './location-entry/location-entry.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SupplierEntryComponent } from './supplier-entry/supplier-entry.component';
import { PartyListComponent } from './party-list/party-list.component';
import { PartyEntryComponent } from './party-entry/party-entry.component';
import { ManufactureListComponent } from './manufacture-list/manufacture-list.component';
import { ManufactureEntryComponent } from './manufacture-entry/manufacture-entry.component';
import { FormDetailsControlComponent } from '../../common-module/form-details-control/form-details-control.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerEntryComponent } from './customer-entry/customer-entry.component';
import { SettingPriceComponent } from './setting-price/setting-price.component';
import { OfferComponent } from './offer/offer.component';
import { OfferEntryComponent } from './offer-entry/offer-entry.component';
import { CustomDatatableControlComponent } from '../../common-module/custom-datatable-control/custom-datatable-control.component';
import { OfferSetupComponent } from './offer-setup/offer-setup.component';
import { OfferListComponent } from './offer-list/offer-list.component';

@NgModule({
  imports: [
    CommonModule,
    CommonModuleModule,
    InventoryDefinationModuleRoutingModule
  ],
  declarations: [
    InventoryLayoutComponent, 
    CategoryComponent, 
    AddCategoryComponent, 
    AddSubcategoryComponent, 
    AddUnitComponent, 
    UnitListComponent, 
    ItemCategoryListComponent, 
    ItemSubcategoryListComponent, 
    ItemListComponent, 
    InventoryLocationListComponent, 
    ItemEntryComponent, 
    LocationEntryComponent, 
    SupplierListComponent, 
    SupplierEntryComponent,
    PartyListComponent, 
    PartyEntryComponent, 
    ManufactureListComponent, 
    ManufactureEntryComponent, CustomerListComponent, CustomerEntryComponent, SettingPriceComponent, OfferComponent, OfferEntryComponent, OfferSetupComponent, OfferListComponent
  ],
    entryComponents:[
      AddUnitComponent,AddSubcategoryComponent,
      ItemEntryComponent,AddCategoryComponent,
      LocationEntryComponent,PartyEntryComponent,
      SupplierEntryComponent,
      ManufactureEntryComponent,
      FormDetailsControlComponent,
      CustomerEntryComponent,
      CustomDatatableControlComponent,
      OfferEntryComponent
    ],
    exports:[
      SupplierEntryComponent,
      CustomerEntryComponent,
      PartyEntryComponent
    ]
})
export class InventoryDefinationModuleModule { }
