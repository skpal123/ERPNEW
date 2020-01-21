import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { GeneralSettingsService } from '../../services/admin/general-settings.service';
import { AlertBoxService } from '../../shared/alert-box.service';
import { CodeFormater } from '../../models/admin/code-formater.model';
import { DialogData } from '../../models/common/dialog-data.model';
import { DropdownService } from '../../services/common/dropdown.service';
import { SelectDropdown } from '../../models/common/select.dropdown.model';
import { MultiSelectDropdown } from '../../models/common/multiselect.dropdown.model';

@Component({
  selector: 'app-code-formater-entry',
  templateUrl: './code-formater-entry.component.html',
  styleUrls: ['./code-formater-entry.component.css']
})
export class CodeFormaterEntryComponent implements OnInit {
  @BlockUI() blockUi: NgBlockUI
  codeFormaterForm: FormGroup
  priview: string = null;
  minLength:number=null;
  fromEntry:boolean=false;
  selectList:SelectDropdown[]=[];
  itemNameDropdownList: MultiSelectDropdown[] = [
    { id: "0", itemName: "Select" }
  ];
  itemNameSelectedItems:MultiSelectDropdown[]=[
    { id: "0", itemName: "Select" }
  ]
  itemNameDropdownSettings = {
    singleSelection: true,
    text: "Select itemName",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    showCheckbox:true
    
  };
  constructor(private fb: FormBuilder,
    public matDialogRef: MatDialogRef<CodeFormaterEntryComponent>,
    private _generalSettingService: GeneralSettingsService,
    private _dropdownService:DropdownService,
    private _alertBox: AlertBoxService,
    @Inject(MAT_DIALOG_DATA) public codeFormater: CodeFormater, ) { }
  onNoClick() {
    this.matDialogRef.close();
  }
  ngOnInit() {
    if(this.codeFormater.FromEntry){
      this.fromEntry=true
    }
    this.codeFormaterForm = this.fb.group({
      Name: ['', Validators.required],
      Name_Id: [this.itemNameSelectedItems],
      ItemName: [''],
      ItemLength: [0],
      IsSymbol: [false],
      IsSerial: [true],
      IsTodaysDate: [false],
      SymbolName: [{ value: "", disabled: true }],
      StartPossition: [0],
      LastNumber: [0],
      Prefix: [{ value: null, disabled: true }],
      StringLength: ['', Validators.required],
      MiddleSymbol: '',
      Preview: ''
    })
    if(this.codeFormater.Prefix!=''&&this.codeFormater.Prefix!=null){
      this.codeFormaterForm.controls['Prefix'].enable();
    }
    if(this.codeFormater.SymbolName!=''&&this.codeFormater.SymbolName!=null){
      this.codeFormaterForm.controls['SymbolName'].enable();
    }
    if (this.codeFormater.Id != null) {
      this.itemNameSelectedItems=[];
      this.itemNameSelectedItems.push({id:this.codeFormater.Name,itemName:this.codeFormater.Name})
      this.codeFormaterForm.patchValue({
        Name: this.codeFormater.Name,
        Name_Id:this.itemNameSelectedItems,
        ItemName: this.codeFormater.ItemName,
        ItemLength: this.codeFormater.ItemLength,
        IsSymbol: this.codeFormater.IsSymbol,
        IsSerial: this.codeFormater.IsSerial,
        IsTodaysDate: this.codeFormater.IsTodaysDate,
        SymbolName: this.codeFormater.SymbolName,
        StartPossition: this.codeFormater.StartPossition,
        LastNumber: this.codeFormater.LastNumber,
        Prefix: this.codeFormater.Prefix,
        StringLength: this.codeFormater.StringLength
      })
    }
    // this.codeFormaterForm.valueChanges.subscribe(data=>{
    //   this.minumumStringLength()
    // })
    this.getItemNameList();
  }
  getItemNameList(){
    this._dropdownService.getItemNameDropdownList().subscribe(response=>{
      this.selectList=response
      this.selectList.forEach(a=>{
        this.itemNameDropdownList.push({id:a.Text,itemName:a.Text})
      })
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  itemNameOnItemSelect($event:MultiSelectDropdown){
    if($event.id!="0"){
      this.codeFormaterForm.controls['Name'].setValue($event.id)
    }
    else{
      this.codeFormaterForm.controls['Name'].setValue('')

    }
  }
  updateValidation() {
    debugger
    if (this.codeFormaterForm.get('MiddleSymbol').value != '') {
      this.codeFormaterForm.controls['IsTodaysDate'].setValidators([Validators.requiredTrue]);
      this.codeFormaterForm.controls['IsTodaysDate'].updateValueAndValidity();
      this.codeFormaterForm.controls['IsSerial'].setValidators([Validators.requiredTrue]);
      this.codeFormaterForm.controls['IsSerial'].updateValueAndValidity();
    }
  }
  changeIsDateAndSerial($event){
    if(this.codeFormaterForm.controls['IsSerial'].value&&this.codeFormaterForm.controls['IsTodaysDate'].value){
      this.codeFormaterForm.controls['IsSymbol'].setValidators([Validators.requiredTrue]);
      this.codeFormaterForm.controls['IsSymbol'].updateValueAndValidity();
    }
    else{
      this.codeFormaterForm.controls['IsSymbol'].clearValidators()
      this.codeFormaterForm.controls['IsSymbol'].updateValueAndValidity();
    }
  }
  changeIsSymbol($event) {
    debugger
    if ($event.target.checked) {
      this.codeFormaterForm.controls['SymbolName'].enable();
      this.codeFormaterForm.controls['Prefix'].enable()
      this.codeFormaterForm.controls['SymbolName'].setValidators([Validators.required]);
      this.codeFormaterForm.controls['SymbolName'].updateValueAndValidity();
      this.codeFormaterForm.controls['Prefix'].setValidators([Validators.required]);
      this.codeFormaterForm.controls['Prefix'].updateValueAndValidity();
    }
    else {
      this.codeFormaterForm.controls['SymbolName'].clearValidators();
      this.codeFormaterForm.controls['SymbolName'].updateValueAndValidity();
      this.codeFormaterForm.controls['Prefix'].clearValidators();
      this.codeFormaterForm.controls['Prefix'].updateValueAndValidity();
      this.codeFormaterForm.controls['SymbolName'].disable();
      this.codeFormaterForm.controls['Prefix'].disable()
    }
  }
  prefixChange($event) {
    if (this.codeFormaterForm.controls['Prefix'].value != '' && this.codeFormaterForm.controls['Prefix'] != null) {
      this.codeFormaterForm.controls['ItemName'].disable();
    }
    else {
      this.codeFormaterForm.controls['Prefix'].enable();
      this.codeFormaterForm.controls['ItemName'].enable();
    }
  }
  itemNameChange($event) {
    if (this.codeFormaterForm.controls['ItemName'].value != '' && this.codeFormaterForm.controls['ItemName'] != null) {
      this.codeFormaterForm.controls['Prefix'].disable();
    }
    else {
      this.codeFormaterForm.controls['ItemName'].enable();
      this.codeFormaterForm.controls['Prefix'].enable();
    }
  }
  saveCodeFormater() {
    debugger
    let id = this.codeFormater.Id;
    this.codeFormater = this.codeFormaterForm.value;
    this.codeFormater.Id = id;
    if(this.fromEntry)
    this.codeFormater.LastNumber=this.codeFormater.LastNumber+1
    if (this.codeFormater.Id == null) {
      this.blockUi.start("Loading....,Please wait")
      this._generalSettingService.SaveCodeFormater(this.codeFormater).subscribe(response => {
        this.blockUi.stop();
        let result = response
        if (result) {
          this.matDialogRef.close(response);
          let dialogData = new DialogData();
          dialogData.message = "Save successfully";
          this._alertBox.openDialog(dialogData);
        }
      }, error => {
        this.blockUi.stop();
        let message = error
        let dialogData = new DialogData();
        dialogData.message = message.Message;
        this._alertBox.openDialog(dialogData);
      })
    }
    else {
      this.blockUi.start("Loading....,Please wait")
      this._generalSettingService.UpdateCodeFormater(this.codeFormater).subscribe(response => {
        this.blockUi.stop();
        let result = response
        if (result) {
          this.matDialogRef.close(true);
          let dialogData = new DialogData();
          dialogData.message = "Update successfully";
          this._alertBox.openDialog(dialogData);
        }
      }, error => {
        this.blockUi.stop();
        let message = error
        let dialogData = new DialogData();
        dialogData.message = message.Message;
        this._alertBox.openDialog(dialogData);
      })
    }
  }
  seePreview() {
    debugger
    this.codeFormaterForm.controls['Preview'].setValue(0)
    this.codeFormater = this.codeFormaterForm.value;
    if (this.codeFormater.IsTodaysDate && this.codeFormater.IsSerial) {
      var firstPart = new Date().getFullYear().toString();
      var month = this.appendSting(new Date().getMonth() + 1);
      var day = this.appendSting(new Date().getDate());
      firstPart = firstPart + month + day;
      if (this.codeFormater.IsSymbol) {
        firstPart = this.codeFormater.SymbolName == "hifen" ?  this.codeFormater.Prefix.toUpperCase()+'-'+firstPart : 
        this.codeFormater.SymbolName == "underscore" ? this.codeFormater.Prefix.toUpperCase()+'_'+
        firstPart : "" + this.codeFormater.Prefix.toUpperCase()+firstPart;
        if (this.codeFormater.MiddleSymbol != null) {
          firstPart += this.codeFormater.MiddleSymbol;
        }
        let length = firstPart.length;
        if (this.codeFormater.StringLength > length) {
          let digitCount = this.codeFormater.StartPossition.toString().length;
          let dif = this.codeFormater.StringLength - (length + digitCount);
          let repeatStr = "0".repeat(dif)
          let secondPart = repeatStr + this.codeFormater.StartPossition;
          let lastRangeCount=secondPart.length;
        let thirdPart="9".repeat(lastRangeCount)
        this.codeFormaterForm.controls['Preview'].setValue(firstPart + secondPart+ ' to '+firstPart +thirdPart)
        }
      }
    }
    else if (this.codeFormater.IsSerial) {
      if(this.codeFormater.IsSymbol){
        var firstPart=this.codeFormater.SymbolName == "hifen" ?  this.codeFormater.Prefix.toUpperCase()+'-' : this.codeFormater.SymbolName == "underscore" ? '_' : "" + this.codeFormater.Prefix.toUpperCase()+firstPart;
        let length = firstPart.length;
        let digitCount = this.codeFormater.StartPossition.toString().length;
        let dif = this.codeFormater.StringLength - (length + digitCount);
        let repeatStr = "0".repeat(dif)
        let secondPart = repeatStr + this.codeFormater.StartPossition;
        let lastRangeCount=secondPart.length;
        let thirdPart="9".repeat(lastRangeCount)
        this.codeFormaterForm.controls['Preview'].setValue(firstPart + secondPart+ ' to '+firstPart +thirdPart)
      }
      else{
        var firstPart=""
        let length = firstPart.length;
        let digitCount = this.codeFormater.StartPossition.toString().length;
        let dif = this.codeFormater.StringLength - (length + digitCount);
        let repeatStr = "0".repeat(dif)
        let secondPart = repeatStr + this.codeFormater.StartPossition;
        let lastRangeCount=secondPart.length;
        let thirdPart="9".repeat(lastRangeCount)
        this.codeFormaterForm.controls['Preview'].setValue(firstPart + secondPart+ ' to '+firstPart +thirdPart)
      }
    }
  }
  appendSting(value: number) {
    if (value < 10) {
      return "0" + value;
    }
    else {
      return value.toString()
    }
  }
  minumumStringLength(){
    debugger
    this.codeFormater=this.codeFormaterForm.value;
    if(this.codeFormater.IsSerial&&this.codeFormater.IsTodaysDate){
      let length=this.codeFormater.Prefix.length+1+8;
      if(this.codeFormater.IsSymbol&&this.codeFormater.Prefix!=null&&this.codeFormater.Prefix==""){
        let length=this.codeFormater.Prefix.length+1+8;
        if(this.codeFormater.MiddleSymbol!=null)
        length=length+1;
        this.minLength=length;
        this.codeFormaterForm.controls['StringLength'].setValidators(Validators.minLength(length+1));
        this.codeFormaterForm.controls['StringLength'].updateValueAndValidity();
      }
      else {
        this.minLength=length;
        this.codeFormaterForm.controls['StringLength'].setValidators(Validators.minLength(length));
        this.codeFormaterForm.controls['StringLength'].updateValueAndValidity();
      }
    }
    else if(this.codeFormater.IsSerial){
      if(this.codeFormater.IsSymbol){
        if(this.codeFormater.Prefix!=null&&this.codeFormater.Prefix!=""){
          let length=this.codeFormater.Prefix.length+1;
          this.minLength=length+1
          this.codeFormaterForm.controls['StringLength'].setValidators(Validators.minLength(this.minLength=length));
          this.codeFormaterForm.controls['StringLength'].updateValueAndValidity();
        }
      }
      else {
        this.minLength=2
        this.codeFormaterForm.controls['StringLength'].setValidators(Validators.minLength(2));
        this.codeFormaterForm.controls['StringLength'].updateValueAndValidity();
      }
    }
  }
  clearCodeFormater(){
    
  }
}
