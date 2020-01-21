import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule,FormControl} from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import { ScrollDispatcher } from '@angular/cdk/scrolling'; 
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import {NgModule} from '@angular/core';
import { Ng2CompleterModule } from "ng2-completer";
import { AlertComponent } from '../alert/alert.component';
import { TestComponent } from 'src/app/test/test.component';
import {SelectListRequiredValidator} from '../directive/select-list-required-validator.directive'
import {DuplicateCheckDirective} from '../directive/duplicate-check.directive'
import {CategoryExistingCheckAsyncValidator} from '../directive/categoryid-duplicaion-check.directive'
import {SubcategoryExistingCheckAsyncValidator} from '../directive/subcategory-duplication-check.directive'
import {ItemExistingCheckAsyncValidator} from '../directive/itemId-duplication-check.directive'
import {SupplierExistingCheckAsyncValidator} from '../directive/supplierid-duplication.directive'
import {CustomerExistingCheckAsyncValidator} from '../directive/customerid-duplication-check.directive'
import { DepartmentExistingCheckAsyncValidator } from '../directive/department-duplicate-cheeck.directive';
import { DesignationExistingCheckAsyncValidator } from '../directive/designation-duplicate-check.directive';
import { EducationLevelExistingCheckAsyncValidator } from '../directive/educationlevel-duplicate-check.directive';
import { OccupationExistingCheckAsyncValidator } from '../directive/occupation-duplicate-check.directive';
import { EmployeeGradeExistingCheckAsyncValidator } from '../directive/grade-duplicate-check.directive';
import { EmployeeSubGradeExistingCheckAsyncValidator } from '../directive/subgrade-duplicate-check.directive';
import { SalaryItemExistingCheckAsyncValidator } from '../directive/salaryitem-duplicate-check.directive';
import { SubledgerExistingCheckAsyncValidator } from '../directive/subledger-duplicate-check.directive';
import { ManualAccountCodeExistingCheckAsyncValidator } from '../directive/manualcode-duplicate-check.directive';
import { InvoicenoExistingCheckAsyncValidator } from '../directive/invoice-duplicate-check.directive';
import { ChalannoExistingCheckAsyncValidator } from '../directive/chalanno-duplicate-check.directive';
import { EmailExistingCheckAsyncValidator } from '../directive/emai-existing-async-validator.directive';
import { EmailConfirmEmailRequiredValidator } from '../directive/email-confirm-email-validator.directive';
@NgModule({
  imports: [
    CommonModule,
   // AngularMultiSelectModule
    //Ng2CompleterModule
  ],
  declarations: [AlertComponent,TestComponent,SelectListRequiredValidator,
    DuplicateCheckDirective,
    CategoryExistingCheckAsyncValidator,SubcategoryExistingCheckAsyncValidator,
    ItemExistingCheckAsyncValidator,SupplierExistingCheckAsyncValidator,
    CustomerExistingCheckAsyncValidator,
    DepartmentExistingCheckAsyncValidator,EmailExistingCheckAsyncValidator,EmailConfirmEmailRequiredValidator,
    DesignationExistingCheckAsyncValidator,EducationLevelExistingCheckAsyncValidator,
    OccupationExistingCheckAsyncValidator,EmployeeGradeExistingCheckAsyncValidator,
    EmployeeSubGradeExistingCheckAsyncValidator,SalaryItemExistingCheckAsyncValidator,
    SubledgerExistingCheckAsyncValidator,ManualAccountCodeExistingCheckAsyncValidator,
    InvoicenoExistingCheckAsyncValidator,ChalannoExistingCheckAsyncValidator
  ],
  exports:[ FormsModule,ReactiveFormsModule, 
    A11yModule,CdkStepperModule,CdkTableModule,CdkTreeModule,DragDropModule,MatAutocompleteModule,
    MatBadgeModule,MatBottomSheetModule,MatButtonModule,MatButtonToggleModule,MatCardModule,MatCheckboxModule,
    MatChipsModule,MatStepperModule,MatDatepickerModule, MatDialogModule,MatDividerModule,
    MatExpansionModule,MatGridListModule,MatIconModule,MatInputModule,MatListModule,MatMenuModule,
    MatNativeDateModule,MatPaginatorModule,MatProgressBarModule,MatProgressSpinnerModule,
    MatRadioModule,MatRippleModule,MatSelectModule,MatSidenavModule,
    MatSliderModule, MatSlideToggleModule, MatSnackBarModule,MatSortModule,
    MatTableModule,MatTabsModule,MatToolbarModule,MatTooltipModule,MatTreeModule,PortalModule,
    ScrollingModule,EmailConfirmEmailRequiredValidator,
    Ng2CompleterModule,TestComponent,EmailExistingCheckAsyncValidator,
    AngularMultiSelectModule,
    SelectListRequiredValidator,DuplicateCheckDirective, 
    CategoryExistingCheckAsyncValidator,SubcategoryExistingCheckAsyncValidator,
    SupplierExistingCheckAsyncValidator,ItemExistingCheckAsyncValidator,
    CustomerExistingCheckAsyncValidator,DepartmentExistingCheckAsyncValidator,
    DesignationExistingCheckAsyncValidator,EducationLevelExistingCheckAsyncValidator,
    OccupationExistingCheckAsyncValidator,EmployeeGradeExistingCheckAsyncValidator,
    EmployeeSubGradeExistingCheckAsyncValidator,SalaryItemExistingCheckAsyncValidator,
    SubledgerExistingCheckAsyncValidator,ManualAccountCodeExistingCheckAsyncValidator,
    InvoicenoExistingCheckAsyncValidator,ChalannoExistingCheckAsyncValidator
  ],
 entryComponents:[AlertComponent]
  
})
export class SharedModule { }
