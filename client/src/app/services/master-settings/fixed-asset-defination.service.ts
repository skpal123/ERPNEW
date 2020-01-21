import { Injectable } from '@angular/core';
import { Http, RequestOptions ,Headers} from '@angular/http';
import { DefaultRouteService } from '../common/default-route.service';
import { HttpService } from '../common/http.service';

@Injectable({
  providedIn: 'root'
})
export class FixedAssetDefinationService {

  constructor(private _http:Http,
    private _defaultRoute:DefaultRouteService,
    private _httpService:HttpService) 
    { }
  setCustomHeader(header:Headers){
      header.append('Content-Type', 'application/json');
      header.append('sessionId', sessionStorage.getItem("sessionId"));
    }
  public getChartOfAccountListForTree(){
    var url=this._defaultRoute.FinanceService+'getChartOfAccountList/';
    const headers = new Headers();
    headers.append('ActionName', 'get');
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
}
