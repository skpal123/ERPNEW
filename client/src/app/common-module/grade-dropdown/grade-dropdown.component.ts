import { Component, OnInit, OnChanges, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DialogData } from '../../models/common/dialog-data.model';
import { MultiSelectDropdown } from '../../models/common/multiselect.dropdown.model';
import { SelectDropdown } from '../../models/common/select.dropdown.model';
import { FormControl } from '@angular/forms';
import { AlertBoxService } from '../../shared/alert-box.service';
import { DropdownService } from '../../services/common/dropdown.service';

@Component({
  selector: 'app-grade-dropdown',
  templateUrl: './grade-dropdown.component.html',
  styleUrls: ['./grade-dropdown.component.css']
})
export class GradeDropdownComponent implements OnChanges {
  gradeList:SelectDropdown[]=[]
  @ViewChild('grade') grade:FormControl;
  @Input() IsNewGradeAdd:boolean=false;
  @Input() gradeSelectedItems:any=[];
  @Output() gradeOnItemSelect:EventEmitter <any>=new EventEmitter <any>();
  @Output() gradeOnItemDeSelect:EventEmitter <any>=new EventEmitter <any>();

  gradeDropdownList: MultiSelectDropdown[] = [
    { id: "0", itemName: "Select" }
  ];
  gradeDropdownSettings = {
    singleSelection: true,
    text: "Select grade",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    showCheckbox:true
    
  };
  constructor(private _alertBox:AlertBoxService,
    // private _inventotyDefinationService:InventoryDefinationServiceService,
    private _dopdownService:DropdownService
  ) { 
    console.log(this.grade)
  }

  ngOnChanges() {
    debugger
    if(this.IsNewGradeAdd){
      this.getGradeList();
    }else{
      this.getGradeList();
    }
  }
  getGradeList(){
    this.gradeDropdownList=[];
    this._dopdownService.getGradeDropdownList().subscribe(response=>{
      this.gradeList=response
      if(this.gradeList.length>0){
        this.gradeList.forEach((grade,index,array)=>{
          this.gradeDropdownList.push({id:grade.Value,itemName:grade.Code+'-'+grade.Text});
        })
      }
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  gradeOnItemSelect1($event:MultiSelectDropdown){
    debugger
    this.gradeOnItemSelect.emit($event)
  }
  gradeOnItemDeSelect1($event){
    debugger
    this.gradeOnItemDeSelect.emit($event)
  }

}
