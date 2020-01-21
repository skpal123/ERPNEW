import { Component, OnInit, ViewChild } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { SettingSellprice } from '../../../models/master-settings/inventory-defination/setting-sell-price.model';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { FormControl } from '@angular/forms';
import { DatatableTextOutput } from '../../../models/common/datatable-text-click.model';

@Component({
  selector: 'app-setting-price',
  templateUrl: './setting-price.component.html',
  styleUrls: ['./setting-price.component.css']
})
export class SettingPriceComponent implements OnInit {
  @ViewChild('sellPriceMethodControl') sellPriceMethodControl:FormControl;
  @ViewChild('DateControl') DateControl:FormControl;
  Date:Date=new Date();
  sellPriceMethod:number=1
  reload:boolean=false;
  firstTime:boolean=true;
  @BlockUI() blockUI: NgBlockUI;
  settingSellPriceList:SettingSellprice[]=[];
  settingSellprice:SettingSellprice={}
  userControlList:UserFormControl[]=[];
  columnlist:any[]=[];
  DataList:SettingSellprice[]=[];
  oldSettingSellPriceList:SettingSellprice[]=[];
  constructor(private _inventoryDefinationService:InventoryDefinationServiceService,
  private _postLoginService:PostLoginService,
  private _alertBox:AlertBoxService) { }

  ngOnInit() {
    debugger
    this.getSettingSellPrice(this.sellPriceMethod);
    this.getUserFormControlByFormName();
    this.sellPriceMethodControl.valueChanges.subscribe(data=>{
      this.getSettingSellPrice(data)
    })
  }
  getSettingSellPrice(priceSettingMethod:number){
    this.blockUI.start("Loading,Please wait...")
    this._inventoryDefinationService.GetSettingSellPrice(priceSettingMethod).subscribe(response=>{
      this.settingSellPriceList=response
      this.settingSellPriceList.forEach(s=>{
        s.ProfitMargin=0;
      })
      this.oldSettingSellPriceList=JSON.parse(JSON.stringify(this.settingSellPriceList));
      this.DataList= this.settingSellPriceList;
      this.reload=true;
      this.blockUI.stop();
    },
  error=>{
    this.blockUI.stop();
    let dialogData=new DialogData();
    dialogData.message=error
    this._alertBox.openDialog(dialogData);
  })
  }
  getUserFormControlByFormName(){
    this.blockUI.start("Loading,Please wait...");
    this._postLoginService.getUserFormControlByFormName('setting-sell-price').subscribe(response=>{
      this.blockUI.stop();
      this.userControlList=response
      this.columnlist=this.userControlList.filter(control=>control.Type!='none');
    },error=>{
      this.blockUI.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getDataList(){

  }
  GetColumnValueClicked($event:DatatableTextOutput){
    debugger
    this.settingSellprice=$event.RowData;
    if($event.ColumnName.toLowerCase()=='profitmargin'){
      this.addProfitMargin($event.Index,$event)
    }
    else if($event.ColumnName.toLowerCase()=='amount'){
      this.oldSettingSellPriceList[$event.Index].Amount=this.settingSellprice.Amount;
      this.addProfitMargin($event.Index,$event)
    }
  }
  addProfitMargin(index:number,event:DatatableTextOutput){
    this.settingSellPriceList=JSON.parse(JSON.stringify(this.oldSettingSellPriceList));
    if(this.oldSettingSellPriceList[index].Amount>0){
      let percentage= this.DataList[index].ProfitMargin
      this.DataList[index].Amount=this.oldSettingSellPriceList[index].Amount+(this.oldSettingSellPriceList[index].Amount*percentage)/100
    }
  }
  SaveSettingSellPrice(){
    this.blockUI.start("Loading,Please wait...");
    this.DataList.forEach(a=>{
      a.SettingDate=this.Date,
      a.SellingMethod=this.sellPriceMethod
    });
    this._inventoryDefinationService.SaveSettingSellPrice(this.DataList).subscribe(response=>{
      this.blockUI.stop();
      let result=response
      if(result){
        let dialogData=new DialogData();
      dialogData.message="Save successfully";
      this._alertBox.openDialog(dialogData);
      }
    },error=>{
      this.blockUI.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteSettingSellPriceDetailsRow($event){
    
  }
}
