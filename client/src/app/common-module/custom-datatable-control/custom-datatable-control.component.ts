import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { UserFormControl } from '../../models/common/user-form-control.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DialogData } from '../../models/common/dialog-data.model';
import { AlertBoxService } from '../../shared/alert-box.service';
import { CommonService } from '../../services/common/common.service';

@Component({
  selector: 'app-custom-datatable-control',
  templateUrl: './custom-datatable-control.component.html',
  styleUrls: ['./custom-datatable-control.component.css']
})
export class CustomDatatableControlComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  constructor(
    public dialogRef: MatDialogRef<CustomDatatableControlComponent>,
    private _commonService:CommonService,
    private _alertBox:AlertBoxService,
    @Inject(MAT_DIALOG_DATA) public data: UserFormControl[]) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(){
    debugger
    console.log(this.data);
  }
  saveColumnInfo(){
    debugger
   this.blockUi.start("Loading....,Please wait.")
    this._commonService.saveColumnInfoList(this.data).subscribe((response:boolean)=>{
      this.blockUi.stop();
      let result=response;
      if(result){
        this.dialogRef.close(true);
      }
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
}
