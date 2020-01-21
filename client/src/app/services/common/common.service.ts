import { Injectable } from '@angular/core';
import { DefaultRouteService } from './default-route.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserFormControl } from '../../models/common/user-form-control.model';
import { DuplicateCheck } from '../../models/common/duplicate-check.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(
    private _defaultRoute:DefaultRouteService,
    private _httpClient:HttpClient) 
    { }
    private handleError(error: HttpErrorResponse) {
      debugger

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
  public GetAutoCodeByProductName(productName:string){
    var url=this._defaultRoute.CommonService+'getAutoCode/'+productName;
    return this._httpClient.get<string>(url).pipe(
      catchError(this.handleError)
    )
  }
  public resetLastNumberCodeFormaterByProductName(productName:string){
    var url=this._defaultRoute.CommonService+'resetCode/'+productName;
    return this._httpClient.get<string>(url).pipe(
      catchError(this.handleError)
    )
  }
  public saveColumnInfoList(columnInfolist:UserFormControl[]){
    var url=this._defaultRoute.CommonService+'saveColumnInfo/'+columnInfolist[0].FormName;
    return this._httpClient.put(url,columnInfolist).pipe(
      catchError(this.handleError)
    )
  }
  public getUserFormControlByFormName(fromName:string){
    var url=this._defaultRoute.CommonService+'getFormControl/'+fromName;
    return this._httpClient.get<UserFormControl[]>(url).pipe(
      catchError(this.handleError)
    )
  }
  public getDuplicateById(duplicateCheck:DuplicateCheck){
    var url=this._defaultRoute.CommonService+'duplicateCheck';
    return this._httpClient.post(url,duplicateCheck).pipe(
      catchError(this.handleError)
    )
  }
}
