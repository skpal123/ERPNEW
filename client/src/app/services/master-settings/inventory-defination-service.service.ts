import { Injectable } from '@angular/core';
import { DefaultRouteService } from '../common/default-route.service';
import { InventoryLocation } from '../../models/master-settings/inventory-defination/inventory-location.model';
import { Unit } from '../../models/master-settings/inventory-defination/unit.model';
import { Category } from '../../models/master-settings/inventory-defination/category.model';
import { Subcategory } from '../../models/master-settings/inventory-defination/subcategory.model';
import { Manufacture } from '../../models/master-settings/inventory-defination/manufacture.model';
import { Supplier } from '../../models/master-settings/inventory-defination/supplier.model';
import { Party } from '../../models/master-settings/inventory-defination/party.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { InventoryItem } from '../../models/master-settings/inventory-defination/inventory-item.model';
import { Customer } from '../../models/master-settings/inventory-defination/customer.model';
import { SettingSellprice } from '../../models/master-settings/inventory-defination/setting-sell-price.model';
import { OfferSetup } from '../../models/master-settings/inventory-defination/offer-setup.model';
import { Tree } from '../../models/common/tree.model';
import { Offer } from '../../models/master-settings/inventory-defination/offer.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryDefinationServiceService {
  constructor(
    private _defaultRoute:DefaultRouteService,
    private _httpClient:HttpClient) 
    { }
  public getLocationList():Observable<InventoryLocation[]>{
    debugger
    var url=this._defaultRoute.InventoryService+'locations';
    return this._httpClient.get<InventoryLocation[]>(url)
  }
  public CreateLocation(location:InventoryLocation){
    var url=this._defaultRoute.InventoryService+'location';
    return this._httpClient.post<InventoryLocation>(url,location)
    
  }
  public UpdateLocation(location:InventoryLocation){
    var url=this._defaultRoute.InventoryService+'location/'+location.Id;
    return this._httpClient.put(url,location)
   
  }
  public getLocationById(Id:string){
    var url=this._defaultRoute.InventoryService+'location/'+Id;
    return this._httpClient.get<InventoryLocation>(url)
  }
  public deleteLocation(Id:string){
    var url=this._defaultRoute.InventoryService+'location/'+Id;
    return this._httpClient.delete(url)
  }
  public getUnitList(){
    var url=this._defaultRoute.InventoryService+'units';
    return this._httpClient.get<Unit[]>(url)
  }
  public CreateUnit(unit:Unit){
    var url=this._defaultRoute.InventoryService+'unit';
    return this._httpClient.post<Unit>(url,unit)
  }
  public UpdateUnit(unit:Unit){
    var url=this._defaultRoute.InventoryService+'unit/'+unit.Id;
    return this._httpClient.put(url,unit)
  }
  public getUnitById(Id:string){
    var url=this._defaultRoute.InventoryService+'unit/'+Id;
    return this._httpClient.get<Unit>(url)
  }
  public deleteUnit(Id:string){
    var url=this._defaultRoute.InventoryService+'unit/'+Id;
    return this._httpClient.delete(url)
  }
  public getCategoryList(){
    var url=this._defaultRoute.InventoryService+'categories';
    return this._httpClient.get<Category[]>(url)
  }
  public CreateCategory(category:Category){
    var url=this._defaultRoute.InventoryService+'category';
    return this._httpClient.post<Category>(url,category)
  }
  public UpdateCategory(category:Category){
    var url=this._defaultRoute.InventoryService+'category/'+category.Id;
    return this._httpClient.put(url,category)
  }
  public getCategoryById(Id:string){
    var url=this._defaultRoute.InventoryService+'category/'+Id;
    return this._httpClient.get<Category>(url);
  }
  public deleteCategory(Id:string){
    var url=this._defaultRoute.InventoryService+'category/'+Id;
    return this._httpClient.delete(url)
  }
  public getSubCategoryList(){
    var url=this._defaultRoute.InventoryService+'subcategories';
    return this._httpClient.get<Subcategory[]>(url)
  
  }
  public CreateSubCategory(subcategory:Subcategory){
    var url=this._defaultRoute.InventoryService+'subcategory';
    return this._httpClient.post<Subcategory>(url,subcategory)
  }
  public UpdateSubCategory(subcategory:Subcategory){
    var url=this._defaultRoute.InventoryService+'subcategory/'+subcategory.Id;
    return this._httpClient.put(url,subcategory)
  }
  public getSubCategoryById(Id:string){
    var url=this._defaultRoute.InventoryService+'subcategory/'+Id;
    return this._httpClient.get<Subcategory>(url)
  }
  public deleteSubCategory(Id:string){
    var url=this._defaultRoute.InventoryService+'subcategory/'+Id;
    return this._httpClient.delete(url)
  }
 
  public getInventoryItemList(){
    var url=this._defaultRoute.InventoryService+'InventoryItems';
    return this._httpClient.get<InventoryItem[]>(url)
    
  }
  public CreateInventoryItem(inventoryItem:InventoryItem){
    var url=this._defaultRoute.InventoryService+'InventoryItem';
    return this._httpClient.post<InventoryItem>(url,inventoryItem)
  }
  public UpdateInventoryItem(inventoryItem:InventoryItem){
    var url=this._defaultRoute.InventoryService+'InventoryItem/'+inventoryItem.Id;
    return this._httpClient.put(url,inventoryItem)
  }
  public getInventoryItemById(Id:string){
    var url=this._defaultRoute.InventoryService+'InventoryItem/'+Id;
    return this._httpClient.get<InventoryItem>(url)
  }
  public deleteInventoryItem(Id:string){
    var url=this._defaultRoute.InventoryService+'InventoryItem/'+Id;
    return this._httpClient.delete(url)
  }
  public getSupplierList(){
    var url=this._defaultRoute.InventoryService+'Suppliers';
     return this._httpClient.get<Supplier[]>(url)
  }
  public CreateSupplier(supplier:Supplier){
    var url=this._defaultRoute.InventoryService+'Supplier';
    return this._httpClient.post<Supplier>(url,supplier)
  }
  public UpdateSupplier(supplier:Supplier){
    var url=this._defaultRoute.InventoryService+'Supplier/'+supplier.Id;
    return this._httpClient.put(url,supplier)
  }
  public getSupplierById(Id:string){
    var url=this._defaultRoute.InventoryService+'Supplier/'+Id;
    return this._httpClient.get<Supplier>(url)
  }
  public deleteSupplier(Id:string){
    var url=this._defaultRoute.InventoryService+'Supplier/'+Id;
    return this._httpClient.delete(url)
  }
  public getManufactureList(){
    var url=this._defaultRoute.InventoryService+'Manufactures';
    return this._httpClient.get<Manufacture[]>(url)
  }
  public CreateManufacture(manufacture:Manufacture){
    var url=this._defaultRoute.InventoryService+'Manufacture';
    return this._httpClient.post<Manufacture>(url,manufacture)
  }
  public UpdateManufacture(manufacture:Manufacture){
    var url=this._defaultRoute.InventoryService+'Manufacture/'+manufacture.Id;
    return this._httpClient.put(url,manufacture)
  }
  public getManufactureById(Id:string){
    var url=this._defaultRoute.InventoryService+'Manufacture/'+Id;
    return this._httpClient.get<Manufacture>(url)
  }
  public deleteManufacture(Id:string){
    var url=this._defaultRoute.InventoryService+'Manufacture/'+Id;
    return this._httpClient.delete(url)
  }
  public getPartyList(){
    var url=this._defaultRoute.InventoryService+'Partys';
    return this._httpClient.get<Party[]>(url)
  }
  public CreateParty(party:Party){
    var url=this._defaultRoute.InventoryService+'Party';
    return this._httpClient.post<Party>(url,party)
  }
  public UpdateParty(party:Party){
    var url=this._defaultRoute.InventoryService+'Party/'+party.Id;
    return this._httpClient.put(url,party)
  }
  public getPartyById(Id:string){
    var url=this._defaultRoute.InventoryService+'Party/'+Id;
    return this._httpClient.get<Party>(url)
  }
  public deleteParty(Id:string){
    var url=this._defaultRoute.InventoryService+'Party/'+Id;
    return this._httpClient.delete(url)
  }
  public getCustomerList(){
    var url=this._defaultRoute.InventoryService+'Customers';
    return this._httpClient.get<Customer[]>(url)
  }
  public CreateCustomer(customer:Customer){
    var url=this._defaultRoute.InventoryService+'Customer';
    return this._httpClient.post<Customer>(url,customer)
  }
  public UpdateCustomer(customer:Customer){
    var url=this._defaultRoute.InventoryService+'Customer/'+customer.Id;
    return this._httpClient.put(url,customer)
  }
  public getCustomerById(Id:string){
    var url=this._defaultRoute.InventoryService+'Customer/'+Id;
    return this._httpClient.get<Customer>(url)
  }
  public deleteCustomer(Id:string){
    var url=this._defaultRoute.InventoryService+'Customer/'+Id;
    return this._httpClient.delete(url)
  }
  public getOfferSetupList(){
    var url=this._defaultRoute.InventoryService+'OfferSetups';
    return this._httpClient.get<OfferSetup[]>(url)
  }
  public CreateOfferSetup(offer:Offer){
    var url=this._defaultRoute.InventoryService+'OfferSetup';
    return this._httpClient.post<Offer>(url,offer)
  }
  public UpdateOfferSetup(offer:Offer){
    var url=this._defaultRoute.InventoryService+'OfferSetup/'+offer.OfferId;
    return this._httpClient.put<boolean>(url,offer)
  }
  public getOfferSetupById(Id:string){
    var url=this._defaultRoute.InventoryService+'OfferSetup/'+Id;
    return this._httpClient.get<Offer>(url)
  }
  public deleteOfferSetup(Id:string){
    var url=this._defaultRoute.InventoryService+'OfferSetup/'+Id;
    return this._httpClient.delete(url)
  }
  public GetSettingSellPrice(priceSettingMethod:number){
    var url=this._defaultRoute.InventoryService+'settingSellPrice/'+priceSettingMethod;
    return this._httpClient.get<SettingSellprice[]>(url)
  }
  public SaveSettingSellPrice(sellprices:SettingSellprice[]){
    var url=this._defaultRoute.InventoryService+'settingSellPrice';
    return this._httpClient.post<boolean>(url,sellprices)
  }
  public getitemTree(){
    var url=this._defaultRoute.InventoryService+'getItemTree';
    return this._httpClient.get<Tree[]>(url)
  }
  public getitemTreeByOfferId(offerId:string){
    var url=this._defaultRoute.InventoryService+'getItemTree/'+offerId;
    return this._httpClient.get<Tree[]>(url)
  }
}
