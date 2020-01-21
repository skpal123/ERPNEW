import { Component, OnInit } from '@angular/core';
import { CodeFormater } from '../../../models/admin/code-formater.model';
import { GeneralSettingsService } from '../../../services/admin/general-settings.service';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DialogData } from '../../../models/common/dialog-data.model';
import { MatDialog } from '@angular/material';
import { CodeFormaterEntryComponent } from '../../../common-module/code-formater-entry/code-formater-entry.component';

@Component({
  selector: 'app-autocode-generation-format',
  templateUrl: './autocode-generation-format.component.html',
  styleUrls: ['./autocode-generation-format.component.css']
})
export class AutocodeGenerationFormatComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  codeFormater:CodeFormater={Id:null,Name:null,ItemLength:0,ItemName:null,FromEntry:false,IsSerial:true,IsTodaysDate:false,
  IsSymbol:false,SymbolName:null,Prefix:null,StartPossition:0,LastNumber:0,StringLength:0};
  codeformaterList:CodeFormater[]=[];
  constructor(private _generalSettingService:GeneralSettingsService,
    private matDialog:MatDialog,
  private _alertBox:AlertBoxService) { }

  ngOnInit() {
    this.getCodFormaterList();
  }
  getCodFormaterList(){
    this.blockUi.start("Loading....,Please wait")
    this._generalSettingService.getCodeFormaterList().subscribe(response=>{
      this.blockUi.stop();
      this.codeformaterList=response
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getCodeFormaterById(Id:string){
    this.blockUi.start("Loading....,Please wait")
    this._generalSettingService.getCodeFormaterById(Id).subscribe(response=>{
      this.blockUi.stop();
      this.codeFormater=response;
      const dialogRef=this.matDialog.open(CodeFormaterEntryComponent,{
        data:this.codeFormater,
        disableClose:true,
        height:window.screen.height*.6+'px',
        width:window.screen.width*.4+'px'
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.getCodFormaterList();
        }
      })
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteCodeFormater(Id:string){
    this.blockUi.start("Loading....,Please wait")
    this._generalSettingService.DeleteCodeFormater(Id).subscribe(response=>{
      this.blockUi.stop();
      let result=response
      if(result){
        let dialogData=new DialogData();
        dialogData.message="Delete successfully";
        this._alertBox.openDialog(dialogData);
        this.getCodFormaterList();
      }
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  createNewCodeFormater(){
    this.clearCodeFormater();
    const dialogRef=this.matDialog.open(CodeFormaterEntryComponent,{
      data:this.codeFormater,
      disableClose:true,
      height:window.screen.height*.6+'px',
      width:window.screen.width*.4+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getCodFormaterList();
      }
    })
  }
  clearCodeFormater(){
    this.codeFormater.Id=null;
    this.codeFormater.Name=null;
    this.codeFormater.ItemLength=null;
    this.codeFormater.ItemName=null;
    this.codeFormater.IsSerial=null;
    this.codeFormater.IsTodaysDate=null;
    this.codeFormater.IsSymbol=null;
    this.codeFormater.SymbolName=null;
    this.codeFormater.Prefix=null;
    this.codeFormater.StartPossition=null;
    this.codeFormater.LastNumber=null;
    this.codeFormater.StringLength=null;
  }
}
