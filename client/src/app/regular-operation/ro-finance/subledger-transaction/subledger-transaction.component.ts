import { Component, OnInit,Inject, OnDestroy } from '@angular/core';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { AccountsService } from '../../../services/regular-operation/accounts.service';
import { SubledgerTransaction } from '../../../models/regular-operation/finance/subledger-transaction.model';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { DialogData } from '../../../models/common/dialog-data.model';
import { SubledgerDialogData } from '../../../models/regular-operation/finance/subledger-dialog-data.model';
import { AccountDefinationService } from '../../../services/master-settings/account-defination.service';
import { Subledger } from '../../../models/master-settings/account-defination/subledger.model';
import { SubledgerTransactionDataService } from 'src/app/regular-operation/ro-finance/subledger-transaction-data.service';
import { AddSubledgerComponent } from '../../../master-settings/accounts-defination-module/add-subledger/add-subledger.component';

@Component({
  selector: 'app-subledger-transaction',
  templateUrl: './subledger-transaction.component.html',
  styleUrls: ['./subledger-transaction.component.css']
})
export class SubledgerTransactionComponent implements OnInit,OnDestroy {
  userControlList:UserFormControl[]=[];
  columnlist:any[]=[];
  subledgerList:Subledger[];
  autoCompleteData=[];
  Datalist:any[]=[];
  subledger:Subledger={Id:null,AccountId:null,SublederCode:null,Description:null}
  subledgerData:SubledgerDialogData={AccountId:null,SubledgerTransactionList:[]}
  constructor(private _accountService:AccountDefinationService,
    private _alertBox:AlertBoxService,
    private _loginService:PostLoginService,  
    private matDialog:MatDialog,
    private _subledgerDataService:SubledgerTransactionDataService, 
    public dialogRef:MatDialogRef<SubledgerTransactionComponent>,
    @Inject(MatDialogRef) public data: SubledgerDialogData
) 
{ 
  this.subledgerData=_subledgerDataService.subledgerDialogData;
}

  ngOnInit() {
    debugger
    //this.subledgerData=this.data;
    this.getUserFormControlByFormName();
    this.geSubledgerList()
    this.Datalist=this.subledgerData.SubledgerTransactionList;
  }
  onNoClick():void{
    this.dialogRef.close(this.subledgerData);
  }
  getUserFormControlByFormName(){
    this._loginService.getUserFormControlByFormName('subledger-transaction').subscribe(response=>{
      this.userControlList=response
      this.columnlist=this.userControlList;
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  geSubledgerList(){
    this._accountService.GetSublederList(this.subledgerData.AccountId).subscribe(response=>{
      this.subledgerList=response
      this.subledgerList.forEach((a,index,array)=>{
        this.autoCompleteData.push(a.Description+'-'+a.SublederCode);
      })
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  ngOnDestroy(){
    //this.subledgerData.AccountId=null;
    //this.subledgerData.SubledgerTransactionList=[];
  }
  ParentAutoCompleteDataSource($event:string){
    if($event!=null){
      let code=$event.split('-')[1];
      let subledger=this.subledgerList.filter(x=>x.SublederCode==code)[0];
      let position=this.subledgerData.SubledgerTransactionList.findIndex(x=>x.SubledgerDescription==$event);
      if(subledger){
        this.subledgerData.SubledgerTransactionList[position].Account_Id=this.subledgerData.AccountId;
        this.subledgerData.SubledgerTransactionList[position].SubLedger_Id=subledger.Id;
      }
    }
  }
  postSubledger(){
    this.dialogRef.close(this.subledgerData);
  }
  addNewSubledgerEntry(){
    var subledgerTransaction=new SubledgerTransaction();
    subledgerTransaction.Account_Id=this.subledgerData.AccountId;
    subledgerTransaction.SubLedger_Id=null;
    subledgerTransaction.Amount=0;
    subledgerTransaction.SubledgerDescription=null;
    this.subledgerData.SubledgerTransactionList.push(subledgerTransaction);
  }
  autoCompleteNewEntry($event){
    this.subledger.AccountId=this.subledgerData.AccountId;
    const dialogRef = this.matDialog.open(AddSubledgerComponent, {
      disableClose: true,
      data: this.subledger,
      maxHeight: window.screen.height * .6 + 'px',
      height: 'auto',
      width: window.screen.width * .6 + 'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.autoCompleteData.push(result.Description+'-'+result.SublederCode)
      }
    })
  }
  deleteSubledgerDetailsRow($event){
    
  }
}
