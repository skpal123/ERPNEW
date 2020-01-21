import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegularOperationRoutingModule } from './regular-operation-routing.module';
import { RegularOperationMenuComponent } from './regular-operation-menu/regular-operation-menu.component';
@NgModule({
  imports: [
    CommonModule,
    RegularOperationRoutingModule
  ],
  declarations: [RegularOperationMenuComponent]
})
export class RegularOperationModule { }
