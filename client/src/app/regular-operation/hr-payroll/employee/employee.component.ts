import { Component, OnInit } from '@angular/core';
import { DialogData } from '../../../models/common/dialog-data.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { CompleterService, CompleterData } from 'ng2-completer';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  dtTrigger: Subject<any> = new Subject<any>();
  datalist:any=[
    {Id:"0",Name:"soman",Gender:"male",Salary:10000,Dept:"IT"},
    {Id:"1",Name:"soman 1",Gender:"female",Salary:12000,Dept:"BBA"},
    {Id:"2",Name:"soman 2",Gender:"male",Salary:15000,Dept:"3"},
    {Id:"3",Name:"soman 4",Gender:"female",Salary:20000,Dept:"2"}
  ]
  protected captains = ['male','female','unknown'];
  columnlist:any=[
    {Name:"Id",LabelName:"Id",Type:'text',Editable:false,Autocomplete:false},
    {Name:"Name",LabelName:"Name",Type:'text',Editable:true,Autocomplete:false},
    {Name:"Gender",LabelName:"Gender",Type:'text',Editable:true,Autocomplete:false},
    {Name:"Salary",LabelName:"Salary",Type:'number',Editable:true,Autocomplete:false},
    {Name:"Dept",LabelName:"Dept",Type:'text',Editable:false,Autocomplete:false}
  ];
  deptList:any=[
    {Id:"1",Name:"IT"},
    {Id:"2",Name:"BBA"},
    {Id:"3",Name:"CSE"},
    {Id:"4",Name:"IIT"}
  ]
  constructor(private _alertBox:AlertBoxService) { 
  }

  ngOnInit() {

  }
  GetAlertBox(){
    var dialogData=new DialogData();
    dialogData.title="Alert";
    dialogData.message="message.Message";
    this._alertBox.openDialog(dialogData)
  }
  CheckData(){
    for(var i=0;i<this.datalist.length;i++){
      alert(this.datalist[i].Gender)
    }
  }
  ParentAutoCompleteDataSource(data){
    alert(data)
  }
}
