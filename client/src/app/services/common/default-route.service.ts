import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DefaultRouteService {
  constructor() { }
  securityService:string="http://localhost:1849//api/SecurityService/";
  administrationService:string="http://localhost:1849//api/AdministrationService/";
  InventoryService:string="http://localhost:1849//api/InventoryService/";
  DropdownService:string="http://localhost:1849//api/DropdownService/";
  FinanceService:string="http://localhost:1849//api/FinanceService/";
  CommonService:string="http://localhost:1849//api/CommonService/";
  hrPayrollService:string="http://localhost:1849//api/HrPayrollService/";
  convertDate(date:Date):string{
    let month=date.getMonth()+1;
    let day=date.getDate();
    let year=date.getFullYear();
    let convertedDate=year+'d'+month+'d'+day;
    return convertedDate;
  }
}
