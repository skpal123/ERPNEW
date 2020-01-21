import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormDetailsControlComponent } from '../../../common-module/form-details-control/form-details-control.component';
import { SubgradeValidation } from '../../../models/validation/hr-payroll/subgrade-validation.model';
import { NgForm } from '@angular/forms';
import { MultiSelectDropdown } from '../../../models/common/multiselect.dropdown.model';
import { Grade } from '../../../models/master-settings/hr-payroll/grade.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { SubGrade } from '../../../models/master-settings/hr-payroll/sub-grade.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { ValidationService } from '../../../services/common/validation.service';
import { NavigationDataService } from '../../../services/common/navigation-data.service';
import { HrPayrollDefinationServiceService } from '../../../services/master-settings/hr-payroll-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { GradeComponent } from '../grade/grade.component';

@Component({
  selector: 'app-subgrade',
  templateUrl: './subgrade.component.html',
  styleUrls: ['./subgrade.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SubgradeComponent implements OnInit {
  @ViewChild('subgradeForm') subgradeForm:NgForm
  startDate:Date=new Date()
  gradeSelectedItems :MultiSelectDropdown[]= [
  ];
  itemName:string="subgradeId";
  IsAutoCode:boolean=false
  subgradeValidation:SubgradeValidation[]=[];
  gradeTouch:boolean=false;
  gradeNew:boolean=false;
  grade:Grade={Id:null,GradeId:null,GradeName:null}
  constructor(public matDialogRef:MatDialogRef<SubgradeComponent>,
  @Inject(MAT_DIALOG_DATA) public subgrade:SubGrade,
  private _alertBox:AlertBoxService,
  private _validationService:ValidationService,
  private _navigationData:NavigationDataService,
  private matDialog:MatDialog,
  private changeRef:ChangeDetectorRef,
  private _hrPayrollDefinationService:HrPayrollDefinationServiceService,
) { }

  ngOnInit() {
    debugger
    if(this.subgrade.Id==null&&this.subgrade.Grade_Id!=null){
      this.subgradeForm.control.markAsDirty();
      this.gradeSelectedItems.push({id:this.subgrade.Grade_Id,itemName:this.subgrade.GradeName}) 
    }
    else if(this.subgrade.Id==null){
      this.gradeSelectedItems.push({id:"0",itemName:"SELECT"}) 
    }
    else{
      this.subgradeForm.control.markAsDirty();
      this.gradeSelectedItems.push({id:this.subgrade.Grade_Id,itemName:this.subgrade.GradeName})
    }
    this.getItemFormInfo();
  }
  onNoClick(){
    this.matDialogRef.close(false);
  }
  getItemFormInfo(){
    this._validationService.getSubGradeValidationData().subscribe((response:SubgradeValidation[])=>{
      this.subgradeValidation=response
      if(this.subgradeValidation[2].SubGradeId){
        this.IsAutoCode=true
      }
      this.changeRef.markForCheck();
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  saveSubGrade(){
    debugger
    if(this.subgrade.Id==null){
      console.log(this.subgrade);
      this._hrPayrollDefinationService.CreateSubGrade(this.subgrade).subscribe(response=>{
        let result=response;
        this._navigationData.IsSaved=true;
        if(result){
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
      this._hrPayrollDefinationService.UpdateSubGrade(this.subgrade).subscribe(response=>{
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
  OnSeletedItem($event:MultiSelectDropdown){
    debugger
    this.gradeTouch=true;
    if($event.id=="0"){
      this.subgrade.Grade_Id=null;
    }
    else{
      this.subgrade.Grade_Id=$event.id
    }
  }
  OnDeSeletedItem($event){
    console.log($event)
  }
  clearSubGrade(){
    this.subgrade.Id=null;
    this.gradeSelectedItems[0].id="0";
    this.gradeSelectedItems[0].itemName="Select"
    this.subgrade.SubGradeId=null;
    this.subgrade.SubGradeName=null;
    this.subgrade.Grade_Id=null;
    this.subgrade.EeectiveDate=null
    this.subgradeForm.reset();
  }
  createNewGrade(){
    this.clearGrade();
    this.gradeNew=false;
     const dialogRef=this.matDialog.open(GradeComponent,{
       data:this.grade,
       disableClose:true,
       maxHeight:window.screen.height*.6+'px',
       height:'auto',
       width:window.screen.width*.4+'px'
     });
     dialogRef.afterClosed().subscribe((result:Grade)=>{
       debugger
       if(result){
         this.gradeNew=true;
         this.gradeSelectedItems=[];
         this.gradeSelectedItems.push({id:result.Id,itemName:result.GradeId+'-'+result.GradeName})
       }
     })
   }
   clearGrade(){
    this.grade.Id=null;
    this.grade.GradeId=null;
    this.grade.GradeName=null;
  }
  controlGroupItemForm(){
    debugger
    const dialogRef=this.matDialog.open(FormDetailsControlComponent,{
      data:"subgrade-form",
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
    this.subgrade.SubGradeId=$event;
  }
}
