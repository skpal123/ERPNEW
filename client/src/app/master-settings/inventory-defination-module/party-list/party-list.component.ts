import { Component, OnInit } from '@angular/core';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { Party } from '../../../models/master-settings/inventory-defination/party.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { MatDialog } from '@angular/material';
import { DialogData } from '../../../models/common/dialog-data.model';
import { PartyEntryComponent } from '../party-entry/party-entry.component';
import { CustomDatatableService } from '../../../services/common/custom-datatable.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-party-list',
  templateUrl: './party-list.component.html',
  styleUrls: ['./party-list.component.css']
})
export class PartyListComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  reload:boolean=false;
  columnReady:boolean=false;
  dataReady:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  partyList:Party[]=[];
  party:Party={
    Id:null,PartyId:null,PartyName:null,ContactPerson:null,PhoneNo:null,Email:null,
    Ledger_Id:null,SubLedger_Id:null,LedgerName:null,SubLedgerName:null,Address:null
  }
  constructor(private _alertBox:AlertBoxService,
    private _postLoginservice:PostLoginService,
    private _customDatatableService:CustomDatatableService,
    private _inventotyDefinationService:InventoryDefinationServiceService,
    private matDialog:MatDialog
  ) { }
  ngOnInit() {
    debugger
    this.getPartyList();
    this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this.blockUi.start("Loading....,Please wait.")
    this._postLoginservice.getUserFormControlByFormName('party-list').subscribe(response=>{
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
  getPartyList(){
    this.blockUi.start("Loading....,Please wait.")
    this._inventotyDefinationService.getPartyList().subscribe(response=>{
      this.blockUi.stop();
      this.partyList=response
      this.DataList=this.partyList;
      this._customDatatableService.DataList=this.partyList;
      this.reload=true;
      this.dataReady=true;
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getPartyDetails($event:Party){
    debugger
    this.blockUi.start("Loading....,Please wait.")
    this._inventotyDefinationService.getPartyById($event.Id).subscribe(response=>{
      this.blockUi.stop();
      this.party=response
      const dialogRef=this.matDialog.open(PartyEntryComponent,{
        data:this.party,
        disableClose:true,
        height:window.screen.height*.95+'px', 
        width:window.screen.width*.5+'px'
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.getPartyList();
        }
      })
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteParty($event:Party){
    this.blockUi.start("Loading....,Please wait.")
    this._inventotyDefinationService.deleteParty($event.Id).subscribe(response=>{
      this.blockUi.stop();
      let result=response
      if(result){
        this.getPartyList();
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
    const dialogRef=this.matDialog.open(PartyEntryComponent,{
      data:this.party,
      disableClose:true,
      height:window.screen.height*.95+'px',
      width:window.screen.width*.5+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getPartyList();
      }
    })
  }
  clearItem(){
    this.party.Id=null;
    this.party.PartyId=null;
    this.party.PartyName=null;
    this.party.ContactPerson=null;
    this.party.PhoneNo=null;
    this.party.Email=null;
    this.party.Address=null;
    this.party.Ledger_Id=null;
    this.party.SubLedger_Id=null;
  }
}
