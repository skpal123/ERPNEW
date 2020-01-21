import { Component,Input,Output,EventEmitter, OnChanges, ViewChild } from '@angular/core';
import { SelectDropdown } from '../../models/common/select.dropdown.model';
import { FormControl } from '@angular/forms';
import { MultiSelectDropdown } from '../../models/common/multiselect.dropdown.model';
import { AlertBoxService } from '../../shared/alert-box.service';
import { DropdownService } from '../../services/common/dropdown.service';
import { DialogData } from '../../models/common/dialog-data.model';

@Component({
  selector: 'app-supplier-dropdown',
  templateUrl: './supplier-dropdown.component.html',
  styleUrls: ['./supplier-dropdown.component.css']
})
export class SupplierDropdownComponent implements OnChanges {

  supplierList:SelectDropdown[]=[]
  @ViewChild('category') category:FormControl;
  @Input() IsNewSupplierAdd:boolean=false;
  @Input() supplierSelectedItems:any=[];
  @Output() supplierOnItemSelect:EventEmitter <any>=new EventEmitter <any>();
  @Output() supplierOnItemDeSelect:EventEmitter <any>=new EventEmitter <any>();

  supplierDropdownList: MultiSelectDropdown[] = [
    { id: "0", itemName: "Select" }
  ];
  supplierDropdownSettings = {
    singleSelection: true,
    text: "Select supplier",
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
    if(this.IsNewSupplierAdd){
      this.getSupplierList();
    }else{
      this.getSupplierList();
    }
  }
  getSupplierList(){
    this._dopdownService.getSupplierDropdownList().subscribe(response=>{
      this.supplierList=response
      if(this.supplierList.length>0){
        this.supplierList.forEach((category,index,array)=>{
          this.supplierDropdownList.push({id:category.Value,itemName:category.Code+'-'+category.Text});
        })
      }
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  supplierOnItemSelect1($event:MultiSelectDropdown){
    debugger
    this.supplierOnItemSelect.emit($event)
  }
  supplierOnItemDeSelect1($event){
    debugger
    this.supplierOnItemDeSelect.emit($event)
  }
}
