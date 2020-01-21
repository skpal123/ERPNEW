import { Component, OnInit ,ViewChild, Input, OnChanges,Output,EventEmitter} from '@angular/core';
import { DialogData } from '../../../models/common/dialog-data.model';
import { CustomerTransaction } from '../../../models/regular-operation/inventory/customer-transaction.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { CustomDatatableService } from '../../../services/common/custom-datatable.service';
import { MatDialog } from '@angular/material';
import { InventoryService } from '../../../services/regular-operation/inventory.service';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { FormControl } from '@angular/forms';
import { GroupItem } from '../../../models/regular-operation/inventory/group-item.model';
import { ItemTransactionDetailsComponent } from '../item-transaction-details/item-transaction-details.component';
import { MultiSelectDropdown } from '../../../models/common/multiselect.dropdown.model';
import { CustomerTransactionComponent } from '../customer-transaction/customer-transaction.component';
import { ValidationService } from '../../../services/common/validation.service';
import { CustomerTransactionValidation } from '../../../models/validation/inventory/customer-transaction-validation.model';
import { NavigationDataService } from '../../../services/common/navigation-data.service';
import { CommonService } from '../../../services/common/common.service';

@Component({
  selector: 'app-customer-transaction-list',
  templateUrl: './customer-transaction-list.component.html',
  styleUrls: ['./customer-transaction-list.component.css']
})
export class CustomerTransactionListComponent implements OnInit {
  @ViewChild('formDateControl') formDateControl:FormControl;
  @ViewChild('toDateControl') toDateControl:FormControl;
  IsUpdate:boolean=false;
  customerId:string=null;
  formDate:Date=new Date();
  initialload:boolean=true;
  toDate:Date=new Date();
  startDate:Date=new Date()
  @BlockUI() blockUi:NgBlockUI
  customerIdtouch:boolean=false;
  userControlList:UserFormControl[]=[];
  cTransactionValidation:CustomerTransactionValidation[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  groupItemList:GroupItem[]=[];
  customerSelectedItems :MultiSelectDropdown[]= [
  ];
  customerTransactionList:CustomerTransaction[]=[];
  customerTransaction:CustomerTransaction={
    Id:null,ChalanNo:null,OrderNo:null,InvoiceNo:null,PaymentMode:"-1",PaymentDate:new Date(),Ledger_Id:null,
    SubLedger_Id:null,Group_Id:null,Customer_Id:null,PaidAmount:0,PaymentMethod:"general",
    PaymentType:"payment",TotalDueAdvanceAmount:0,TransactionDetailsList:[],IsFirstTransaction:false
  }
  totalPayableAmount:number=0;
  constructor(private _alertBox:AlertBoxService,
    private _customDatatableService:CustomDatatableService,
    private matDialog:MatDialog,
    private _commonService:CommonService,
    private _navigationData:NavigationDataService,
    private _validationService:ValidationService,
    private _inventotyService:InventoryService,
  ) { }
  ngOnInit(){
    this.getCustomerTransactionList(this.formDate,this.toDate,this.customerId);
    this.getUserFormControlByFormName();
    this.formDateControl.valueChanges.subscribe(data=>{
      debugger
      if(!this.initialload){
        this.getCustomerTransactionList(data,this.toDate,this.customerId);
      }
    })
    this.toDateControl.valueChanges.subscribe(data=>{
      debugger
      if(!this.initialload){
        this.getCustomerTransactionList(this.formDate,data,this.customerId);
      }
    })
  }
  getUserFormControlByFormName(){
    this.blockUi.start("Loading....,Please wait.")
    this._commonService.getUserFormControlByFormName('customer-transaction-list').subscribe(response=>{
      this.blockUi.stop();
      this.userControlList=response
      this.ColumnList=this.userControlList;
      this._customDatatableService.ColumnList=this.userControlList;
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getCustomerTransactionList(formDate:Date,toDate:Date,customerId:string){
    this.blockUi.start("Loading....,Please wait")
    this._inventotyService.getPartyTransactionList(formDate,toDate,customerId).subscribe(response=>{
      this.blockUi.stop();
      this.initialload=false;
      this.customerTransactionList=response;
      this.customerTransactionList.forEach(a=>{
        a.PaymentMode= a.PaymentMode=="1"?'Cash':a.PaymentMode=="2"?"Bank":"Other";
      })
      this.DataList=this.customerTransactionList;
      this._customDatatableService.DataList=this.customerTransactionList;
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getCustomerTansactionDetails($event:CustomerTransaction){
    debugger
    this.blockUi.start("Loading....,Please wait")
    this._inventotyService.getPartyTransactionById($event.Id).subscribe(response=>{
      this.blockUi.stop();
      this.customerTransaction=response;
      this.customerTransaction.PaymentType="payment";
      this.customerTransaction.PaymentMethod="general"
      const dialogRef=this.matDialog.open(CustomerTransactionComponent,{
        data:this.customerTransaction,
        disableClose:true,
        maxWidth:'100vw',
        maxHeight:'100vh',
        height:'auto',
        width:'95%'
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.getCustomerTransactionList(this.formDate,this.toDate,this.customerId);
        }
      })
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteCustomerTransaction($event:CustomerTransaction){
    this.blockUi.start("Loading....,Please wait")
    this._inventotyService.deletePartyTransactionById($event.Id).subscribe(response=>{
      this.blockUi.stop();
      let result=response
      if(result){
        this.getCustomerTransactionList(this.formDate,this.toDate,this.customerId);
        let dialogData=new DialogData();
        dialogData.message="Customer deleted succesfully";
        this._alertBox.openDialog(dialogData);
      }
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  customerOnSeletedItem($event:MultiSelectDropdown){
    debugger
    this.customerIdtouch=true;
    if($event.id!="0"){
      this.customerId=$event.id;
      this.customerTransaction.Customer_Id=$event.id;
      this.customerTransaction.CustomerName=$event.itemName;
      this.getCustomerTransactionList(this.formDate,this.toDate,this.customerId);
    }
    else{
      this.customerTransaction.Customer_Id=null;
      this.customerTransaction.CustomerName="Select Customer"
      this.customerId=null;
    }
  }
  createNewCustomerTrnsaction(){
    this.clearPartyTransaction();
    const dialogRef=this.matDialog.open(CustomerTransactionComponent,{
      data:this.customerTransaction,
      disableClose:true,
      maxWidth:'100vw',
      maxHeight:'100vh',
      height:'auto',
      width:'95%'
    });
    dialogRef.afterClosed().subscribe(result=>{
      debugger
      if(result){
        this.getCustomerTransactionList(this.formDate,this.toDate,this.customerId);
      }
    })
  }
  clearPartyTransaction(){
    this.customerTransaction.Id=null;
    this.customerTransaction.TotalDueAdvanceAmount=0;
    this.customerTransaction.PaidAmount=0;
    this.customerTransaction.PaymentMethod="general";
  }
}
