import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { DataTablesModule } from 'angular-datatables';
import { HrPayrollRoutingModule } from './hr-payroll-routing.module';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HrPayrollLayoutComponent } from './hr-payroll-layout/hr-payroll-layout.component';
//import {SharedModule} from '../../shared/shared/shared.module'
import {CommonModuleModule} from 'src/app/common-module/common-module.module'
import { MatNativeDateModule, MatDialogModule,MatTableModule,MatSortModule,MatPaginatorModule
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    HrPayrollRoutingModule,   
    //SharedModule,
    CommonModuleModule
  ],
  declarations: [EmployeeComponent, EmployeeListComponent, HrPayrollLayoutComponent]
})
export class HrPayrollModule { }
