import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DefaultRouteService } from '../common/default-route.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CodeFormater } from '../../models/admin/code-formater.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralSettingsService {
  constructor(private _httpClient:HttpClient,
    private _defaultRoute:DefaultRouteService
  ) 
    { }
    public getCodeFormaterList(){
      var url=this._defaultRoute.CommonService+'CodeFormaters';
      return this._httpClient.get<CodeFormater[]>(url).pipe(
        catchError(this.handleError)
      )
    }
    public getCodeFormaterById(Id:string){
      var url=this._defaultRoute.CommonService+'CodeFormater/'+Id;
      return this._httpClient.get<CodeFormater>(url).pipe(
        catchError(this.handleError)
      )
    }
    public SaveCodeFormater(codeFormater:CodeFormater){
      var url=this._defaultRoute.CommonService+'CodeFormater';
      return this._httpClient.post<CodeFormater>(url,codeFormater).pipe(
        catchError(this.handleError)
      )
    }
    public UpdateCodeFormater(codeFormater:CodeFormater){
      var url=this._defaultRoute.CommonService+'CodeFormater/'+codeFormater.Id;
      return this._httpClient.put<CodeFormater>(url,codeFormater).pipe(
        catchError(this.handleError)
      )
    }
    public DeleteCodeFormater(Id:string){
      var url=this._defaultRoute.CommonService+'CodeFormater/'+Id;
      return this._httpClient.delete<CodeFormater>(url).pipe(
        catchError(this.handleError)
      )
    }
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
}
