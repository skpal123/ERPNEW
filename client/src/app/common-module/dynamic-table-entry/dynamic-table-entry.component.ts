import { Component, OnInit,Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { DatatableTextOutput } from '../../models/common/datatable-text-click.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { UserFormControl } from '../../models/common/user-form-control.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CommonService } from '../../services/common/common.service';
import { DialogData } from '../../models/common/dialog-data.model';
import { AlertBoxService } from '../../shared/alert-box.service';
import { SelectList } from '../../models/common/select-list.model';
@Component({
  selector: 'app-dynamic-table-entry',
  templateUrl: './dynamic-table-entry.component.html',
  styleUrls: ['./dynamic-table-entry.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DynamicTableEntryComponent implements OnInit,OnChanges {
  @BlockUI() blockUi:NgBlockUI
  @Input() Datalist: any = [];
  @Input() reload:boolean;
  @Input() ColumnList: any = [];
  @Input() selectList: SelectList[] = [];
  @Input() EditableStatus: any = [];
  @Input() AutoCompleteStatus: any = [];
  @Input() AutoCompleteDataSource: any = [];
  @Input() AutoCompleteList2: any = [];
  @Input() AutoCompleteList3: any = [];
  newOrderColumnList:UserFormControl[]=[];
  searchTerm:string=null;
  enableSaveButton:boolean=false;
  @Output() AutoCompleteDataSourceClicked:EventEmitter <any>=new EventEmitter <any>();
  @Output() AutoCompleteNewEntry:EventEmitter <any>=new EventEmitter <any>();
  @Output() DeleteDataRowClicked:EventEmitter <any>=new EventEmitter <any>();
  @Output() GetColumnValueClicked:EventEmitter <any>=new EventEmitter <any>();
  @Output() GetDatatableColumnTextClicked:EventEmitter <any>=new EventEmitter <any>();
  @Output() AddNewRow:EventEmitter <any>=new EventEmitter <any>();
  data={value:0,name:"",index:0}
  datatableTextOutput:DatatableTextOutput={ColumnName:null,RowData:null};
  constructor(private _commonService:CommonService,
    private _alertBox:AlertBoxService
  ) { }
  ngOnInit() {
    debugger
    
  }
  ngOnChanges(){
    this.ColumnList=this.ColumnList.filter(a=>{
      return a.IsEnable==true
     });
  }
  AutoCompleteClick($data){
    this.AutoCompleteDataSourceClicked.emit($data)
  }
  autoCompleteNewEntry(col:any){
    this.AutoCompleteNewEntry.emit(col)
  }
  deleteRow(index:number,$data){
    debugger
    if(index&&index!=0&&this.Datalist&&this.Datalist.length>1){
      this.Datalist.splice(index,1)
    }
    this.DeleteDataRowClicked.emit(index);
  }
  GetColumnValue(value:number,name:string,index:number){
    debugger
    this.data.name=name;
    this.data.value=value;
    this.data.index=index;
    this.GetColumnValueClicked.emit(this.data)
  }
  sendDataToParentComponent() {
    debugger
    alert(this.Datalist[0].Name)
  }
  datatableTextColumnClicked($data:any,columnName:string,index:number){
    debugger
    this.datatableTextOutput.ColumnName=columnName;
    this.datatableTextOutput.RowData=$data;
    this.datatableTextOutput.Index=index;
    this.GetDatatableColumnTextClicked.emit(this.datatableTextOutput);
    
  }
  addNewRow(){
    this.AddNewRow.emit();
  }
  onchange($event){
    debugger
  }
  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.ColumnList, event.previousIndex, event.currentIndex);
    this.newOrderColumnList=this.ColumnList;
    this.enableSaveButton=true;
  }
  saveNewOrder(){
    this.newOrderColumnList.forEach((a,index)=>{
      a.OrderNo=index+1
    })
    this.blockUi.start("Loading....,Please wait.")
    this._commonService.saveColumnInfoList(this.newOrderColumnList).subscribe((response:boolean)=>{
      this.blockUi.stop();
      this.enableSaveButton=false;    
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
}
