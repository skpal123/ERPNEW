import { Component, OnInit } from '@angular/core';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { InventoryItem } from '../../../models/master-settings/inventory-defination/inventory-item.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { MatDialog } from '@angular/material';
import { DialogData } from '../../../models/common/dialog-data.model';
import { ItemEntryComponent } from '../item-entry/item-entry.component';
import { FormDetailsControlComponent } from '../../../common-module/form-details-control/form-details-control.component';
import { CustomDatatableService } from '../../../services/common/custom-datatable.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NavigationDataService } from '../../../services/common/navigation-data.service';
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  reload:boolean=false;
  columnReady:boolean=false;
  dataReady:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  inventoryItemList:InventoryItem[]=[];
  inventoryItem:InventoryItem={
    Id:null,Category_Id:null,ItemCode:null,ItemId:null,ItemName:null,
    Ledger_Id:null,SubLedger_Id:null,UnitId:null,SubCategory_Id:null
  }
  constructor(private _alertBox:AlertBoxService,
    private _postLoginservice:PostLoginService,
    private _customDatatableService:CustomDatatableService,
    private _navigationData:NavigationDataService,
    private _inventotyDefinationService:InventoryDefinationServiceService,
    private matDialog:MatDialog
  ) { }
  ngOnInit() {
    debugger
    this.getItemList();
    this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this.blockUi.start("Loading....,Please wait.")
    this._postLoginservice.getUserFormControlByFormName('item-list').subscribe(response=>{
      this.blockUi.stop();
      this.userControlList=response
      this.ColumnList=this.userControlList;
      this._customDatatableService.ColumnList=this.userControlList;
      this.columnReady=true;
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getItemList(){
    this.blockUi.start("Loading....,Please wait.")
    this._inventotyDefinationService.getInventoryItemList().subscribe(response=>{
      this.blockUi.stop();
      this.inventoryItemList=response
      this.DataList=this.inventoryItemList
      this.reload=true;
      this._customDatatableService.DataList=this.inventoryItemList;
      this.dataReady=true;
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getItemDetails($event:InventoryItem){
    debugger
    this.blockUi.start("Loading....,Please wait.")
    this._inventotyDefinationService.getInventoryItemById($event.Id).subscribe(response=>{
      this.blockUi.stop();
      this.inventoryItem=response;
      this._navigationData.IsUpdate=true;
      this._navigationData.PreviousData=this.inventoryItem.ItemId;
      this._navigationData.PreviousData=this.inventoryItem.ItemCode;
      const dialogRef=this.matDialog.open(ItemEntryComponent,{
        data:this.inventoryItem,
        disableClose:true,
        height:'auto',
        maxHeight:window.screen.height*.95+'px', 
        width:window.screen.width*.5+'px'
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.getItemList();
        }
      })
    },error=>{
      this.blockUi.stop();
      let message=error
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteItem($event:InventoryItem){
    this.blockUi.start("Loading....,Please wait.")
    this._inventotyDefinationService.deleteInventoryItem($event.Id).subscribe(response=>{
      this.blockUi.stop();
      let result=response
      if(result){
        this.getItemList();
        let dialogData=new DialogData();
        dialogData.message="Category deleted succesfully";
        this._alertBox.openDialog(dialogData);
      }
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  createNewItem(){
   this.clearItem();
    const dialogRef=this.matDialog.open(ItemEntryComponent,{
      data:this.inventoryItem,
      disableClose:true,
      height:'auto',
      maxHeight:window.screen.height*.95+'px',
      width:window.screen.width*.5+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getItemList();
      }
    })
  }
  clearItem(){
    this.inventoryItem.Id=null;
    this.inventoryItem.ItemCode=null;
    this.inventoryItem.ItemId=null;
    this.inventoryItem.ItemName=null;
    this.inventoryItem.Category_Id=null;
    this.inventoryItem.SubCategory_Id=null;
    this.inventoryItem.UnitId=null;
    this.inventoryItem.Ledger_Id=null;
    this.inventoryItem.SubLedger_Id=null;
  }
  controlItemForm(){
    const dialogRef=this.matDialog.open(FormDetailsControlComponent,{
      data:"itementry",
      disableClose:true,
      //height:window.screen.height*.6+'px',
      width:window.screen.width*.8+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
     
    })
  }

}
