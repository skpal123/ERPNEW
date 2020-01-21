import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { SalaryItem } from '../../../models/master-settings/hr-payroll/salary-item.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { CommonService } from '../../../services/common/common.service';
import { CustomDatatableService } from '../../../services/common/custom-datatable.service';
import { MatDialog } from '@angular/material';
import { HrPayrollDefinationServiceService } from '../../../services/master-settings/hr-payroll-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { SalaryItemComponent } from '../salary-item/salary-item.component';
import { NavigationDataService } from '../../../services/common/navigation-data.service';
@Component({
  selector: 'app-salary-item-list',
  templateUrl: './salary-item-list.component.html',
  styleUrls: ['./salary-item-list.component.css']
})
export class SalaryItemListComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  reload:boolean=false;
  columnReady:boolean=false;
  dataReady:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  salaryItemList:SalaryItem[]=[];
  salaryItem:SalaryItem={
    Id:null,ItemId:null,ItemName:'0',IsBasic:false,IsDefault:true,
    IsDaily:false,IsLeave:false,IsLoan:false,IsPension:false,IsTax:false,DefaultAmount:0,
    Percentage:null,InheritedItem:null,OperatorString:null
  }
  constructor(private _alertBox:AlertBoxService,
    private _commonService:CommonService,
    private _customDatatableService:CustomDatatableService,
    private matDialog:MatDialog,
    private _navigationData:NavigationDataService,
    private _hrPayrollDefinationService:HrPayrollDefinationServiceService,
  ) { }
  ngOnInit() {
    debugger
    this.getSalaryItemList();
    this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this.blockUi.start("Loading....,Please wait.")
    this._commonService.getUserFormControlByFormName('salary-item-list').subscribe(response=>{
      this.blockUi.stop();
      this.userControlList=response;
      this.ColumnList=this.userControlList;
      this._customDatatableService.ColumnList=this.userControlList;
      this.columnReady=true;
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getSalaryItemList(){
    this.blockUi.start("Loading....,Please wait")
    this._hrPayrollDefinationService.getSalaryItemList().subscribe(response=>{
      this.blockUi.stop();
      this.salaryItemList=response
      this.DataList=this.salaryItemList;
      this._customDatatableService.DataList=this.salaryItemList;
      this.reload=true;
      this.dataReady=true;
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getSalaryItemDetails($event:SalaryItem){
    debugger
    this.blockUi.start("Loading....,Please wait")
    this._hrPayrollDefinationService.getSalaryItemById($event.Id).subscribe(response=>{
      this.blockUi.stop();
      this.salaryItem=response;
      this._navigationData.IsUpdate=true;
      this._navigationData.PreviousData=this.salaryItem.ItemId
      const dialogRef=this.matDialog.open(SalaryItemComponent,{
        data:this.salaryItem,
        disableClose:true,
        height:'auto', 
        width:window.screen.width*.5+'px'
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.getSalaryItemList();
        }
      })
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteSalaryItem($event:SalaryItem){
    this.blockUi.start("Loading....,Please wait")
    this._hrPayrollDefinationService.DeleteSalaryItem($event.Id).subscribe(response=>{
      this.blockUi.stop();
      let result=response
      if(result){
        this.getSalaryItemList();
        let dialogData=new DialogData();
        dialogData.message="Customer deleted succesfully";
        this._alertBox.openDialog(dialogData);
      }
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  createNewSalaryItem(){
   this.clearSalaryItem();
    const dialogRef=this.matDialog.open(SalaryItemComponent,{
      data:this.salaryItem,
      disableClose:true,
      height:'auto',
      width:window.screen.width*.35+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getSalaryItemList();
      }
    })
  }
  clearSalaryItem(){
    this.salaryItem.Id=null;
    this.salaryItem.ItemId=null;
    this.salaryItem.ItemName=null;
    this.salaryItem.ItemType="0"
    this.salaryItem.IsBasic=false;
    this.salaryItem.IsDaily=false;
    this.salaryItem.IsDefault=true;
    this.salaryItem.IsLeave=false;
    this.salaryItem.IsLoan=false;
    this.salaryItem.IsPension=false;
    this.salaryItem.IsTax=false;
    this.salaryItem.DefaultAmount=0;
  }

}
