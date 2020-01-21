import { Injectable } from '@angular/core';
import { DefaultRouteService } from '../common/default-route.service';
import { HttpService } from '../common/http.service';
import { SessionService } from '../common/session.service';
import { Http, RequestOptions,Headers } from '@angular/http';
import { Voucher } from '../../models/regular-operation/finance/voucher.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ChartOfaccount } from '../../models/master-settings/account-defination/chart-of-account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private _httpClient:HttpClient,
    private _defaultRoute:DefaultRouteService,
  ) 
    { }
  public getVoucherList(){
    var url=this._defaultRoute.FinanceService+'getvoucherList';
    return this._httpClient.get<Voucher[]>(url).pipe(
      catchError(this.handleError)
    )
  }
  public getVoucherDetailsById(id:string){
    var url=this._defaultRoute.FinanceService+'getVoucheryid/'+id;
    return this._httpClient.get<Voucher>(url).pipe(
      catchError(this.handleError)
    )
  }
  // public UpdateChartOfAccount(account:ChartOfaccount){
  //   var url=this._defaultRoute.FinanceService+'createChartOfAccount/'+account.Id;
  //   let headers =  this.setCustomHeader();
  //   headers.append('ActionName', 'PUT');  
  //   const options = new RequestOptions({ headers: headers });
  //   return this._httpClient.post(url,account,options);
  // }
  public getChildAccountList(){
    var url=this._defaultRoute.FinanceService+'getChildAccount';
    return this._httpClient.get<ChartOfaccount[]>(url).pipe(
      catchError(this.handleError)
    )
  }
  public CreateVoucher(voucher:Voucher){
    var url=this._defaultRoute.FinanceService+'createVoucher';
    return this._httpClient.post<boolean>(url,voucher).pipe(
      catchError(this.handleError)
    )
  }
  public UpdateVoucher(voucher:Voucher){
    var url=this._defaultRoute.FinanceService+'updateVoucher/'+voucher.Id;
    return this._httpClient.put<boolean>(url,voucher).pipe(
      catchError(this.handleError)
    )
  }
  public deleteVoucher(Id:string){
    var url=this._defaultRoute.FinanceService+'deleteVoucher/'+Id;
    return this._httpClient.delete<boolean>(url).pipe(
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
