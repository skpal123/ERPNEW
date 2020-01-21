import { Component, OnInit } from '@angular/core';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { Subcategory } from '../../../models/master-settings/inventory-defination/subcategory.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { MatDialog } from '@angular/material';
import { PostLoginService } from '../../../services/common/post-login.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { AddSubcategoryComponent } from '../add-subcategory/add-subcategory.component';
import { MultiSelectDropdown } from '../../../models/common/multiselect.dropdown.model';
import { CustomDatatableService } from '../../../services/common/custom-datatable.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CustomDatatableControlComponent } from '../../../common-module/custom-datatable-control/custom-datatable-control.component';

@Component({
  selector: 'app-item-subcategory-list',
  templateUrl: './item-subcategory-list.component.html',
  styleUrls: ['./item-subcategory-list.component.css']
})
export class ItemSubcategoryListComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  reload:boolean=false;
  columnReady:boolean=false;
  dataReady:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  subcategoryList:Subcategory[]=[];
  subcategory:Subcategory={Id:null,Category_Id:null,CategoryName:null,SubCategoryId:null,SubCategoryName:null}
  constructor(private _alertBox:AlertBoxService,
    private _postLoginservice:PostLoginService,
    private _customDatatableService:CustomDatatableService,
    private _inventotyDefinationService:InventoryDefinationServiceService,
    private matDialog:MatDialog
  ) { }
  ngOnInit() {
    debugger
    this.getSubCategoryList();
    this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this.blockUi.start("Loading....,Please wait.")
    this._postLoginservice.getUserFormControlByFormName('subcategory-list').subscribe(response=>{
      this.blockUi.stop();
      this.userControlList=response
      this.ColumnList=this.userControlList;
      this._customDatatableService.ColumnList=this.userControlList;
      this.columnReady=true;
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getSubCategoryList(){
    this.blockUi.start("Loading....,Please wait.")
    this._inventotyDefinationService.getSubCategoryList().subscribe(response=>{
      this.blockUi.stop();
      this.subcategoryList=response
      this.DataList=this.subcategoryList;
      this._customDatatableService.DataList=this.subcategoryList;
      this.reload=true;
      this.dataReady=true;
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getSubCategoryDetails($event:Subcategory){
    debugger
    this.blockUi.start("Loading....,Please wait.")
    this._inventotyDefinationService.getSubCategoryById($event.Id).subscribe(response=>{
      this.blockUi.stop();
      this.subcategory=response
      const dialogRef=this.matDialog.open(AddSubcategoryComponent,{
        data:this.subcategory,
        disableClose:true,
        height:'auto', 
        width:window.screen.width*.4+'px'
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.getSubCategoryList();
        }
      })
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteSubCategory($event:Subcategory){
    this.blockUi.start("Loading....,Please wait.")
    this._inventotyDefinationService.deleteSubCategory($event.Id).subscribe(response=>{
      this.blockUi.stop();
      let result=response
      if(result){
        this.getSubCategoryList();
        let dialogData=new DialogData();
        dialogData.message="Category deleted succesfully";
        this._alertBox.openDialog(dialogData);
      }
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  createNewSubCategory(){
   this.clearSubCategory();
    const dialogRef=this.matDialog.open(AddSubcategoryComponent,{
      data:this.subcategory,
      disableClose:true,
      height:'auto',
      width:window.screen.width*.4+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getSubCategoryList();
      }
    })
  }
  clearSubCategory(){
    this.subcategory.Id=null;
    this.subcategory.Category_Id=null
    this.subcategory.SubCategoryId=null;
    this.subcategory.CategoryName=null;
    this.subcategory.SubCategoryName=null;
    this.subcategory.SubCategoryId=null;
  }
  getDatatableControl(){
    // this.columnChange=false;
     const dialogRef=this.matDialog.open(CustomDatatableControlComponent,{
       data:this.userControlList,
       disableClose:true,
       height:'auto',
       maxHeight:window.screen.height*.9+'px',
       width:window.screen.width*.8+'px'
     });
     dialogRef.afterClosed().subscribe(result=>{
      if(result){
       // this.columnChange=true;
      }
     })
   }
}
