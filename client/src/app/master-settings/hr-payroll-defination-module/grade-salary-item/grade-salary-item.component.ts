import { Component, OnInit ,Inject} from '@angular/core';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { SalaryItem } from '../../../models/master-settings/hr-payroll/salary-item.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { CommonService } from '../../../services/common/common.service';
import { CustomDatatableService } from '../../../services/common/custom-datatable.service';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { HrPayrollDefinationServiceService } from '../../../services/master-settings/hr-payroll-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { GradeSubGradeSalItemDetails } from '../../../models/master-settings/hr-payroll/grade-subgrade-salitem-details.model';
import { DatatableTextOutput } from '../../../models/common/datatable-text-click.model';
import { BuildFormulaComponent } from '../build-formula/build-formula.component';
import { GradeSubGradeSalItem } from '../../../models/master-settings/hr-payroll/grade-subgrade-salitem.model';
import { GradeSubGradeSalaryItem } from '../../../models/master-settings/hr-payroll/grade-sub-grade-salaryitem.model';
import { SalaryItemComponent } from '../salary-item/salary-item.component';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-grade-salary-item',
  templateUrl: './grade-salary-item.component.html',
  styleUrls: ['./grade-salary-item.component.css']
})
export class GradeSalaryItemComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  IsSaveButtonClick:boolean=false;
  reload:boolean=false;
  columnReady:boolean=false;
  dataReady:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  salaryItemList:SalaryItem[]=[];
  selectedRow:GradeSubGradeSalItem;
  gradeSubGradeSalaryItemList:GradeSubGradeSalaryItem[]=[]
  salaryItem:SalaryItem={Id:null,InheritedItem:null,InheritedItemName:null,Percentage:null,OperatorString:null}
  autoCompleteData=[];
  constructor(private _alertBox:AlertBoxService,
    private _commonService:CommonService,
    private _customDatatableService:CustomDatatableService,
    private matDialog:MatDialog,
    private _hrPayrollDefinationService:HrPayrollDefinationServiceService,
    public matDialogRef:MatDialogRef<GradeSalaryItemComponent>,
  @Inject(MAT_DIALOG_DATA) public gradeSubGradeSalItemDetails:GradeSubGradeSalItemDetails
  ) { }
  ngOnInit() {
    debugger
    this.getDataList();
    this.getAutoCompleteData();
    this.getUserFormControlByFormName();
  }
  onNoClick():void{
    this.matDialogRef.close(this.IsSaveButtonClick);
  }
  getAutoCompleteData(){
    this.gradeSubGradeSalItemDetails.SalaryItemList.forEach(sal=>{
      this.autoCompleteData.push(sal.ItemId+"-"+sal.ItemName)
    })
  }
  getDataList(){
    this.DataList=this.gradeSubGradeSalItemDetails.GradeSubGradeSalItemList;
  }
  ParentAutoCompleteDataSource($event:string){
    debugger
    console.log($event)
  }
  deleteVoucherDetailsRow(index:number){

  }
  getUserFormControlByFormName(){
    this._commonService.getUserFormControlByFormName('grade-sub-grade-salayitem-list').subscribe(response=>{
      this.userControlList=response;
      this.ColumnList=this.userControlList;
      this._customDatatableService.ColumnList=this.userControlList;
      this.columnReady=true;
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  GetDatatableColumnTextClicked($event:DatatableTextOutput){
    debugger
    this.selectedRow=$event.RowData;
    if($event.ColumnName=="BuildFormula"){
      //this.gradeSubGradeSalItemDetails.GradeSubGradeSalItemList=[];
      //this.addNewRow()
      if(this.selectedRow.BuildFormula!=null){
        this.salaryItem.OperatorString=this.selectedRow.BuildFormula;
        this.salaryItem.ItemName=this.selectedRow.SalaryItemName;
        this.salaryItem.InheritedItem=this.selectedRow.InheritedItemId;
        this.salaryItem.Percentage=this.selectedRow.Percentage;
        let salaryItem=this.gradeSubGradeSalItemDetails.SalaryItemList.filter(f=>f.Id==this.selectedRow.InheritedItemId)[0];
        if(salaryItem){
          this.salaryItem.Id=salaryItem.Id
          this.salaryItem.ItemId=salaryItem.ItemId;
          this.salaryItem.ItemName=salaryItem.ItemName
        }
      }
      else{
        this.clearSalaryItem()
      }
      const dialog=this.matDialog.open(BuildFormulaComponent,{
        data:this.salaryItem,
        disableClose:true,
        height:'auto',
        maxHeight:window.screen.height*.6+'px',
        width:window.screen.width*.4+'px'
      });
      dialog.afterClosed().subscribe((result:SalaryItem)=>{
        debugger
        if(result){
          this.gradeSubGradeSalItemDetails.GradeSubGradeSalItemList[$event.Index].BuildFormula=result.OperatorString;
          this.gradeSubGradeSalItemDetails.GradeSubGradeSalItemList[$event.Index].InheritedItemId=result.InheritedItem;
          let parentItemPosstion=this.gradeSubGradeSalItemDetails.GradeSubGradeSalItemList.findIndex(f=>f.SalaryItem_Id==result.InheritedItem)
          if(parentItemPosstion!=-1){
            let parentItem=this.gradeSubGradeSalItemDetails.GradeSubGradeSalItemList[parentItemPosstion];
            if(parentItem&&parentItem.Amount!=0&&result.Percentage!=0){
              let amount=parentItem.Amount*(result.Percentage/100)
              this.gradeSubGradeSalItemDetails.GradeSubGradeSalItemList[$event.Index].SingleItemAmount=amount;
              this.gradeSubGradeSalItemDetails.GradeSubGradeSalItemList[$event.Index].Amount=amount;
            }
          }
          this.gradeSubGradeSalItemDetails.GradeSubGradeSalItemList[$event.Index].Percentage=result.Percentage;
          console.log(this.gradeSubGradeSalItemDetails.GradeSubGradeSalItemList[0]);
        }
      })
    }
    else if($event.ColumnName=="Amount"){
      this.gradeSubGradeSalItemDetails.GradeSubGradeSalItemList[$event.Index].SingleItemAmount= this.gradeSubGradeSalItemDetails.GradeSubGradeSalItemList[$event.Index].Amount
    }
  }
  clearSalaryItem(){
    this.salaryItem.Id=null;
    this.salaryItem.Percentage=0;
    this.salaryItem.ItemName=null;
    this.salaryItem.InheritedItem=null;
    this.salaryItem.OperatorString=null;
    this.salaryItem.InheritedItemName=null;

    this.salaryItem.DefaultAmount=0;
  }
  autoCompleteNewEntry($event:UserFormControl){
    this.clearSalaryItem();
    const dialogRef=this.matDialog.open(SalaryItemComponent,{
      data:this.salaryItem,
      disableClose:true,
      maxHeight:window.screen.height*.8+'px',
      height:'auto',
      width:window.screen.width*.35+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.gradeSubGradeSalItemDetails.SalaryItemList.push(result);
        this.getAutoCompleteData();
      }
    })
  }
  addNewRow(){
    var gradeSubGradeSalItem=new GradeSubGradeSalItem()
    gradeSubGradeSalItem.SalaryItemName=null;
    gradeSubGradeSalItem.Amount=0;
    gradeSubGradeSalItem.BuildFormula=null;
    gradeSubGradeSalItem.InheritedItemId=null;
    gradeSubGradeSalItem.SalaryItem_Id=null;
    this.gradeSubGradeSalItemDetails.GradeSubGradeSalItemList.push(gradeSubGradeSalItem);
  }
  saveGradeSubGradeSalaryItem(){
    debugger
    this.gradeSubGradeSalItemDetails.GradeSubGradeSalItemList.forEach(a=>{
      var gradeSubGradeSalItem=new GradeSubGradeSalaryItem();
      gradeSubGradeSalItem.Grade_id=this.gradeSubGradeSalItemDetails.Grade_Id;
      gradeSubGradeSalItem.GradeStep_id=this.gradeSubGradeSalItemDetails.SubGrade_Id;
      let possition=this.gradeSubGradeSalItemDetails.SalaryItemList.findIndex(i=>i.ItemId==a.SalaryItemName.split('-')[0]);
      if(a.SalaryItem_Id==null&&possition!=-1){
        gradeSubGradeSalItem.SalaryItem_Id=this.gradeSubGradeSalItemDetails.SalaryItemList[possition].Id;
      }
      else{
        gradeSubGradeSalItem.SalaryItem_Id=a.SalaryItem_Id;
      }
      gradeSubGradeSalItem.InheritedItem_Id=a.InheritedItemId;
      gradeSubGradeSalItem.HasComparator=a.BuildFormula!=null?true:false;
      gradeSubGradeSalItem.Percentage=a.Percentage;
      gradeSubGradeSalItem.SalaryItemId=a.SalaryItemName.split('-')[0]
      gradeSubGradeSalItem.SalaryAmount=a.Amount;
      gradeSubGradeSalItem.SingleItemAmount=a.SingleItemAmount;
      gradeSubGradeSalItem.ComparatorString=a.BuildFormula;
      this.gradeSubGradeSalaryItemList.push(gradeSubGradeSalItem);
    })
    this.CreateGradeStepSalaryItem()
  }
  CreateGradeStepSalaryItem(){
    this.blockUi.start("Loading, Please wait...")
    this._hrPayrollDefinationService.CreateGradeStepSalaryItem(this.gradeSubGradeSalaryItemList).subscribe(response=>{
     let result=response;
     this.blockUi.stop();
     let dialogData=new DialogData();
     dialogData.message="Created successfully";
     this._alertBox.openDialog(dialogData);
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  clearGradeSubGradeSalaryItem(){
    
  }
}
