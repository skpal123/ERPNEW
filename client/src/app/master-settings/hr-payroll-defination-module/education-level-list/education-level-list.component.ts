import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { EducationLevel } from '../../../models/master-settings/hr-payroll/education-level.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { CommonService } from '../../../services/common/common.service';
import { CustomDatatableService } from '../../../services/common/custom-datatable.service';
import { MatDialog } from '@angular/material';
import { HrPayrollDefinationServiceService } from '../../../services/master-settings/hr-payroll-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { EducationLevelComponent } from '../education-level/education-level.component';
import { NavigationDataService } from '../../../services/common/navigation-data.service';

@Component({
  selector: 'app-education-level-list',
  templateUrl: './education-level-list.component.html',
  styleUrls: ['./education-level-list.component.css']
})
export class EducationLevelListComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  reload:boolean=false;
  columnReady:boolean=false;
  dataReady:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  educationLevelList:EducationLevel[]=[];
  educationLevel:EducationLevel={
    Id:null,LevelId:null,LevelName:null
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
    this.getEducationLevelList();
    this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this.blockUi.start("Loading....,Please wait.")
    this._commonService.getUserFormControlByFormName('education-level-list').subscribe(response=>{
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
  getEducationLevelList(){
    this.blockUi.start("Loading....,Please wait")
    this._hrPayrollDefinationService.getEducationLevelList().subscribe(response=>{
      this.blockUi.stop();
      this.educationLevelList=response
      this.DataList=this.educationLevelList;
      this._customDatatableService.DataList=this.educationLevelList;
      this.reload=true;
      this.dataReady=true;
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getCustomerDetails($event:EducationLevel){
    debugger
    this.blockUi.start("Loading....,Please wait")
    this._hrPayrollDefinationService.getEducationLevelById($event.Id).subscribe(response=>{
      this.blockUi.stop();
      this.educationLevel=response;
      this._navigationData.IsUpdate=true;
      this._navigationData.PreviousData=this.educationLevel.LevelId
      const dialogRef=this.matDialog.open(EducationLevelComponent,{
        data:this.educationLevel,
        disableClose:true,
        height:'auto', 
        width:window.screen.width*.5+'px'
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.getEducationLevelList();
        }
      })
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteEducationLevel($event:EducationLevel){
    this.blockUi.start("Loading....,Please wait")
    this._hrPayrollDefinationService.DeleteEducationLevel($event.Id).subscribe(response=>{
      this.blockUi.stop();
      let result=response
      if(result){
        this.getEducationLevelList();
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
  createNewEducationLevel(){
   this.clearEducationLevel();
    const dialogRef=this.matDialog.open(EducationLevelComponent,{
      data:this.educationLevel,
      disableClose:true,
      height:'auto',
      width:window.screen.width*.5+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getEducationLevelList();
      }
    })
  }
  clearEducationLevel(){
    this.educationLevel.Id=null;
    this.educationLevel.LevelId=null;
    this.educationLevel.LevelName=null;
  }
}
