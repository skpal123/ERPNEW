import { Component, OnInit,Inject } from '@angular/core';
import { Voucher } from '../../../models/regular-operation/finance/voucher.model';
import { AccountsService } from '../../../services/regular-operation/accounts.service';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { MatDialogRef,MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ChartOfaccount } from '../../../models/master-settings/account-defination/chart-of-account.model';
import { DialogData } from '../../../models/common/dialog-data.model';
import { VoucherDeatils } from '../../../models/regular-operation/finance/voucher-details.model';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { PostLoginService } from '../../../services/common/post-login.service';
import { SubledgerTransactionComponent } from '../subledger-transaction/subledger-transaction.component';
import { SubledgerTransaction } from '../../../models/regular-operation/finance/subledger-transaction.model';
import { SubledgerDialogData } from '../../../models/regular-operation/finance/subledger-dialog-data.model';
import { SubledgerTransactionDataService } from 'src/app/regular-operation/ro-finance/subledger-transaction-data.service';
import { DatatableButtonOutput } from '../../../models/common/datatable-button-output';
import { DatatableTextOutput } from '../../../models/common/datatable-text-click.model';

@Component({
  selector: 'app-add-voucher-dialog',
  templateUrl: './add-voucher-dialog.component.html',
  styleUrls: ['./add-voucher-dialog.component.css']
})
export class AddVoucherDialogComponent implements OnInit {
  IsSaveButtonClick:boolean=false;
  userControlList:UserFormControl[]=[];
  account:ChartOfaccount;
  voucherList:Voucher[]=[];
  selectedVoucher:Voucher;
  TotalAmount:number=0;
  startDate = new Date();
  vDate:Date=new Date();
  cDate:Date=new Date();
  voucher:Voucher={
    Id:null,
    VoucherDate:new Date(),VoucherNo:null,ChequeDate:new Date(),ChequeNo:null,VoucherType:"0",
    BankName:null,BankAccountNo:null,VoucherDetailsList:[]
  };
  subledgerDialogData:SubledgerDialogData={AccountId:null,SubledgerTransactionList:[]}
  subledgerTransaction:SubledgerTransaction={
    Id:null,SubLedger_Id:null,Account_Id:null,SubledgerDescription:null,Amount:0
  };
  subledgerTransactionist:SubledgerTransaction[]=[];
  accountList:ChartOfaccount[]=[];
  filterAccountList:ChartOfaccount[]=[];
  debitAcccountList:ChartOfaccount[]=[];
  columnlist:any=[];
  autoCompleteData=[];
  protected captains = ['male','female','unknown'];
  DataList:any=[];
  constructor(private _accountService:AccountsService,
    private _alertBox:AlertBoxService,
    private _loginService:PostLoginService,
    private matDialog:MatDialog,
    private _subledgerDataService:SubledgerTransactionDataService,
    public dialogRef:MatDialogRef<AddVoucherDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Voucher
) 
{ }
  ngOnInit() {
    debugger
    this.voucher=this.data
    if(this.voucher.VoucherDetailsList.length==0){

    }
    this.TotalAmount=this.getVoucherAmount()
    this.getAccountList();
    //this.getColumnList();
    this.getUserFormControlByFormName();
    this.getDataList();
  }
  onNoClick():void{
    this.dialogRef.close(this.IsSaveButtonClick);
  }
  getAccountList(){
    this._accountService.getChildAccountList().subscribe(response=>{
      this.accountList=response
      this.getAutoCompleteData()
      this.getOneSideAccountForVoucher(this.voucher.VoucherType);
      if(this.voucher.VoucherDetailsList.length==0){
        var voucherDetail=new VoucherDeatils();
        voucherDetail.Lineno=1;
        voucherDetail.AccountId=this.debitAcccountList[0].Id;
        this.voucher.Amount=0;
        this.voucher.VoucherDetailsList.push(voucherDetail);
      }
      else{
      }
    },
  error=>{
    let dialogData=new DialogData();
    dialogData.message=error
    this._alertBox.openDialog(dialogData);
  })
  }
  getAutoCompleteData(){  
    if(this.voucher.VoucherType=="0"||this.voucher.VoucherType=="1"||this.voucher.VoucherType=="2"||this.voucher.VoucherType=="3"){
      this.filterAccountList= this.accountList.filter(x=>x.AccountType.toString()!="1"&&x.AccountType.toString()!="2");
     }
    this.filterAccountList.forEach((account,index,array)=>{
      this.autoCompleteData.push(account.AccountDescription+"-"+account.AutoAccountCode)
    })
  }
  ParentAutoCompleteDataSource($event:string){
    debugger
    if($event!=null &&!this._subledgerDataService.isDialogOpen){
      let accountCode=$event.split('-')[1];
      let account=this.accountList.filter(acc=>acc.AutoAccountCode==accountCode);
      let position=this.voucher.VoucherDetailsList.findIndex(acc=>acc.AccountDescription==$event);
      this.voucher.VoucherDetailsList[position].AccountId=account[0].Id;
      if(account[0]){
        if(account[0].HasSubLedger){
          this._subledgerDataService.isDialogOpen=true
          if(this.voucher.VoucherDetailsList[position].SubLedgerTransactions.length==0){
            this.subledgerDialogData.AccountId=account[0].Id
            var subledgerTransaction=new SubledgerTransaction();
            subledgerTransaction.SubledgerDescription=null;
            subledgerTransaction.Amount=0;
            subledgerTransaction.Account_Id=null;
            subledgerTransaction.SubLedger_Id=null;
            this.subledgerTransactionist.push(subledgerTransaction);
            this.subledgerDialogData.SubledgerTransactionList=this.subledgerTransactionist;
            this._subledgerDataService.subledgerDialogData=this.subledgerDialogData;
          }
          else{
            this.subledgerDialogData.AccountId=account[0].Id
            this.subledgerDialogData.SubledgerTransactionList=this.voucher.VoucherDetailsList[position].SubLedgerTransactions;
            this._subledgerDataService.subledgerDialogData=this.subledgerDialogData;
          }
          const dialogRef2=this.matDialog.open(SubledgerTransactionComponent,{
            data:this.subledgerDialogData,
            disableClose:true,
            height:"auto",
            maxHeight:window.screen.height*.6+'px',
            width:window.screen.width*.4+'px'
          });
          dialogRef2.afterClosed().subscribe((response:SubledgerDialogData)=>{
            this._subledgerDataService.isDialogOpen=false;   
            let position=this.voucher.VoucherDetailsList.findIndex(x=>x.AccountId==response.AccountId);
            let sum=this.getTotalSubledgerAmount(response.SubledgerTransactionList);
            this.voucher.VoucherDetailsList[position].Amount=sum;
            this.voucher.VoucherDetailsList[position].SubLedgerTransactions=response.SubledgerTransactionList;
            console.log(this.voucher);
            this._subledgerDataService.subledgerDialogData.AccountId=null;
            // this.subledgerTransaction.Account_Id=null;
            // this.subledgerTransaction.Amount=0;
            // this.subledgerTransaction.SubledgerDescription=null;
            // this.subledgerTransaction.SubLedger_Id=null;
            this.subledgerTransactionist=[];
            this._subledgerDataService.subledgerDialogData.SubledgerTransactionList=[];
            console.log(this.voucher)
          })
        }
      }
    }
    console.log($event)
  }
  deleteVoucherDetailsRow(index:number){
    debugger
    if(index&&index!=0&&this.voucher.VoucherDetailsList&&this.voucher.VoucherDetailsList.length>2){
      this.voucher.VoucherDetailsList.splice(index+1,1)
    }
    console.log(index)
  }
  getDataList(){
    this.DataList=this.voucher.VoucherDetailsList.filter(fea=>fea.Lineno!=1);
  }
  getOneSideAccountForVoucher(voucherType:string){
    debugger
    if(voucherType=="0"||voucherType=="1"){
      this.debitAcccountList=this.accountList.filter(account=>account.AccountType=="1");
      if( this.debitAcccountList.length>0){
        this.voucher.VoucherDetailsList[0].AccountId=this.debitAcccountList[0].Id
      }
    }
    else if(voucherType=="2"||voucherType=="3"){
      this.debitAcccountList=this.accountList.filter(account=>account.AccountType=="2");
      if(this.debitAcccountList.length>0){
        this.voucher.VoucherDetailsList[0].AccountId=this.debitAcccountList[0].Id
      }
    }
    else if(voucherType=="4"||voucherType=="5"){
      this.debitAcccountList=this.accountList.filter(account=>account.AccountType=="0");
      if(this.debitAcccountList.length>0){
        this.voucher.VoucherDetailsList[0].AccountId=this.debitAcccountList[0].Id
      }
    }
  }
  voucherTypeChange($data){
    console.log($data);
    this.getOneSideAccountForVoucher($data)
  }
  getUserFormControlByFormName(){
    this._loginService.getUserFormControlByFormName('voucher-entry').subscribe(response=>{
      this.userControlList=response
      this.columnlist=this.userControlList;
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  addNewVoucherEntry(){
    let voucherDetails=new VoucherDeatils();
    voucherDetails.Lineno=3;
    voucherDetails.AccountDescription=null;
    voucherDetails.Amount=0;
    voucherDetails.Vat=0;
    voucherDetails.Tax=0
    voucherDetails.SubLedgerTransactions=[];
    this.voucher.VoucherDetailsList.push(voucherDetails);
    this.getDataList();
  }
  getTotalSubledgerAmount(subledgerTransactionList:SubledgerTransaction[]):number{
    let sum=0;
    if(subledgerTransactionList.length>0){
      subledgerTransactionList.forEach((a,index,array)=>{
        sum=sum+a.Amount
      });
    }
    return sum;
  }
  saveVoucher(){
    this.IsSaveButtonClick=true;
    this.voucher.VoucherDate=this.vDate;
    this.voucher.ChequeDate=this.cDate;
    this.voucher.Amount=this.getVoucherAmount();
    if(this.voucher.Id==null){
      this._accountService.CreateVoucher(this.voucher).subscribe(response=>{
        let result=response
        if(result){
          let dialogData=new DialogData();
          dialogData.message="Voucher created succesfully";
          this._alertBox.openDialog(dialogData);
          this.dialogRef.close(this.IsSaveButtonClick)
        }
      },error=>{
        let dialogData=new DialogData();
        dialogData.message=error
        this._alertBox.openDialog(dialogData);
      })
    }else{
      this._accountService.UpdateVoucher(this.voucher).subscribe(response=>{
        let result=response
        if(result){
          let dialogData=new DialogData();
          dialogData.message="Voucher updated succesfully";
          this._alertBox.openDialog(dialogData);
        }
      },error=>{
        let dialogData=new DialogData();
        dialogData.message=error
        this._alertBox.openDialog(dialogData);
      })  
    }
  }
  getVoucherAmount():number{
    let sum=0;
    this.voucher.VoucherDetailsList.forEach((a,index,array)=>{
        if(a.Lineno!=1&&a.Lineno!=0){
          sum=sum+a.Amount+a.Vat+a.Tax;
        }
    });
    return sum;
  }
  GetDatatableColumnTextClicked($event:DatatableTextOutput){
    debugger
    this.selectedVoucher=$event.RowData;
    this.TotalAmount=this.getVoucherAmount();
  }
}
