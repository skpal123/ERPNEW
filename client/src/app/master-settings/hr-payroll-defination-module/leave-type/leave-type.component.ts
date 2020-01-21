import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LeaveTypeValidation } from '../../../models/validation/hr-payroll/leavetype-validation.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { LeaveType } from '../../../models/master-settings/hr-payroll/leave-type.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { NavigationDataService } from '../../../services/common/navigation-data.service';
import { ValidationService } from '../../../services/common/validation.service';
import { HrPayrollDefinationServiceService } from '../../../services/master-settings/hr-payroll-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { FormDetailsControlComponent } from '../../../common-module/form-details-control/form-details-control.component';

@Component({
  selector: 'app-leave-type',
  templateUrl: './leave-type.component.html',
  styleUrls: ['./leave-type.component.css']
})
export class LeaveTypeComponent implements OnInit {
  @ViewChild('leaveTypeForm') leaveTypeForm:NgForm
  leaveTypeValidation:LeaveTypeValidation[]=[]
  itemName:string="leaveTypeId"
  IsAutoCode:boolean=false
  constructor(public matDialogRef:MatDialogRef<LeaveTypeComponent>,
  @Inject(MAT_DIALOG_DATA) public leaveType:LeaveType,
  private _alertBox:AlertBoxService,
  private matDialog:MatDialog,
  private _navigationData:NavigationDataService,
  private _validationService:ValidationService,
  private _hrpayrollDefinationService:HrPayrollDefinationServiceService,
) { }

  ngOnInit() {
    debugger
    if(this.leaveType.Id!=null){
      this.leaveTypeForm.control.markAsDirty();
    }
    this.getItemFormInfo();
  }
  onNoClick(){
    this.matDialogRef.close(false);
  }
  getItemFormInfo(){
    this._validationService.getLeaveTypeValidationData().subscribe((response:LeaveTypeValidation[])=>{
      this.leaveTypeValidation=response;
      if(this.leaveTypeValidation[2].LeaveTypeId){
        this.IsAutoCode=true;
      }
    },error=>{
      let dialogData=new DialogData(); 
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  saveLeaveType(){
    debugger
    if(this.leaveType.Id==null){
      this._hrpayrollDefinationService.CreateLeaveType(this.leaveType).subscribe(response=>{
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
      this._hrpayrollDefinationService.UpdateLeaveType(this.leaveType).subscribe(response=>{
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
  clearLeaveType(){
    this.leaveType.Id=null;
    this.leaveType.LeaveTypeId=null;
    this.leaveType.LeaveTypeName=null;
    this.leaveType.IsPaid=true;
    this.leaveTypeForm.reset();
  }
  controlGroupItemForm(){
    debugger
    const dialogRef=this.matDialog.open(FormDetailsControlComponent,{
      data:"leave-type-form",
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
    this.leaveType.LeaveTypeId=$event;
  }

}
