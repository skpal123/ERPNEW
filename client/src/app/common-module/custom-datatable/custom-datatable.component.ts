import { Component, OnInit, Input,Output,EventEmitter, OnChanges, OnDestroy, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CustomDatatableService } from '../../services/common/custom-datatable.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { PostLoginService } from '../../services/common/post-login.service';
import { DialogData } from '../../models/common/dialog-data.model';
import { AlertBoxService } from '../../shared/alert-box.service';
import { UserFormControl } from '../../models/common/user-form-control.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormControl } from '@angular/forms';
import { Page } from '../../models/common/page.model';
import { PageService } from '../../services/common/page.service';
import { CommonService } from '../../services/common/common.service';
import { DatatableButtonOutput } from '../../models/common/datatable-button-output';
import { DatatableCheckboxOutput } from '../../models/common/datatable-checkbox-output';
import { dashCaseToCamelCase } from '@angular/animations/browser/src/util';
@Component({
  selector: 'app-custom-datatable',
  templateUrl: './custom-datatable.component.html',
  styleUrls: ['./custom-datatable.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CustomDatatableComponent implements OnChanges,OnDestroy,OnInit {
  @BlockUI() blockUi:NgBlockUI
  @ViewChild('globalSearch') globalSearch:FormControl;
  @ViewChild('showEntriesControl') showEntriesControl:FormControl;
  @Input() reload:boolean;
  @Input() dataChange:boolean;
  @Input() columnChange:boolean;
  @Input() DataList: any = [];
  @Input() ColumnList: UserFormControl[] = [];
  @Output() EditSelectedRowClicked:EventEmitter <any>=new EventEmitter <any>();
  @Output() DeleteDataRowClicked:EventEmitter <any>=new EventEmitter <any>();
  @Output() CheckedAllItem:EventEmitter <any>=new EventEmitter <any>();
  @Output() customButtonClick:EventEmitter <any>=new EventEmitter <any>();
  @Output() customCheckboxClick:EventEmitter <any>=new EventEmitter <any>();
  buttonData:DatatableButtonOutput={};
  checkboxData:DatatableCheckboxOutput={}
  showEntries:number=5;
  currentPage:number=1;
  totalshownToItem:number=0;
  totalshownFromItem:number=0;
  totalItem:number=0;
  isDataFound:boolean=false;
  IsAscendingOrder :boolean=true;
  IsDescendingOrder:boolean=false;
  DataList1:any=[];
  newOrderColumnList:UserFormControl[]=[];
  searchTerm:string=null;
  enableSaveButton:boolean=false;
  //pagin start
  allItems: any[];
  pager: Page={totalItems: 0,
    currentPage:0,
    pageSize:0,
    totalPages:0,
    startPage:0,
    endPage: 0,
    startIndex: 0,
    endIndex: 0,
    pages: []
  }
  pagedItems:any=[];
  array:any[]=[]
  //paging end
  constructor(private _customDatatableService:CustomDatatableService,
    private _pageService:PageService,
    private _alertBox:AlertBoxService,
    private commonService:CommonService
  ) { }
  ngOnInit(){
    console.log("Datatable called")
  }
  ngOnChanges() {
    console.log("Datatable called changes")
    debugger
    this.DataList1=this.DataList;
    this.ColumnList=this.ColumnList.filter(a=>{
     return a.IsEnable==true
    });
    this.allItems = this.DataList1
    this.setPage(1);
    this.globalSearch.valueChanges.subscribe(data=>{
      debugger
      if (data!=null&&data!=''){
        this.DataList1=[];
        this.DataList.forEach(item => 
          this.ColumnList.forEach(a=>{
              if(item[a.Name]!=undefined){
                let result= item[a.Name].toString().toUpperCase().includes(data.toString().toUpperCase());
                if(result){
                 this.DataList1.push(item)
                }
               }
          })
        )
        this.allItems = this.DataList1
        this.setPage(1);
      }
      else{
        this.DataList1=this.DataList;
        this.allItems = this.DataList1
        this.setPage(1);
      }
    });

  }
  setPage(page: number) {
    debugger
    this.currentPage=page;
    // get pager object from service
    this.pager = this._pageService.getPager(this.allItems.length, page,Number(this.showEntries));
    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    if(page==1){
      this.totalshownFromItem=1
      this.totalshownToItem=this.pagedItems.length;
    }
    else{
      this.totalshownFromItem=(Number(this.showEntries)*(page-1))+1;
      this.totalshownToItem=this.totalshownToItem+this.pagedItems.length;
    }
    this.totalItem=this.DataList.length;
  }
  getRowDetailsById($event){
    this.EditSelectedRowClicked.emit($event);
  }
  deleteRow($event){
    this.DeleteDataRowClicked.emit($event);
  }
  checkedAllItem($event){
    console.log($event);
    this.CheckedAllItem.emit($event.target.checked);
  }
  changeShowEntric(){
    this.setPage(this.currentPage);
  }
  ngOnDestroy(): void {
    this._customDatatableService.ColumnList=[];
    this._customDatatableService.DataList=[]
  }
  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.ColumnList, event.previousIndex, event.currentIndex);
    this.newOrderColumnList=this.ColumnList;
    this.enableSaveButton=true;
  }
  sortColumn(column:string){
    if(this.IsAscendingOrder){
      this.IsAscendingOrder=false;
      this.pagedItems=this.pagedItems.sort((t1, t2) => {
        const name1 = t1[column].toLowerCase();
        const name2 = t2[column].toLowerCase();
        if (name1 > name2) { return 1; }
        if (name1 < name2) { return -1; }
        return 0;
      });
    }
    else{
      this.IsAscendingOrder=true;
      this.pagedItems=this.pagedItems.sort((t1, t2) => {
        const name1 = t1[column].toLowerCase();
        const name2 = t2[column].toLowerCase();
        if (name1 < name2) { return 1; }
        if (name1 > name2) { return -1; }
        return 0;
      });
    }
  }
  btnClicked(columnName,data){
    this.buttonData.ColumnName=columnName;
    this.buttonData.RowData=data;
   this.customButtonClick.emit(this.buttonData)
  }
  checkboxClick(columnName,data,$event){
    this.checkboxData.ColumnName=columnName;
    this.checkboxData.RowData=data;
    this.checkboxData.IsChecked=$event.target.checked;
    this.customCheckboxClick.emit(this.checkboxData)
  }
  saveNewOrder(){
    this.newOrderColumnList.forEach((a,index)=>{
      a.OrderNo=index+1
    })
    this.blockUi.start("Loading....,Please wait.")
    this.commonService.saveColumnInfoList(this.newOrderColumnList).subscribe((response:boolean)=>{
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
