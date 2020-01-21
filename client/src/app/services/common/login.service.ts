import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers } from '@angular/http';
import { DefaultRouteService } from './default-route.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})    
export class LoginService {  

  constructor(private _http:Http,
    private _defaultRoute:DefaultRouteService,
    ) { }
  login(UserName:string,Password:string,NewPassword:string,IpAddress:string){
    var url=this._defaultRoute.securityService+'login/'+UserName+'/'+Password;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('ActionName', 'get');
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
  
}
