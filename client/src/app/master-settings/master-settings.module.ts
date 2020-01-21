import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterSettingsRoutingModule } from './master-settings-routing.module';
import { MasterSettingsMenuComponent } from './master-settings-menu/master-settings-menu.component';

@NgModule({
  imports: [
    CommonModule,
    MasterSettingsRoutingModule  
  ],
  declarations: [MasterSettingsMenuComponent]  
})
export class MasterSettingsModule { }
