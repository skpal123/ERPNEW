import { Component, OnInit ,ViewChild,Inject, OnDestroy} from '@angular/core';
import { CustomerTransaction } from '../../../models/regular-operation/inventory/customer-transaction.model';
import { FormControl, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { GroupItem } from '../../../models/regular-operation/inventory/group-item.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { CustomDatatableService } from '../../../services/common/custom-datatable.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InventoryService } from '../../../services/regular-operation/inventory.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { ItemTransactionDetailsComponent } from '../item-transaction-details/item-transaction-details.component';
import { MultiSelectDropdown } from '../../../models/common/multiselect.dropdown.model';
import { Customer } from '../../../models/master-settings/inventory-defination/customer.model';
import { CustomerSupplierTransactionDetails } from '../../../models/regular-operation/inventory/customer-supplier-transaction-details.model';
import { PurchaseSalesTransaction } from '../../../models/regular-operation/inventory/purchase-sales-transaction.model';
import { ValidationService } from '../../../services/common/validation.service';
import { CustomerTransactionValidation } from '../../../models/validation/inventory/customer-transaction-validation.model';
import { NavigationDataService } from '../../../services/common/navigation-data.service';
import { CommonService } from '../../../services/common/common.service';
import { DatatableButtonOutput } from '../../../models/common/datatable-button-output';
import { DatatableCheckboxOutput } from '../../../models/common/datatable-checkbox-output';

@Component({
  selector: 'app-customer-transaction',
  templateUrl: './customer-transaction.component.html',
  styleUrls: ['./customer-transaction.component.css']
})
export class CustomerTransactionComponent implements OnInit,OnDestroy {
  @BlockUI() blockUi:NgBlockUI
  @ViewChild('customerTransactionForm') itemForm:NgForm
  @ViewChild('ledgerIdControl') ledgerIdControl:FormControl
  @ViewChild('PaidAmountControl') PaidAmountControl:FormControl
  @ViewChild('formDateControl') formDateControl:FormControl;
  @ViewChild('paymentMethodControl') paymentMethodControl:FormControl;
  @ViewChild('toDateControl') toDateControl:FormControl;
  ledgerTouch:boolean=false;
  formName:string="customer-transaction"
  paymentModeFilter:boolean=true;
  ledgerSelectedItems :MultiSelectDropdown[]= [
  ];
  subledgerSelectedItems :MultiSelectDropdown[]= [  
  ];
  dtTrigger: Subject<any> = new Subject<any>();
  formDate:Date=new Date();
  initialload:boolean=true;
  toDate:Date=new Date();
  startDate:Date=new Date()
  reload:boolean=false;
  columnReady:boolean=false;
  dataReady:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  groupItemList:PurchaseSalesTransaction[]=[];
  groupItem:PurchaseSalesTransaction;
  oldGroupItemList:PurchaseSalesTransaction[]=[];
  customerTransactionList:CustomerTransaction[]=[];
  cTransactionValidation:CustomerTransactionValidation[]=[];
  paymentType:string="payment";
  paymentMethod:string="general";
  totalBalance1:number=0;
  customer:Customer={
    Id:null,CustomerId:null,CustomerName:null,PhoneNo:null,Email:null,
    Ledger_Id:null,SubLedger_Id:null,LedgerName:null,SubLedgerName:null,Address:null
  }
  totalPayableAmount:number=0;
  constructor(private _alertBox:AlertBoxService,
    public matDialogRef:MatDialogRef<CustomerTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public customerTransaction:CustomerTransaction,
    private _commonService:CommonService,
    private _validationService:ValidationService,
    private _navigationData:NavigationDataService,
    private _customDatatableService:CustomDatatableService,
    private matDialog:MatDialog,
    private _inventotyService:InventoryService,
  ) { }
  ngOnInit(){
    debugger
    this.getUserFormControlByFormName();
    this.getItemFormInfo();
    if(this.customerTransaction.Id!=null){
      this.customerTransaction.TransactionDetailsList.forEach((a,index)=>{
        var groupItem=new GroupItem();
        groupItem.InvoiceNo=a.InvoiceNo;
        groupItem.PayAmount=a.PaidAmount;
        groupItem.Id=a.Group_Id;
        groupItem.TransactionDate=a.PaymentDate;
        groupItem.CustomerName=this.customerTransaction.CustomerName;
        this.groupItemList.push(groupItem);
      });
      this.DataList=this.groupItemList;
      this.dataReady=true;
      this.reload=true;
      if(this.customerTransaction.Ledger_Id!=null){
        this.ledgerSelectedItems.push({id:this.customerTransaction.Ledger_Id,itemName:this.customerTransaction.LedgerName});
      }
      if(this.customerTransaction.SubLedger_Id!=null){
        this.subledgerSelectedItems.push({id:this.customerTransaction.SubLedger_Id,itemName:this.customerTransaction.SubLedgerName})
      }
    }
    else{
      this.GetSalesTransactionList(this.customerTransaction.Customer_Id,this.formDate,this.toDate);
    }                                                                                                                                                
    this.formDateControl.valueChanges.subscribe(data=>{
      debugger
      if(!this.initialload){
        this.GetSalesTransactionList(this.customerTransaction.Customer_Id,data,this.toDate);
      }
    })
    this.toDateControl.valueChanges.subscribe(data=>{
      debugger
      if(!this.initialload){
      this.GetSalesTransactionList(this.customerTransaction.Customer_Id,this.formDate,data);
      }
    })
    this.PaidAmountControl.valueChanges.subscribe(data=>{
      if(data==""){
        this.customerTransaction.PaidAmount=0
      }
      if(this.customerTransaction.PaymentMethod=="general"&&!this.customerTransaction.Id!=null){
        this.distributedTotalAmount(data)
      }
      else if(this.customerTransaction.PaymentMethod=="specific"){
        this.distributedTotalAmountForSpecific(data)
      }
    })
  }
  onNoClick(){
    this.matDialogRef.close();
  }
  getItemFormInfo(){
    this._validationService.getCustomerTransactionValidationData().subscribe((response:CustomerTransactionValidation[])=>{
      this.cTransactionValidation=response;
    },error=>{
      let message=error;
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  getUserFormControlByFormName(){
    this.blockUi.start("Loading....,Please wait.")
    this._commonService.getUserFormControlByFormName('transaction-details-list').subscribe(response=>{
      this.blockUi.stop();
      this.userControlList=response;
      if(this.customerTransaction.Id!=null){
        this.userControlList.forEach((u,index)=>{
          if(this.userControlList[index]["Name"]=="NetPayableAmount")
          {
            this.userControlList[index]['IsEnable']=false
          } 
          if(this.userControlList[index]["Name"]=="PaidAmount")
          {
            this.userControlList[index]['IsEnable']=false
          } 
          if(this.userControlList[index]["Name"]=="History")
          {
            this.userControlList[index]['IsEnable']=false
          }  
          if(this.userControlList[index]["Name"]=="View")
          {
            this.userControlList[index]['IsEnable']=false
          }  
        })
      }
      this.ColumnList=this.userControlList;
      this.columnReady=true;
      this._customDatatableService.ColumnList=this.userControlList;
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  GetSalesTransactionList(customerId:string,formDate:Date,toDate:Date){
    debugger
    this.customerTransaction.TotalDueAdvanceAmount=0;
    //this.blockUi.start("Loading....,Please wait")
    this._inventotyService.GetSalesTransactionList(customerId,formDate,toDate).subscribe(response=>{
      this.blockUi.stop();
      this.initialload=false;
      this.groupItemList=response;
      this.totalPayableAmount=0;
      this.groupItemList.forEach(a=>{
        a.PayAmount=(a.NetPayableAmount-a.PaidAmount);
        this.customerTransaction.TotalDueAdvanceAmount+=(a.NetPayableAmount-a.PaidAmount);
        a.History="histrory",
        a.View="view"
      })
      this.DataList=this.groupItemList;
      this.dataReady=true;
      this.reload=true;
    },error=>{
      //this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getCustomerDetails($event:CustomerTransaction){
    debugger
    this.blockUi.start("Loading....,Please wait")
    this._inventotyService.getPartyTransactionById($event.Id).subscribe(response=>{
      this.blockUi.stop();
      this.customerTransaction=response
      // const dialogRef=this.matDialog.open(CustomerEntryComponent,{
      //   data:this.customer,
      //   disableClose:true,
      //   height:window.screen.height*.95+'px', 
      //   width:window.screen.width*.5+'px'
      // });
      // dialogRef.afterClosed().subscribe(result=>{
      //   if(result){
      //     this.getCustomerList();
      //   }
      // })
    },error=>{
      this.blockUi.stop();
      let message=error
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }

  getItemTransactionDetails(Id:string){
    
  }
  getCustomerTransactionDetails(customerId:string){

  }
  ledgerOnSeletedItem($event){
    debugger
    this.ledgerTouch=true;
    if($event.id!=null&&$event.id!="0"){
      this.customerTransaction.Ledger_Id=$event.id;
    }
    else{
      this.customerTransaction.Ledger_Id=null
    }
  }
  subledgerOnSeletedItem($event){
    debugger
    if($event.id!=null&&$event.id!="0"){
      this.customerTransaction.SubLedger_Id=$event.id;
    }
    else{
      this.customerTransaction.SubLedger_Id=null
    }
  }
  customerOnSeletedItem($event:MultiSelectDropdown){
    debugger
    if($event.id!="0"){
      this.customerTransaction.Customer_Id=$event.id;
      this.GetSalesTransactionList(this.customerTransaction.Customer_Id,this.formDate,this.toDate);
    }
    else{
      this.groupItemList=[];
      this.customerTransaction.Customer_Id=null;
    }
  }
  payAmountChange(){
    
  }
  distributedTotalAmount(tAmount:number){
    debugger
    let totalAmount=Number(tAmount)
    let totalAmount2=Number(tAmount)
    if(totalAmount!=0){
      let isFound=false;
      this.groupItemList.forEach((a,index)=>{
        if(totalAmount>(a.NetPayableAmount-a.PaidAmount)){
          totalAmount-=(a.NetPayableAmount-a.PaidAmount)
          a.PayAmount=(a.NetPayableAmount-a.PaidAmount);
        }
        else{
          if(!isFound){
            a.PayAmount=totalAmount;
            isFound=true;
          }
        }
      })
      let amount2=0
      let isfound=false
      let firstAmount=this.groupItemList[0].NetPayableAmount-this.groupItemList[0].PaidAmount
      this.groupItemList.forEach((a,index)=>{
        if(firstAmount<totalAmount2){
          if(totalAmount2>amount2){
            amount2+=this.groupItemList[index].NetPayableAmount-this.groupItemList[index].PaidAmount;
            isfound=true;
            a.IsChecked=true
          }
          else{
            if(!isfound){
              alert(index)
            }
          }
        }
        else{
          this.groupItemList[0].IsChecked=true;
        }
      })
    }
    else{
      this.groupItemList.forEach(a=>{
        a.PayAmount=(a.NetPayableAmount-a.PaidAmount);
        a.IsChecked=false;
      })
    }
    this.DataList=this.groupItemList;
  }
  distributedTotalAmountForSpecific(tAmount:number){
    debugger
    let totalAmount=Number(tAmount)
    if(totalAmount!=0){
      let isFound=false;
      this.groupItemList.forEach((a,index)=>{
        if(this.groupItemList[index].IsChecked){
          if(totalAmount>(a.NetPayableAmount-a.PaidAmount)){
            totalAmount-=(a.NetPayableAmount-a.PaidAmount)
            a.PayAmount=(a.NetPayableAmount-a.PaidAmount);
          }
          else{
            if(!isFound){
              a.PayAmount=totalAmount;
              isFound=true;
            }
          }
        }
      })
    }
    else{
      this.groupItemList.forEach((a,index)=>{
        if(a.IsChecked){
          a.PayAmount=(a.NetPayableAmount-a.PaidAmount)
        }
      })
    }
  }
  changePaidAmount(index:number){
    this.customerTransaction.PaidAmount=0;
    this.groupItemList.forEach((a,i)=>{
      if(a.IsChecked){
        this.customerTransaction.PaidAmount+=a.PayAmount
      }
    })
  }
  changeChoose($event,index:number){
    if(this.customerTransaction.PaymentMethod=='specific')
    if($event.target.checked){
      this.customerTransaction.PaidAmount+=Number(this.groupItemList[index].PayAmount)
    }
    else{
      if(this.customerTransaction.PaidAmount>0){
        this.customerTransaction.PaidAmount-=Number(this.groupItemList[index].PayAmount)
      }
    }
  }
  
  dueAmountPaymentMethod(){
    debugger
    if(this.customerTransaction.PaymentMethod=="specific"){
      this.customerTransaction.PaidAmount=0
      this.groupItemList.forEach(a=>{
        if(a.IsChecked){
          this.customerTransaction.PaidAmount+=a.PayAmount;
        }
      })
    }
  }
  fullPayChange($event){
    if($event.target.checked){
      this.customerTransaction.PaidAmount=this.customerTransaction.TotalDueAdvanceAmount;
    }
    else{
      this.customerTransaction.PaidAmount=0;
    }
  }
  customButtonClicked($event:DatatableButtonOutput){
    debugger
    if($event.ColumnName=="View"){
      const dialogRef=this.matDialog.open(ItemTransactionDetailsComponent,{
        data:$event.RowData.Id,
        disableClose:true,
        maxWidth:'100vw',
        maxHeight:'100vh',
        height:'auto',
        width:'95%'
      });
      dialogRef.afterClosed().subscribe(result=>{
        
      })
    }
  }
  customCheckboxClicked($event:DatatableCheckboxOutput){
    debugger
    if($event.RowData!=undefined)
    {
      this.groupItem=$event.RowData;
      if(this.customerTransaction.PaymentMethod=='specific'){
        let position=this.groupItemList.findIndex(m=>m.Id==this.groupItem.Id)
        if($event.IsChecked){
          this.customerTransaction.PaidAmount+=Number(this.groupItemList[position].PayAmount)
        }
        else{
          if(this.customerTransaction.PaidAmount>0){
            this.customerTransaction.PaidAmount-=Number(this.groupItemList[position].PayAmount)
          }
        }
      }
    }
  }
  saveCustomerTransaction(){
    debugger
    this.customerTransaction.TransactionDetailsList=[];
    this.groupItemList.forEach((a,index)=>{
      if(a.IsChecked){
        var transactionDetails=new CustomerSupplierTransactionDetails();
        transactionDetails.Group_Id=a.Id;
        transactionDetails.InvoiceNo=a.InvoiceNo;
        transactionDetails.PaidAmount=a.PayAmount;
        transactionDetails.PaymentDate=this.customerTransaction.PaymentDate;
        this.customerTransaction.TransactionDetailsList.push(transactionDetails);
      }
    })
    if(this.customerTransaction.PaymentType=="refund"){
      this.customerTransaction.PaidAmount*-1;
    }
    if(this.customerTransaction.Id==null){
      this.blockUi.start("Loading....,Please wait")
      this._inventotyService.savePartyTransaction(this.customerTransaction).subscribe(response=>{
        this.blockUi.stop();
        let result=response
        if(result){
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
      this._inventotyService.UpdatePartyTransaction(this.customerTransaction).subscribe(response=>{
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
  ngOnDestroy(){
    this._navigationData.data=null;
  }
}
export class CheckedItem{
  IsChecked:boolean;
}
