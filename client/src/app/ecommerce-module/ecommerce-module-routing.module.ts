import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EccommerceLayoutComponent } from './eccommerce-layout/eccommerce-layout.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { EcommerceAdminLayoutComponent } from './ecommerce-admin-layout/ecommerce-admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemCategoryListComponent } from '../master-settings/inventory-defination-module/item-category-list/item-category-list.component';
import { ItemSubcategoryListComponent } from '../master-settings/inventory-defination-module/item-subcategory-list/item-subcategory-list.component';
import { EcommerceCategoryLayoutComponent } from './ecommerce-category-layout/ecommerce-category-layout.component';
import { EcommerceSubcategoryLayoutComponent } from './ecommerce-subcategory-layout/ecommerce-subcategory-layout.component';
import { EcommerceItemLayoutComponent } from './ecommerce-item-layout/ecommerce-item-layout.component';

const routes: Routes = [
  {
    path:'',component:EccommerceLayoutComponent,
    children:[
      { path:'',component:HomeComponent },
      { path:'category/:id',component:EcommerceCategoryLayoutComponent },
      { path:'subcategory/:id',component:EcommerceSubcategoryLayoutComponent},
      { path:'item/:id',component:EcommerceItemLayoutComponent}
    ]
  },
  {
    path:'ecommerce',component:EccommerceLayoutComponent,
    children:[
      { path:'category/id',component:EcommerceCategoryLayoutComponent },
      { path:'subcategory/id',component:EcommerceSubcategoryLayoutComponent},
      { path:'item/id',component:EcommerceItemLayoutComponent}
    ]
  },
  {
    path:'mainlayout',component:EcommerceAdminLayoutComponent,
    children:[
      { path:'',component:DashboardComponent },
      { path:'dashboard',component:HomeComponent },
      { path:'add-category',component:ItemCategoryListComponent },
      { path:'add-subcategory',component:ItemSubcategoryListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceModuleRoutingModule { }
