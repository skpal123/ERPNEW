import { Component, OnInit } from '@angular/core';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { InventoryLocation } from '../../../models/master-settings/inventory-defination/inventory-location.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { MatDialog } from '@angular/material';
import { DialogData } from '../../../models/common/dialog-data.model';
import { LocationEntryComponent } from '../location-entry/location-entry.component';
import { CustomDatatableService } from '../../../services/common/custom-datatable.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { NavigationDataService } from '../../../services/common/navigation-data.service';

@Component({
  selector: 'app-inventory-location-list',
  templateUrl: './inventory-location-list.component.html',
  styleUrls: ['./inventory-location-list.component.css']
})
export class InventoryLocationListComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  reload:boolean=false;
  columnReady:boolean=false;
  dataReady:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  locationList:InventoryLocation[]=[];
  location:InventoryLocation={Id:null,LocationId:null,Description:null}
  constructor(private _alertBox:AlertBoxService,
    private _postLoginservice:PostLoginService,
    private _customDatatableService:CustomDatatableService,
    private _navigationData:NavigationDataService,
    private _inventotyDefinationService:InventoryDefinationServiceService,
    private matDialog:MatDialog
  ) { }

  ngOnInit() {
    this.getLocaionList();
    this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this.blockUi.start("Loading....,Please wait")
    this._postLoginservice.getUserFormControlByFormName('location-list').subscribe(response=>{
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
  getLocaionList(){
    this.blockUi.start("Loading....,Please wait.")
    this._inventotyDefinationService.getLocationList().subscribe(response=>{
      this.blockUi.stop();
      this.locationList=response
      this.DataList=this.locationList
      this._customDatatableService.DataList=this.locationList;
      this.reload=true;
      this.dataReady=true;
    },error=>{
      debugger
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getLocationDetails($event:InventoryLocation){
    debugger
    this.blockUi.start("Loading....,Please wait.")
    this._inventotyDefinationService.getLocationById($event.Id).subscribe(response=>{
      this.blockUi.stop();
      this.location=response;
      this._navigationData.IsUpdate=true
      this._navigationData.PreviousData=this.location.LocationId;
      const dialogRef=this.matDialog.open(LocationEntryComponent,{
        data:this.location,
        disableClose:true,
        height:'auto',
        width:window.screen.width*.4+'px'
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.getLocaionList();
        }
      })
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteLocation($event:InventoryLocation){
    this.blockUi.start("Loading....,Please wait.")
    this._inventotyDefinationService.deleteLocation($event.Id).subscribe(response=>{
      this.blockUi.stop();
      let result=response;
      if(result){
        this.getLocaionList();
        let dialogData=new DialogData();
        dialogData.message="Location deleted succesfully";
        this._alertBox.openDialog(dialogData);
      }
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  createNewLocation(){
   this.clearUnit();
    const dialogRef=this.matDialog.open(LocationEntryComponent,{
      data:this.location,
      disableClose:true,
      height:'auto',
      maxHeight:window.screen.height*.6+'px',
      width:window.screen.width*.4+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getLocaionList();
      }
    })
  }
  clearUnit(){
    this.location.Id=null;
    this.location.LocationId=null;
    this.location.LocationName=null;
    this.location.Description=null;
  }
}
