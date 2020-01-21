import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dynamic-form-builder',
  templateUrl: './dynamic-form-builder.component.html',
  styleUrls: ['./dynamic-form-builder.component.css']
})
export class DynamicFormBuilderComponent implements OnInit {

  @Input() Datalist: any = [];
  @Input() ColumnList: any = [];
  @Input() SelectList: any = [];
  @Input() CheckboxList: any = [];
  @Input() EditableStatus: any = [];
  @Input() ColumnNumber:number;
  @Output() AutoCompleteDataSourceClicked:EventEmitter <any>=new EventEmitter <any>();
  ReceivedDataList:any[]=[];
  DataListFirstRow:any[]=[];
  DataListSecondRow:any[]=[];
  length:number;
  constructor() { 
    
  }
  ngOnInit() {
    this.ReceivedDataList=this.Datalist;
    let lengthFraction=Math.floor(this.ReceivedDataList.length/this.ColumnNumber);
    if(this.ColumnNumber*lengthFraction>=this.ReceivedDataList.length){
      this.length=lengthFraction;
    }
    else{
      this.length=lengthFraction+1
    }
  }
  autoCompleteClick($data){
    this.AutoCompleteDataSourceClicked.emit($data)
  }
  sendDataToParentComponent() {
    debugger
    alert(this.Datalist[0].Name)
  }
  onchange($event){
    debugger
  }

}
