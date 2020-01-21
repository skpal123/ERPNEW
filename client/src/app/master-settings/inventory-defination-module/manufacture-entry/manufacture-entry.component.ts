import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Manufacture } from '../../../models/master-settings/inventory-defination/manufacture.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { ValidationService } from '../../../services/common/validation.service';
import { ManufactureValidation } from '../../../models/validation/inventory/manufacture-validation.model';
import { NavigationDataService } from '../../../services/common/navigation-data.service';

@Component({
  selector: 'app-manufacture-entry',
  templateUrl: './manufacture-entry.component.html',
  styleUrls: ['./manufacture-entry.component.css']
})
export class ManufactureEntryComponent implements OnInit {

  @ViewChild('lmanufactureForm') lmanufactureForm:NgForm
  constructor(public matDialogRef:MatDialogRef<ManufactureEntryComponent>,
  @Inject(MAT_DIALOG_DATA) public manufacture:Manufacture,
  private _alertBox:AlertBoxService,
  private _navigationData:NavigationDataService,
  private _validationService:ValidationService,
  private _inventotyDefinationService:InventoryDefinationServiceService,
) { }
manufactureFormInfoList:ManufactureValidation[]=[]
ngOnInit() {
  this.getManufactureFormInfo();
}
onNoClick(){
  this.matDialogRef.close(false);
}
saveManufacture(){
  debugger
  if(this.manufacture.Id==null){
    this._inventotyDefinationService.CreateManufacture(this.manufacture).subscribe(response=>{
      let result=response
      this._navigationData.IsSaved=true;
      if(result){
        this.matDialogRef.close(true);
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
    this._inventotyDefinationService.UpdateManufacture(this.manufacture).subscribe(response=>{
      let result=response
      if(result){
        this.matDialogRef.close(response);
        let dialogData=new DialogData();
        dialogData.message="Update successfully";
        this._alertBox.openDialog(dialogData);
      }
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error;
      this._alertBox.openDialog(dialogData);
    })
  }
}
getManufactureFormInfo(){
  this._validationService.getMaufactureValidationData().subscribe((response:ManufactureValidation[])=>{
    this.manufactureFormInfoList=response
      console.log(this.manufactureFormInfoList);
  },error=>{
    let dialogData=new DialogData();
    dialogData.message=error
    this._alertBox.openDialog(dialogData);
  })
}
}
