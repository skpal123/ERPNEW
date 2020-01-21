import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers } from '@angular/http';
import { DefaultRouteService } from '../common/default-route.service';
import { HttpService } from '../common/http.service';
import { RolePermissionDataInfo } from '../../models/admin/role-permissionlist.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private _http:Http,
    private _defaultRoute:DefaultRouteService,
    private _httpClient:HttpClient) { }
   
  getRolePermissionsRoleById(roleId:string){
    var url=this._defaultRoute.administrationService+'getRolePermissionsByRoleId/'+roleId;
    return this._httpClient.get(url)
  }
  getAllRolePermissions(){
    var url=this._defaultRoute.administrationService+'getRolePermissions';
    return this._httpClient.get(url)
  }
  getMenusSubMenus(){
    var url=this._defaultRoute.administrationService+'getMainMenuSubMenu';
    return this._httpClient.get(url)
  }
  geSubMenus(MenuSeqId:string){
    var url=this._defaultRoute.administrationService+'getSubMenusByMenuId/'+MenuSeqId;
    return this._httpClient.get(url)
  }
  getRoleList(){
    var url=this._defaultRoute.administrationService+'getRules/';
    return this._httpClient.get(url)
  }
  getRoleControlList(formName:string){
    var url=this._defaultRoute.administrationService+'getRuleControl/'+formName;
    return this._httpClient.get(url)
  }
  saveRolePermission(rolePermissions:RolePermissionDataInfo){
    var url=this._defaultRoute.administrationService+'saveRolePermission';
    return this._httpClient.post(url,rolePermissions)
  }
}
