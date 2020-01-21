import { Component, OnInit, OnChanges, ViewChild ,Input,Output,EventEmitter} from '@angular/core';
import { SelectDropdown } from '../../models/common/select.dropdown.model';
import { FormControl } from '@angular/forms';
import { MultiSelectDropdown } from '../../models/common/multiselect.dropdown.model';
import { AlertBoxService } from '../../shared/alert-box.service';
import { DropdownService } from '../../services/common/dropdown.service';
import { DialogData } from '../../models/common/dialog-data.model';

@Component({
  selector: 'app-education-level-dropdown',
  templateUrl: './education-level-dropdown.component.html',
  styleUrls: ['./education-level-dropdown.component.css']
})
export class EducationLevelDropdownComponent implements OnChanges {
  educationLevelList:SelectDropdown[]=[]
  @ViewChild('educationLevel') educationLevel:FormControl;
  @Input() IsNewEducationLevelAdd:boolean=false;
  @Input() educationLevelSelectedItems:any=[];
  @Output() educationLevelOnItemSelect:EventEmitter <any>=new EventEmitter <any>();
  @Output() educationLevelOnItemDeSelect:EventEmitter <any>=new EventEmitter <any>();

  educationLevelDropdownList: MultiSelectDropdown[] = [
    { id: "0", itemName: "Select" }
  ];
  educationLevelDropdownSettings = {
    singleSelection: true,
    text: "Select educationLevel",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    showCheckbox:true
    
  };
  constructor(private _alertBox:AlertBoxService,
    // private _inventotyDefinationService:InventoryDefinationServiceService,
    private _dopdownService:DropdownService
  ) { 
  }

  ngOnChanges() {
    debugger
    if(this.IsNewEducationLevelAdd){
      this.getEducationLevelList();
    }else{
      this.getEducationLevelList();
    }
  }
  getEducationLevelList(){
    this._dopdownService.getEducationLevelDropdownList().subscribe(response=>{
      this.educationLevelList=response
      if(this.educationLevelList.length>0){
        this.educationLevelList.forEach((category,index,array)=>{
          this.educationLevelDropdownList.push({id:category.Value,itemName:category.Code+'-'+category.Text});
        })
      }
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  educationLevelOnItemSelect1($event:MultiSelectDropdown){
    debugger
    this.educationLevelOnItemSelect.emit($event)
  }
  educationLevelOnItemDeSelect1($event){
    debugger
    this.educationLevelOnItemDeSelect.emit($event)
  }
}
