import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers, RequestMethod } from '@angular/http';
import {Observable,throwError,Subject} from 'rxjs'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { SessionService } from './session.service';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  UserInfo:any;
  constructor(private _http:Http,private _sessionService:SessionService) { }
  setCustomHeader(header:Headers){
   
    header.append('Content-Type', 'application/json');
    header.append('sessionId', this._sessionService.SessionId);
    header.append("UserId",this._sessionService.User_Id);
  }
  get(url:string){
    let header=new Headers();
    header.append("ActionName","get");
    this.setCustomHeader(header)
    var reqOption=new RequestOptions({headers:header,method:RequestMethod.Get});
    return this._http.get(url,reqOption);
  }
  post(url:string,Body:any){
    let header=new Headers();
    this.setCustomHeader(header)
    var reqOption=new RequestOptions({headers:header,method:RequestMethod.Post});
    return this._http.post(url,reqOption,Body);
  }
  delete(url:string){  
    let header=new Headers();
    this.setCustomHeader(header)
    header.append("ActionName","delete");
    var reqOption=new RequestOptions({headers:header,method:RequestMethod.Delete});
    return this._http.delete(url,reqOption);
  }
  put(url:string){
    let header=new Headers();
    this.setCustomHeader(header)
    header.append("ActionName","put");
    var reqOption=new RequestOptions({headers:header,method:RequestMethod.Put});
    return this._http.delete(url,reqOption);
  }
}
