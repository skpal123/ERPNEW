import { Component, OnInit, ViewChild, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Designation } from '../../../models/master-settings/hr-payroll/designation.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { NavigationDataService } from '../../../services/common/navigation-data.service';
import { ValidationService } from '../../../services/common/validation.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { FormDetailsControlComponent } from '../../../common-module/form-details-control/form-details-control.component';
import { DesignationValidation } from '../../../models/validation/hr-payroll/designation-validation.model';
import { HrPayrollDefinationServiceService } from '../../../services/master-settings/hr-payroll-defination-service.service';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DesignationComponent implements OnInit {
  @ViewChild('designationForm') designationForm:NgForm
  designationValidation:DesignationValidation[]=[]
  itemName:string="designationId"
  IsAutoCode:boolean=false
  constructor(public matDialogRef:MatDialogRef<DesignationComponent>,
  @Inject(MAT_DIALOG_DATA) public designation:Designation,
  private _alertBox:AlertBoxService,
  private matDialog:MatDialog,
  private changeRef:ChangeDetectorRef,
  private _navigationData:NavigationDataService,
  private _validationService:ValidationService,
  private _hrpayrollDefinationService:HrPayrollDefinationServiceService,
) { }

  ngOnInit() {
    debugger
    if(this.designation.Id!=null){
      this.designationForm.control.markAsDirty();
    }
    this.getItemFormInfo();
  }
  onNoClick(){
    this.matDialogRef.close(false);
  }
  getItemFormInfo(){
    this._validationService.getDesignationValidationData().subscribe((response:DesignationValidation[])=>{
      this.designationValidation=response
      if(this.designationValidation[2].DesignationId){
        this.IsAutoCode=true;
      }
      this.changeRef.markForCheck()
    },error=>{
      let dialogData=new DialogData(); 
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  saveDesignation(){
    debugger
    if(this.designation.Id==null){
      this._hrpayrollDefinationService.CreateDesignation(this.designation).subscribe(response=>{
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
      this._hrpayrollDefinationService.UpdateDesignation(this.designation).subscribe(response=>{
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
  clearDesignation(){
    this.designation.Id=null;
    this.designation.DesignationId=null;
    this.designation.DesignationName=null;
    this.designationForm.reset();
  }
  controlGroupItemForm(){
    debugger
    const dialogRef=this.matDialog.open(FormDetailsControlComponent,{
      data:"designation-form",
      disableClose:true,
      height:'auto',
      maxHeight:window.screen.height*.9+'px',
      width:window.screen.width*.8+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
     if(result){
       //this.getItemPurchaseValidationList()
     }
    })
  }
  parentGetGeneratedCode($event:string){
    debugger
    this.designation.DesignationId=$event;
  }

}
