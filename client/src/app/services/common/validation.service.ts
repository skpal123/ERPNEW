import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpRequest, HttpErrorResponse} from '@angular/common/http'
import { Http } from '@angular/http';
import { DefaultRouteService } from './default-route.service';
import { SessionService } from './session.service';
import { FormInfo } from '../../models/common/formInfo.model';
import { UrlResolver } from '@angular/compiler';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserFormControl } from '../../models/common/user-form-control.model';
@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(
    private _defaultRoute:DefaultRouteService,
    private _httpClient:HttpClient,
    ) 
    { }
    public getFormInfoList(formName:string){
      var url=this._defaultRoute.CommonService+'getFormInfo/'+formName;
      return this._httpClient.get(url)
    }
    public saveFormInfoList(formInfoList:FormInfo[]){
      var url=this._defaultRoute.CommonService+'formInfo/'+formInfoList[0].FormName;
      return this._httpClient.put(url,formInfoList)
    }
    public getMaufactureValidationData(){
      var url=this._defaultRoute.CommonService+'manufactureValidation';
      return this._httpClient.get(url)
    }
    public getItemValidationData(){
      var url=this._defaultRoute.CommonService+'itemValidation';
      return this._httpClient.get(url)
    }
    public getItemPurchaseValidationData(formName:string){
      var url=this._defaultRoute.CommonService+'itemPurchaseSalesValidation/'+formName;
      return this._httpClient.get(url)
    }
    public getCategoryValidationData(){
      var url=this._defaultRoute.CommonService+'categoryValidation';
      return this._httpClient.get(url)
    }
    public getSubCategoryValidationData(){
      var url=this._defaultRoute.CommonService+'subcategoryValidation';
      return this._httpClient.get(url)
    }
    public getCustomerValidationData(){
      var url=this._defaultRoute.CommonService+'customerValidation';
      return this._httpClient.get(url)
    }
    public getSupplierValidationData(){
      var url=this._defaultRoute.CommonService+'supplierValidation';
      return this._httpClient.get(url)
    }
    public getUnitValidationData(){
      var url=this._defaultRoute.CommonService+'unitValidation';
      return this._httpClient.get(url)
    }
    public getCustomerTransactionValidationData(){
      var url=this._defaultRoute.CommonService+'customerTransactionValidation';
      return this._httpClient.get(url)
    }
    public getLocationValidationData(){
      var url=this._defaultRoute.CommonService+'locationValidation';
      return this._httpClient.get(url)
    }
    public getDesignationValidationData(){
      var url=this._defaultRoute.CommonService+'designationValidation';
      return this._httpClient.get(url)
    }
    public getGradeValidationData(){
      var url=this._defaultRoute.CommonService+'gradeValidation';
      return this._httpClient.get(url)
    }
    public getSubGradeValidationData(){
      var url=this._defaultRoute.CommonService+'subGradeValidation';
      return this._httpClient.get(url)
    }
    public getSalaryItemValidationData(){
      var url=this._defaultRoute.CommonService+'salaryItemValidation';
      return this._httpClient.get(url)
    }
    public getDepartmentValidationData(){
      var url=this._defaultRoute.CommonService+'departmentValidation';
      return this._httpClient.get(url)
    }
    public getOccupationValidationData(){
      var url=this._defaultRoute.CommonService+'occupationValidation';
      return this._httpClient.get(url)
    }
    public getLeaveTypeValidationData(){
      var url=this._defaultRoute.CommonService+'leaveTypeValidation';
      return this._httpClient.get(url)
    }
    public getEducationLevelValidationData(){
      var url=this._defaultRoute.CommonService+'educationLevelValidation';
      return this._httpClient.get(url)
    }
    public getSubledgerValidationData(){
      var url=this._defaultRoute.CommonService+'subledgerValidation';
      return this._httpClient.get(url)
    }
    public getOfferValidationData(){
      var url=this._defaultRoute.CommonService+'offerValidation';
      return this._httpClient.get(url)
    }
}
