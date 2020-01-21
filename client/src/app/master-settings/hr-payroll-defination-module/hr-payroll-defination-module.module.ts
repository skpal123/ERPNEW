import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrPayrollDefinationModuleRoutingModule } from './hr-payroll-defination-module-routing.module';
import { HrPayrollLayoutComponent } from './hr-payroll-layout/hr-payroll-layout.component';
import { LeaveTypeComponent } from './leave-type/leave-type.component';
import { DesignationComponent } from './designation/designation.component';
import { SalaryItemComponent } from './salary-item/salary-item.component';
import { GradeComponent } from './grade/grade.component';
import { GradeListComponent } from './grade-list/grade-list.component';
import { SalaryItemListComponent } from './salary-item-list/salary-item-list.component';
import { DesignationListComponent } from './designation-list/designation-list.component';
import { SubgradeComponent } from './subgrade/subgrade.component';
import { SubgradeListComponent } from './subgrade-list/subgrade-list.component';
import { CommonModuleModule } from '../../common-module/common-module.module';
import { CustomDatatableControlComponent } from '../../common-module/custom-datatable-control/custom-datatable-control.component';
import { FormDetailsControlComponent } from '../../common-module/form-details-control/form-details-control.component';
import { LeaveTypeListComponent } from './leave-type-list/leave-type-list.component';
import { DepartmentComponent } from './department/department.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { EducationLevelComponent } from './education-level/education-level.component';
import { EducationLevelListComponent } from './education-level-list/education-level-list.component';
import { OccupationComponent } from './occupation/occupation.component';
import { OccupationListComponent } from './occupation-list/occupation-list.component';
import { BuildFormulaComponent } from './build-formula/build-formula.component';
import { GradeSalaryItemComponent } from './grade-salary-item/grade-salary-item.component';

@NgModule({
  imports: [
    CommonModule,
    CommonModuleModule,
    HrPayrollDefinationModuleRoutingModule
  ],
  declarations: [HrPayrollLayoutComponent, 
    LeaveTypeComponent, DesignationComponent, 
    SalaryItemComponent, 
    GradeComponent, 
    GradeListComponent, 
    SalaryItemListComponent, 
    DesignationListComponent, 
    SubgradeComponent, 
    SubgradeListComponent, LeaveTypeListComponent, DepartmentComponent, DepartmentListComponent, EducationLevelComponent, EducationLevelListComponent, OccupationComponent, OccupationListComponent, BuildFormulaComponent, GradeSalaryItemComponent
  ],
  entryComponents:[
    CustomDatatableControlComponent,
    FormDetailsControlComponent,
    DesignationComponent, 
    GradeComponent,
    SubgradeComponent,
    SalaryItemComponent,
    DepartmentComponent,
    LeaveTypeComponent,
    EducationLevelComponent,
    OccupationComponent,
    GradeSalaryItemComponent,
    BuildFormulaComponent
  ]
})
export class HrPayrollDefinationModuleModule { }
