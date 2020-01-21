import { Component, OnInit,Input,Output,EventEmitter, OnChanges } from '@angular/core';
import { MultiSelectDropdown } from '../../models/common/multiselect.dropdown.model';
import { DialogData } from '../../models/common/dialog-data.model';
import { DropdownService } from '../../services/common/dropdown.service';
import { AlertBoxService } from '../../shared/alert-box.service';
import { SelectDropdown } from '../../models/common/select.dropdown.model';

@Component({
  selector: 'app-ledger-dropdown',
  templateUrl: './ledger-dropdown.component.html',
  styleUrls: ['./ledger-dropdown.component.css']
})
export class LedgerDropdownComponent implements OnChanges {
  ledgerList:SelectDropdown[]=[]
  @Input() ledgerSelectedItems:any=[];
  @Input() filterByPaymentMode:boolean;
  @Input() paymentMode:number;
  @Input() allLedger:boolean;
  @Output() ledgerOnItemSelect:EventEmitter <any>=new EventEmitter <any>();
  @Output() ledgerOnItemDeSelect:EventEmitter <any>=new EventEmitter <any>();
  ledgerDropdownList: MultiSelectDropdown[] = [
    { id: "0", itemName: "Select" }
  ];
  ledgerDropdownSettings = {
    singleSelection: true,
    text: "Select ledger",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    showCheckbox:true
    
  };
  constructor(private _alertBox:AlertBoxService,
    private _dropdownService:DropdownService,
  ) { }

  ngOnChanges() {
    debugger
    if(this.filterByPaymentMode&&this.paymentMode!=-1){
        this.getLedgerListByPaymentMode(this.paymentMode.toString())
    }
    if(this.allLedger){
      this.getLedgerList();
    }
  }
  getLedgerList(){
    this.ledgerDropdownList=[];
    this._dropdownService.getLedgerDropdownList().subscribe(response=>{
      this.ledgerList=response;
      if(this.ledgerList.length>0){
        this.ledgerList.forEach((a,index,array)=>{
          this.ledgerDropdownList.push({id:a.Value,itemName:a.Code+'-'+a.Text});
        })
      }
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getLedgerListByPaymentMode(PaymentMode:string){
    this.ledgerDropdownList=[];
    this._dropdownService.getLedgerDropdownListByPaymentMode(PaymentMode).subscribe(response=>{
      this.ledgerList=response;
      if(this.ledgerList.length>0){
        this.ledgerList.forEach((a,index,array)=>{
          this.ledgerDropdownList.push({id:a.Value,itemName:a.Code+'-'+a.Text});
        })
      }
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  ledgerOnItemSelect1($event:MultiSelectDropdown){
    debugger
    this.ledgerOnItemSelect.emit($event)
  }
  ledgerOnItemDeSelect1($event){
    debugger
    this.ledgerOnItemDeSelect.emit($event)
  }
}
