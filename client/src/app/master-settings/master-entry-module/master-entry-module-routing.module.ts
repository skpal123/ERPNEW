import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterEntryLayoutComponent } from './master-entry-layout/master-entry-layout.component';

const routes: Routes = [
  {
    path:'',
    component:MasterEntryLayoutComponent,
    children:[
      // {path:'',component:DepartmentComponent},
      // {path:'department',component:DepartmentComponent},
      // {path:'desigantion',component:DesignationComponent},
      // {path:'education-level',component:EducationLevelComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterEntryModuleRoutingModule { }
