import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HrPayrollLayoutComponent } from './hr-payroll-layout/hr-payroll-layout.component';
const routes: Routes = [
  {
    path:'',
    component:HrPayrollLayoutComponent,
    children:[
      {path:'employee',component:EmployeeComponent},
      {path:'employee-list',component:EmployeeListComponent},
      {path:'',component:EmployeeComponent},
    ]
  },
  {
    path:'hr-payroll',
    component:HrPayrollLayoutComponent,
    children:[
      {path:'employee',component:EmployeeComponent},
      {path:'employee-list',component:EmployeeListComponent},
      {path:'',component:EmployeeComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrPayrollRoutingModule { }
