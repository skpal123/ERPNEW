import { Injectable } from "@angular/core";
import { HttpInterceptor,HttpRequest,HttpHandler, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { SessionService } from "../services/common/session.service";
import { retryWhen,delay,tap, catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable()
export class HttpGlobalInterceptor implements HttpInterceptor {
  UserInfo:any;
  constructor(private _sessionService:SessionService){}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    // this approch orginal header is replaced by new header
    // const authReq = req.clone({
    //   headers: new HttpHeaders({
    //     'sessionId': sessionStorage.getItem("sessionId"),
    //     'lang': lang!=null&& lang!=""?lang:'en',
    //     'UserId':JSON.parse(this.UserInfo)!=null?JSON.parse(this.UserInfo).Id:null,
    //     'ActionName':req.method,
    //     'AgentId':JSON.parse(this.UserInfo)!=null?JSON.parse(this.UserInfo).AgentId:null
    //   })
    // });
    const authReq = req.clone({
        headers: req.headers.set('sessionId',  this._sessionService!=null?this._sessionService.SessionId:null)
        .set('UserId',this._sessionService!=null?this._sessionService.User_Id:null)
        .set( 'ActionName',req.method)
      });
    // send cloned request with header to the next handler.
    return next.handle(authReq).pipe(
      retryWhen(errors =>{
      var retryCount=0;
      return errors.pipe(
        delay(1000),
        tap(errorStatus => {
          if (retryCount>2) {
            throw errorStatus;
          }
          else{
            retryCount++;
          }
        },)
      )
    }),catchError(this.handleError)
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
      var message=error.error.Message+" "+"in "+error.url;       
        return throwError(message)  
    }
    // return an observable with a user-facing error message
  };
}