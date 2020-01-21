import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { MultiSelectDropdown } from '../../../models/common/multiselect.dropdown.model';
import { MatDialogRef,MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { InventoryItem } from '../../../models/master-settings/inventory-defination/inventory-item.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { Category } from '../../../models/master-settings/inventory-defination/category.model';
import { AddSubcategoryComponent } from '../add-subcategory/add-subcategory.component';
import { Subcategory } from '../../../models/master-settings/inventory-defination/subcategory.model';
import { NewDropdownDataService } from '../../../common-module/new-dropdown-data.service';
import { ValidationService } from '../../../services/common/validation.service';
import { Unit } from '../../../models/master-settings/inventory-defination/unit.model';
import { AddUnitComponent } from '../add-unit/add-unit.component';
import { InventoryItemValidation } from '../../../models/validation/inventory/item-validation.model';
import { FormDetailsControlComponent } from '../../../common-module/form-details-control/form-details-control.component';
import { NavigationDataService } from '../../../services/common/navigation-data.service';

@Component({
  selector: 'app-item-entry',
  templateUrl: './item-entry.component.html',
  styleUrls: ['./item-entry.component.css']
})
export class ItemEntryComponent implements OnInit {
  itemValidation:InventoryItemValidation[]=[];
  @ViewChild('itemForm') itemForm:NgForm
  @ViewChild('categoryIdControl') categoryIdControl:FormControl
  @ViewChild('subcategoryIdControl') subcategoryIdControl:FormControl
  @ViewChild('unitIdControl') unitIdControl:FormControl
  @ViewChild('ledgerIdControl') ledgerIdControl:FormControl;
  itemName1:string="itemId";
  itemName2:string="itemCode";
  IsAutoCode1:boolean=false;
  IsAutoCode2:boolean=false;
  categoryTouch:boolean=false;
  allLedger:boolean=true;
  subcategoryTouch:boolean=false;
  unitTouch:boolean=false;
  ledgerTouch:boolean=false;
  categoryNew:boolean=false;
  subcategoryNew:boolean=false;
  unitNew:boolean=false;
  categorySelectedItems :MultiSelectDropdown[]= [
  ];
  subcategorySelectedItems :MultiSelectDropdown[]= [
  ];
  unitSelectedItems :MultiSelectDropdown[]= [
  ];
  ledgerSelectedItems :MultiSelectDropdown[]= [
  ];
  subledgerSelectedItems :MultiSelectDropdown[]= [
  ];
  category:Category={Id:null,CategoryId:null,CategoryName:null}
  subcategory:Subcategory={Id:null,SubCategoryId:null,SubCategoryName:null,Category_Id:null}
  unit:Unit={Id:null,UnitName:null,Description:null}
  constructor(public matDialogRef:MatDialogRef<ItemEntryComponent>,
    private _validationService:ValidationService,
  @Inject(MAT_DIALOG_DATA) public item:InventoryItem,
  private _alertBox:AlertBoxService,
  private matDialog:MatDialog,
  private _newDropdownService:NewDropdownDataService,
  private _navigationData:NavigationDataService,
  private _inventotyDefinationService:InventoryDefinationServiceService,
) { }

  ngOnInit() {
    debugger
    if(this.item.Id==null){
      this.categorySelectedItems.push({id:"0",itemName:"SELECT"})
      this.subcategorySelectedItems.push({id:"0",itemName:"SELECT"})
      this.unitSelectedItems.push({id:"0",itemName:"SELECT"})
      this.ledgerSelectedItems.push({id:"0",itemName:"SELECT"})
      this.subledgerSelectedItems.push({id:"0",itemName:"SELECT"})
    }
    else{
      this.itemForm.control.markAsDirty()
      if(this.item.Category_Id!=null){
        this.categorySelectedItems.push({id:this.item.Category_Id,itemName:this.item.CategoryName})
      }
      else{
        this.categorySelectedItems.push({id:"0",itemName:"SELECT"})
      }
      this.subcategory.CategoryName=this.item.CategoryName;
      this.subcategory.Category_Id=this.item.Category_Id;
      this.subcategorySelectedItems.push({id:this.item.SubCategory_Id,itemName:this.item.SubCategoryName})
      this.unitSelectedItems.push({id:this.item.UnitId,itemName:this.item.UnitName})
      this.ledgerSelectedItems.push({id:this.item.Ledger_Id,itemName:this.item.LedgerName})
      this.subledgerSelectedItems.push({id:this.item.SubLedger_Id,itemName:this.item.SubLedgerName})
    }
    this.getItemFormInfo();
  }
  onNoClick(){
    this.matDialogRef.close(false);
  }
  saveItem(){
    debugger
    if(this.item.Id==null){
      console.log(this.item);
      this._inventotyDefinationService.CreateInventoryItem(this.item).subscribe(response=>{
        let result=response;
        this._navigationData.IsSaved=true
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
      this._inventotyDefinationService.UpdateInventoryItem(this.item).subscribe(response=>{
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
  CategoryOnSeletedItem($event:MultiSelectDropdown){
    debugger
    this.categoryTouch=true;
    if($event.id!=null&&$event.id!="0"){
      this.item.Category_Id=$event.id;
      this.subcategory.Category_Id=$event.id;
      this.subcategory.CategoryName=$event.itemName;
      this.itemForm.control.markAsDirty();
      // this._newDropdownService.categorySelectedData.Value=$event.id;
      // this._newDropdownService.categorySelectedData.Text=$event.itemName;
    }
    else{
      this.item.Category_Id=null
    }
  }
  SubCategoryOnSeletedItem($event){
    debugger
    this.subcategoryTouch=true;
    if($event.id!=null&&$event.id!="0"){
      this.item.SubCategory_Id=$event.id;
      this.itemForm.control.markAsDirty();
      // this._newDropdownService.categorySelectedData.Value=$event.id;
      // this._newDropdownService.categorySelectedData.Text=$event.itemName;
    }
    else{
      this.item.SubCategory_Id=null
    }
  }
  unitOnSeletedItem($event){
    debugger
    this.unitTouch=true;
    if($event.id!=null&&$event.id!="0"){
      this.item.UnitId=$event.id;
      this.itemForm.control.markAsDirty();
    }
    else{
      this.item.UnitId=null
    }
  }
  ledgerOnSeletedItem($event){
    debugger
    this.ledgerTouch=true;
    if($event.id!=null&&$event.id!="0"){
      this.item.Ledger_Id=$event.id;
      this.itemForm.control.markAsDirty();
    }
    else{
      this.item.Ledger_Id=null
    }
  }
  subledgerOnSeletedItem($event){
    debugger
    if($event.id!=null&&$event.id!="0"){
      this.item.SubLedger_Id=$event.id;
      this.itemForm.control.markAsDirty();
    }
  }
  OnDeSeletedItem($event){
    console.log($event)
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
   createNewSubCategory(){
    this.clearSubCategory();
    this.subcategoryNew=false;
     const dialogRef=this.matDialog.open(AddSubcategoryComponent,{
       data:this.subcategory,
       disableClose:true,
       height:window.screen.height*.6+'px',
       width:window.screen.width*.4+'px'
     });
     dialogRef.afterClosed().subscribe((result:Subcategory)=>{
       debugger
       if(result){
        this.subcategorySelectedItems=[];
        this.subcategorySelectedItems.push({id:result.Id,itemName:result.SubCategoryId+'-'+result.SubCategoryName})
         this.subcategoryNew=true;
         this.subcategory.SubCategoryId=null;
         this.subcategory.SubCategoryName=null;
       }
     })
   }
   createNewUnit(){
    this.unitNew=false;
    this.clearUnit();
     const dialogRef=this.matDialog.open(AddUnitComponent,{
       data:this.unit,
       disableClose:true,
       height:window.screen.height*.6+'px',
       width:window.screen.width*.4+'px'
     });
     dialogRef.afterClosed().subscribe((result:Unit)=>{
       if(result){
        this.unitSelectedItems=[];
        this.unitSelectedItems.push({id:result.Id,itemName:result.UnitName})
         this.unitNew=true;
         this.subcategory.SubCategoryId=null;
         this.subcategory.SubCategoryName=null;
       }
     })
   }
   getItemFormInfo(){
    this._validationService.getItemValidationData().subscribe((response:InventoryItemValidation[])=>{
      this.itemValidation=response
      if(this.itemValidation[3].ItemId){
        this.IsAutoCode1=true;
      };
      if(this.itemValidation[3].ItemId){
        this.IsAutoCode2=true;
      }
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  clearUnit(){
    this.unit.Id=null;
    this.unit.UnitName=null;
    this.unit.Description=null;
  }
  clearCategory(){
    this.category.Id=null;
    this.category.CategoryId=null;
    this.category.CategoryName=null;
  }
  clearSubCategory(){
    this.subcategory.Id=null;
    this.subcategory.SubCategoryId=null;
    this.subcategory.SubCategoryName=null;
    this.subcategory.Category_Id=null;
  }
  clearItem(){
    this.item.Id=null;
    this.item.ItemId=null;
    this.item.ItemCode=null;
    this.item.ItemName=null;
    this.item.UnitId=null;
    this.categorySelectedItems[0].id="0";
    this.categorySelectedItems[0].itemName="Select";
    this.categoryNew
    this.subcategorySelectedItems[0].id="0";
    this.subcategorySelectedItems[0].itemName="Select";
    this.ledgerSelectedItems[0].id="0";
    this.ledgerSelectedItems[0].itemName="Select";
    this.subledgerSelectedItems[0].id="0";
    this.subledgerSelectedItems[0].itemName="Select";
    this.unitSelectedItems[0].id="0";
    this.unitSelectedItems[0].itemName="Select";
    this.item.Category_Id=null;
    this.item.SubCategory_Id=null;
    this.item.Ledger_Id=null;
    this.item.SubLedger_Id=null;
    this.itemForm.reset();
  }
  controlGroupItemForm(){
    debugger
    const dialogRef=this.matDialog.open(FormDetailsControlComponent,{
      data:"itementry",
      disableClose:true,
      height:window.screen.height*.9+'px',
      width:window.screen.width*.8+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
     if(result){
       //this.getItemPurchaseValidationList()
     }
    })
  }
  parentGetGeneratedCode1($event:string){
    debugger
    this.item.ItemId=$event;
  }
  parentGetGeneratedCode2($event:string){
    debugger
    this.item.ItemCode=$event;
  }
}
