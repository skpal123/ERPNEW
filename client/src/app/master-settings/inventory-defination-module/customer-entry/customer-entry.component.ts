import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgForm, FormControl } from '@angular/forms';
import { MultiSelectDropdown } from '../../../models/common/multiselect.dropdown.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { SupplierEntryComponent } from '../supplier-entry/supplier-entry.component';
import { Customer } from '../../../models/master-settings/inventory-defination/customer.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { FormDetailsControlComponent } from '../../../common-module/form-details-control/form-details-control.component';
import { ValidationService } from '../../../services/common/validation.service';
import { CustomerValidation } from '../../../models/validation/inventory/customer-validation.model';
import { NavigationDataService } from '../../../services/common/navigation-data.service';

@Component({
  selector: 'app-customer-entry',
  templateUrl: './customer-entry.component.html',
  styleUrls: ['./customer-entry.component.css']
})
export class CustomerEntryComponent implements OnInit {
  customerValidation:CustomerValidation[]=[];
  itemName:string="customerId"
  IsAutoCode:boolean=false;
  @BlockUI() blockUi:NgBlockUI
  @ViewChild('customerForm') customerForm:NgForm
  @ViewChild('ledgerIdControl') ledgerIdControl:FormControl
  ledgerTouch:boolean=false;
  allLedger:boolean=true;
  ledgerSelectedItems :MultiSelectDropdown[]= [
  ];
  subledgerSelectedItems :MultiSelectDropdown[]= [
  ];
  constructor(public matDialogRef:MatDialogRef<SupplierEntryComponent>,
  @Inject(MAT_DIALOG_DATA) public customer:Customer,
  private _alertBox:AlertBoxService,
  private matDialog:MatDialog,
  private _navigationData:NavigationDataService,
  private _validationService:ValidationService,
  private _inventotyDefinationService:InventoryDefinationServiceService,
) { }

  ngOnInit() {
    debugger
    if(this.customer.Id==null){
      this.ledgerSelectedItems.push({id:"0",itemName:"SELECT"})
      this.subledgerSelectedItems.push({id:"0",itemName:"SELECT"})
    }
    else{
      this.ledgerSelectedItems.push({id:this.customer.Ledger_Id,itemName:this.customer.LedgerName})
      this.subledgerSelectedItems.push({id:this.customer.SubLedger_Id,itemName:this.customer.SubLedgerName})
    }
    this.getItemFormInfo();
  }
  onNoClick(){
    this.matDialogRef.close(false);
  }
  getItemFormInfo(){
    this._validationService.getCustomerValidationData().subscribe((response:CustomerValidation[])=>{
      this.customerValidation=response;
      if(this.customerValidation[3].CustomerId){
        this.IsAutoCode=true
      }
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  saveCustomer(){
    debugger
    if(this.customer.Id==null){
      this.blockUi.start("Loading....,Please wait")
      this._inventotyDefinationService.CreateCustomer(this.customer).subscribe(response=>{
        this.blockUi.stop();
        let result=response
        this._navigationData.IsSaved=true;
        if(result){
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
      this.blockUi.start("Loading....,Please wait")
      this._inventotyDefinationService.UpdateCustomer(this.customer).subscribe(response=>{
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

  ledgerOnSeletedItem($event){
    debugger
    this.ledgerTouch=true;
    if($event.id!=null&&$event.id!="0"){
      this.customer.Ledger_Id=$event.id;
    }
    else{
      this.customer.Ledger_Id=null;
      this.subledgerSelectedItems=[];
      this.subledgerSelectedItems.push({id:"0",itemName:"SELECT"})
    }
  }
  subledgerOnSeletedItem($event){
    debugger
    if($event.id!=null&&$event.id!="0"){
      this.customer.SubLedger_Id=$event.id;
    }
    else{
      this.customer.SubLedger_Id=null;
    }
  }
  OnDeSeletedItem($event){
    console.log($event)
  }
  clearCustomer(){
    this.customer.Id=null;
    this.customer.CustomerId=null;
    this.customer.CustomerName=null;
    this.customer.PhoneNo=null;
    this.customer.Email=null;
    this.customer.Address=null;
    this.customer.Ledger_Id=null;
    this.ledgerSelectedItems[0].id="0";
    this.ledgerSelectedItems[0].itemName="Select";
    this.subledgerSelectedItems[0].id="0";
    this.subledgerSelectedItems[0].itemName="Select";
    this.customer.SubLedger_Id=null;
    this.customerForm.reset();
  }
  controlGroupItemForm(){
    debugger
    const dialogRef=this.matDialog.open(FormDetailsControlComponent,{
      data:"customer-entry",
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
    this.customer.CustomerId=$event;
  }
}
