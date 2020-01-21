import { Component, OnInit } from '@angular/core';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { Category } from '../../../models/master-settings/inventory-defination/category.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { MatDialog } from '@angular/material';
import { DialogData } from '../../../models/common/dialog-data.model';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { CustomDatatableService } from '../../../services/common/custom-datatable.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NavigationDataService } from '../../../services/common/navigation-data.service';
@Component({
  selector: 'app-item-category-list',
  templateUrl: './item-category-list.component.html',
  styleUrls: ['./item-category-list.component.css']
})
export class ItemCategoryListComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  reload:boolean=false;
  columnReady:boolean=false;
  dataReady:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  categoryList:Category[]=[];
  category:Category={Id:null,CategoryId:null,CategoryName:null}
  constructor(private _alertBox:AlertBoxService,
    private _postLoginservice:PostLoginService,
    private _customDatatableService:CustomDatatableService,
    private _navgationDataService:NavigationDataService,
    private _inventotyDefinationService:InventoryDefinationServiceService,
    private matDialog:MatDialog
  ) { }
  ngOnInit() {
    debugger
    this.getCategoryList();
    this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this.blockUi.start("Loading....,Please wait.")
    this._postLoginservice.getUserFormControlByFormName('category-list').subscribe(response=>{
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
  getCategoryList(){
    this.blockUi.start("Loading....,Please wait.")
    this._inventotyDefinationService.getCategoryList().subscribe(response=>{
      this.blockUi.stop();
      this.categoryList=response
      this.DataList=this.categoryList
      this._customDatatableService.DataList=this.categoryList;
      this.dataReady=true;
      this.reload=true;
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getCategoryDetails($event:Category){
    debugger
    this.blockUi.start("Loading....,Please wait.")
    this._inventotyDefinationService.getCategoryById($event.Id).subscribe(response=>{
      this.blockUi.stop();
      this.category=response;
      this._navgationDataService.IsUpdate=true;
      this._navgationDataService.PreviousData=this.category.CategoryId;
      const dialogRef=this.matDialog.open(AddCategoryComponent,{
        data:this.category,
        disableClose:true,
        height:'auto',
        maxHeight:window.screen.height*.6+'px',
        width:window.screen.width*.4+'px'
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.getCategoryList();
        }
      })
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteCategory($event:Category){
    this.blockUi.start("Loading....,Please wait.")
    this._inventotyDefinationService.deleteUnit($event.Id).subscribe(response=>{
      this.blockUi.stop();
      let result=response
      if(result){
        this.getCategoryList();
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
  createNewCategory(){
   this.clearCategory();
    const dialogRef=this.matDialog.open(AddCategoryComponent,{
      data:this.category,
      disableClose:true,
      height:'auto',
      maxHeight:window.screen.height*.6+'px',
      width:window.screen.width*.4+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getCategoryList();
      }
    })
  }
  clearCategory(){
    this.category.Id=null;
    this.category.CategoryId=null;
    this.category.CategoryName=null;
  }
}
