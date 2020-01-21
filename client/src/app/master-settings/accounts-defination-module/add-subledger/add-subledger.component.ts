import { Component, OnInit,Inject, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AccountDefinationService } from '../../../services/master-settings/account-defination.service';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { MatDialogRef,MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Subledger } from '../../../models/master-settings/account-defination/subledger.model';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { DialogData } from '../../../models/common/dialog-data.model';
import { CustomDatatableService } from '../../../services/common/custom-datatable.service';
import { NavigationDataService } from '../../../services/common/navigation-data.service';
import { FormDetailsControlComponent } from '../../../common-module/form-details-control/form-details-control.component';
import { ValidationService } from '../../../services/common/validation.service';
import { SubledgerValidation } from '../../../models/validation/account/subledger-validation.model';

@Component({
  selector: 'app-add-subledger',
  templateUrl: './add-subledger.component.html',
  styleUrls: ['./add-subledger.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AddSubledgerComponent implements OnInit {
  reload:boolean=false;
  columnReady:boolean=false;
  dataReady:boolean=false;
  IsAutoCode:boolean=false;
  itemName:"subledgerId";
  DataList:any[]=[];
  ColumnList:any[]=[];
  subledgerValidation:SubledgerValidation[]=[]
  userControlList:UserFormControl[]=[];
  sublederList:Subledger[]=[];
  constructor(private _accountService:AccountDefinationService,
    private _alertBox:AlertBoxService,
    private _postLoginService:PostLoginService,
    private matDialog:MatDialog,
    private _navigationData:NavigationDataService,
    private _validationService:ValidationService,
    private changeRef:ChangeDetectorRef,
    private _customDatataTableService:CustomDatatableService , 
    public dialogRef:MatDialogRef<AddSubledgerComponent>,
    @Inject(MAT_DIALOG_DATA) public subledger: Subledger
  ) {}

  ngOnInit() {
    debugger
      this.geSubledgerList();
      this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this._postLoginService.getUserFormControlByFormName('subledger').subscribe(response=>{
      this.userControlList=response
      this.ColumnList=this.userControlList;
      this.columnReady=true;
      this._customDatataTableService.ColumnList=this.userControlList;
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getItemFormInfo(){
    this._validationService.getSubCategoryValidationData().subscribe((response:SubledgerValidation[])=>{
      this.subledgerValidation=response;
      if(this.subledgerValidation[2].SublederCode){
        this.IsAutoCode=true;
      }
      this.changeRef.markForCheck();
    },error=>{
      let dialogData=new DialogData(); 
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  geSubledgerList(){
    debugger
    this._accountService.GetSublederList(this.subledger.AccountId).subscribe(response=>{
      this.sublederList=response
      this.DataList=this.sublederList;
      this.dataReady=true;
      this.reload=true;
      this._customDatataTableService.DataList=this.sublederList;
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  addSubledger(){
    debugger
    if(this.subledger.Id==null){
      this._accountService.AddSubleder(this.subledger).subscribe(response=>{
        let result=response;
        this._navigationData.IsSaved=true;
        this.clear();
        if(result){
          let dialogData=new DialogData();
          dialogData.message="Subleder created succesfully";
          this._alertBox.openDialog(dialogData);
          this.sublederList.push(response)
          this.dialogRef.close(response)   
        }
      },error=>{
        let dialogData=new DialogData();
        dialogData.message=error
        this._alertBox.openDialog(dialogData);
      })
    }
    else{
      this._accountService.UpdateSubleder(this.subledger.Id,this.subledger).subscribe(response=>{
        let result=response
        this.clear();
        if(result){
          let dialogData=new DialogData();
          dialogData.message="Subleder created succesfully";
          this._alertBox.openDialog(dialogData);
          this.geSubledgerList();     
        }
      },error=>{
        let dialogData=new DialogData();
        dialogData.message=error
        this._alertBox.openDialog(dialogData);
      })
    }

  }
  getSubledgerDetailsById($event:Subledger){
    debugger
    this._accountService.GetSublederById($event.Id).subscribe(response=>{
      this.subledger=response;
      this._navigationData.IsUpdate=true;
      this._navigationData.PreviousData=this.subledger.SublederCode;
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteSubledger($event:Subledger){
    this._accountService.DeleteGetSublederById($event.Id).subscribe(response=>{
      let result=response
      if(result){
        let dialogData=new DialogData();
        dialogData.message="Subleder deleted succesfully";
        this._alertBox.openDialog(dialogData);
        this.geSubledgerList();  
      }
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  onNoClick():void{
    this.dialogRef.close();
  }
  clear(){
    this.subledger.Id=null,
    this.subledger.Description=null;
    this.subledger.SublederCode=null;
  }
  controlGroupItemForm(){
    debugger
    const dialogRef=this.matDialog.open(FormDetailsControlComponent,{
      data:"department-form",
      disableClose:true,
      height:'auto',
      maxHeight:window.screen.height*.9+'px',
      width:window.screen.width*.6+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
     if(result){
       //this.getItemPurchaseValidationList()
     }
    })
  }
  parentGetGeneratedCode($event:string){
    debugger
    this.subledger.SublederCode=$event;
  }
}
