import { Component, OnInit,Output, EventEmitter,Input, ViewChild, OnChanges } from '@angular/core';
import { Category } from '../../models/master-settings/inventory-defination/category.model';
import { MultiSelectDropdown } from '../../models/common/multiselect.dropdown.model';
import { AlertBoxService } from '../../shared/alert-box.service';
import { InventoryDefinationServiceService } from '../../services/master-settings/inventory-defination-service.service';
import { DialogData } from '../../models/common/dialog-data.model';
import { FormControl } from '@angular/forms';
import { DropdownService } from '../../services/common/dropdown.service';
import { SelectDropdown } from '../../models/common/select.dropdown.model';

@Component({
  selector: 'app-category-dropdown',
  templateUrl: './category-dropdown.component.html',
  styleUrls: ['./category-dropdown.component.css']
})
export class CategoryDropdownComponent implements OnChanges {
  categoryList:SelectDropdown[]=[]
  @ViewChild('category') category:FormControl;
  @Input() IsNewCategoryAdd:boolean=false;
  @Input() categorySelectedItems:any=[];
  @Output() categoryOnItemSelect:EventEmitter <any>=new EventEmitter <any>();
  @Output() categoryOnItemDeSelect:EventEmitter <any>=new EventEmitter <any>();

  categoryDropdownList: MultiSelectDropdown[] = [
    { id: "0", itemName: "Select" }
  ];
  categoryDropdownSettings = {
    singleSelection: true,
    text: "Select category",
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
    if(this.IsNewCategoryAdd){
      this.getCategoryList();
    }else{
      this.getCategoryList();
    }
  }
  getCategoryList(){
    this._dopdownService.getCategoryDropdownList().subscribe(response=>{
      this.categoryList=response
      if(this.categoryList.length>0){
        this.categoryList.forEach((category,index,array)=>{
          this.categoryDropdownList.push({id:category.Value,itemName:category.Code+'-'+category.Text});
        })
      }
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  categoryOnItemSelect1($event:MultiSelectDropdown){
    debugger
    this.categoryOnItemSelect.emit($event)
  }
  categoryOnItemDeSelect1($event){
    debugger
    this.categoryOnItemDeSelect.emit($event)
  }
}
