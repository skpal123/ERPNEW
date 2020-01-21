import { Component, OnInit, ViewChild,Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SalaryItemValidation } from '../../../models/validation/hr-payroll/salaryitem.validation.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { SalaryItem } from '../../../models/master-settings/hr-payroll/salary-item.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { NavigationDataService } from '../../../services/common/navigation-data.service';
import { ValidationService } from '../../../services/common/validation.service';
import { HrPayrollDefinationServiceService } from '../../../services/master-settings/hr-payroll-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { FormDetailsControlComponent } from '../../../common-module/form-details-control/form-details-control.component';
import { MultiSelectDropdown } from '../../../models/common/multiselect.dropdown.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-salary-item',
  templateUrl: './salary-item.component.html',
  styleUrls: ['./salary-item.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SalaryItemComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  @ViewChild('salaryItemForm') salaryItemForm:NgForm
  salaryItemValidation:SalaryItemValidation[]=[]
  itemName:string="salaryItemId"
  IsAutoCode:boolean=false
  salaryItemTouch:boolean=false;
  salaryItemSelectedItems :MultiSelectDropdown[]= [
  ];
  constructor(public matDialogRef:MatDialogRef<SalaryItemComponent>,
  @Inject(MAT_DIALOG_DATA) public salaryItem:SalaryItem,
  private _alertBox:AlertBoxService,
  private _navigationData:NavigationDataService,
  private matDialog:MatDialog,
  private changeRef:ChangeDetectorRef,
  private _validationService:ValidationService,
  private _hrpayrollDefinationService:HrPayrollDefinationServiceService,
) { }

  ngOnInit() {
    debugger
    if(this.salaryItem.Id!=null&&this.salaryItem.InheritedItem!=null){
      this.salaryItemSelectedItems.push({id:this.salaryItem.InheritedItem,itemName:this.salaryItem.InheritedItemName})
    }
    if(this.salaryItem.Id!=null){
      this.salaryItemForm.control.markAsDirty();
    }
    // else{
    //   this.salaryItemSelectedItems.push({id:this.salaryItem.InheritedItem,itemName:this.salaryItem.InheritedItemName})
    // }
    this.salaryItemForm.valueChanges.subscribe(data=>{
    const control=this.salaryItemForm.control.get('Percentage');
      if(control&&control.value!=null&&this.salaryItem.InheritedItem!=null){
        this.salaryItem.OperatorString=control.value+" % Of "+ this.salaryItem.InheritedItemName
      }
    })
    this.getItemFormInfo();
  }
  onNoClick(){
    this.matDialogRef.close(false);
  }
  getItemFormInfo(){
    this._validationService.getSalaryItemValidationData().subscribe((response:SalaryItemValidation[])=>{
      this.salaryItemValidation=response
      if(this.salaryItemValidation[2].ItemId){
        this.IsAutoCode=true;
      }
      this.changeRef.markForCheck()
    },error=>{
      let dialogData=new DialogData(); 
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  saveSalaryItem(){
    debugger
    this.blockUi.start("Loading..., Please wait")
    if(this.salaryItem.Id==null){
      this._hrpayrollDefinationService.CreateSalaryItem(this.salaryItem).subscribe(response=>{
        this.blockUi.stop();
        let result=response
        if(result){
          this._navigationData.IsSaved=true;
          this.matDialogRef.close(response);
          let dialogData=new DialogData();
          dialogData.message="Save successfully";
          this._alertBox.openDialog(dialogData);
        }
      },error=>{
        this.blockUi.stop();
        let dialogData=new DialogData();
        dialogData.message=error
        this._alertBox.openDialog(dialogData);
      })
    }
    else{
      this._hrpayrollDefinationService.UpdateSalaryItem(this.salaryItem).subscribe(response=>{
        debugger
        this.blockUi.stop();
        let result=response
        if(result){
          this.matDialogRef.close(true);
          let dialogData=new DialogData();
          dialogData.message="Update successfully";
          this._alertBox.openDialog(dialogData);
        }
      },error=>{
        this.blockUi.stop();
        let dialogData=new DialogData();
        dialogData.message=error
        this._alertBox.openDialog(dialogData);
      })
    }
  }
  clearSalaryItem(){
    this.salaryItem.Id=null;
    this.salaryItem.ItemId=null;
    this.salaryItem.ItemType=null;
    this.salaryItem.ItemTypeName=null;
    this.salaryItem.IsBasic=false;
    this.salaryItem.IsDaily=false;
    this.salaryItem.IsDefault=false;
    this.salaryItem.OperatorString=null;
    this.salaryItem.Percentage=null;
    this.salaryItem.InheritedItem=null;
    this.salaryItem.IsLeave=false;
    this.salaryItem.IsLoan=false;
    this.salaryItem.IsPension=false;
    this.salaryItem.IsTax=false;
    this.salaryItem.DefaultAmount=0;
    this.salaryItemForm.reset();
  }
  controlGroupItemForm(){
    debugger
    const dialogRef=this.matDialog.open(FormDetailsControlComponent,{
      data:"salary-item-form",
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
    this.salaryItem.ItemId=$event;
  }
  OnSeletedItem($event:MultiSelectDropdown){
    debugger
    this.salaryItemTouch=true;
    if($event.id=="0"){
      this.salaryItem.InheritedItem=null;
    }
    else{
      this.salaryItem.InheritedItem=$event.id
      this.salaryItem.InheritedItemName=$event.itemName
      let value=this.salaryItem.Percentage==null?0:this.salaryItem.Percentage;
      this.salaryItem.OperatorString=value+" % Of "+ $event.itemName
    }
  }
}
