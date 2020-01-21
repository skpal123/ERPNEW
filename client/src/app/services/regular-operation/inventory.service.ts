import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpRequest, HttpErrorResponse} from '@angular/common/http'
import { Http } from '@angular/http';
import { SessionService } from '../common/session.service';
import { DefaultRouteService } from '../common/default-route.service';
import { GroupItem } from '../../models/regular-operation/inventory/group-item.model';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SupplierTransaction } from '../../models/regular-operation/inventory/supplier-transaction.model';
import { CustomerTransaction } from '../../models/regular-operation/inventory/customer-transaction.model';
import { PurchaseSalesTransaction } from '../../models/regular-operation/inventory/purchase-sales-transaction.model';
@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor(
    private _defaultRoute:DefaultRouteService,
    private _httpClient:HttpClient) 
    { }
    public getGroupItemList(transactionType:string){
      var url=this._defaultRoute.InventoryService+'GroupItems/'+transactionType;
      return this._httpClient.get<GroupItem[]>(url)
    }
    public saveGroupItem(groupItem:GroupItem){
      var url=this._defaultRoute.InventoryService+'GroupItem';
      return this._httpClient.post<boolean>(url,groupItem)
    }
    public UpdateGroupItem(groupItem:GroupItem){
      var url=this._defaultRoute.InventoryService+'GroupItem/'+groupItem.Id;
      return this._httpClient.put<boolean>(url,groupItem)
    }
    public getGroupItemById(Id:string){
      var url=this._defaultRoute.InventoryService+'GroupItem/'+Id;
      return this._httpClient.get<GroupItem>(url)
    }
    public gettemStockByLocationAndItemId(itemId:string,locationId:string){
      var url=this._defaultRoute.InventoryService+'getItemStock/'+itemId+'/'+locationId;
      return this._httpClient.get<number>(url)
    }
    public deleteGroupItem(Id:string){
      var url=this._defaultRoute.InventoryService+'GroupItem/'+Id;
      return this._httpClient.delete<boolean>(url)
    }
    public getSupplierTranscationList(startDate:Date,endDate:Date,supplierId:string){
      var url=this._defaultRoute.InventoryService+'SupplierTransactions/'+this._defaultRoute.convertDate(startDate)+'/'+this._defaultRoute.convertDate(endDate)+'/'+supplierId;
      return this._httpClient.get<SupplierTransaction[]>(url)
    }
    public saveSupplierTransaction(supplierTransaction:SupplierTransaction){
      var url=this._defaultRoute.InventoryService+'SupplierTransaction';
      return this._httpClient.post<boolean>(url,supplierTransaction)
    }
    public UpdateSupplierTransaction(supplierTransaction:SupplierTransaction){
      var url=this._defaultRoute.InventoryService+'SupplierTransaction/'+supplierTransaction.Id;
      return this._httpClient.put<boolean>(url,supplierTransaction)
    }
    public getSupplierTransactionById(Id:string){
      var url=this._defaultRoute.InventoryService+'SupplierTransaction/'+Id;
      return this._httpClient.get<SupplierTransaction>(url)
    }
    public deleteSupplierTransactionById(Id:string){
      var url=this._defaultRoute.InventoryService+'SupplierTransaction/'+Id;
      return this._httpClient.delete<SupplierTransaction>(url)
    }
    public getPartyTransactionList(startDate:Date,endDate:Date,customerId){
      var url=this._defaultRoute.InventoryService+'PartyTransactions/'+this._defaultRoute.convertDate(startDate)+'/'+this._defaultRoute.convertDate(endDate)+'/'+customerId;;
      return this._httpClient.get<CustomerTransaction[]>(url)
    }
    public savePartyTransaction(supplierTransaction:SupplierTransaction){
      var url=this._defaultRoute.InventoryService+'PartyTransaction';
      return this._httpClient.post<boolean>(url,supplierTransaction)
    }
    public UpdatePartyTransaction(customerTransaction:CustomerTransaction){
      var url=this._defaultRoute.InventoryService+'PartyTransaction/'+customerTransaction.Id;
      return this._httpClient.put<boolean>(url,customerTransaction)
    }
    public getPartyTransactionById(Id:string){
      var url=this._defaultRoute.InventoryService+'PartyTransaction/'+Id;
      return this._httpClient.get<CustomerTransaction>(url)
    }
    public deletePartyTransactionById(Id:string){
      var url=this._defaultRoute.InventoryService+'PartyTransaction/'+Id;
      return this._httpClient.delete<GroupItem>(url)
    }
    public GetSalesTransactionList(customerId:string,formDate:Date,toDate:Date){
      var url=this._defaultRoute.InventoryService+'SalesTransactions/'+customerId+'/'+this._defaultRoute.convertDate(formDate)+'/'+this._defaultRoute.convertDate(toDate);
      return this._httpClient.get<PurchaseSalesTransaction[]>(url)
    }
    public GetPurchaseTransactionList(transactionType:string,supplierId:string){
      var url=this._defaultRoute.InventoryService+'PurchaseTransactions/'+transactionType+'/'+supplierId;
      return this._httpClient.get<GroupItem[]>(url)
    }
    public GetItemTransactionDetailsById(Id:string){
      var url=this._defaultRoute.InventoryService+'ItemTransactionDetails/'+Id;
      return this._httpClient.get<GroupItem[]>(url)
    }
    public GetItemTransactionDetails(Id:string){
      var url=this._defaultRoute.InventoryService+'ItemTransactionDetails/'+Id;
      return this._httpClient.get<GroupItem[]>(url)
    }
}
