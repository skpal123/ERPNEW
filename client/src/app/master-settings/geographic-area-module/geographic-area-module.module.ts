import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeographicAreaModuleRoutingModule } from './geographic-area-module-routing.module';
import { GeographicMenuComponent } from './geographic-menu/geographic-menu.component';
import { LocationComponent } from './location/location.component';

@NgModule({
  imports: [
    CommonModule,
    GeographicAreaModuleRoutingModule
  ],
  declarations: [GeographicMenuComponent, LocationComponent]
})
export class GeographicAreaModuleModule { }
