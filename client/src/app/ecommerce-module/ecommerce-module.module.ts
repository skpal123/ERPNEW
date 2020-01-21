import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommonModuleModule} from 'src/app/common-module/common-module.module'
import {InventoryDefinationModuleModule} from 'src/app/master-settings/inventory-defination-module/inventory-defination-module.module'
import { EcommerceModuleRoutingModule } from './ecommerce-module-routing.module';
import { EccommerceLayoutComponent } from './eccommerce-layout/eccommerce-layout.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { EcommerceAdminLayoutComponent } from './ecommerce-admin-layout/ecommerce-admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EcommerceCategoryLayoutComponent } from './ecommerce-category-layout/ecommerce-category-layout.component';
import { EcommerceSubcategoryLayoutComponent } from './ecommerce-subcategory-layout/ecommerce-subcategory-layout.component';
import { EcommerceItemLayoutComponent } from './ecommerce-item-layout/ecommerce-item-layout.component';

@NgModule({
  imports: [
    CommonModule,
    EcommerceModuleRoutingModule,
    CommonModuleModule,
    InventoryDefinationModuleModule
  ],
  declarations: [EccommerceLayoutComponent, HomeComponent, ContactComponent, EcommerceAdminLayoutComponent, DashboardComponent, EcommerceCategoryLayoutComponent, EcommerceSubcategoryLayoutComponent, EcommerceItemLayoutComponent]
})
export class EcommerceModuleModule { }
