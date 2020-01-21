import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { ItemPurchaseValidation } from '../../../models/validation/item-purchase.validation.model';
import { MultiSelectDropdown } from '../../../models/common/multiselect.dropdown.model';
import { SelectDropdown } from '../../../models/common/select.dropdown.model';
import { Category } from '../../../models/master-settings/inventory-defination/category.model';
import { Subcategory } from '../../../models/master-settings/inventory-defination/subcategory.model';
import { MatDialogRef,MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ValidationService } from '../../../services/common/validation.service';
import { DropdownService } from '../../../services/common/dropdown.service';
import { GroupItem } from '../../../models/regular-operation/inventory/group-item.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { InventoryService } from '../../../services/regular-operation/inventory.service';
import { ItemTransaction } from '../../../models/regular-operation/inventory/item-transaction.model';
import { DialogData } from '../../../models/common/dialog-data.model';
import { SupplierEntryComponent } from '../../../master-settings/inventory-defination-module/supplier-entry/supplier-entry.component';
import { CustomerEntryComponent } from '../../../master-settings/inventory-defination-module/customer-entry/customer-entry.component';
import { PartyEntryComponent } from '../../../master-settings/inventory-defination-module/party-entry/party-entry.component';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormDetailsControlComponent } from '../../../common-module/form-details-control/form-details-control.component';
import { Customer } from '../../../models/master-settings/inventory-defination/customer.model';

@Component({
  selector: 'app-item-sales',
  templateUrl: './item-sales.component.html',
  styleUrls: ['./item-sales.component.css']
})
export class ItemSalesComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  itemSaleForm:FormGroup
  ItemSaleValidation:ItemPurchaseValidation[]=[];
  ledgerTouch:boolean=false;
  allLedger:boolean=false;
  filterByPaymentMode:boolean=true
  subledgerTouch:boolean=false;
  supplierNew:boolean=false;
  partyNew:boolean=false;
  customerNew:boolean=false;
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
  customerSelectedItems :MultiSelectDropdown[]= [
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
  formArray:AbstractControl[]=[];
  category:Category={Id:null,CategoryId:null,CategoryName:null}
  subcategory:Subcategory={Id:null,SubCategoryId:null,SubCategoryName:null,Category_Id:null}
  constructor(public matDialogRef:MatDialogRef<ItemSalesComponent>,
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
    this.ItemSaleValidation=this.groupItem.data;
    this.getItemList("null");
    this.getLocationList();
    this.itemSaleForm = this.fb.group({
      TransactionId: [null,this.ItemSaleValidation[0].TransactionId==true&&this.ItemSaleValidation[1].TransactionId==true? Validators.required:null],
      ChalanNo: [null,this.ItemSaleValidation[0].ChalanNo==true&&this.ItemSaleValidation[1].ChalanNo==true? Validators.required:null],
      InvoiceNo: [null,this.ItemSaleValidation[0].InvoiceNo==true&&this.ItemSaleValidation[1].InvoiceNo==true? Validators.required:null],
      Supplier_Id: [null,this.ItemSaleValidation[0].Supplier_Id==true&&this.ItemSaleValidation[1].Supplier_Id==true==true? Validators.required:null],
      Party_Id: [null,this.ItemSaleValidation[0].Party_Id==true&&this.ItemSaleValidation[1].Party_Id==true==true? Validators.required:null],
      Customer_Id: [null,this.ItemSaleValidation[0].Customer_Id==true&&this.ItemSaleValidation[1].Supplier_Id==true==true? Validators.required:null],
      Reason: [0,this.ItemSaleValidation[0].TransactionDate==true&&this.ItemSaleValidation[1].TransactionDate==true? Validators.required:null],
      TransactionDate: [new Date(),this.ItemSaleValidation[0].TransactionDate==true&&this.ItemSaleValidation[1].TransactionDate==true? Validators.required:null],
      GrvNo: [null,this.ItemSaleValidation[0].GrvNo==true&&this.ItemSaleValidation[1].GrvNo==true? Validators.required:null],
      GrvDate: [new Date(),this.ItemSaleValidation[0].GrvDate==true&&this.ItemSaleValidation[1].GrvDate==true? Validators.required:null],
      Comments: [null,this.ItemSaleValidation[0].Comments==true&&this.ItemSaleValidation[1].Comments==true? Validators.required:null],
      LotNo: [null,this.ItemSaleValidation[0].LotNo==true&&this.ItemSaleValidation[1].LotNo==true? Validators.required:null],
      TotalAmount: [0,this.ItemSaleValidation[0].TotalAmountGroup==true&&this.ItemSaleValidation[1].TotalAmountGroup==true? Validators.required:null],
      Quantity: [0,this.ItemSaleValidation[0].QuantityGroup==true&&this.ItemSaleValidation[1].QuantityGroup==true? Validators.required:null],
      DiscountRate: [0,this.ItemSaleValidation[0].DiscountRateGroup==true&&this.ItemSaleValidation[1].DiscountRateGroup==true? Validators.required:null],
      DiscountAmount: [0,this.ItemSaleValidation[0].DiscountAmount==true&&this.ItemSaleValidation[1].DiscountAmount==true? Validators.required:null],
      Vat: [0,this.ItemSaleValidation[0].Vat==true&&this.ItemSaleValidation[1].Vat==true? Validators.required:null],
      Tax: [0,this.ItemSaleValidation[0].Tax==true&&this.ItemSaleValidation[1].Tax==true? Validators.required:null],
      NetPayableAmount: [0,this.ItemSaleValidation[0].NetPayableAmount==true&&this.ItemSaleValidation[1].NetPayableAmount==true? Validators.required:null],
      PaidAmount: [0,this.ItemSaleValidation[0].PaidAmount==true&&this.ItemSaleValidation[1].PaidAmount==true? Validators.required:null],
      Approver_Id: [null,this.ItemSaleValidation[0].Approver_Id==true&&this.ItemSaleValidation[1].Approver_Id==true? Validators.required:null],
      Ledger_Id: [null,this.ItemSaleValidation[0].Ledger_Id==true&&this.ItemSaleValidation[1].Ledger_Id==true? Validators.required:null],
      SubLedger_Id: [null,this.ItemSaleValidation[0].SubLedger_Id==true&&this.ItemSaleValidation[1].SubLedger_Id==true? Validators.required:null],
      PaymentMode: [-1,this.ItemSaleValidation[0].PaymentMode==true&&this.ItemSaleValidation[1].PaymentMode==true? Validators.required:null],
      TransactionType: ["Sales",this.ItemSaleValidation[0].TransactionType==true&&this.ItemSaleValidation[1].TransactionType==true? Validators.required:null],
      ItemTransactionList: this.fb.array([
        this.addNewItemTransaction()
      ]),
    });
    this.formArray=(<FormArray>this.itemSaleForm.get('ItemTransactionList')).controls;
    this.itemSaleForm.valueChanges.subscribe(data=>{
      debugger
      this.logValidationMessages(this.itemSaleForm)
    })
    this.itemSaleForm.get('PaymentMode').valueChanges.subscribe(data=>{
     
    })
    if(this.groupItem.Id==null){
      this.ledgerSelectedItems.push({id:"0",itemName:"SELECT"})
      this.subledgerSelectedItems.push({id:"0",itemName:"SELECT"})
    }
    else{
      this.customerSelectedItems=[];
      this.customerSelectedItems.push({id:this.groupItem.Customer_Id,itemName:this.groupItem.CustomerName})
      this.ledgerSelectedItems=[];
      this.ledgerSelectedItems.push({id:this.groupItem.Ledger_Id,itemName:this.groupItem.LedgerName})
      this.itemSaleForm.patchValue({
        TransactionId:this.groupItem.TransactionId,
        ChalanNo:this.groupItem.ChalanNo,
        InvoiceNo: this.groupItem.InvoiceNo,
        Supplier_Id: this.groupItem.Supplier_Id,
        Customer_Id: this.groupItem.Customer_Id,
        Party_Id: this.groupItem.Party_Id,
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
        PaidAmount: this.groupItem.PaidAmount,
        Approver_Id:this.groupItem.Approver_Id,
        Ledger_Id:this.groupItem.Ledger_Id,
        SubLedger_Id:this.groupItem.SubLedger_Id,
        PaymentMode: this.groupItem.PaymentMode,
        TransactionType: this.groupItem.TransactionType
      })
      this.itemSaleForm.setControl('ItemTransactionList',this.setExistingItemPurchase())
      const control=(<FormArray>this.itemSaleForm.get('ItemTransactionList')).controls;
      this.groupItem.ItemTransactionList.forEach((a,index)=>{
        control[index].get('ItemId').setValue([{id:a.Item_Id,itemName:a.ItemName}]);
        control[index].get('LocationId').setValue([{id:a.Location_Id,itemName:a.LocationName}]);
      });
      this.formArray=(<FormArray>this.itemSaleForm.get('ItemTransactionList')).controls
    }
  }
  controlGroupItemForm(){
    debugger
    const dialogRef=this.matDialog.open(FormDetailsControlComponent,{
      data:"sales-form",
      disableClose:true,
      height:window.screen.height*.6+'px',
      width:window.screen.width*.5+'px'
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
    this._validationService.getItemPurchaseValidationData("sales-form").subscribe((response:ItemPurchaseValidation[])=>{
      this.blockUi.stop();
      this.groupItem.data=response
      this.ItemSaleValidation= response;
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
      TransactionId: [itemTransaction.TransactionId,this.ItemSaleValidation[0].TransactionId==true&&this.ItemSaleValidation[1].TransactionId==true? Validators.required:null],
      Item_Id: [itemTransaction.Item_Id,this.ItemSaleValidation[0].Item_Id==true&&this.ItemSaleValidation[1].Item_Id==true? Validators.required:null],
      Location_Id: [itemTransaction.Location_Id,this.ItemSaleValidation[0].Location_Id==true&&this.ItemSaleValidation[1].Location_Id==true? Validators.required:null],
      ItemId: [null,this.ItemSaleValidation[0].Item_Id==true&&this.ItemSaleValidation[1].Item_Id==true? Validators.required:null],
      LocationId: [null,this.ItemSaleValidation[0].Location_Id==true&&this.ItemSaleValidation[1].Location_Id==true? Validators.required:null],
      TransactionType: [itemTransaction.TransactionType,this.ItemSaleValidation[0].TransactionType==true&&this.ItemSaleValidation[1].TransactionType==true? Validators.required:null],
      Quantity: [itemTransaction.Quantity,this.ItemSaleValidation[0].Quantity==true&&this.ItemSaleValidation[1].Quantity==true? Validators.required:null],
      UnitCost: [itemTransaction.UnitCost,this.ItemSaleValidation[0].UnitCost==true&&this.ItemSaleValidation[1].UnitCost==true? Validators.required:null],
      UnitSale: [itemTransaction.UnitSale,this.ItemSaleValidation[0].UnitSale==true&&this.ItemSaleValidation[1].UnitSale==true? Validators.required:null],
      InStock: [0],
      TotalAmount: [this.calulateTotalAmount(itemTransaction),this.ItemSaleValidation[0].TotalAmountTransaction==true&&this.ItemSaleValidation[1].TotalAmountTransaction==true? Validators.required:null],
      DiscountRate: [itemTransaction.DiscountRate,this.ItemSaleValidation[0].DiscountRateTransaction==true&&this.ItemSaleValidation[1].DiscountRateTransaction==true? Validators.required:null],
      DiscountAmount: [itemTransaction.DiscountAmount,this.ItemSaleValidation[0].DiscountAmount==true&&this.ItemSaleValidation[1].DiscountAmount==true? Validators.required:null],
      Vat: [itemTransaction.Vat,this.ItemSaleValidation[0].Vat==true&&this.ItemSaleValidation[1].Vat==true? Validators.required:null],
      Tax: [itemTransaction.Tax,this.ItemSaleValidation[0].Tax==true&&this.ItemSaleValidation[1].Tax==true? Validators.required:null]
      }))
    })
    return formArray
  }
  calulateTotalAmount(itemTransaction:ItemTransaction):number{

    var totalAmount=0,discountAmount=0;
    let amount=itemTransaction.UnitSale*itemTransaction.Quantity;
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
    const control=(<FormGroup>this.itemSaleForm.get('ItemTransactionList')).controls[index]
    const selectedItem=<MultiSelectDropdown[]>control.get('ItemId').value;
    if(selectedItem&&selectedItem[0].id=="0"){
      control.get('Item_Id').setValue('');
    }
    else{
      var locationId=<MultiSelectDropdown[]>control.get('LocationId').value;
      control.get('Item_Id').setValue(selectedItem[0].id);
      if(this.ItemSaleValidation[0].InStock){
        if(locationId[0].id!="0"){
          this.getItemStockByLocationAndItemId(selectedItem[0].id,locationId[0].id,control)
        }
      }
    }
  }
  locationOnItemSelect($event,index:number){
    debugger
    const control=(<FormGroup>this.itemSaleForm.get('ItemTransactionList')).controls[index]
    const selectedLocation=<MultiSelectDropdown[]>control.get('LocationId').value;
    if(selectedLocation&&selectedLocation[0].id=="0"){
      control.get('Location_Id').setValue('');
    }
    else{
      var itemid=<MultiSelectDropdown[]>control.get('ItemId').value;
      control.get('Location_Id').setValue(selectedLocation[0].id);
      if(this.ItemSaleValidation[0].InStock){
        if(itemid[0].id!="0"){
          this.getItemStockByLocationAndItemId(itemid[0].id,selectedLocation[0].id,control)
        }
      }
    }
  }
  ledgerOnSeletedItem($event:MultiSelectDropdown){
    if($event.id!="0"){
      this.itemSaleForm.get('Ledger_Id').setValue($event.id);
      this.groupItem.Ledger_Id=$event.id;
    }
    else{
      this.itemSaleForm.get('Ledger_Id').setValue('');
    }
  }
  supplierOnSeletedItem($event:MultiSelectDropdown){
    if($event.id!="0"){
      this.itemSaleForm.get('Supplier_Id').setValue($event.id);
      this.groupItem.Ledger_Id=$event.id;
    }
    else{
      this.itemSaleForm.get('Supplier_Id').setValue('');
    }
  }
  partyOnSeletedItem($event:MultiSelectDropdown){
    if($event.id!="0"){
      this.itemSaleForm.get('Party_Id').setValue($event.id);
      this.groupItem.Party_Id=$event.id;
    }
    else{
      this.itemSaleForm.get('Party_Id').setValue('');
    }
  }
  customerOnSeletedItem($event:MultiSelectDropdown){
    if($event.id!="0"){
      this.itemSaleForm.get('Customer_Id').setValue($event.id);
      this.groupItem.Ledger_Id=$event.id;
    }
    else{
      this.itemSaleForm.get('Customer_Id').setValue('');
    }
  }
  subledgerOnSeletedItem($event:MultiSelectDropdown){

  }
  selectedFormControl(index:number){
    debugger
    var totalAmount=0;
    const control=(<FormGroup>this.itemSaleForm.get('ItemTransactionList')).controls[index];
    var quantityControl=control.get('Quantity');
    var vatControl=control.get('Vat');
    var discountRateControl=control.get('DiscountRate');
    var discountAmountControl=control.get('DiscountAmount');
    var TotalAmountControl=control.get('TotalAmount');
    var unitSaleControl=control.get('UnitSale');
    if(quantityControl&&quantityControl.value!="" &&unitSaleControl&&unitSaleControl.value!=""){
      totalAmount=Number(quantityControl.value)*Number(unitSaleControl.value);
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
    const control=(<FormArray>this.itemSaleForm.get('ItemTransactionList')).controls;
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
    var discountRateControl=this.itemSaleForm.get('DiscountRate');
    var discountAmountControl=this.itemSaleForm.get('DiscountAmount');
    var discountAmount=0;
    if(discountRateControl&&discountRateControl.value!=""){
      discountAmount=((Number(discountRateControl.value)*this.grandTotal)/100);
      discountAmountControl.setValue(discountAmount);
    }
    if(this.itemSaleForm.get('Quantity')){
      this.itemSaleForm.get('Quantity').setValue(this.grandQuantity);
    }
    if(this.itemSaleForm.get('TotalAmount')){
      this.itemSaleForm.get('TotalAmount').setValue(this.grandTotal);
    }
    if( this.itemSaleForm.get('NetPayableAmount')){
      this.itemSaleForm.get('NetPayableAmount').setValue(this.grandTotal-discountAmount);
    }
  }
  slectedGroupControl(){
    this.getTotalQuantityAndAmount();
  }
  createNewCustomer(){
    const dialogRef=this.matDialog.open(CustomerEntryComponent,{
      data:this.category,
      disableClose:true,
      height:window.screen.height*.6+'px',
      width:window.screen.width*.4+'px'
    });
    dialogRef.afterClosed().subscribe((result:Customer)=>{
      debugger
      if(result){
        this.customerNew=true;
        this.customerSelectedItems=[];
        this.customerSelectedItems.push({id:result.Id,itemName:result.CustomerId+'-'+result.CustomerName})
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
      (<FormArray>this.itemSaleForm.get('ItemTransactionList')).push(this.addNewItemTransaction());
    }
  addNewItemTransaction():FormGroup{
  return this.fb.group({
    SerialNo: [null],
    TransactionId: [null,this.ItemSaleValidation[0].TransactionId==true&&this.ItemSaleValidation[1].TransactionId==true? Validators.required:null],
    Item_Id: [null,this.ItemSaleValidation[0].Item_Id==true&&this.ItemSaleValidation[1].Item_Id==true? Validators.required:null],
    Location_Id: [null,this.ItemSaleValidation[0].Location_Id==true&&this.ItemSaleValidation[1].Location_Id==true? Validators.required:null],
    ItemId: [this.itemSelectedItems,this.ItemSaleValidation[0].Item_Id==true&&this.ItemSaleValidation[1].Item_Id==true? Validators.required:null],
    LocationId: [this.locationSelectedItems,this.ItemSaleValidation[0].Location_Id==true&&this.ItemSaleValidation[1].Location_Id==true? Validators.required:null],
    TransactionType: [null,this.ItemSaleValidation[0].TransactionType==true&&this.ItemSaleValidation[1].TransactionType==true? Validators.required:null],
    Quantity: [0,this.ItemSaleValidation[0].Quantity==true&&this.ItemSaleValidation[1].Quantity==true? Validators.required:null],
    UnitCost: [0,this.ItemSaleValidation[0].UnitCost==true&&this.ItemSaleValidation[1].UnitCost==true? Validators.required:null],
    UnitSale: [0,this.ItemSaleValidation[0].UnitSale==true&&this.ItemSaleValidation[1].UnitSale==true? Validators.required:null],
    InStock:[0],
    TotalAmount: [0,this.ItemSaleValidation[0].TotalAmountTransaction==true&&this.ItemSaleValidation[1].TotalAmountTransaction==true? Validators.required:null],
    DiscountRate: [0,this.ItemSaleValidation[0].DiscountRateTransaction==true&&this.ItemSaleValidation[1].DiscountRateTransaction==true? Validators.required:null],
    DiscountAmount: [0,this.ItemSaleValidation[0].DiscountAmount==true&&this.ItemSaleValidation[1].DiscountAmount==true? Validators.required:null],
    Vat: [0,this.ItemSaleValidation[0].Vat==true&&this.ItemSaleValidation[1].Vat==true? Validators.required:null],
    Tax: [0,this.ItemSaleValidation[0].Tax==true&&this.ItemSaleValidation[1].Tax==true? Validators.required:null]
  })
 }
 removeItemTransaction(index:number){
  (<FormArray>this.itemSaleForm.get('ItemTransactionList')).removeAt(index)
}
 save(){
  this.logValidationMessages(this.itemSaleForm);
}
savePurchaseItem(){
  debugger
  let id=this.groupItem.Id;
  this.groupItem=this.itemSaleForm.value;
  this.groupItem.Id=id;
  if(this.groupItem.ItemTransactionList.length>0){
    this.groupItem.ItemTransactionList.forEach(item=>{
      item.TransactionType='Sales'
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
  
}
