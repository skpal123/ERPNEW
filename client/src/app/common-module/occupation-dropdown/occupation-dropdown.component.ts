import { Component, OnInit, OnChanges, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { SelectDropdown } from '../../models/common/select.dropdown.model';
import { FormControl } from '@angular/forms';
import { MultiSelectDropdown } from '../../models/common/multiselect.dropdown.model';
import { AlertBoxService } from '../../shared/alert-box.service';
import { DropdownService } from '../../services/common/dropdown.service';
import { DialogData } from '../../models/common/dialog-data.model';

@Component({
  selector: 'app-occupation-dropdown',
  templateUrl: './occupation-dropdown.component.html',
  styleUrls: ['./occupation-dropdown.component.css']
})
export class OccupationDropdownComponent implements OnChanges {
  occupationList:SelectDropdown[]=[]
  @ViewChild('category') category:FormControl;
  @Input() IsNewOccupationAdd:boolean=false;
  @Input() occupationSelectedItems:any=[];
  @Output() occupationOnItemSelect:EventEmitter <any>=new EventEmitter <any>();
  @Output() occupationOnItemDeSelect:EventEmitter <any>=new EventEmitter <any>();
  occupationDropdownList: MultiSelectDropdown[] = [
    { id: "0", itemName: "Select" }
  ];
  occupationDropdownSettings = {
    singleSelection: true,
    text: "Select occupation",
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
    if(this.IsNewOccupationAdd){
      this.getOccupationList();
    }else{
      this.getOccupationList();
    }
  }
  getOccupationList(){
    this._dopdownService.getOccupationDropdownList().subscribe(response=>{
      this.occupationList=response
      if(this.occupationList.length>0){
        this.occupationList.forEach((category,index,array)=>{
          this.occupationDropdownList.push({id:category.Value,itemName:category.Code+'-'+category.Text});
        })
      }
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  occupationOnItemSelect1($event:MultiSelectDropdown){
    debugger
    this.occupationOnItemSelect.emit($event)
  }
  occupationOnItemDeSelect1($event){
    debugger
    this.occupationOnItemDeSelect.emit($event)
  }
}
