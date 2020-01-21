import { Component, OnInit,Input,Output,EventEmitter,ViewChild, OnChanges } from '@angular/core';
import { SelectDropdown } from '../../models/common/select.dropdown.model';
import { FormControl } from '@angular/forms';
import { MultiSelectDropdown } from '../../models/common/multiselect.dropdown.model';
import { AlertBoxService } from '../../shared/alert-box.service';
import { DropdownService } from '../../services/common/dropdown.service';
import { DialogData } from '../../models/common/dialog-data.model';

@Component({
  selector: 'app-party-dropdown',
  templateUrl: './party-dropdown.component.html',
  styleUrls: ['./party-dropdown.component.css']
})
export class PartyDropdownComponent implements OnChanges {

  partyList:SelectDropdown[]=[]
  @ViewChild('category') category:FormControl;
  @Input() IsNewPartyAdd:boolean=false;
  @Input() partySelectedItems:any=[];
  @Output() partyOnItemSelect:EventEmitter <any>=new EventEmitter <any>();
  @Output() partyOnItemDeSelect:EventEmitter <any>=new EventEmitter <any>();

  partyDropdownList: MultiSelectDropdown[] = [
    { id: "0", itemName: "Select" }
  ];
  partyDropdownSettings = {
    singleSelection: true,
    text: "Select party",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    showCheckbox:true
    
  };
  constructor(private _alertBox:AlertBoxService,
    // private _inventotyDefinationService:InventoryDefinationServiceService,
    private _dopdownService:DropdownService
  ) { 
    console.log(this.category)
  }

  ngOnChanges() {
    debugger
    if(this.IsNewPartyAdd){
      this.getPartyList();
    }else{
      this.getPartyList();
    }
  }
  getPartyList(){
    this._dopdownService.getPartyDropdownList().subscribe(response=>{
      this.partyList=response
      if(this.partyList.length>0){
        this.partyList.forEach((category,index,array)=>{
          this.partyDropdownList.push({id:category.Value,itemName:category.Code+'-'+category.Text});
        })
      }
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error;
      this._alertBox.openDialog(dialogData);
    })
  }
  partyOnItemSelect1($event:MultiSelectDropdown){
    debugger
    this.partyOnItemSelect.emit($event)
  }
  partyOnItemDeSelect1($event){
    debugger
    this.partyOnItemDeSelect.emit($event)
  }

}
