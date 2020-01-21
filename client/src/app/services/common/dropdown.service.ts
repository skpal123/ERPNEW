import { Injectable } from '@angular/core';
import { DefaultRouteService } from './default-route.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SelectDropdown } from '../../models/common/select.dropdown.model';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  constructor(
    private _defaultRoute:DefaultRouteService,
    private _httpClient:HttpClient) 
    { }
  public getUnitDropdownList(){
    var url=this._defaultRoute.DropdownService+'UnitDropdown';
    return this._httpClient.get<SelectDropdown[]>(url)
  }
  public getCategoryDropdownList(){
    var url=this._defaultRoute.DropdownService+'CategoryDropdown'; 
    return this._httpClient.get<SelectDropdown[]>(url)
  }
  public getSubCategoryDropdownList(Id:string){
    var url=this._defaultRoute.DropdownService+'SubCategoryDropdown/'+Id;
    return this._httpClient.get<SelectDropdown[]>(url)
  }
  public getItemDropdownList(Id:string){
    var url=this._defaultRoute.DropdownService+'ItemDropdown/'+Id;
    return this._httpClient.get<SelectDropdown[]>(url)
  }
  public getLedgerDropdownList(){
    var url=this._defaultRoute.DropdownService+'LedgerDropdown';
    return this._httpClient.get<SelectDropdown[]>(url)
  }
  public getSubledgerDropdownList(Id:string){
    var url=this._defaultRoute.DropdownService+'SubledgerDropdown/'+Id;
    return this._httpClient.get<SelectDropdown[]>(url)
  }
  public getLocationDropdownList(){
    var url=this._defaultRoute.DropdownService+'LocationDropdown';
    return this._httpClient.get<SelectDropdown[]>(url)
  }
  public getSupplierDropdownList(){
    var url=this._defaultRoute.DropdownService+'supplierDropdown';
    return this._httpClient.get<SelectDropdown[]>(url)
  }
  public getCustomerDropdownList(){
    var url=this._defaultRoute.DropdownService+'customerDropdown';
    return this._httpClient.get<SelectDropdown[]>(url)
  }
  public getPartyDropdownList(){
    var url=this._defaultRoute.DropdownService+'partyDropdown';
    return this._httpClient.get<SelectDropdown[]>(url)
  }
  public getLedgerDropdownListByPaymentMode(paymentMode:string){
    var url=this._defaultRoute.DropdownService+'getLedgerByPaymentMode/'+paymentMode;
    return this._httpClient.get<SelectDropdown[]>(url)
  }
  public getDesignationDropdownList(){
    var url=this._defaultRoute.DropdownService+'designationDropdown';
    return this._httpClient.get<SelectDropdown[]>(url)
  }
  public getGradeDropdownList(){
    var url=this._defaultRoute.DropdownService+'gradeDropdown';
    return this._httpClient.get<SelectDropdown[]>(url)
  }
  public getDepartmentDropdownList(){
    var url=this._defaultRoute.DropdownService+'departmentDropdown';
    return this._httpClient.get<SelectDropdown[]>(url)
  }
  public getEducationLevelDropdownList(){
    var url=this._defaultRoute.DropdownService+'educationLevelDropdown';
    return this._httpClient.get<SelectDropdown[]>(url)
  }
  public getSalaryItemDropdownList(){
    var url=this._defaultRoute.DropdownService+'salaryItemDropdown';
    return this._httpClient.get<SelectDropdown[]>(url)
  }
  public getOccupationDropdownList(){
    var url=this._defaultRoute.DropdownService+'occupationDropdown';
    return this._httpClient.get<SelectDropdown[]>(url)
  }
  public getItemNameDropdownList(){
    var url=this._defaultRoute.DropdownService+'itemNames';
    return this._httpClient.get<SelectDropdown[]>(url)
  }
}
