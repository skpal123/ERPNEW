import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HrPayrollLayoutComponent } from './hr-payroll-layout/hr-payroll-layout.component';
import { LeaveTypeComponent } from './leave-type/leave-type.component';
import { DesignationListComponent } from './designation-list/designation-list.component';
import { GradeListComponent } from './grade-list/grade-list.component';
import { SubgradeListComponent } from './subgrade-list/subgrade-list.component';
import { SalaryItemListComponent } from './salary-item-list/salary-item-list.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { EducationLevelListComponent } from './education-level-list/education-level-list.component';
import { LeaveTypeListComponent } from './leave-type-list/leave-type-list.component';
import { OccupationListComponent } from './occupation-list/occupation-list.component';
const routes: Routes = [
  {
    path:'',
    component:HrPayrollLayoutComponent,
    children:[
      {path:'',component:LeaveTypeListComponent} ,
      {path:'designation-entry',component:DesignationListComponent} ,
      {path:'empgrade-entry',component:GradeListComponent} ,
      {path:'subgrade-entry',component:SubgradeListComponent}  ,
      {path:'salaryitem-entry',component:SalaryItemListComponent},
      {path:'department-entry',component:DepartmentListComponent},
      {path:'education-level-entry',component:EducationLevelListComponent},
      {path:'leave-type-entry',component:LeaveTypeListComponent},
      {path:'occupation-entry',component:OccupationListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrPayrollDefinationModuleRoutingModule { }
