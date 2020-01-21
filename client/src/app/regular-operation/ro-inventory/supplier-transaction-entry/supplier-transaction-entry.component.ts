import { Component, OnInit, ViewChild } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgForm, FormControl } from '@angular/forms';
import { MultiSelectDropdown } from '../../../models/common/multiselect.dropdown.model';
import { Supplier } from '../../../models/master-settings/inventory-defination/supplier.model';
import { SupplierTransaction } from '../../../models/regular-operation/inventory/supplier-transaction.model';
import { MatDialog } from '@angular/material';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { NewDropdownDataService } from '../../../common-module/new-dropdown-data.service';
import { InventoryService } from '../../../services/regular-operation/inventory.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { SupplierEntryComponent } from '../../../master-settings/inventory-defination-module/supplier-entry/supplier-entry.component';

@Component({
  selector: 'app-supplier-transaction-entry',
  templateUrl: './supplier-transaction-entry.component.html',
  styleUrls: ['./supplier-transaction-entry.component.css']
})
export class SupplierTransactionEntryComponent implements OnInit {
  supplierNew:boolean=false
  paymentType:string="payment";
  @BlockUI() blockUi:NgBlockUI
  @ViewChild('supplierTransactionForm') itemForm:NgForm
  @ViewChild('ledgerIdControl') ledgerIdControl:FormControl
  ledgerTouch:boolean=false;
  supplierSelectedItems :MultiSelectDropdown[]= [
  ];
  ledgerSelectedItems :MultiSelectDropdown[]= [
  ];
  subledgerSelectedItems :MultiSelectDropdown[]= [
  ];
  supplier:Supplier={
    Id:null,SupplierId:null,SupplierName:null,PhoneNo:null,Email:null,
    Ledger_Id:null,SubLedger_Id:null,LedgerName:null,SubLedgerName:null,Address:null
  }
  supplierTransaction:SupplierTransaction={
    Id:null,ChalanNo:null,OrderNo:null,PaymentMode:"0",PaymentDate:new Date(),Ledger_Id:null,
    SubLedger_Id:null,Group_Id:null,Supplier_Id:null,PaidAmount:0
  }
  constructor(private matDialog:MatDialog,
  private _alertBox:AlertBoxService,
  private _newDropdownService:NewDropdownDataService,
  private _inventotyService:InventoryService,
) { }

  ngOnInit() {
    debugger
    if(this.supplierTransaction.Id==null){
      this.ledgerSelectedItems.push({id:"0",itemName:"SELECT"})
      this.subledgerSelectedItems.push({id:"0",itemName:"SELECT"})
      this.supplierSelectedItems.push({id:"0",itemName:"SELECT"})
    }
    else{
      this.ledgerSelectedItems.push({id:this.supplierTransaction.Ledger_Id,itemName:this.supplierTransaction.LedgerName})
      this.subledgerSelectedItems.push({id:this.supplierTransaction.SubLedger_Id,itemName:this.supplierTransaction.SubLedgerName})
    }
  }
  saveSupplierTransaction(){
    debugger
    if(this.paymentType=="refund"){
      this.supplierTransaction.PaidAmount*-1;
    }
    if(this.supplierTransaction.Id==null){
      this.blockUi.start("Loading....,Please wait")
      this._inventotyService.saveSupplierTransaction(this.supplierTransaction).subscribe(response=>{
        this.blockUi.stop();
        let result=response
        if(result){
          let dialogData=new DialogData();
          dialogData.message="Save successfully";
          this._alertBox.openDialog(dialogData);
        }
      },error=>{
        this.blockUi.stop();
        let message=error
        let dialogData=new DialogData();
        dialogData.message=message.Message;
        this._alertBox.openDialog(dialogData);
      })
    }
    else{
      this.blockUi.start("Loading....,Please wait")
      this._inventotyService.UpdatePartyTransaction(this.supplierTransaction).subscribe(response=>{
        this.blockUi.stop();
        let result=response
        if(result){
          let dialogData=new DialogData();
          dialogData.message="Update successfully";
          this._alertBox.openDialog(dialogData);
        }
      },error=>{
        this.blockUi.stop();
        let message=error
        let dialogData=new DialogData();
        dialogData.message=message.Message;
        this._alertBox.openDialog(dialogData);
      })
    }
  }

  ledgerOnSeletedItem($event){
    debugger
    this.ledgerTouch=true;
    if($event.id!=null&&$event.id!="0"){
      this.supplierTransaction.Ledger_Id=$event.id;
    }
    else{
      this.supplierTransaction.Ledger_Id=null
    }
  }
  subledgerOnSeletedItem($event){
    debugger
    if($event.id!=null&&$event.id!="0"){
      this.supplierTransaction.SubLedger_Id=$event.id;
    }
    else{
      this.supplierTransaction.SubLedger_Id=null
    }
  }
  supplierOnSeletedItem($event:MultiSelectDropdown){
    if($event.id!="0"){
      this.supplierTransaction.Supplier_Id=$event.id;
    }
    else{
      this.supplierTransaction.Supplier_Id=null;
    }
  }
  createNewSupplier(){
    const dialogRef=this.matDialog.open(SupplierEntryComponent,{
      data:this.supplier,
      disableClose:true,
      height:window.screen.height*.6+'px',
      width:window.screen.width*.4+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      debugger
      if(result){
        this.supplierNew=true;
      }
    })
  }
  paymentTypeChange(paymentType){
    
  }
}
