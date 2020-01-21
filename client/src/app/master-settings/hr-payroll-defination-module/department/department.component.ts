import { Component, OnInit, ViewChild ,Inject, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { NgForm } from '@angular/forms';
import { DepartmentValidation } from '../../../models/validation/hr-payroll/department-validation.model';
import { MatDialogRef,MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Department } from '../../../models/master-settings/hr-payroll/department.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { NavigationDataService } from '../../../services/common/navigation-data.service';
import { ValidationService } from '../../../services/common/validation.service';
import { HrPayrollDefinationServiceService } from '../../../services/master-settings/hr-payroll-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { FormDetailsControlComponent } from '../../../common-module/form-details-control/form-details-control.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DepartmentComponent implements OnInit {
  @ViewChild('departmentForm') departmentForm:NgForm
  departmentValidation:DepartmentValidation[]=[]
  itemName:string="departmentId"
  IsAutoCode:boolean=false
  constructor(public matDialogRef:MatDialogRef<DepartmentComponent>,
  @Inject(MAT_DIALOG_DATA) public department:Department,
  private _alertBox:AlertBoxService,
  private matDialog:MatDialog,
  private changeRef:ChangeDetectorRef,
  private _navigationData:NavigationDataService,
  private _validationService:ValidationService,
  private _hrpayrollDefinationService:HrPayrollDefinationServiceService,
  ) { }
  
  ngOnInit() {
    debugger
    console.log("test")
    if(this.department.Id!=null){
      this.departmentForm.control.markAsDirty();
    }
    this.getItemFormInfo();
  }
  onNoClick(){
    this.matDialogRef.close(false);
  }
  getItemFormInfo(){
    this._validationService.getDepartmentValidationData().subscribe((response:DepartmentValidation[])=>{
      this.departmentValidation=response;
      if(this.departmentValidation[2].DepartmentId){
        this.IsAutoCode=true;
      }
      this.changeRef.markForCheck();
    },error=>{
      let dialogData=new DialogData(); 
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  saveDepartment(){
    debugger
    if(this.department.Id==null){
      this._hrpayrollDefinationService.CreateDepartment(this.department).subscribe(response=>{
        let result=response
        if(result){
          this._navigationData.IsSaved=true;
          this.matDialogRef.close(response);
          let dialogData=new DialogData();
          dialogData.message="Save successfully";
          this._alertBox.openDialog(dialogData);
        }
      },error=>{
        let dialogData=new DialogData();
        dialogData.message=error
        this._alertBox.openDialog(dialogData);
      })
    }
    else{
      this._hrpayrollDefinationService.UpdateDepartment(this.department).subscribe(response=>{
        let result=response
        if(result){
          this.matDialogRef.close(true);
          let dialogData=new DialogData();
          dialogData.message="Update successfully";
          this._alertBox.openDialog(dialogData);
        }
      },error=>{
        let dialogData=new DialogData();
        dialogData.message=error
        this._alertBox.openDialog(dialogData);
      })
    }
  }
  clearDepartment(){
    this.department.Id=null;
    this.department.DepartmentId=null;
    this.department.DepartmentName=null;
    this.departmentForm.reset();
  }
  controlGroupItemForm(){
    debugger
    const dialogRef=this.matDialog.open(FormDetailsControlComponent,{
      data:"department-form",
      disableClose:true,
      height:'auto',
      maxHeight:window.screen.height*.9+'px',
      width:window.screen.width*.6+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
     if(result){
       //this.getItemPurchaseValidationList()
     }
    })
  }
  parentGetGeneratedCode($event:string){
    debugger
    this.department.DepartmentId=$event;
  }
}
