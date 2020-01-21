import { Component, OnInit, Input, Output,EventEmitter, ViewChild } from '@angular/core';
import { Voucher } from '../../../models/regular-operation/finance/voucher.model';
import { AccountsService } from '../../../services/regular-operation/accounts.service';
import { MatDialog } from '@angular/material';
import { AddVoucherDialogComponent } from '../add-voucher-dialog/add-voucher-dialog.component';
import { DialogData } from '../../../models/common/dialog-data.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { VoucherDeatils } from '../../../models/regular-operation/finance/voucher-details.model';
import { FormControl } from '@angular/forms';
import { SubledgerDialogData } from '../../../models/regular-operation/finance/subledger-dialog-data.model';
import { SubledgerTransactionComponent } from '../subledger-transaction/subledger-transaction.component';
import { SubledgerTransaction } from '../../../models/regular-operation/finance/subledger-transaction.model';
import { PostLoginService } from '../../../services/common/post-login.service';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { CustomDatatableService } from '../../../services/common/custom-datatable.service';

@Component({
  selector: 'app-voucher-list',
  templateUrl: './voucher-list.component.html',
  styleUrls: ['./voucher-list.component.css']
})
export class VoucherListComponent implements OnInit {
  columnReady:boolean=false;
  dataReady:boolean=false;
  reload:boolean=false;
  @ViewChild('formDateControl') formDateControl:FormControl;
  @ViewChild('toDateControl') toDateControl:FormControl;
  userControlList:UserFormControl[]=[];
  columnlist:any[]=[];
  DataList:any[]=[];
  subledgerData:SubledgerDialogData={AccountId:null,SubledgerTransactionList:[]}
  subledgerTransaction:SubledgerTransaction={
    Id:null,SubLedger_Id:null,Account_Id:null,SubledgerDescription:null,Amount:0
  };
  subledgerTransactionist:SubledgerTransaction[]=[];
  allCheck:boolean=false;
  startDate = new Date();
  formDate:Date=new Date();
  toDate:Date=new Date();
  @Output() VoucherDetalisClicked:EventEmitter <any>=new EventEmitter <any>();
  addContainerClass1:boolean=true;
  addSpanClass1:boolean=true;
  voucherList:Voucher[]=[];
  voucher:Voucher={
    Id:null,
    VoucherDate:null,VoucherNo:null,ChequeDate:null,ChequeNo:null,VoucherType:"0",
    BankName:null,BankAccountNo:null,VoucherDetailsList:[]
  };
  constructor(private _accountService:AccountsService,
    private matDialog:MatDialog,
    private _loginService:PostLoginService,
    private _customDatatableService:CustomDatatableService,
    private _alertBox:AlertBoxService) { }
  ngOnInit() {
    this.getVoucherList();
    this.getUserFormControlByFormName();

  }
  getVoucherList(){
    this._accountService.getVoucherList().subscribe(response=>{
      this.voucherList=response
      this.voucherList.forEach((voucher,index,array)=>{
        voucher.Status=voucher.VoucherStatus;
        voucher.VStatus=voucher.VoucherStatus==true?"Approved":"Not Aprroved";
        voucher.VType=voucher.VoucherType=="0"?"CR":voucher.VoucherType=="1"?"CP":voucher.VoucherType=="2"?"BR":
        voucher.VoucherType=="3"?"BP":voucher.VoucherType=="4"?"AR":voucher.VoucherType=="5"?"AP":
        voucher.VoucherType=="6"?"JV":"Contra"
      });
      this.DataList=this.voucherList;
      this.reload=true;
      this.dataReady=true;
      this._customDatatableService.DataList=this.voucherList;
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  createNewVoucher(){
  this.clearVoucherData();
   const dialogRef=this.matDialog.open(AddVoucherDialogComponent,{
      data:this.voucher,
      disableClose:true,
      maxHeight:window.screen.height*.8+'px',
      height:'auto',
      width:window.screen.width*.8+'px'
    });
    dialogRef.afterClosed().subscribe(response=>{
      if(response){
        this.getVoucherList();
      }
    })
  }

  getVoucherDetails($data:Voucher){
    debugger
      this._accountService.getVoucherDetailsById($data.Id).subscribe(response=>{
        this.voucher=response
        console.log(this.voucher)
        const dialogRef=this.matDialog.open(AddVoucherDialogComponent,{
          data:this.voucher,
          disableClose:true,
          maxHeight:window.screen.height*.8+'px',
          height:'auto',
          width:window.screen.width*.8+'px'
        });
        dialogRef.afterClosed().subscribe(response=>{
          if(response){
            this.getVoucherList();
          }
        })
      },error=>{
        let dialogData=new DialogData();
        dialogData.message=error
        this._alertBox.openDialog(dialogData);
      })
  }
  getUserFormControlByFormName(){
    this._loginService.getUserFormControlByFormName('voucher-list').subscribe(response=>{
      this.userControlList=response
      this.columnlist=this.userControlList;
      this.columnReady=true;
      this._customDatatableService.ColumnList=this.userControlList;
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  clearVoucherData(){
    let voucherDetailsList:VoucherDeatils[]=[];
    this.voucher.Id=null;
    this.voucher.VoucherNo=null;
    this.voucher.VoucherDate=null;
    this.voucher.VoucherType="1";
    for(let i=1;i<=2;i++){
      let voucherDetails=new VoucherDeatils();
      voucherDetails.Lineno=i;
      voucherDetails.Amount=0;
      voucherDetails.Vat=0;
      voucherDetails.Tax=0
      voucherDetails.SubLedgerTransactions=[];
      voucherDetailsList.push(voucherDetails);
    }
    this.voucher.VoucherDetailsList=voucherDetailsList;
    this.voucher.ChequeDate=null;
    this.voucher.ChequeNo=null;
    this.voucher.BankAccountNo=null;
    this.voucher.BankName=null;
  }
  open(){
    this.subledgerTransactionist.push(this.subledgerTransaction);
    this.subledgerData.SubledgerTransactionList=this.subledgerTransactionist;
    const dialogRef2=this.matDialog.open(SubledgerTransactionComponent,{
      data:this.subledgerData,
      disableClose:true,
      maxHeight:window.screen.height*.6+'px',
      height:'auto',
      width:window.screen.width*.4+'px'
    });
    dialogRef2.afterClosed().subscribe(response=>{
      console.log(response);
    })
  }
  deleteVoucher($event:Voucher){
    this._accountService.deleteVoucher($event.Id).subscribe(response=>{
     let result=response
      if(result){
        let dialogData=new DialogData();
        dialogData.message="Delete voucher succesfully";
        this._alertBox.openDialog(dialogData);
        this.getVoucherList();
      }
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  CheckedAllVoucher(IsChecked:boolean){
    this.allCheck=IsChecked;
    this.voucherList.forEach((voucher,index,array)=>{
      voucher.Status=IsChecked
    })
  }
}
