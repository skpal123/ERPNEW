import { Component, OnChanges,ViewChild,Input,Output,EventEmitter } from '@angular/core';
import { SelectDropdown } from '../../models/common/select.dropdown.model';
import { FormControl } from '@angular/forms';
import { MultiSelectDropdown } from '../../models/common/multiselect.dropdown.model';
import { AlertBoxService } from '../../shared/alert-box.service';
import { DropdownService } from '../../services/common/dropdown.service';
import { DialogData } from '../../models/common/dialog-data.model';

@Component({
  selector: 'app-customer-dropdown',
  templateUrl: './customer-dropdown.component.html',
  styleUrls: ['./customer-dropdown.component.css']
})
export class CustomerDropdownComponent implements OnChanges {
  customerList:SelectDropdown[]=[]
  @ViewChild('category') category:FormControl;
  @Input() IsNewCustomerAdd:boolean=false;
  @Input() customerSelectedItems:any=[];
  @Output() customerOnItemSelect:EventEmitter <any>=new EventEmitter <any>();
  @Output() customerOnItemDeSelect:EventEmitter <any>=new EventEmitter <any>();

  customerDropdownList: MultiSelectDropdown[] = [
    { id: "0", itemName: "Select" }
  ];
  customerDropdownSettings = {
    singleSelection: true,
    text: "Select customer",
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
    if(this.IsNewCustomerAdd){
      this.getCustomerList();
    }else{
      this.getCustomerList();
    }
  }
  getCustomerList(){
    this._dopdownService.getCustomerDropdownList().subscribe(response=>{
      this.customerList=response
      if(this.customerList.length>0){
        this.customerList.forEach((category,index,array)=>{
          this.customerDropdownList.push({id:category.Value,itemName:category.Code+'-'+category.Text});
        })
      }
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  customerOnItemSelect1($event:MultiSelectDropdown){
    debugger
    this.customerOnItemSelect.emit($event)
  }
  customerOnItemDeSelect1($event){
    debugger
    this.customerOnItemDeSelect.emit($event)
  }

}
