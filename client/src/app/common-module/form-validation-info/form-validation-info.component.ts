import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { FormInfo } from '../../models/common/formInfo.model';
import { ValidationService } from '../../services/common/validation.service';
import { DialogData } from '../../models/common/dialog-data.model';
import { AlertBoxService } from '../../shared/alert-box.service';

@Component({
  selector: 'app-form-validation-info',
  templateUrl: './form-validation-info.component.html',
  styleUrls: ['./form-validation-info.component.css']
})
export class FormValidationInfoComponent implements OnInit {
  @Input() formName:string;
  formInfoList:FormInfo[];
  @Output() saveButtonclicked:EventEmitter <any>=new EventEmitter <any>();
  constructor(private _validationService:ValidationService,
  private _alertBox:AlertBoxService) { }
  
  ngOnInit() {
    debugger
    this.getFormInfoList();
  }
  getFormInfoList(){
    this._validationService.getFormInfoList(this.formName).subscribe((response:FormInfo[])=>{
      this.formInfoList=response
      console.log(response)
    },error=>{
      let message=error
      let dialogData=new DialogData();
      dialogData.message=message.Message; 
      this._alertBox.openDialog(dialogData);
    })
  }
  saveFormInfo(){
    debugger
    this._validationService.saveFormInfoList(this.formInfoList).subscribe((response:FormInfo[])=>{
      if(response){
        let dialogData=new DialogData();
        dialogData.message="Updated successfully"
        this._alertBox.openDialog(dialogData);
        this.saveButtonclicked.emit(true);
      }
    },error=>{
      let message=error
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
}
