import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { Occupation } from '../../../models/master-settings/hr-payroll/occupation.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { CommonService } from '../../../services/common/common.service';
import { CustomDatatableService } from '../../../services/common/custom-datatable.service';
import { MatDialog } from '@angular/material';
import { HrPayrollDefinationServiceService } from '../../../services/master-settings/hr-payroll-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { OccupationComponent } from '../occupation/occupation.component';
import { NavigationDataService } from '../../../services/common/navigation-data.service';

@Component({
  selector: 'app-occupation-list',
  templateUrl: './occupation-list.component.html',
  styleUrls: ['./occupation-list.component.css']
})
export class OccupationListComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  reload:boolean=false;
  columnReady:boolean=false;
  dataReady:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  occupationList:Occupation[]=[];
  occupation:Occupation={
    Id:null,OccupationId:null,OccupationName:null
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
    this.getOccupationList();
    this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this.blockUi.start("Loading....,Please wait.")
    this._commonService.getUserFormControlByFormName('occupation-list').subscribe(response=>{
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
  getOccupationList(){
    this.blockUi.start("Loading....,Please wait")
    this._hrPayrollDefinationService.getOccupationList().subscribe(response=>{
      this.blockUi.stop();
      this.occupationList=response
      this.DataList=this.occupationList;
      this._customDatatableService.DataList=this.occupationList;
      this.reload=true;
      this.dataReady=true;
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getCustomerDetails($event:Occupation){
    debugger
    this.blockUi.start("Loading....,Please wait")
    this._hrPayrollDefinationService.getOccupationById($event.Id).subscribe(response=>{
      this.blockUi.stop();
      this.occupation=response;
      this._navigationData.IsUpdate=true;
      this._navigationData.PreviousData=this.occupation.OccupationId
      const dialogRef=this.matDialog.open(OccupationComponent,{
        data:this.occupation,
        disableClose:true,
        height:'auto', 
        width:window.screen.width*.5+'px'
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.getOccupationList();
        }
      })
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteOccupation($event:Occupation){
    this.blockUi.start("Loading....,Please wait")
    this._hrPayrollDefinationService.DeleteOccupation($event.Id).subscribe(response=>{
      this.blockUi.stop();
      let result=response
      if(result){
        this.getOccupationList();
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
  createNewOccupation(){
   this.clearOccupation();
    const dialogRef=this.matDialog.open(OccupationComponent,{
      data:this.occupation,
      disableClose:true,
      height:'auto',
      width:window.screen.width*.5+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getOccupationList();
      }
    })
  }
  clearOccupation(){
    this.occupation.Id=null;
    this.occupation.OccupationId=null;
    this.occupation.OccupationName=null;
  }

}
