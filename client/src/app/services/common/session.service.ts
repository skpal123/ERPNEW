import { Injectable } from '@angular/core';
import { Module } from '../../models/admin/module.model';
import { Menu } from '../../models/admin/menu.model';
import { Submenu } from '../../models/admin/submenu.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  UserSession:any;
  SelectedBranchId:string;
  BranchCurrentDate:Date;
  Userlevel:number;
  User_level:string;
  User_Id:string;
  Approver_Id:string;
  IsApprover:boolean;
  Checker_Id:string;
  IsChecker:string;
  Creator_Id:string;
  IsCreater:string;
  BranchList:any;
  ItemName:string;
  SessionId:string;
  Modules:Module[]=[];
  Menus:Menu[]=[];
  SubMenus:Submenu[]=[];
  constructor() {
    debugger
    this.UserSession=JSON.parse(sessionStorage.getItem('loggedData'));
    this.BranchList=this.UserSession?this.UserSession.BranchInfos:null;
    var users=this.UserSession?this.UserSession.UserInfo:null;
    this.Userlevel=users?users.UserLevel:null;
    this.User_level=users?users.UserLevelId:null;
    this.SessionId=this.UserSession.SessionId;
    this.BranchCurrentDate=new Date(sessionStorage.getItem('currentDate'));
    this.SelectedBranchId=sessionStorage.getItem('selectedBranchId');
    this.Modules=this.UserSession.Modules;
    this.Menus=this.UserSession.Menus
    this.User_Id=users?users.Id:null
    this.SubMenus=this.UserSession.SubMenus;
   }
  
}
