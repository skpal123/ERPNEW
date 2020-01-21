import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GradeValidation } from '../../../models/validation/hr-payroll/grade-validation.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Grade } from '../../../models/master-settings/hr-payroll/grade.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { NavigationDataService } from '../../../services/common/navigation-data.service';
import { ValidationService } from '../../../services/common/validation.service';
import { HrPayrollDefinationServiceService } from '../../../services/master-settings/hr-payroll-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { FormDetailsControlComponent } from '../../../common-module/form-details-control/form-details-control.component';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {
  @ViewChild('gradeForm') gradeForm:NgForm
  gradeValidation:GradeValidation[]=[]
  itemName:string="gradeId"
  IsAutoCode:boolean=false
  constructor(public matDialogRef:MatDialogRef<GradeComponent>,
  @Inject(MAT_DIALOG_DATA) public grade:Grade,
  private _alertBox:AlertBoxService,
  private matDialog:MatDialog,
  private _navigationData:NavigationDataService,
  private _validationService:ValidationService,
  private _hrPayrollDefinationService:HrPayrollDefinationServiceService,
) { }

  ngOnInit() {
    debugger
    if(this.grade.Id!=null){
      this.gradeForm.control.markAsDirty();
    }
    this.getItemFormInfo();
  }
  onNoClick(){
    this.matDialogRef.close(false);
  }
  getItemFormInfo(){
    this._validationService.getGradeValidationData().subscribe((response:GradeValidation[])=>{
      this.gradeValidation=response;
      if(this.gradeValidation[2].GradeId){
        this.IsAutoCode=true;
      }
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  saveGrade(){
    if(this.grade.Id==null){
      this._hrPayrollDefinationService.CreateGrade(this.grade).subscribe(response=>{
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
      this._hrPayrollDefinationService.UpdateGrade(this.grade).subscribe(response=>{
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
  clearGrade(){
    this.grade.Id=null;
    this.grade.GradeId=null;
    this.grade.GradeName=null;
    this.gradeForm.reset();
  }
  controlGroupItemForm(){
    debugger
    const dialogRef=this.matDialog.open(FormDetailsControlComponent,{
      data:"grade-form",
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
    this.grade.GradeId=$event;
  }
}
