import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterEntryModuleRoutingModule } from './master-entry-module-routing.module';
import { MasterEntryLayoutComponent } from './master-entry-layout/master-entry-layout.component';

@NgModule({
  imports: [
    CommonModule,
    MasterEntryModuleRoutingModule
  ],
  declarations: [ MasterEntryLayoutComponent]
})
export class MasterEntryModule { }
