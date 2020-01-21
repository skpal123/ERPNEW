import { Component, OnInit, ViewChild,Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OccupationValidation } from '../../../models/validation/hr-payroll/occupation-validation.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Occupation } from '../../../models/master-settings/hr-payroll/occupation.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { NavigationDataService } from '../../../services/common/navigation-data.service';
import { ValidationService } from '../../../services/common/validation.service';
import { HrPayrollDefinationServiceService } from '../../../services/master-settings/hr-payroll-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { FormDetailsControlComponent } from '../../../common-module/form-details-control/form-details-control.component';

@Component({
  selector: 'app-occupation',
  templateUrl: './occupation.component.html',
  styleUrls: ['./occupation.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class OccupationComponent implements OnInit {
  @ViewChild('occupationForm') occupationForm:NgForm
  occupationValidation:OccupationValidation[]=[]
  itemName:string="occupationId"
  IsAutoCode:boolean=false
  constructor(public matDialogRef:MatDialogRef<OccupationComponent>,
  @Inject(MAT_DIALOG_DATA) public occupation:Occupation,
  private _alertBox:AlertBoxService,
  private matDialog:MatDialog,
  private changeRef:ChangeDetectorRef,
  private _navigationData:NavigationDataService,
  private _validationService:ValidationService,
  private _hrpayrollDefinationService:HrPayrollDefinationServiceService,
) { }

  ngOnInit() {
    debugger
    if(this.occupation.Id!=null){
      this.occupationForm.control.markAsDirty();
    }
    this.getItemFormInfo();
  }
  onNoClick(){
    this.matDialogRef.close(false);
  }
  getItemFormInfo(){
    this._validationService.getOccupationValidationData().subscribe((response:OccupationValidation[])=>{
      this.occupationValidation=response;
      if(this.occupationValidation[2].OccupationId){
        this.IsAutoCode=true;
      }
      this.changeRef.markForCheck();
    },error=>{
      let dialogData=new DialogData(); 
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  saveOccupation(){
    debugger
    if(this.occupation.Id==null){
      this._hrpayrollDefinationService.CreateOccupation(this.occupation).subscribe(response=>{
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
      this._hrpayrollDefinationService.UpdateOccupation(this.occupation).subscribe(response=>{
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
  clearOccupation(){
    this.occupation.Id=null;
    this.occupation.OccupationId=null;
    this.occupation.OccupationName=null;
    this.occupationForm.reset();
  }
  controlGroupItemForm(){
    debugger
    const dialogRef=this.matDialog.open(FormDetailsControlComponent,{
      data:"occupation-form",
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
    this.occupation.OccupationId=$event;
  }

}
