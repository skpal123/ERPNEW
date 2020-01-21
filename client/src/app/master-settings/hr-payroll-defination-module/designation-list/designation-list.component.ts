import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Designation } from '../../../models/master-settings/hr-payroll/designation.model';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { PostLoginService } from '../../../services/common/post-login.service';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { CustomDatatableService } from '../../../services/common/custom-datatable.service';
import { MatDialog } from '@angular/material';
import { HrPayrollDefinationServiceService } from '../../../services/master-settings/hr-payroll-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { DesignationComponent } from '../designation/designation.component';
import { NavigationDataService } from '../../../services/common/navigation-data.service';

@Component({
  selector: 'app-designation-list',
  templateUrl: './designation-list.component.html',
  styleUrls: ['./designation-list.component.css']
})
export class DesignationListComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  reload:boolean=false;
  columnReady:boolean=false;
  dataReady:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  designationList:Designation[]=[];
  designation:Designation={
    Id:null,DesignationId:null,DesignationName:null,Description:null
  }
  constructor(private _alertBox:AlertBoxService,
    private _postLoginservice:PostLoginService,
    private _customDatatableService:CustomDatatableService,
    private matDialog:MatDialog,
    private _navigationData:NavigationDataService,
    private _hrPayrollDefinationService:HrPayrollDefinationServiceService,
  ) { }
  ngOnInit() {
    debugger
    this.getDesignationList();
    this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this.blockUi.start("Loading....,Please wait.")
    this._postLoginservice.getUserFormControlByFormName('designation-list').subscribe(response=>{
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
  getDesignationList(){
    this.blockUi.start("Loading....,Please wait")
    this._hrPayrollDefinationService.getDesignationList().subscribe(response=>{
      this.blockUi.stop();
      this.designationList=response
      this.DataList=this.designationList;
      this._customDatatableService.DataList=this.designationList;
      this.reload=true;
      this.dataReady=true;
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getCustomerDetails($event:Designation){
    debugger
    this.blockUi.start("Loading....,Please wait")
    this._hrPayrollDefinationService.getDesignationById($event.Id).subscribe(response=>{
      this.blockUi.stop();
      this.designation=response;
      this._navigationData.IsUpdate=true;
      this._navigationData.PreviousData=this.designation.DesignationId;
      const dialogRef=this.matDialog.open(DesignationComponent,{
        data:this.designation,
        disableClose:true,
        height:'auto', 
        width:window.screen.width*.5+'px'
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.getDesignationList();
        }
      })
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteDesignation($event:Designation){
    this.blockUi.start("Loading....,Please wait")
    this._hrPayrollDefinationService.DeleteDesignation($event.Id).subscribe(response=>{
      this.blockUi.stop();
      let result=response
      if(result){
        this.getDesignationList();
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
  createNewDesignation(){
   this.clearDesignation();
    const dialogRef=this.matDialog.open(DesignationComponent,{
      data:this.designation,
      disableClose:true,
      height:'auto',
      width:window.screen.width*.5+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getDesignationList();
      }
    })
  }
  clearDesignation(){
    this.designation.Id=null;
    this.designation.DesignationId=null;
    this.designation.DesignationName=null;
    this.designation.Description=null;
  }

}
