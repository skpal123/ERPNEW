import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Unit } from '../../../models/master-settings/inventory-defination/unit.model';
import { NgForm } from '@angular/forms';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { FormDetailsControlComponent } from '../../../common-module/form-details-control/form-details-control.component';
import { ValidationService } from '../../../services/common/validation.service';
import { UnitValidation } from '../../../models/validation/inventory/unit-validation.model';

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.css']
})
export class AddUnitComponent implements OnInit {
  @ViewChild('unitForm') unitForm:NgForm
  unitValidation:UnitValidation[]=[];
  constructor(public matDialogRef:MatDialogRef<AddUnitComponent>,
  @Inject(MAT_DIALOG_DATA) public unit:Unit,
  private _alertBox:AlertBoxService,
  private _validationService:ValidationService,
  private matDialog:MatDialog,
  private _inventotyDefinationService:InventoryDefinationServiceService,
) { }

  ngOnInit() {
    this.unitForm.control.markAsDirty();
    this.getItemFormInfo();
  }
  onNoClick(){
    this.matDialogRef.close(false);
  }
  getItemFormInfo(){
    this._validationService.getUnitValidationData().subscribe((response:UnitValidation[])=>{
      this.unitValidation=response
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  saveUnit(){
    if(this.unit.Id==null){
      this._inventotyDefinationService.CreateUnit(this.unit).subscribe(response=>{
        let result=response
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
      this._inventotyDefinationService.UpdateUnit(this.unit).subscribe(response=>{
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
  clearUnit(){
    this.unit.Id=null;
    this.unit.UnitName=null;
    this.unit.Description=null;
    this.unitForm.reset();
  }
  controlGroupItemForm(){
    debugger
    const dialogRef=this.matDialog.open(FormDetailsControlComponent,{
      data:"unit-entry",
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
}
