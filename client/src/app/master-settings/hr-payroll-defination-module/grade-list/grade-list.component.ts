import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { Grade } from '../../../models/master-settings/hr-payroll/grade.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { CommonService } from '../../../services/common/common.service';
import { CustomDatatableService } from '../../../services/common/custom-datatable.service';
import { HrPayrollDefinationServiceService } from '../../../services/master-settings/hr-payroll-defination-service.service';
import { MatDialog } from '@angular/material';
import { DialogData } from '../../../models/common/dialog-data.model';
import { GradeComponent } from '../grade/grade.component';
import { DatatableButtonOutput } from '../../../models/common/datatable-button-output';
import { GradeSalaryItemComponent } from '../grade-salary-item/grade-salary-item.component';
import { GradeSubGradeSalItem } from '../../../models/master-settings/hr-payroll/grade-subgrade-salitem.model';
import { GradeSubGradeSalItemDetails } from '../../../models/master-settings/hr-payroll/grade-subgrade-salitem-details.model';
import { SalaryItem } from '../../../models/master-settings/hr-payroll/salary-item.model';
import { GradeSubGradeSalaryItem } from '../../../models/master-settings/hr-payroll/grade-sub-grade-salaryitem.model';
import { NavigationDataService } from '../../../services/common/navigation-data.service';

@Component({
  selector: 'app-grade-list',
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.css']
})
export class GradeListComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  reload:boolean=false;
  columnReady:boolean=false;
  dataReady:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  gradeList:Grade[]=[];
  salaryItemList:SalaryItem[]=[];
  grade:Grade={Id:null,GradeId:null,GradeName:null}
  gradeStepSalaryItemList:GradeSubGradeSalaryItem[]=[];
  gradeSubGradeSalItemDetails:GradeSubGradeSalItemDetails={ 
    Grade_Id:null,SubGrade_Id:null,GradeName:null,SubGradeName:null,GradeSubGradeSalItemList:[]
  }
  constructor(private _alertBox:AlertBoxService,
    private _commonService:CommonService,
    private _navigationData:NavigationDataService,
    private _customDatatableService:CustomDatatableService,
    private _hrPayrollDefinationService:HrPayrollDefinationServiceService,
    private matDialog:MatDialog
  ) { }
  ngOnInit() {
    debugger
    this.getGradeList();
    this.getSalaryItemList();
    this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this.blockUi.start("Loading....,Please wait.")
    this._commonService.getUserFormControlByFormName('grade-list').subscribe(response=>{
      this.blockUi.stop();
      this.userControlList=response;
      this.ColumnList=this.userControlList
      this._customDatatableService.ColumnList=this.userControlList;
      this.columnReady=true;
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getSalaryItemList(){
    this._hrPayrollDefinationService.getSalaryItemList().subscribe(response=>{
      this.salaryItemList=response
      this.gradeSubGradeSalItemDetails.SalaryItemList=this.salaryItemList;
    },
  error=>{
    let dialogData=new DialogData();
    dialogData.message=error
    this._alertBox.openDialog(dialogData);
  })
  }
  getGradeList(){
    this.blockUi.start("Loading....,Please wait.")
    this._hrPayrollDefinationService.getGradeList().subscribe(response=>{
      this.blockUi.stop();
      this.gradeList=response
      this.DataList=this.gradeList
      this.gradeList.forEach(a=>{
        a.GradeSalaryItem="Add grade salary item";
      })
      this._customDatatableService.DataList=this.gradeList;
      this.dataReady=true;
      this.reload=true;
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getGradeDetails($event:Grade){
    debugger
    this.blockUi.start("Loading....,Please wait.")
    this._hrPayrollDefinationService.getGradeById($event.Id).subscribe(response=>{
      this.blockUi.stop();
      this.grade=response;
      this._navigationData.IsUpdate=true;
      this._navigationData.PreviousData=this.grade.GradeId
      const dialogRef=this.matDialog.open(GradeComponent,{
        data:this.grade,
        disableClose:true,
        height:'auto',
        maxHeight:window.screen.height*.6+'px',
        width:window.screen.width*.4+'px'
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.getGradeList();
        }
      })
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteGrade($event:Grade){
    this.blockUi.start("Loading....,Please wait.")
    this._hrPayrollDefinationService.DeleteGrade($event.Id).subscribe(response=>{
      this.blockUi.stop();
      let result=response
      if(result){
        this.getGradeList();
        let dialogData=new DialogData();
        dialogData.message="Grade deleted succesfully";
        this._alertBox.openDialog(dialogData);
      }
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  createNewGrade(){
    debugger
   this.clearGrade();
    const dialogRef=this.matDialog.open(GradeComponent,{
      data:this.grade,
      disableClose:true,
      height:'auto',
      maxHeight:window.screen.height*.6+'px',
      width:window.screen.width*.4+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getGradeList();
      }
    })
  }
  clearGrade(){
    this.grade.Id=null;
    this.grade.GradeId=null;
    this.grade.GradeName=null;
  }
  customButtonClicked($event:DatatableButtonOutput){
    debugger
    this.grade=$event.RowData;
    if($event.ColumnName=="GradeSalaryItem"){
      this.getGradeSepSalaryItemListByGradeId(this.grade.Id)
    }
  }
  getGradeSepSalaryItemListByGradeId(gradeId:string){
    this.blockUi.start("Loading....,Please wait.")
    this._hrPayrollDefinationService.GetGradeStepSalaryItemByGradeId(gradeId).subscribe(response=>{
      this.blockUi.stop();
      this.gradeStepSalaryItemList=response;
      if(this.gradeStepSalaryItemList.length>0){
        this.gradeSubGradeSalItemDetails.GradeSubGradeSalItemList=[];  
        this.gradeStepSalaryItemList.forEach(sal=>{
          let gradeSubGradeSalItem=new GradeSubGradeSalItem();
            let salary=this.salaryItemList.filter(x=>x.ItemId==sal.SalaryItemId)[0]
            gradeSubGradeSalItem.SalaryItem_Id=sal.SalaryItem_Id
            gradeSubGradeSalItem.SalaryItemName=sal.SalaryItemId+'-'+salary.ItemName;
            gradeSubGradeSalItem.Amount=sal.SalaryAmount
            gradeSubGradeSalItem.SingleItemAmount=sal.SingleItemAmount
            gradeSubGradeSalItem.InheritedItemId=sal.InheritedItem_Id
            gradeSubGradeSalItem.Percentage=sal.Percentage
            gradeSubGradeSalItem.BuildFormula=sal.ComparatorString
          this.gradeSubGradeSalItemDetails.GradeSubGradeSalItemList.push(gradeSubGradeSalItem)
        })
         this.openGradeStepSalaryItemDialog() 
      }
      else{
        this.gradeSubGradeSalItemDetails.GradeSubGradeSalItemList=[]; 
        this.salaryItemList.forEach((sal,index,array)=>{
          //this.autoCompleteData.push(sal.ItemId+"-"+sal.ItemName)
          if(sal.IsDefault){
            let gradeSubGradeSalItem=new GradeSubGradeSalItem();
            gradeSubGradeSalItem.SalaryItemName=sal.ItemId+'-'+sal.ItemName;
            gradeSubGradeSalItem.Amount=0
            gradeSubGradeSalItem.SalaryItem_Id=sal.Id
            gradeSubGradeSalItem.SingleItemAmount=0
            gradeSubGradeSalItem.InheritedItemId=null;
            gradeSubGradeSalItem.Percentage=0;
            gradeSubGradeSalItem.BuildFormula=null;
            this.gradeSubGradeSalItemDetails.GradeSubGradeSalItemList.push(gradeSubGradeSalItem)
          }
        });
        this.openGradeStepSalaryItemDialog()
      }
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  openGradeStepSalaryItemDialog(){     
      this.gradeSubGradeSalItemDetails.Grade_Id=this.grade.Id
      this.gradeSubGradeSalItemDetails.GradeName=this.grade.GradeName;
      const dialogRef=this.matDialog.open(GradeSalaryItemComponent,{
        data:this.gradeSubGradeSalItemDetails,
        disableClose:true,
        maxWidth:'100vw',
        maxHeight:'100vh',
        height:'auto',
        width:'70%'
      });
      dialogRef.afterClosed().subscribe(result=>{
        
      })
  }
}

