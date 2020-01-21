import { Component, OnInit, Input ,Output,EventEmitter, OnChanges} from '@angular/core';
import { SelectDropdown } from '../../models/common/select.dropdown.model';
import { MultiSelectDropdown } from '../../models/common/multiselect.dropdown.model';
import { AlertBoxService } from '../../shared/alert-box.service';
import { DropdownService } from '../../services/common/dropdown.service';
import { DialogData } from '../../models/common/dialog-data.model';

@Component({
  selector: 'app-item-dropdown',
  templateUrl: './item-dropdown.component.html',
  styleUrls: ['./item-dropdown.component.css']
})
export class ItemDropdownComponent implements OnChanges {
  itemList:SelectDropdown[]=[]
  @Input() IsNewItemAdd:boolean=false;
  @Input() subCategoryId:string
  @Input() itemSelectedItems:any=[];
  @Output() itemOnItemSelect:EventEmitter <any>=new EventEmitter <any>();
  @Output() itemOnItemDeSelect:EventEmitter <any>=new EventEmitter <any>();

  itemDropdownList: MultiSelectDropdown[] = [
    { id: "0", itemName: "Select" }
  ];
  itemDropdownSettings = {
    singleSelection: false,
    text: "Select item",
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
    if(this.IsNewItemAdd){
      if(this.subCategoryId!=null && this.subCategoryId!="0"){
        this.getItemList(this.subCategoryId);
      }else if(this.subCategoryId==null){
        this.getItemList(null)
  
      }
    }
    else{
      if(this.subCategoryId!=null && this.subCategoryId!="0"){
        this.getItemList(this.subCategoryId);
      }else if(this.subCategoryId==null){
        this.getItemList(null)
  
      }
    }
  }
  getItemList(subCategoryId:string){
    //this.itemDropdownList=[];
    //this.itemSelectedItems=[];
    this._dropdownService.getItemDropdownList(subCategoryId).subscribe(response=>{
      this.itemList=response
      if(this.itemList.length>0){
        this.itemList.forEach((a,index,array)=>{
          this.itemDropdownList.push({id:a.Value,itemName:a.Code+'-'+a.Text});
        })
      }
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  itemOnItemSelect1($event:MultiSelectDropdown){
    debugger
    this.itemOnItemSelect.emit($event)
  }
  itemOnItemDeSelect1($event){ 
    debugger
    this.itemOnItemDeSelect.emit($event)
  }

}
