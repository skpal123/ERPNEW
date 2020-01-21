import { Component, OnInit } from '@angular/core';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { GroupItem } from '../../../models/regular-operation/inventory/group-item.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { MatDialog } from '@angular/material';
import { DialogData } from '../../../models/common/dialog-data.model';
import { ItemPurchaseComponent } from '../item-purchase/item-purchase.component';
import { ItemPurchaseValidation } from '../../../models/validation/item-purchase.validation.model';
import { ValidationService } from '../../../services/common/validation.service';
import { InventoryService } from '../../../services/regular-operation/inventory.service';
import { CustomDatatableService } from '../../../services/common/custom-datatable.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CustomDatatableControlComponent } from '../../../common-module/custom-datatable-control/custom-datatable-control.component';

@Component({
  selector: 'app-item-purchase-list',
  templateUrl: './item-purchase-list.component.html',
  styleUrls: ['./item-purchase-list.component.css']
})
export class ItemPurchaseListComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  reload:boolean=false;
  columnChange:boolean=false;
  columnReady:boolean=false;
  dataReady:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  groupItemList:GroupItem[]=[];
  itemPurchaseValidationList:ItemPurchaseValidation[]=[];
  groupItem:GroupItem={
    Id:null,TransactionId:null,TransactionType:null,Quantity:null,data:[],
    TotalAmount:null,Ledger_Id:null,SubLedger_Id:null,LedgerId:null,SubLedgerId:null,PaymentMode:0,
    Vat:null,Tax:null,DiscountAmount:null,DiscountRate:null,NetPayableAmount:null,ItemTransactionList:[]
  }
  constructor(private _alertBox:AlertBoxService,
    private _postLoginservice:PostLoginService,
    private _validationService:ValidationService,
    private _inventotyService:InventoryService,
    private _customDatatableService:CustomDatatableService,
    private matDialog:MatDialog
  ) { }
  ngOnInit() {
    debugger
    this.getGroupItemList();
    this.getUserFormControlByFormName();
    this.getItemPurchaseValidationList()
  }
  getUserFormControlByFormName(){
    this.blockUi.start("Loading....,Please wait.")
    this._postLoginservice.getUserFormControlByFormName('item-group').subscribe(response=>{
      this.blockUi.stop();
      this.userControlList=response
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
  
  getGroupItemList(){
    this.blockUi.start("Loading....,Please wait.")
    this._inventotyService.getGroupItemList("Purchase").subscribe((response:GroupItem[])=>{
      this.blockUi.stop();
      this.groupItemList=response
      this.DataList=this.groupItemList
      this.reload=true;
      this.dataReady=true;
      this._customDatatableService.DataList=this.groupItemList;
    },error=>{
      this.blockUi.stop();
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  getGroupItemDetails($event:GroupItem){
    debugger
    this.blockUi.start("Loading....,Please wait.")
    this._inventotyService.getGroupItemById($event.Id).subscribe((response:GroupItem)=>{
      this.blockUi.stop();
      this.groupItem=response;
      this.groupItem.data=this.itemPurchaseValidationList;
      const dialogRef=this.matDialog.open(ItemPurchaseComponent,{
        data:this.groupItem,
        disableClose:true,
        height:window.screen.height*.95+'px', 
        width:window.screen.width*1.2+'px'
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.getGroupItemList();
        }
      })
    },error=>{
      this.blockUi.stop();
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteGroupItem($event:GroupItem){
    this.blockUi.start("Loading....,Please wait.")
    this._inventotyService.deleteGroupItem($event.Id).subscribe((response:boolean)=>{
      this.blockUi.stop();
      let result=response;
      if(result){
        this.getGroupItemList();
        let dialogData=new DialogData();
        dialogData.message="Invoice deleted succesfully";
        this._alertBox.openDialog(dialogData);
      }
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  createGroupItem(){
   this.clearItem();
    const dialogRef=this.matDialog.open(ItemPurchaseComponent,{
      data:this.groupItem,
      disableClose:true,
      maxWidth:'100vw',
      maxHeight:'100vh',
      height:'100%',
      width:'95%'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getGroupItemList();
      }
    })
  }
  clearItem(){
    this.groupItem.Id=null;
    this.groupItem.TransactionId=null;
    this.groupItem.ChalanNo=null;
    this.groupItem.InvoiceNo=null;
    this.groupItem.Supplier_Id=null;
    this.groupItem.Reason=null;
    this.groupItem.TransactionDate=null;
    this.groupItem.GrvNo=null;
    this.groupItem.GrvDate=null;
    this.groupItem.Comments=null;
    this.groupItem.LotNo=null;
    this.groupItem.TotalAmount=0
    this.groupItem.Quantity=0
    this.groupItem.DiscountRate=0
    this.groupItem.DiscountAmount=0
    this.groupItem.Vat=0
    this.groupItem.Tax=0
    this.groupItem.NetPayableAmount=0
    this.groupItem.Approver_Id=null
    this.groupItem.Ledger_Id=null
    this.groupItem.SubLedger_Id=null
    this.groupItem.PaymentMode=0
    this.groupItem.TransactionType==null;
    this.groupItem.ItemTransactionList=[];
  }
  getItemPurchaseValidationList(){
    debugger
    this.blockUi.start("Loading....,Please wait.")
    this._validationService.getItemPurchaseValidationData("purchase-form").subscribe((response:ItemPurchaseValidation[])=>{
      this.blockUi.stop();
      this.itemPurchaseValidationList=response
      this.groupItem.data= this.itemPurchaseValidationList;
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getDatatableControl(){
    this.columnChange=false;
    const dialogRef=this.matDialog.open(CustomDatatableControlComponent,{
      data:this.userControlList,
      disableClose:true,
      height:window.screen.height*.9+'px',
      width:window.screen.width*.5+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
     if(result){
      // this.columnChange=true;
     }
    })
  }
  // getUserFormControlByFormName(){
  //   this.blockUi.start("Loading....,Please wait.")
  //   this._postLoginService.getUserFormControlByFormName(this.ColumnList[0].FormName).subscribe(response=>{
  //     this.blockUi.stop();
  //     this.ColumnList=response;
  //     this.dtTrigger.next();
  //     this.dtTrigger.subscribe();
  //   },error=>{
  //     this.blockUi.stop();
  //     let dialogData=new DialogData();
  //     dialogData.message=error
  //     this._alertBox.openDialog(dialogData);
  //   })
  // }
}
