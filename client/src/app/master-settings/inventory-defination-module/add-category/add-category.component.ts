import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { Category } from '../../../models/master-settings/inventory-defination/category.model';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { ValidationService } from '../../../services/common/validation.service';
import { CategoryValidation } from '../../../models/validation/inventory/category-validation.model';
import { FormDetailsControlComponent } from '../../../common-module/form-details-control/form-details-control.component';
import { NavigationDataService } from '../../../services/common/navigation-data.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  @ViewChild('categoryForm') categoryForm:NgForm
  categoryValidation:CategoryValidation[]=[]
  itemName:string="categoryId";
  IsAutoCode:boolean=false;
  constructor(public matDialogRef:MatDialogRef<AddCategoryComponent>,
  @Inject(MAT_DIALOG_DATA) public category:Category,
  private _alertBox:AlertBoxService,
  private matDialog:MatDialog,
  private _navigationData:NavigationDataService,
  private _validationService:ValidationService,
  private _inventotyDefinationService:InventoryDefinationServiceService,
) { }

  ngOnInit() {
    debugger
    if(this.category.Id!=null){
      this.categoryForm.control.markAsDirty();
    }
    this.getItemFormInfo();
  }
  onNoClick(){
    this.matDialogRef.close(false);
  }
  getItemFormInfo(){
    this._validationService.getCategoryValidationData().subscribe((response:CategoryValidation[])=>{
      this.categoryValidation=response;
      if(this.categoryValidation[2].CategoryId&&this.category.Id==null){
        this.IsAutoCode=true;
      }
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  saveCategory(){
    if(this.category.Id==null){
      this._inventotyDefinationService.CreateCategory(this.category).subscribe(response=>{
        let result=response
        if(result){
          this._navigationData.IsSaved=true;
          this.matDialogRef.close(response);
          let dialogData=new DialogData();
          dialogData.message="Save successfully";
          this._alertBox.openDialog(dialogData);
        }
      },error=>{
        let dialogData=new DialogData();
        dialogData.message=error
        this._alertBox.openDialog(dialogData);
      })
    }
    else{
      this._inventotyDefinationService.UpdateCategory(this.category).subscribe(response=>{
        let result=response
        if(result){
          this.matDialogRef.close(true);
          let dialogData=new DialogData();
          dialogData.message="Update successfully";
          this._alertBox.openDialog(dialogData);
        }
      },error=>{
        let dialogData=new DialogData();
        dialogData.message=error
        this._alertBox.openDialog(dialogData);
      })
    }
  }
  clearCategory(){
    this.category.Id=null;
    this.category.CategoryId=null;
    this.category.CategoryName=null;
    this.categoryForm.reset();
  }
  controlGroupItemForm(){
    debugger
    const dialogRef=this.matDialog.open(FormDetailsControlComponent,{
      data:"category-entry",
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
    this.category.CategoryId=$event;
  }
}
