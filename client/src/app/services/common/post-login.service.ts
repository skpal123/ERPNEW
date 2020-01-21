import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers } from '@angular/http';
import { DefaultRouteService } from './default-route.service';
import { HttpService } from './http.service';
import { SessionService } from './session.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserFormControl } from '../../models/common/user-form-control.model';
import { Module } from '../../models/admin/module.model';
import { Submenu } from '../../models/admin/submenu.model';
import { Menu } from '../../models/admin/menu.model';
@Injectable({
  providedIn: 'root'
})
export class PostLoginService {
  constructor(
    private _defaultRoute:DefaultRouteService,
    private _httpClient:HttpClient) 
    { }
  getMainMenus(){
    var url=this._defaultRoute.administrationService+'getMainModules/';
    return this._httpClient.get<Module[]>(url)
  }
  getMenusSubMenus(){
    var url=this._defaultRoute.administrationService+'getMainMenuSubMenu';
    return this._httpClient.get<Menu[]>(url)
  }
  geSubMenus(MenuSeqId:string){
    var url=this._defaultRoute.administrationService+'getSubMenusByMenuId/'+MenuSeqId;
    return this._httpClient.get<Submenu[]>(url)
  }
  public getUserFormControlByFormName(fromName:string){
    var url=this._defaultRoute.CommonService+'getFormControl/'+fromName;
    return this._httpClient.get<UserFormControl[]>(url)
  }
}
