import { Component, OnInit,Inject } from '@angular/core';
import { MultiSelectDropdown } from '../../../models/common/multiselect.dropdown.model';
import { Category } from '../../../models/master-settings/inventory-defination/category.model';
import { Subcategory } from '../../../models/master-settings/inventory-defination/subcategory.model';
import { MatDialogRef,MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ValidationService } from '../../../services/common/validation.service';
import { GroupItem } from '../../../models/regular-operation/inventory/group-item.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { DropdownService } from '../../../services/common/dropdown.service';
import { SelectDropdown } from '../../../models/common/select.dropdown.model';
import { ItemPurchaseValidation } from '../../../models/validation/item-purchase.validation.model';
import { InventoryService } from '../../../services/regular-operation/inventory.service';
import { SupplierEntryComponent } from '../../../master-settings/inventory-defination-module/supplier-entry/supplier-entry.component';
import { ItemTransaction } from '../../../models/regular-operation/inventory/item-transaction.model';
import { FormDetailsControlComponent } from '../../../common-module/form-details-control/form-details-control.component';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Supplier } from '../../../models/master-settings/inventory-defination/supplier.model';

@Component({
  selector: 'app-item-purchase',
  templateUrl: './item-purchase.component.html',
  styleUrls: ['./item-purchase.component.css']
})
export class ItemPurchaseComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  itemPurchaseForm:FormGroup
  purchaseValidation:ItemPurchaseValidation[]=[];
  ledgerTouch:boolean=false;
  subledgerTouch:boolean=false;
  supplierNew:boolean=false;
  partyNew:boolean=false;
  customerNew:boolean=false;
  IsAutoCode:boolean=false;
  IsAutoCodeChalan:boolean=false;
  IsAutoCodeLotno:boolean=false;
  itemName:string="transactionId";
  itemNameChalan:string="chalanNo";
  itemNameLotno:string="lotno";
  grandTotal:number=0;
  grandQuantity:number=0;
  startDate:Date=new Date();
  ledgerSelectedItems :MultiSelectDropdown[]= [
  ];
  subledgerSelectedItems :MultiSelectDropdown[]= [
  ];
  itemDropdownList: MultiSelectDropdown[] = [
    { id: "0", itemName: "Select" }
  ];
  itemSelectedItems :MultiSelectDropdown[]= [
    { id: "0", itemName: "Select" }
  ];
  itemList:SelectDropdown[];
  locationDropdownList: MultiSelectDropdown[] = [
    { id: "0", itemName: "Select" }
  ];
  locationSelectedItems :MultiSelectDropdown[]= [
    { id: "0", itemName: "Select" }
  ];
  supplierSelectedItems :MultiSelectDropdown[]= [
    { id: "0", itemName: "Select" }
  ];
  locationList:SelectDropdown[];
  DropdownSettings = {
    singleSelection: true,
    text: "Select",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    showCheckbox:true
    
  };
  category:Category={Id:null,CategoryId:null,CategoryName:null}
  formArray:AbstractControl[]=[];
  supplier:Supplier={
    Id:null,SupplierId:null,SupplierName:null,ContactPerson:null,PhoneNo:null,Email:null,
    Ledger_Id:null,SubLedger_Id:null,LedgerName:null,SubLedgerName:null,Address:null
  }
  subcategory:Subcategory={Id:null,SubCategoryId:null,SubCategoryName:null,Category_Id:null}
  constructor(public matDialogRef:MatDialogRef<ItemPurchaseComponent>,
    private _validationService:ValidationService,
    private _dropdownService:DropdownService,
    @Inject(MAT_DIALOG_DATA) public groupItem:GroupItem,
    private _alertBox:AlertBoxService,
    private matDialog:MatDialog,
    private fb:FormBuilder,
    private _inventotyService:InventoryService,
) { }

  ngOnInit() {
    debugger
    this.purchaseValidation=this.groupItem.data;
    if(this.purchaseValidation[2].TransactionId&&this.groupItem.TransactionId==null){
      this.IsAutoCode=true
    }
    if(this.purchaseValidation[2].ChalanNo&&this.groupItem.ChalanNo==null){
      this.IsAutoCodeChalan=true
    }
    if(this.purchaseValidation[2].LotNo&&this.groupItem.LotNo==null){
      this.IsAutoCodeLotno=true
    }
    this.getItemList("null");
    this.getLocationList();
    this.itemPurchaseForm = this.fb.group({
      TransactionId: [null,this.purchaseValidation[0].TransactionId==true&&this.purchaseValidation[1].TransactionId==true? Validators.required:null],
      ChalanNo: [null,this.purchaseValidation[0].ChalanNo==true&&this.purchaseValidation[1].ChalanNo==true? Validators.required:null],
      InvoiceNo: [null,this.purchaseValidation[0].InvoiceNo==true&&this.purchaseValidation[1].InvoiceNo==true? Validators.required:null],
      Supplier_Id: [null,this.purchaseValidation[0].Supplier_Id==true&&this.purchaseValidation[1].Supplier_Id==true==true? Validators.required:null],
      Reason: [0,this.purchaseValidation[0].TransactionDate==true&&this.purchaseValidation[1].TransactionDate==true? Validators.required:null],
      TransactionDate: [new Date(),this.purchaseValidation[0].TransactionDate==true&&this.purchaseValidation[1].TransactionDate==true? Validators.required:null],
      GrvNo: [null,this.purchaseValidation[0].GrvNo==true&&this.purchaseValidation[1].GrvNo==true? Validators.required:null],
      GrvDate: [new Date(),this.purchaseValidation[0].GrvDate==true&&this.purchaseValidation[1].GrvDate==true? Validators.required:null],
      Comments: [null,this.purchaseValidation[0].Comments==true&&this.purchaseValidation[1].Comments==true? Validators.required:null],
      LotNo: [null,this.purchaseValidation[0].LotNo==true&&this.purchaseValidation[1].LotNo==true? Validators.required:null],
      TotalAmount: [0,this.purchaseValidation[0].TotalAmountGroup==true&&this.purchaseValidation[1].TotalAmountGroup==true? Validators.required:null],
      Quantity: [0,this.purchaseValidation[0].QuantityGroup==true&&this.purchaseValidation[1].QuantityGroup==true? Validators.required:null],
      DiscountRate: [0,this.purchaseValidation[0].DiscountRateGroup==true&&this.purchaseValidation[1].DiscountRateGroup==true? Validators.required:null],
      DiscountAmount: [0,this.purchaseValidation[0].DiscountAmount==true&&this.purchaseValidation[1].DiscountAmount==true? Validators.required:null],
      Vat: [0,this.purchaseValidation[0].Vat==true&&this.purchaseValidation[1].Vat==true? Validators.required:null],
      Tax: [0,this.purchaseValidation[0].Tax==true&&this.purchaseValidation[1].Tax==true? Validators.required:null],
      NetPayableAmount: [0,this.purchaseValidation[0].NetPayableAmount==true&&this.purchaseValidation[1].NetPayableAmount==true? Validators.required:0],
      PaidAmount: [0,this.purchaseValidation[0].PaidAmount==true&&this.purchaseValidation[1].PaidAmount==true? Validators.required:null],
      Approver_Id: [null,this.purchaseValidation[0].Approver_Id==true&&this.purchaseValidation[1].Approver_Id==true? Validators.required:null],
      Ledger_Id: [null,this.purchaseValidation[0].Ledger_Id==true&&this.purchaseValidation[1].Ledger_Id==true? Validators.required:null],
      SubLedger_Id: [null,this.purchaseValidation[0].SubLedger_Id==true&&this.purchaseValidation[1].SubLedger_Id==true? Validators.required:null],
      PaymentMode: [0,this.purchaseValidation[0].PaymentMode==true&&this.purchaseValidation[1].PaymentMode==true? Validators.required:null],
      TransactionType: ["Purchase",this.purchaseValidation[0].TransactionType==true&&this.purchaseValidation[1].TransactionType==true? Validators.required:null],
      ItemTransactionList: this.fb.array([
        this.addNewItemTransaction()
      ]),
    });
    this.formArray=(<FormArray>this.itemPurchaseForm.get('ItemTransactionList')).controls;
    this.itemPurchaseForm.valueChanges.subscribe(data=>{
      debugger
      this.logValidationMessages(this.itemPurchaseForm)
    })
    this.itemPurchaseForm.get('PaymentMode').valueChanges.subscribe(data=>{
     this.groupItem.PaymentMode=data
    })
    if(this.groupItem.Id==null){
      this.ledgerSelectedItems.push({id:"0",itemName:"SELECT"})
      this.subledgerSelectedItems.push({id:"0",itemName:"SELECT"})
    }
    else{
      this.supplierSelectedItems=[];
      this.supplierSelectedItems.push({id:this.groupItem.Supplier_Id,itemName:this.groupItem.SupplierName})
      this.ledgerSelectedItems=[];
      this.ledgerSelectedItems.push({id:this.groupItem.Ledger_Id,itemName:this.groupItem.LedgerName})
      this.itemPurchaseForm.patchValue({
        TransactionId:this.groupItem.TransactionId,
        ChalanNo:this.groupItem.ChalanNo,
        InvoiceNo: this.groupItem.InvoiceNo,
        Supplier_Id: this.groupItem.Supplier_Id,
        Reason: this.groupItem.Reason,
        TransactionDate: this.groupItem.TransactionDate,
        GrvNo: this.groupItem.GrvNo,
        GrvDate:this.groupItem.GrvDate,
        Comments: this.groupItem.Comments,
        LotNo:this.groupItem.LotNo,
        TotalAmount: this.groupItem.TotalAmount,
        Quantity: this.groupItem.Quantity,
        DiscountRate: this.groupItem.DiscountRate,
        DiscountAmount: this.groupItem.DiscountAmount,
        Vat: this.groupItem.Vat,
        Tax:this.groupItem.Tax,
        NetPayableAmount: this.groupItem.NetPayableAmount,
        PaidAmount:this.groupItem.PaidAmount,
        Approver_Id:this.groupItem.Approver_Id,
        Ledger_Id:this.groupItem.Ledger_Id,
        SubLedger_Id:this.groupItem.SubLedger_Id,
        PaymentMode: this.groupItem.PaymentMode,
        TransactionType: this.groupItem.TransactionType
      })
      this.itemPurchaseForm.setControl('ItemTransactionList',this.setExistingItemPurchase())
      const control=(<FormArray>this.itemPurchaseForm.get('ItemTransactionList')).controls;
      this.groupItem.ItemTransactionList.forEach((a,index)=>{
        control[index].get('ItemId').setValue([{id:a.Item_Id,itemName:a.ItemName}]);
        control[index].get('LocationId').setValue([{id:a.Location_Id,itemName:a.LocationName}]);
      });
      this.formArray=control;
    }
  }
  controlGroupItemForm(){
    debugger
    const dialogRef=this.matDialog.open(FormDetailsControlComponent,{
      data:"purchase-form",
      disableClose:true,
      height:window.screen.height*.9+'px',
      width:window.screen.width*.8+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
     if(result){
       this.getItemPurchaseValidationList()
     }
    })
  }
  getItemPurchaseValidationList(){
    debugger
    this.blockUi.start("Loading....,Please wait.")
    this._validationService.getItemPurchaseValidationData("purchase-form").subscribe((response:ItemPurchaseValidation[])=>{
      this.blockUi.stop();
      this.groupItem.data=response
      //this.groupItem.data= this.itemPurchaseValidationList;
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  setExistingItemPurchase():FormArray{
    const formArray=new FormArray([]);
    this.groupItem.ItemTransactionList.forEach(itemTransaction=>{
    //this.itemSelectedItems=[];
     //this.itemSelectedItems.push({id:itemTransaction.Item_Id,itemName:itemTransaction.ItemName})
    //this.locationSelectedItems=[];
    //this.locationSelectedItems.push({id:itemTransaction.Location_Id,itemName:itemTransaction.LocationName})
    formArray.push( this.fb.group({
      SerialNo: [itemTransaction.SerialNo],
      TransactionId: [itemTransaction.TransactionId,this.purchaseValidation[0].TransactionId==true&&this.purchaseValidation[1].TransactionId==true? Validators.required:null],
      Item_Id: [itemTransaction.Item_Id,this.purchaseValidation[0].Item_Id==true&&this.purchaseValidation[1].Item_Id==true? Validators.required:null],
      Location_Id: [itemTransaction.Location_Id,this.purchaseValidation[0].Location_Id==true&&this.purchaseValidation[1].Location_Id==true? Validators.required:null],
      ItemId: [null],
      LocationId: [null,this.purchaseValidation[0].Location_Id==true&&this.purchaseValidation[1].Location_Id==true? Validators.required:null],
      TransactionType: [itemTransaction.TransactionType,this.purchaseValidation[0].TransactionType==true&&this.purchaseValidation[1].TransactionType==true? Validators.required:null],
      Quantity: [itemTransaction.Quantity,this.purchaseValidation[0].Quantity==true&&this.purchaseValidation[1].Quantity==true? Validators.required:null],
      UnitCost: [itemTransaction.UnitCost,this.purchaseValidation[0].UnitCost==true&&this.purchaseValidation[1].UnitCost==true? Validators.required:null],
      InStock: [0],
      UnitSale: [itemTransaction.UnitSale,this.purchaseValidation[0].UnitSale==true&&this.purchaseValidation[1].UnitSale==true? Validators.required:null],
      TotalAmount: [this.calulateTotalAmount(itemTransaction),this.purchaseValidation[0].TotalAmountTransaction==true&&this.purchaseValidation[1].TotalAmountTransaction==true? Validators.required:null],
      DiscountRate: [itemTransaction.DiscountRate,this.purchaseValidation[0].DiscountRateTransaction==true&&this.purchaseValidation[1].DiscountRateTransaction==true? Validators.required:null],
      DiscountAmount: [itemTransaction.DiscountAmount,this.purchaseValidation[0].DiscountAmount==true&&this.purchaseValidation[1].DiscountAmount==true? Validators.required:null],
      Vat: [itemTransaction.Vat,this.purchaseValidation[0].Vat==true&&this.purchaseValidation[1].Vat==true? Validators.required:null],
      Tax: [itemTransaction.Tax,this.purchaseValidation[0].Tax==true&&this.purchaseValidation[1].Tax==true? Validators.required:null]
      }))
    })
    return formArray
  }
  calulateTotalAmount(itemTransaction:ItemTransaction):number{

    var totalAmount=0,discountAmount=0;
    let amount=itemTransaction.UnitCost*itemTransaction.Quantity;
    if(amount>0){
      discountAmount=(amount*itemTransaction.DiscountRate)/100
    }
    totalAmount=amount-discountAmount;
    return totalAmount;
  }
  onNoClick(){
    this.matDialogRef.close(false);
  }
  getItemList(subCategoryId:string){
    this._dropdownService.getItemDropdownList(subCategoryId).subscribe(response=>{
      this.itemList=response
      if(this.itemList.length>0){
        this.itemList.forEach((a,index,array)=>{
          this.itemDropdownList.push({id:a.Value,itemName:a.Code+'-'+a.Text});
        })
      }
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getLocationList(){
    this._dropdownService.getLocationDropdownList().subscribe(response=>{
      this.locationList=response
      if(this.locationList.length>0){
        this.locationList.forEach((a,index,array)=>{
          this.locationDropdownList.push({id:a.Value,itemName:a.Code+'-'+a.Text});
        })
      }
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  itemOnItemSelect($event,index:number){
    debugger
    const control=(<FormGroup>this.itemPurchaseForm.get('ItemTransactionList')).controls[index]
    const selectedItem=<MultiSelectDropdown[]>control.get('ItemId').value;
    if(selectedItem&&selectedItem[0].id=="0"){
      control.get('Item_Id').setValue('');
    }
    else{
      var locationId=<MultiSelectDropdown[]>control.get('LocationId').value;
      control.get('Item_Id').setValue(selectedItem[0].id);
      if(this.purchaseValidation[0].InStock){
        if(locationId[0].id!="0"){
          this.getItemStockByLocationAndItemId(selectedItem[0].id,locationId[0].id,control)
        }
      }
    }
  }
  locationOnItemSelect($event,index:number){
    debugger
    const control=(<FormGroup>this.itemPurchaseForm.get('ItemTransactionList')).controls[index]
    const selectedLocation=<MultiSelectDropdown[]>control.get('LocationId').value;
    if(selectedLocation&&selectedLocation[0].id=="0"){
      control.get('Location_Id').setValue('');
    }
    else{
      var itemid=<MultiSelectDropdown[]>control.get('ItemId').value;
      control.get('Location_Id').setValue(selectedLocation[0].id);
      if(this.purchaseValidation[0].InStock){
        if(itemid[0].id!="0"){
          this.getItemStockByLocationAndItemId(itemid[0].id,selectedLocation[0].id,control)
        }
      }
    }
  }
  ledgerOnSeletedItem($event:MultiSelectDropdown){
    if($event.id!="0"){
      this.itemPurchaseForm.get('Ledger_Id').setValue($event.id);
      this.groupItem.Ledger_Id=$event.id;
    }
    else{
      this.itemPurchaseForm.get('Ledger_Id').setValue('');
    }
  }
  supplierOnSeletedItem($event:MultiSelectDropdown){
    if($event.id!="0"){
      this.itemPurchaseForm.get('Supplier_Id').setValue($event.id);
      this.groupItem.Ledger_Id=$event.id;
    }
    else{
      this.itemPurchaseForm.get('Supplier_Id').setValue('');
    }
  }
  subledgerOnSeletedItem($event:MultiSelectDropdown){

  }
  selectedFormControl(index:number){
    debugger
    var totalAmount=0;
    const control=(<FormGroup>this.itemPurchaseForm.get('ItemTransactionList')).controls[index];
    var quantityControl=control.get('Quantity');
    var vatControl=control.get('Vat');
    var discountRateControl=control.get('DiscountRate');
    var discountAmountControl=control.get('DiscountAmount');
    var TotalAmountControl=control.get('TotalAmount');
    var unitCostControl=control.get('UnitCost');
    if(quantityControl&&quantityControl.value!="" &&unitCostControl&&unitCostControl.value!=""){
      totalAmount=Number(quantityControl.value)*Number(unitCostControl.value);
      TotalAmountControl.setValue(totalAmount);
    }
    if(discountRateControl&&discountRateControl.value!=""){
      let discountAmount=((Number(discountRateControl.value)*totalAmount)/100);
      discountAmountControl.setValue(discountAmount);
      totalAmount-=discountAmount;
      TotalAmountControl.setValue(totalAmount);
    }
    if(vatControl&&vatControl.value!=""){
      totalAmount+=Number(vatControl.value);
      TotalAmountControl.setValue(totalAmount);
    }
    this.getTotalQuantityAndAmount();
  }
  getTotalQuantityAndAmount(){
    debugger
    this.grandQuantity=0;
    this.grandTotal=0;
    const control=(<FormArray>this.itemPurchaseForm.get('ItemTransactionList')).controls;
    control.forEach((a,index,array)=>{
      var quantityControl=a.get('Quantity');
      if(quantityControl&&quantityControl.value!=""){
        this.grandQuantity+=quantityControl.value;
      }
      var TotalAmountControl=a.get('TotalAmount');
      if(TotalAmountControl&&TotalAmountControl.value!=""){
        this.grandTotal+=TotalAmountControl.value;
      }
    });
    var discountRateControl=this.itemPurchaseForm.get('DiscountRate');
    var discountAmountControl=this.itemPurchaseForm.get('DiscountAmount');
    var discountAmount=0;
    if(discountRateControl&&discountRateControl.value!=""){
      discountAmount=((Number(discountRateControl.value)*this.grandTotal)/100);
      discountAmountControl.setValue(discountAmount);
    }
    if(this.itemPurchaseForm.get('Quantity')){
      this.itemPurchaseForm.get('Quantity').setValue(this.grandQuantity);
    }
    if(this.itemPurchaseForm.get('TotalAmount')){
      this.itemPurchaseForm.get('TotalAmount').setValue(this.grandTotal);
    }
    if( this.itemPurchaseForm.get('NetPayableAmount')){
      this.itemPurchaseForm.get('NetPayableAmount').setValue(this.grandTotal-discountAmount);
    }
  }
  slectedGroupControl(){
    this.getTotalQuantityAndAmount();
  }
  createNewSupplier(){
     const dialogRef=this.matDialog.open(SupplierEntryComponent,{
       data:this.supplier,
       disableClose:true,
       height:window.screen.height*.6+'px',
       width:window.screen.width*.4+'px'
     });
     dialogRef.afterClosed().subscribe(result=>{
       debugger
       if(result){
         this.supplierNew=true;
         
       }
     })
   }
   logValidationMessages(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach((key:string)=>{
     const abastractControl=formGroup.get(key);
     if(abastractControl instanceof FormGroup){
       this.logValidationMessages(abastractControl)
     }
     else if(abastractControl instanceof FormArray){
       for(const control of abastractControl.controls){
         if(control instanceof FormGroup){
           this.logValidationMessages(control)
         }
         
       }
     }
     else{
      //  this.formErrors[key]=''
      //  if(abastractControl&& !abastractControl.valid&&abastractControl.touched){
      //    const message=this.validationMessage[key];
      //    for(const errorKey in abastractControl.errors){
      //      this.formErrors[key]+=message[errorKey]+' ';
      //    }
        
      //  }
     }
    })
   }
   addNewItemTransactions(){
      (<FormArray>this.itemPurchaseForm.get('ItemTransactionList')).push(this.addNewItemTransaction());
    }
  addNewItemTransaction():FormGroup{
  return this.fb.group({
    SerialNo: [null],
    TransactionId: [null,this.purchaseValidation[0].TransactionId==true&&this.purchaseValidation[1].TransactionId==true? Validators.required:null],
    Item_Id: [null,this.purchaseValidation[0].Item_Id==true&&this.purchaseValidation[1].Item_Id==true? Validators.required:null],
    Location_Id: [null,this.purchaseValidation[0].Location_Id==true&&this.purchaseValidation[1].Location_Id==true? Validators.required:null],
    ItemId: [this.itemSelectedItems,this.purchaseValidation[0].Item_Id==true&&this.purchaseValidation[1].Item_Id==true? Validators.required:null],
    LocationId: [this.locationSelectedItems,this.purchaseValidation[0].Location_Id==true&&this.purchaseValidation[1].Location_Id==true? Validators.required:null],
    TransactionType: [null,this.purchaseValidation[0].TransactionType==true&&this.purchaseValidation[1].TransactionType==true? Validators.required:null],
    Quantity: [0,this.purchaseValidation[0].Quantity==true&&this.purchaseValidation[1].Quantity==true? Validators.required:null],
    UnitCost: [0,this.purchaseValidation[0].UnitCost==true&&this.purchaseValidation[1].UnitCost==true? Validators.required:null],
    InStock: [0],
    UnitSale: [0,this.purchaseValidation[0].UnitSale==true&&this.purchaseValidation[1].UnitSale==true? Validators.required:null],
    TotalAmount: [0,this.purchaseValidation[0].TotalAmountTransaction==true&&this.purchaseValidation[1].TotalAmountTransaction==true? Validators.required:null],
    DiscountRate: [0,this.purchaseValidation[0].DiscountRateTransaction==true&&this.purchaseValidation[1].DiscountRateTransaction==true? Validators.required:null],
    DiscountAmount: [0,this.purchaseValidation[0].DiscountAmount==true&&this.purchaseValidation[1].DiscountAmount==true? Validators.required:null],
    Vat: [0,this.purchaseValidation[0].Vat==true&&this.purchaseValidation[1].Vat==true? Validators.required:null],
    Tax: [0,this.purchaseValidation[0].Tax==true&&this.purchaseValidation[1].Tax==true? Validators.required:null]
  })
 }
 removeItemTransaction(index:number){
  (<FormArray>this.itemPurchaseForm.get('ItemTransactionList')).removeAt(index)
}
 save(){
  this.logValidationMessages(this.itemPurchaseForm);
}
savePurchaseItem(){
  debugger
  let id=this.groupItem.Id;
  this.groupItem=this.itemPurchaseForm.value;
  this.groupItem.Id=id;
  if(this.groupItem.ItemTransactionList.length>0){
    this.groupItem.ItemTransactionList.forEach(item=>{
      item.TransactionType='Purchase'
    })
  };
  if(this.groupItem.Id==null){
    this._inventotyService.saveGroupItem(this.groupItem).subscribe(response=>{
      let result=response
      if(result){
        this.matDialogRef.close(true);
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
    this._inventotyService.UpdateGroupItem(this.groupItem).subscribe(response=>{
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
getItemStockByLocationAndItemId(itemId:string,locationId:string,control:AbstractControl){
  this._inventotyService.gettemStockByLocationAndItemId(itemId,locationId).subscribe(response=>{
    let result=response
    control.get('InStock').setValue(response);
  },error=>{
    let dialogData=new DialogData();
    dialogData.message=error
    this._alertBox.openDialog(dialogData);
  })
}
GeneratedAutoCodeForTransactionId($event){
  this.groupItem.TransactionId=$event;
  this.itemPurchaseForm.get('TransactionId').setValue($event);
}
GeneratedAutoCodeForChalanNo($event){
  this.groupItem.ChalanNo=$event;
  this.itemPurchaseForm.get('ChalanNo').setValue($event);
}
GeneratedAutoCodeForLotNo($event){
  this.groupItem.LotNo=$event;
  this.itemPurchaseForm.get('LotNo').setValue($event);
}
}
