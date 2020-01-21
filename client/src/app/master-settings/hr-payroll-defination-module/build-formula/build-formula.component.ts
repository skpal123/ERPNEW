import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SalaryItemValidation } from '../../../models/validation/hr-payroll/salaryitem.validation.model';
import { MultiSelectDropdown } from '../../../models/common/multiselect.dropdown.model';
import { MatDialogRef,MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { NavigationDataService } from '../../../services/common/navigation-data.service';
import { ValidationService } from '../../../services/common/validation.service';
import { HrPayrollDefinationServiceService } from '../../../services/master-settings/hr-payroll-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { FormDetailsControlComponent } from '../../../common-module/form-details-control/form-details-control.component';
import { SalaryItem } from '../../../models/master-settings/hr-payroll/salary-item.model';
import { SalaryItemComponent } from '../salary-item/salary-item.component';

@Component({
  selector: 'app-build-formula',
  templateUrl: './build-formula.component.html',
  styleUrls: ['./build-formula.component.css']
})
export class BuildFormulaComponent implements OnInit {
  @ViewChild('buildFormulaForm') buildFormulaForm:NgForm
  salaryItemValidation:SalaryItemValidation[]=[]
  salaryItemTouch:boolean=false;
  salaryItemNew:boolean=false;
  salaryItemSelectedItems :MultiSelectDropdown[]= [
  ];
  constructor(public matDialogRef:MatDialogRef<BuildFormulaComponent>,
  @Inject(MAT_DIALOG_DATA) public salaryItem:SalaryItem,
  private _alertBox:AlertBoxService,
  private matDialog:MatDialog,
  private _validationService:ValidationService,
) { }

  ngOnInit() {
    debugger
    this.buildFormulaForm.valueChanges.subscribe(data=>{
      const control=this.buildFormulaForm.control.get('Percentage');
      if(control&&control.value!=null&&this.salaryItem.Id==null&&this.salaryItem.InheritedItem!=null){
        this.salaryItem.OperatorString=control.value+" % Of "+ this.salaryItem.InheritedItemName
      }
    });
    if(this.salaryItem.Id!=null&&this.salaryItem.OperatorString!=null&&this.salaryItem.InheritedItem!=null){
      this.salaryItemSelectedItems.push({id:this.salaryItem.Id,itemName:this.salaryItem.ItemId+"-"+this.salaryItem.ItemName})
    }
    this.getItemFormInfo();
  }
  onNoClick(){
    this.matDialogRef.close(false);
  }
  getItemFormInfo(){
    this._validationService.getSalaryItemValidationData().subscribe((response:SalaryItemValidation[])=>{
      this.salaryItemValidation=response
      console.log(this.salaryItemValidation)
    },error=>{
      let dialogData=new DialogData(); 
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  controlGroupItemForm(){
    debugger
    const dialogRef=this.matDialog.open(FormDetailsControlComponent,{
      data:"salary-item-form",
      disableClose:true,
      height:'auto',
      maxHeight:window.screen.height*.9+'px',
      width:window.screen.width*.8+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
     if(result){
       //this.getItemPurchaseValidationList()
     }
    })
  }
  parentGetGeneratedCode($event:string){
    debugger
    this.salaryItem.ItemId=$event;
  }
  OnSeletedItem($event:MultiSelectDropdown){
    debugger
    this.salaryItemTouch=true;
    if($event.id=="0"){
      this.salaryItem.InheritedItem=null;
    }
    else{
      this.salaryItem.InheritedItem=$event.id
      this.salaryItem.InheritedItemName=$event.itemName
      let value=this.salaryItem.Percentage==null?0:this.salaryItem.Percentage;
      this.salaryItem.OperatorString=value+" % Of "+ $event.itemName
    }
  }
  postFormulaItem(){
    this.matDialogRef.close(this.salaryItem)
  }
  createNewSalaryItem(){
    this.clearFormulaItem();
    this.salaryItemNew=false;
     const dialogRef=this.matDialog.open(SalaryItemComponent,{
       data:this.salaryItem,
       disableClose:true,
       maxHeight:window.screen.height*.6+'px',
       height:'auto',
       width:window.screen.width*.4+'px'
     });
     dialogRef.afterClosed().subscribe((result:SalaryItem)=>{
       debugger
       if(result){
         this.salaryItemNew=true;
         this.salaryItemSelectedItems=[];
         this.salaryItemSelectedItems.push({id:result.Id,itemName:result.ItemId+'-'+result.ItemName})
       }
     })
  }
  clearFormulaItem(){
    this.salaryItem.Id=null;
    this.salaryItem.ItemId=null;
    this.salaryItem.ItemName=null;
    this.salaryItem.ItemType="0"
    this.salaryItem.IsBasic=false;
    this.salaryItem.IsDaily=false;
    this.salaryItem.IsDefault=true;
    this.salaryItem.IsLeave=false;
    this.salaryItem.IsLoan=false;
    this.salaryItem.IsPension=false;
    this.salaryItem.IsTax=false;
    this.salaryItem.DefaultAmount=0;
  }
}
