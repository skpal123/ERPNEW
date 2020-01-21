import { Component, OnInit, Inject } from '@angular/core';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AddUnitComponent } from '../add-unit/add-unit.component';
import { Unit } from '../../../models/master-settings/inventory-defination/unit.model';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { DialogData } from '../../../models/common/dialog-data.model';
import { CustomDatatableService } from '../../../services/common/custom-datatable.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css']
})
export class UnitListComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  reload:boolean=false;
  columnReady:boolean=false;
  dataReady:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  unitList:Unit[]=[];
  unit:Unit={Id:null,UnitName:null,Description:null}
  constructor(private _alertBox:AlertBoxService,
    private _postLoginservice:PostLoginService,
    private _customDatatableService:CustomDatatableService,
    private _inventotyDefinationService:InventoryDefinationServiceService,
    private matDialog:MatDialog
  ) { }
  ngOnInit() {
    debugger
    this.getUnitList();
    this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this.blockUi.start("Loading....,Please wait.")
    this._postLoginservice.getUserFormControlByFormName('unit-list').subscribe(response=>{
      this.blockUi.stop();
      this.userControlList=response
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
  getUnitList(){
    debugger
    this.blockUi.start("Loading....,Please wait.")
    this._inventotyDefinationService.getUnitList().subscribe(response=>{
      this.blockUi.stop();
      this.unitList=response
      this.DataList=this.unitList;
      this._customDatatableService.DataList=this.unitList;
      this.reload=true;
      this.dataReady=true;
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getUnitDetails($event:Unit){
    debugger
    this.blockUi.start("Loading....,Please wait.")
    this._inventotyDefinationService.getUnitById($event.Id).subscribe(response=>{
      this.blockUi.stop();
      this.unit=response
      const dialogRef=this.matDialog.open(AddUnitComponent,{
        data:this.unit,
        disableClose:true,
        height:'auto',
        width:window.screen.width*.4+'px'
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.getUnitList();
        }
      })
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteUnit($event:Unit){
    this.blockUi.start("Loading....,Please wait.")
    this._inventotyDefinationService.deleteUnit($event.Id).subscribe(response=>{
      this.blockUi.stop();
      let result=response
      if(result){
        this.getUnitList();
        let dialogData=new DialogData();
        dialogData.message="Unit deleted succesfully";
        this._alertBox.openDialog(dialogData);
      }
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  createNewUnit(){
   this.clearUnit();
    const dialogRef=this.matDialog.open(AddUnitComponent,{
      data:this.unit,
      disableClose:true,
      height:'auto',
      maxHeight:window.screen.height*.6+'px',
      width:window.screen.width*.4+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getUnitList();
      }
    })
  }
  clearUnit(){
    this.unit.Id=null;
    this.unit.UnitName=null;
    this.unit.Description=null;
  }
}
