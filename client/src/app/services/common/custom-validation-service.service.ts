import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { DefaultRouteService } from './default-route.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationServiceService {
  constructor(private _defaultRoute:DefaultRouteService,
  private _httpClient:HttpClient)
  {}
  private handleError(error: HttpErrorResponse) {    
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      return throwError(error.error.message) 
    } 
    else 
    {
      let message=error.error.Message;       
      return throwError(message+'<br/>'+error.message) 
    }
    // return an observable with a user-facing error message
  };
  public checkCategoryIdDuplicate(value:string){
    var url=this._defaultRoute.InventoryService+'categoryIdCheck/'+value;
    return this._httpClient.get<boolean>(url).pipe(
      catchError(this.handleError)
    )
  }
  public checkSubCategoryIdDuplicate(value:string){
    var url=this._defaultRoute.InventoryService+'subcategoryIdCheck/'+value;
    return this._httpClient.get<boolean>(url).pipe(
      catchError(this.handleError)
    )
  }
  public checkItemIdDuplicate(value:string){
    var url=this._defaultRoute.InventoryService+'itemIdCheck/'+value;
    return this._httpClient.get<boolean>(url).pipe(
      catchError(this.handleError)
    )
  }
  public checkItemCodeDuplicate(value:string){
    var url=this._defaultRoute.InventoryService+'itemCodeCheck/'+value;
    return this._httpClient.get<boolean>(url).pipe(
      catchError(this.handleError)
    )
  }
  public checkSupplierIdDuplicate(value:string){
    var url=this._defaultRoute.InventoryService+'supplierIdCheck/'+value;
    return this._httpClient.get<boolean>(url).pipe(
      catchError(this.handleError)
    )
  }
  public checkCustomerDuplicate(value:string){
    var url=this._defaultRoute.InventoryService+'customerIdCheck/'+value;
    return this._httpClient.get<boolean>(url).pipe(
      catchError(this.handleError)
    )
  }
  public checkmanufactureDuplicate(value:string){
    var url=this._defaultRoute.InventoryService+'manufactureIdCheck';
    return this._httpClient.get<boolean>(url).pipe(
      catchError(this.handleError)
    )
  }
  public checkLocationDuplicate(value:string){
    var url=this._defaultRoute.InventoryService+'locationIdCheck/'+value;
    return this._httpClient.get<boolean>(url).pipe(
      catchError(this.handleError)
    )
  }
  public checkEmailDuplicate(value:string){
    var url=this._defaultRoute.InventoryService+'emailCheck/'+value;
    return this._httpClient.get<boolean>(url).pipe(
      catchError(this.handleError)
    )
  }
}
