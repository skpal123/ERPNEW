import { Component, OnInit,Input,Output,EventEmitter, OnChanges } from '@angular/core';
import { Unit } from '../../models/master-settings/inventory-defination/unit.model';
import { MultiSelectDropdown } from '../../models/common/multiselect.dropdown.model';
import { AlertBoxService } from '../../shared/alert-box.service';
import { InventoryDefinationServiceService } from '../../services/master-settings/inventory-defination-service.service';
import { DropdownService } from '../../services/common/dropdown.service';
import { SelectDropdown } from '../../models/common/select.dropdown.model';
import { DialogData } from '../../models/common/dialog-data.model';

@Component({
  selector: 'app-unit-dropdown',
  templateUrl: './unit-dropdown.component.html',
  styleUrls: ['./unit-dropdown.component.css']
})
export class UnitDropdownComponent implements OnChanges {
  @Input() IsNewUnitAdd:boolean=false;
  unitList:SelectDropdown[]=[]
  @Input() unitSelectedItems:any=[];
  @Output() unitOnItemSelect:EventEmitter <any>=new EventEmitter <any>();
  @Output() unitOnItemDeSelect:EventEmitter <any>=new EventEmitter <any>();

  unitDropdownList: MultiSelectDropdown[] = [
    { id: "0", itemName: "Select" }
  ];
  unitDropdownSettings = {
    singleSelection: true,
    text: "Select unit",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    showCheckbox:true
    
  };
  constructor(private _alertBox:AlertBoxService,
    private _dropdownService:DropdownService,
  ) { }

  ngOnChanges() {
    debugger
    if(this.IsNewUnitAdd){
      this.getUnitList();
    }else{
      this.getUnitList();
    }
  }
  getUnitList(){
    this._dropdownService.getUnitDropdownList().subscribe(response=>{
      this.unitList=response
      if(this.unitList.length>0){
        this.unitList.forEach((a,index,array)=>{
          this.unitDropdownList.push({id:a.Value,itemName:a.Text});
        })
      }
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error;
      this._alertBox.openDialog(dialogData);
    })
  }
  unitOnItemSelect1($event:MultiSelectDropdown){
    debugger
    this.unitOnItemSelect.emit($event)
  }
  categoryOnItemDeSelect1($event){
    debugger
    this.unitOnItemDeSelect.emit($event)
  }
}
