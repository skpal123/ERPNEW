import { Component, OnInit,Input,Output,EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { Subcategory } from '../../models/master-settings/inventory-defination/subcategory.model';
import { MultiSelectDropdown } from '../../models/common/multiselect.dropdown.model';
import { AlertBoxService } from '../../shared/alert-box.service';
import { DropdownService } from '../../services/common/dropdown.service';
import { SelectDropdown } from '../../models/common/select.dropdown.model';
import { DialogData } from '../../models/common/dialog-data.model';

@Component({
  selector: 'app-subcategory-dropdown',
  templateUrl: './subcategory-dropdown.component.html',
  styleUrls: ['./subcategory-dropdown.component.css']
})
export class SubcategoryDropdownComponent implements OnChanges {

  subcategoryList:SelectDropdown[]=[]
  @Input() categoryId:string
  @Input() IsNewSubCategory:boolean;
  @Input() subcategorySelectedItems:any=[];
  @Output() subcategoryOnItemSelect:EventEmitter <any>=new EventEmitter <any>();
  @Output() subcategoryOnItemDeSelect:EventEmitter <any>=new EventEmitter <any>();

  subcategoryDropdownList: MultiSelectDropdown[] = [
    { id: "0", itemName: "Select" }
  ];
  subcategoryDropdownSettings = {
    singleSelection: true,
    text: "Select category",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    showCheckbox:true
    
  };
  constructor(private _alertBox:AlertBoxService,
    private _dropdownService:DropdownService,
  ) { }

  ngOnChanges(){
    debugger
    if(this.categoryId!=null && this.categoryId!="0"){
      this.getSubCategoryList();
    }
  }
  getSubCategoryList(){
    this.subcategoryDropdownList=[];
    this._dropdownService.getSubCategoryDropdownList(this.categoryId).subscribe(response=>{
      this.subcategoryList=response
      if(this.subcategoryList.length>0){
        this.subcategoryList.forEach((a,index,array)=>{
          this.subcategoryDropdownList.push({id:a.Value,itemName:a.Code+'-'+a.Text});
        })
      }
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  subcategoryOnItemSelect1($event:MultiSelectDropdown){
    debugger
    this.subcategoryOnItemSelect.emit($event)
  }
  subcategoryOnItemDeSelect1($event){ 
    debugger
    this.subcategoryOnItemDeSelect.emit($event)
  }
}
