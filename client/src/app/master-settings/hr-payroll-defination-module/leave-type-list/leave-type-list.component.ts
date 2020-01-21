import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { LeaveType } from '../../../models/master-settings/hr-payroll/leave-type.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { CommonService } from '../../../services/common/common.service';
import { CustomDatatableService } from '../../../services/common/custom-datatable.service';
import { MatDialog } from '@angular/material';
import { HrPayrollDefinationServiceService } from '../../../services/master-settings/hr-payroll-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { LeaveTypeComponent } from '../leave-type/leave-type.component';
import { NavigationDataService } from '../../../services/common/navigation-data.service';

@Component({
  selector: 'app-leave-type-list',
  templateUrl: './leave-type-list.component.html',
  styleUrls: ['./leave-type-list.component.css']
})
export class LeaveTypeListComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  reload:boolean=false;
  columnReady:boolean=false;
  dataReady:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  leaveTypeList:LeaveType[]=[];
  leaveType:LeaveType={
    Id:null,LeaveTypeId:null,LeaveTypeName:null,IsPaid:true
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
    this.getLeaveTypeList();
    this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this.blockUi.start("Loading....,Please wait.")
    this._commonService.getUserFormControlByFormName('leave-type-list').subscribe(response=>{
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
  getLeaveTypeList(){
    this.blockUi.start("Loading....,Please wait")
    this._hrPayrollDefinationService.getLeaveTypeList().subscribe(response=>{
      this.blockUi.stop();
      this.leaveTypeList=response
      this.DataList=this.leaveTypeList;
      this._customDatatableService.DataList=this.leaveTypeList;
      this.reload=true;
      this.dataReady=true;
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getCustomerDetails($event:LeaveType){
    debugger
    this.blockUi.start("Loading....,Please wait")
    this._hrPayrollDefinationService.getLeaveTypeById($event.Id).subscribe(response=>{
      this.blockUi.stop();
      this.leaveType=response;
      this._navigationData.IsUpdate=true;
      this._navigationData.PreviousData=this.leaveType.LeaveTypeId
      const dialogRef=this.matDialog.open(LeaveTypeComponent,{
        data:this.leaveType,
        disableClose:true,
        height:'auto', 
        width:window.screen.width*.5+'px'
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.getLeaveTypeList();
        }
      })
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteLeaveType($event:LeaveType){
    this.blockUi.start("Loading....,Please wait")
    this._hrPayrollDefinationService.DeleteLeaveType($event.Id).subscribe(response=>{
      this.blockUi.stop();
      let result=response
      if(result){
        this.getLeaveTypeList();
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
  createNewLeaveType(){
   this.clearLeaveType();
    const dialogRef=this.matDialog.open(LeaveTypeComponent,{
      data:this.leaveType,
      disableClose:true,
      height:'auto',
      width:window.screen.width*.5+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getLeaveTypeList();
      }
    })
  }
  clearLeaveType(){
    this.leaveType.Id=null;
    this.leaveType.LeaveTypeId=null;
    this.leaveType.LeaveTypeName=null;
    this.leaveType.IsPaid=true;
  }
}
