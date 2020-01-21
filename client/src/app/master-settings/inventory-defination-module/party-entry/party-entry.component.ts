import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { MultiSelectDropdown } from '../../../models/common/multiselect.dropdown.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Party } from '../../../models/master-settings/inventory-defination/party.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { NewDropdownDataService } from '../../../common-module/new-dropdown-data.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { BlockUI,NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-party-entry',
  templateUrl: './party-entry.component.html',
  styleUrls: ['./party-entry.component.css']
})
export class PartyEntryComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  @ViewChild('itemForm') itemForm:NgForm
  @ViewChild('ledgerIdControl') ledgerIdControl:FormControl
  ledgerTouch:boolean=false;
  ledgerSelectedItems :MultiSelectDropdown[]= [
  ];
  subledgerSelectedItems :MultiSelectDropdown[]= [
  ];
  constructor(public matDialogRef:MatDialogRef<PartyEntryComponent>,
  @Inject(MAT_DIALOG_DATA) public party:Party,
  private _alertBox:AlertBoxService,
  private _newDropdownService:NewDropdownDataService,
  private _inventotyDefinationService:InventoryDefinationServiceService,
) { }

  ngOnInit() {
    debugger
    if(this.party.Id==null){
      this.ledgerSelectedItems.push({id:"0",itemName:"SELECT"})
      this.subledgerSelectedItems.push({id:"0",itemName:"SELECT"})
    }
    else{
      this.ledgerSelectedItems.push({id:this.party.Ledger_Id,itemName:this.party.LedgerName})
      this.subledgerSelectedItems.push({id:this.party.SubLedger_Id,itemName:this.party.SubLedgerName})
    }
  }
  onNoClick(){
    this.matDialogRef.close(false);
  }
  saveItem(){
    debugger
    if(this.party.Id==null){
      console.log(this.party);
      this.blockUi.start("Loading....,Please wait")
      this._inventotyDefinationService.CreateParty(this.party).subscribe(response=>{
        this.blockUi.stop();
        let result=response
        if(result){
          this.matDialogRef.close(response);
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
      this._inventotyDefinationService.UpdateParty(this.party).subscribe(response=>{
        this.blockUi.stop();
        let result=response
        if(result){
          this.matDialogRef.close(true);
          let dialogData=new DialogData();
          dialogData.message="Update successfully";
          this._alertBox.openDialog(dialogData);
        }
      },error=>{
        this.blockUi.stop();
        let dialogData=new DialogData();
        dialogData.message=error
        this._alertBox.openDialog(dialogData);
      })
    }
  }

  ledgerOnSeletedItem($event){
    debugger
    this.ledgerTouch=true;
    if($event.id!=null&&$event.id!="0"){
      this.party.Ledger_Id=$event.id;
    }
    else{
      this.party.Ledger_Id=null
    }
  }
  subledgerOnSeletedItem($event){
    debugger
    if($event.id!=null&&$event.id!="0"){
      this.party.SubLedger_Id=$event.id;
    }
  }
  OnDeSeletedItem($event){
    console.log($event)
  }
}
