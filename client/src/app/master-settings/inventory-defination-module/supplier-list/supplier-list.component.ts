import { Component, OnInit } from '@angular/core';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { Supplier } from '../../../models/master-settings/inventory-defination/supplier.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { MatDialog } from '@angular/material';
import { SupplierEntryComponent } from '../supplier-entry/supplier-entry.component';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CustomDatatableService } from '../../../services/common/custom-datatable.service';
import { NavigationDataService } from '../../../services/common/navigation-data.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  reload:boolean=false;
  columnReady:boolean=false;
  dataReady:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  supplierList:Supplier[]=[];
  supplier:Supplier={
    Id:null,SupplierId:null,SupplierName:null,ContactPerson:null,PhoneNo:null,Email:null,
    Ledger_Id:null,SubLedger_Id:null,LedgerName:null,SubLedgerName:null,Address:null
  }
  constructor(private _alertBox:AlertBoxService,
    private _postLoginservice:PostLoginService,
    private _customDatatableService:CustomDatatableService,
    private matDialog:MatDialog,
    private _navigationData:NavigationDataService,
    private _inventotyDefinationService:InventoryDefinationServiceService,
  ) { }
  ngOnInit() {
    debugger
    this.getSupplierList();
    this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this.blockUi.start("Loading....,Please wait.")
    this._postLoginservice.getUserFormControlByFormName('supplier-list').subscribe(response=>{
      this.blockUi.stop();
      this.userControlList=response
      this.ColumnList=this.userControlList
      this._customDatatableService.ColumnList=this.userControlList;
      this.columnReady=true;
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getSupplierList(){
    this.blockUi.start("Loading....,Please wait")
    this._inventotyDefinationService.getSupplierList().subscribe(response=>{
      this.blockUi.stop();
      this.supplierList=response
      this.DataList=this.supplierList;
      this._customDatatableService.DataList=this.supplierList;
      //this.reload=true;
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getSupplierDetails($event:Supplier){
    debugger
    this.blockUi.start("Loading....,Please wait")
    this._inventotyDefinationService.getSupplierById($event.Id).subscribe(response=>{
      this.blockUi.stop();
      this.supplier=response
      this._navigationData.IsUpdate=true;
      this._navigationData.PreviousData=this.supplier.SupplierId;
      const dialogRef=this.matDialog.open(SupplierEntryComponent,{
        data:this.supplier,
        disableClose:true,
        height:'auto', 
        width:window.screen.width*.5+'px'
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.getSupplierList();
        }
      })
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteSupplier($event:Supplier){
    this.blockUi.start("Loading....,Please wait")
    this._inventotyDefinationService.deleteSupplier($event.Id).subscribe(response=>{
      this.blockUi.stop();
      let result=response
      if(result){
        this.getSupplierList();
        let dialogData=new DialogData();
        dialogData.message="Supplier deleted succesfully";
        this._alertBox.openDialog(dialogData);
      }
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  createNewSupplier(){
   this.clearSupplier();
    const dialogRef=this.matDialog.open(SupplierEntryComponent,{
      data:this.supplier,
      disableClose:true,
      height:'auto',
      width:window.screen.width*.5+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getSupplierList();
      }
    })
  }
  clearSupplier(){
    this.supplier.Id=null;
    this.supplier.SupplierId=null;
    this.supplier.SupplierName=null;
    this.supplier.ContactPerson=null;
    this.supplier.PhoneNo=null;
    this.supplier.Email=null;
    this.supplier.Address=null;
    this.supplier.Ledger_Id=null;
    this.supplier.SubLedger_Id=null;
  }
}
