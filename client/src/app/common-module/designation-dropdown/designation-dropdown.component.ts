import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { SelectDropdown } from '../../models/common/select.dropdown.model';
import { FormControl } from '@angular/forms';
import { MultiSelectDropdown } from '../../models/common/multiselect.dropdown.model';
import { AlertBoxService } from '../../shared/alert-box.service';
import { DropdownService } from '../../services/common/dropdown.service';
import { DialogData } from '../../models/common/dialog-data.model';

@Component({
  selector: 'app-designation-dropdown',
  templateUrl: './designation-dropdown.component.html',
  styleUrls: ['./designation-dropdown.component.css']
})
export class DesignationDropdownComponent implements OnChanges {
  designationList:SelectDropdown[]=[]
  @ViewChild('designation') designation:FormControl;
  @Input() IsNewDesignationAdd:boolean=false;
  @Input() designationSelectedItems:any=[];
  @Output() designationOnItemSelect:EventEmitter <any>=new EventEmitter <any>();
  @Output() designationOnItemDeSelect:EventEmitter <any>=new EventEmitter <any>();

  designationDropdownList: MultiSelectDropdown[] = [
    { id: "0", itemName: "Select" }
  ];
  designationDropdownSettings = {
    singleSelection: true,
    text: "Select designation",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    showCheckbox:true
    
  };
  constructor(private _alertBox:AlertBoxService,
    // private _inventotyDefinationService:InventoryDefinationServiceService,
    private _dopdownService:DropdownService
  ) { 
    console.log(this.designation)
  }

  ngOnChanges() {
    debugger
    if(this.IsNewDesignationAdd){
      this.getDesignationList();
    }else{
      this.getDesignationList();
    }
  }
  getDesignationList(){
    this._dopdownService.getDesignationDropdownList().subscribe(response=>{
      this.designationList=response
      if(this.designationList.length>0){
        this.designationList.forEach((designation,index,array)=>{
          this.designationDropdownList.push({id:designation.Value,itemName:designation.Code+'-'+designation.Text});
        })
      }
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  designationOnItemSelect1($event:MultiSelectDropdown){
    debugger
    this.designationOnItemSelect.emit($event)
  }
  designationOnItemDeSelect1($event){
    debugger
    this.designationOnItemDeSelect.emit($event)
  }

}
