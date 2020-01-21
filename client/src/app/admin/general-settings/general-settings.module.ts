import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommonModuleModule} from 'src/app/common-module/common-module.module'
import { GeneralSettingsRoutingModule } from './general-settings-routing.module';
import { GeneralSettingsLayoutComponent } from './general-settings-layout/general-settings-layout.component';
import { AutocodeGenerationFormatComponent } from './autocode-generation-format/autocode-generation-format.component';
import { CodeFormaterEntryComponent } from '../../common-module/code-formater-entry/code-formater-entry.component';
@NgModule({
  imports: [
    CommonModule,
    CommonModuleModule,
    GeneralSettingsRoutingModule
  ],
  declarations: [
    GeneralSettingsLayoutComponent,
     AutocodeGenerationFormatComponent, 
    ],
    entryComponents:[
      CodeFormaterEntryComponent
    ],
    exports:[
    ]
})
export class GeneralSettingsModule { }
