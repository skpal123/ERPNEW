import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers } from '@angular/http';
import { DefaultRouteService } from '../common/default-route.service';
import { HttpService } from '../common/http.service';
import { SessionService } from '../common/session.service';
import { ChartOfaccount } from '../../models/master-settings/account-defination/chart-of-account.model';
import { Subledger } from '../../models/master-settings/account-defination/subledger.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountOpeningView } from '../../models/master-settings/account-defination/account-opening-view.model';
import { AccountDetails } from '../../models/master-settings/account-defination/account-details.model';
import { ChartOfAccountTree } from '../../models/master-settings/account-defination/chart-of-account-tree.model';

@Injectable({
  providedIn: 'root'
})
export class AccountDefinationService {

  constructor(private _httpClient:HttpClient,
    private _defaultRoute:DefaultRouteService
  ) 
    { }
  public getChartOfAccountListForTree(){
    var url=this._defaultRoute.FinanceService+'getChartOfAccountList/';
    return this._httpClient.get<AccountDetails>(url)
  }
  public CreateChartOfAccount(account:ChartOfaccount){
    var url=this._defaultRoute.FinanceService+'createChartOfAccount';
    return this._httpClient.post<ChartOfAccountTree>(url,account)
  }
  public UpdateChartOfAccount(account:ChartOfaccount){
    var url=this._defaultRoute.FinanceService+'createChartOfAccount/'+account.Id;
    return this._httpClient.post<ChartOfAccountTree>(url,account)
  }
  public getMaxAccidByGroupIdAndLevelId(groupId:number,levelId:number){
    var url=this._defaultRoute.FinanceService+'getMaxAccid/'+levelId+"/"+groupId;
    return this._httpClient.get<number>(url)
  }
  public getAccountListForAccountOpening(){
    var url=this._defaultRoute.FinanceService+'getAccountListForopening';
    return this._httpClient.get<AccountOpeningView[]>(url)
  }
  public AddSubleder(subledger:Subledger){
    var url=this._defaultRoute.FinanceService+'addSubledger';
    return this._httpClient.post<Subledger>(url,subledger)
  }
  public UpdateSubleder(Id:string,subledger:Subledger){
    var url=this._defaultRoute.FinanceService+'addSubledger/'+Id;
    return this._httpClient.put<boolean>(url,subledger)
  }
  public GetSublederList(Id:string){
    var url=this._defaultRoute.FinanceService+'getSubledgerList/'+Id;
    return this._httpClient.get<Subledger[]>(url)
  }
  public GetSublederById(Id:string){
    var url=this._defaultRoute.FinanceService+'getSubledgerById/'+Id;
    return this._httpClient.get<Subledger>(url)
  }
  public DeleteGetSublederById(Id:string){
    var url=this._defaultRoute.FinanceService+'deleteSubledger/'+Id;
    return this._httpClient.get<boolean>(url)
  }
}
