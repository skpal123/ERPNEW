import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { Department } from '../../../models/master-settings/hr-payroll/department.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { CommonService } from '../../../services/common/common.service';
import { CustomDatatableService } from '../../../services/common/custom-datatable.service';
import { MatDialog } from '@angular/material';
import { HrPayrollDefinationServiceService } from '../../../services/master-settings/hr-payroll-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { DepartmentComponent } from '../department/department.component';
import { NavigationDataService } from '../../../services/common/navigation-data.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  reload:boolean=false;
  columnReady:boolean=false;
  dataReady:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  departmentList:Department[]=[];
  department:Department={
    Id:null,DepartmentId:null,DepartmentName:null,Description:null
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
    this.getDepartmentList();
    this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this.blockUi.start("Loading....,Please wait.")
    this._commonService.getUserFormControlByFormName('department-list').subscribe(response=>{
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
  getDepartmentList(){
    this.blockUi.start("Loading....,Please wait")
    this._hrPayrollDefinationService.getDepartmentList().subscribe(response=>{
      this.blockUi.stop();
      this.departmentList=response
      this.DataList=this.departmentList;
      this._customDatatableService.DataList=this.departmentList;
      this.reload=true;
      this.dataReady=true;
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getDepartmentDetails($event:Department){
    debugger
    this.blockUi.start("Loading....,Please wait")
    this._hrPayrollDefinationService.getDepartmentById($event.Id).subscribe(response=>{
      this.blockUi.stop();
      this.department=response
      const dialogRef=this.matDialog.open(DepartmentComponent,{
        data:this.department,
        disableClose:true,
        height:'auto', 
        width:window.screen.width*.5+'px'
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.getDepartmentList();
        }
      })
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteDepartment($event:Department){
    this.blockUi.start("Loading....,Please wait")
    this._hrPayrollDefinationService.DeleteDepartment($event.Id).subscribe(response=>{
      this.blockUi.stop();
      let result=response
      if(result){
        this.getDepartmentList();
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
  createNewDepartment(){
   this.clearDepartment();
    const dialogRef=this.matDialog.open(DepartmentComponent,{
      data:this.department,
      disableClose:true,
      height:'auto',
      width:window.screen.width*.5+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getDepartmentList();
      }
    })
  }
  clearDepartment(){
    this.department.Id=null;
    this.department.DepartmentId=null;
    this.department.DepartmentName=null;
    this.department.Description=null;
  }
}
