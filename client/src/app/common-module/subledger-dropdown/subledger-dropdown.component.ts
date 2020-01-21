import { Component, OnInit,Input,Output,EventEmitter, OnChanges } from '@angular/core';
import { SelectDropdown } from '../../models/common/select.dropdown.model';
import { MultiSelectDropdown } from '../../models/common/multiselect.dropdown.model';
import { AlertBoxService } from '../../shared/alert-box.service';
import { DropdownService } from '../../services/common/dropdown.service';
import { DialogData } from '../../models/common/dialog-data.model';

@Component({
  selector: 'app-subledger-dropdown',
  templateUrl: './subledger-dropdown.component.html',
  styleUrls: ['./subledger-dropdown.component.css']
})
export class SubledgerDropdownComponent implements OnChanges {
  subledgerList:SelectDropdown[]=[]
  @Input() ledgerId:string
  @Input() subledgerSelectedItems:any=[];
  @Output() subledgerOnItemSelect:EventEmitter <any>=new EventEmitter <any>();
  @Output() subledgerOnItemDeSelect:EventEmitter <any>=new EventEmitter <any>();

  subledgerDropdownList: MultiSelectDropdown[] = [
    { id: "0", itemName: "Select" }
  ];
  subledgerDropdownSettings = {
    singleSelection: true,
    text: "Select subledger",
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
    if(this.ledgerId!=null && this.ledgerId!="0"){
      this.getSubLedgerList(this.ledgerId);
    }else if(this.ledgerId==null){
      this.getSubLedgerList("00000000-0000-0000-0000-000000000000")

    }
  }
  getSubLedgerList(ledgerId:string){
    this.subledgerDropdownList=[];
    this._dropdownService.getSubledgerDropdownList(ledgerId).subscribe(response=>{
      this.subledgerList=response
      if(this.subledgerList.length>0){
        this.subledgerList.forEach((a,index,array)=>{
          this.subledgerDropdownList.push({id:a.Value,itemName:a.Code+'-'+a.Text});
        })
      }
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  subledgerOnItemSelect1($event:MultiSelectDropdown){
    debugger
    this.subledgerOnItemSelect.emit($event)
  }
  subledgerOnItemDeSelect1($event){ 
    debugger
    this.subledgerOnItemSelect.emit($event)
  }
}
