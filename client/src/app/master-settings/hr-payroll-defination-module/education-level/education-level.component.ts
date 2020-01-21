import { Component, OnInit, ViewChild,Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { EducationLevelValidation } from '../../../models/validation/hr-payroll/educationlevel.validation.model';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { EducationLevel } from '../../../models/master-settings/hr-payroll/education-level.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { NavigationDataService } from '../../../services/common/navigation-data.service';
import { ValidationService } from '../../../services/common/validation.service';
import { HrPayrollDefinationServiceService } from '../../../services/master-settings/hr-payroll-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { FormDetailsControlComponent } from '../../../common-module/form-details-control/form-details-control.component';

@Component({
  selector: 'app-education-level',
  templateUrl: './education-level.component.html',
  styleUrls: ['./education-level.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class EducationLevelComponent implements OnInit {
  @ViewChild('educationLevelForm') educationLevelForm:NgForm
  educationLevelValidation:EducationLevelValidation[]=[]
  itemName:string="educationLevelId"
  IsAutoCode:boolean=false
  constructor(public matDialogRef:MatDialogRef<EducationLevelComponent>,
  @Inject(MAT_DIALOG_DATA) public educationLevel:EducationLevel,
  private _alertBox:AlertBoxService,
  private matDialog:MatDialog,
  private changeRef:ChangeDetectorRef,
  private _navigationData:NavigationDataService,
  private _validationService:ValidationService,
  private _hrpayrollDefinationService:HrPayrollDefinationServiceService,
) { }

  ngOnInit() {
    debugger
    if(this.educationLevel.Id!=null){
      this.educationLevelForm.control.markAsDirty();
    }
    this.getItemFormInfo();
  }
  onNoClick(){
    this.matDialogRef.close(false);
  }
  getItemFormInfo(){
    this._validationService.getEducationLevelValidationData().subscribe((response:EducationLevelValidation[])=>{
      this.educationLevelValidation=response;
      if(this.educationLevelValidation[2].LevelId){
        this.IsAutoCode=true;
      }
      this.changeRef.markForCheck();
    },error=>{
      let dialogData=new DialogData(); 
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  saveEducationLevel(){
    debugger
    if(this.educationLevel.Id==null){
      this._hrpayrollDefinationService.CreateEducationLevel(this.educationLevel).subscribe(response=>{
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
      this._hrpayrollDefinationService.UpdateEducationLevel(this.educationLevel).subscribe(response=>{
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
  clearEducationLevel(){
    this.educationLevel.Id=null;
    this.educationLevel.LevelId=null;
    this.educationLevel.LevelName=null;
    this.educationLevelForm.reset();
  }
  controlGroupItemForm(){
    debugger
    const dialogRef=this.matDialog.open(FormDetailsControlComponent,{
      data:"education-level-form",
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
    this.educationLevel.LevelId=$event;
  }
}
