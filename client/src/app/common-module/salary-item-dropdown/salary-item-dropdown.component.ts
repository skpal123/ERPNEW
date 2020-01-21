import { Component, OnInit, OnChanges, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { SelectDropdown } from '../../models/common/select.dropdown.model';
import { FormControl } from '@angular/forms';
import { MultiSelectDropdown } from '../../models/common/multiselect.dropdown.model';
import { AlertBoxService } from '../../shared/alert-box.service';
import { DropdownService } from '../../services/common/dropdown.service';
import { DialogData } from '../../models/common/dialog-data.model';

@Component({
  selector: 'app-salary-item-dropdown',
  templateUrl: './salary-item-dropdown.component.html',
  styleUrls: ['./salary-item-dropdown.component.css']
})
export class SalaryItemDropdownComponent implements OnChanges {
  salaryItemList:SelectDropdown[]=[]
  @ViewChild('category') category:FormControl;
  @Input() IsNewSalaryItemAdd:boolean=false;
  @Input() salaryItemSelectedItems:any=[];
  @Output() salaryItemOnItemSelect:EventEmitter <any>=new EventEmitter <any>();
  @Output() salaryItemOnItemDeSelect:EventEmitter <any>=new EventEmitter <any>();
  salaryItemDropdownList: MultiSelectDropdown[] = [
    { id: "0", itemName: "Select" }
  ];
  salaryItemDropdownSettings = {
    singleSelection: true,
    text: "Select salaryItem",
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
    if(this.IsNewSalaryItemAdd){
      this.getSalaryItemList();
    }else{
      this.getSalaryItemList();
    }
  }
  getSalaryItemList(){
    this.salaryItemDropdownList=[]
    this._dopdownService.getSalaryItemDropdownList().subscribe(response=>{
      this.salaryItemList=response
      if(this.salaryItemList.length>0){
        this.salaryItemList.forEach((category,index,array)=>{
          this.salaryItemDropdownList.push({id:category.Value,itemName:category.Code+'-'+category.Text});
        })
      }
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  salaryItemOnItemSelect1($event:MultiSelectDropdown){
    debugger
    this.salaryItemOnItemSelect.emit($event)
  }
  salaryItemOnItemDeSelect1($event){
    debugger
    this.salaryItemOnItemDeSelect.emit($event)
  }
}
