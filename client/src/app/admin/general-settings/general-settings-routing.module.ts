import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralSettingsLayoutComponent } from './general-settings-layout/general-settings-layout.component';
import { AutocodeGenerationFormatComponent } from './autocode-generation-format/autocode-generation-format.component';

const routes: Routes = [
  {
    path:'',
    component:GeneralSettingsLayoutComponent,
    children:[
      {path:'',component:AutocodeGenerationFormatComponent},
      {path:'code-format',component:AutocodeGenerationFormatComponent},
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralSettingsRoutingModule { }
