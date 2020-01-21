import { Component, OnInit,ViewChild ,Inject} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import { Subcategory } from '../../../models/master-settings/inventory-defination/subcategory.model';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { MultiSelectDropdown } from '../../../models/common/multiselect.dropdown.model';
import { NewDropdownDataService } from '../../../common-module/new-dropdown-data.service';
import { Category } from '../../../models/master-settings/inventory-defination/category.model';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { FormDetailsControlComponent } from '../../../common-module/form-details-control/form-details-control.component';
import { ValidationService } from '../../../services/common/validation.service';
import { SubcategoryValidation } from '../../../models/validation/inventory/subcategory-validation.model';
import { NavigationDataService } from '../../../services/common/navigation-data.service';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.css']
})
export class AddSubcategoryComponent implements OnInit {
  @ViewChild('subcategoryForm') subcategoryForm:NgForm
  categorySelectedItems :MultiSelectDropdown[]= [
  ];
  itemName:string="subcategoryId"
  IsAutoCode:boolean=false;
  subcategoryValidation:SubcategoryValidation[]=[];
  categoryTouch:boolean=false;
  categoryNew:boolean=false;
  category:Category={Id:null,CategoryId:null,CategoryName:null}
  constructor(public matDialogRef:MatDialogRef<AddSubcategoryComponent>,
  @Inject(MAT_DIALOG_DATA) public subcategory:Subcategory,
  private _alertBox:AlertBoxService,
  private _validationService:ValidationService,
  private _navigationData:NavigationDataService,
  private matDialog:MatDialog,
  private _inventotyDefinationService:InventoryDefinationServiceService,
) { }

  ngOnInit() {
    debugger
    if(this.subcategory.Id==null&&this.subcategory.Category_Id!=null){
      this.subcategoryForm.control.markAsDirty();
      this.categorySelectedItems.push({id:this.subcategory.Category_Id,itemName:this.subcategory.CategoryName}) 
    }
    else if(this.subcategory.Id==null){
      this.categorySelectedItems.push({id:"0",itemName:"SELECT"})   
    }
    else{
      this.subcategoryForm.control.markAsDirty();
      this.categorySelectedItems.push({id:this.subcategory.Category_Id,itemName:this.subcategory.CategoryName})
    }
    this.getItemFormInfo();
  }
  onNoClick(){
    this.matDialogRef.close(false);
  }
  getItemFormInfo(){
    this._validationService.getSubCategoryValidationData().subscribe((response:SubcategoryValidation[])=>{
      this.subcategoryValidation=response
      if(this.subcategoryValidation[2].SubCategoryId){
        this.IsAutoCode=true;
      }
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  saveSubCategory(){
    debugger
    if(this.subcategory.Id==null){
      this._inventotyDefinationService.CreateSubCategory(this.subcategory).subscribe(response=>{
        let result=response;
        this._navigationData.IsSaved=true;
        if(result){
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
      this._inventotyDefinationService.UpdateSubCategory(this.subcategory).subscribe(response=>{
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
  OnSeletedItem($event:MultiSelectDropdown){
    debugger
    this.categoryTouch=true;
    if($event.id=="0"){
      this.subcategory.Category_Id=null;
    }
    else{
      this.subcategory.Category_Id=$event.id
    }
  }
  OnDeSeletedItem($event){
    console.log($event)
  }
  clearSubCategory(){
    this.subcategory.Id=null;
    this.categorySelectedItems[0].id="0";
    this.categorySelectedItems[0].itemName="Select"
    this.subcategory.SubCategoryId=null;
    this.subcategory.SubCategoryName=null;
    this.subcategory.Category_Id=null;
    this.subcategoryForm.reset();
  }
  createNewCategory(){
    this.clearCategory();
    this.categoryNew=false;
     const dialogRef=this.matDialog.open(AddCategoryComponent,{
       data:this.category,
       disableClose:true,
       height:window.screen.height*.6+'px',
       width:window.screen.width*.4+'px'
     });
     dialogRef.afterClosed().subscribe((result:Category)=>{
       if(result){
         this.categoryNew=true;
         this.categorySelectedItems=[];
         this.categorySelectedItems.push({id:result.Id,itemName:result.CategoryId+'-'+result.CategoryName})
       }
     })
   }
   clearCategory(){
    this.category.Id=null;
    this.category.CategoryId=null;
    this.category.CategoryName=null;
  }
  controlGroupItemForm(){
    debugger
    const dialogRef=this.matDialog.open(FormDetailsControlComponent,{
      data:"subcategory-entry",
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
    this.subcategory.SubCategoryId=$event;
  }
}
