import { Component, OnInit, OnChanges, ViewChild,Input,Output,EventEmitter } from '@angular/core';
import { SelectDropdown } from '../../models/common/select.dropdown.model';
import { FormControl } from '@angular/forms';
import { MultiSelectDropdown } from '../../models/common/multiselect.dropdown.model';
import { AlertBoxService } from '../../shared/alert-box.service';
import { DropdownService } from '../../services/common/dropdown.service';
import { DialogData } from '../../models/common/dialog-data.model';

@Component({
  selector: 'app-department-dropdown',
  templateUrl: './department-dropdown.component.html',
  styleUrls: ['./department-dropdown.component.css']
})
export class DepartmentDropdownComponent implements OnChanges {
  departmentList:SelectDropdown[]=[]
  @ViewChild('department') department:FormControl;
  @Input() IsNewDepartmentAdd:boolean=false;
  @Input() departmentSelectedItems:any=[];
  @Output() departmentOnItemSelect:EventEmitter <any>=new EventEmitter <any>();
  @Output() departmentOnItemDeSelect:EventEmitter <any>=new EventEmitter <any>();

  departmentDropdownList: MultiSelectDropdown[] = [
    { id: "0", itemName: "Select" }
  ];
  departmentDropdownSettings = {
    singleSelection: true,
    text: "Select department",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    showCheckbox:true
    
  };
  constructor(private _alertBox:AlertBoxService,
    // private _inventotyDefinationService:InventoryDefinationServiceService,
    private _dopdownService:DropdownService
  ) { 
    console.log(this.department)
  }

  ngOnChanges() {
    debugger
    if(this.IsNewDepartmentAdd){
      this.getDepartmentList();
    }else{
      this.getDepartmentList();
    }
  }
  getDepartmentList(){
    this._dopdownService.getDepartmentDropdownList().subscribe(response=>{
      this.departmentList=response
      if(this.departmentList.length>0){
        this.departmentList.forEach((department,index,array)=>{
          this.departmentDropdownList.push({id:department.Value,itemName:department.Code+'-'+department.Text});
        })
      }
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  departmentOnItemSelect1($event:MultiSelectDropdown){
    debugger
    this.departmentOnItemSelect.emit($event)
  }
  departmentOnItemDeSelect1($event){
    debugger
    this.departmentOnItemDeSelect.emit($event)
  }
}
