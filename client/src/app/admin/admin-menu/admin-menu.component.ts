import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu } from '../../models/admin/menu.model';
import { PostLoginService } from '../../services/common/post-login.service';
import { NavigationDataProiderService } from '../../shared/navigation-data-proider.service';
import { SessionService } from '../../services/common/session.service';
import { Module } from '../../models/admin/module.model';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit,OnDestroy {
  menuAlreadyLoad:boolean=false
  menus:Menu[]=[];
  modules:Module[]=[];
  module:Module;
  ModuleSeqId:number;
  // menus=[
  //   {Id:1,Name:"Security",RouterPath:"/login/mainlayout/admin/1/security",MouduleId:1},
  //   {Id:2,Name:"Support",RouterPath:"/login/mainlayout/admin/1/support",MouduleId:1},
  //   {Id:3,Name:"Tool",RouterPath:"/login/mainlayout/admin/1/tool",MouduleId:1},
  //   {Id:4,Name:"Sub admin",RouterPath:"/login/mainlayout/1/admin/report",MouduleId:1},
  // ]
  constructor(private _activateRoute:ActivatedRoute,
    private _postLoginService:PostLoginService,
    private _navigaionDataProvider:NavigationDataProiderService,
    private _sesionService:SessionService) { }

  ngOnInit() {
    debugger
    this.modules=this._sesionService.Modules;
    this._activateRoute.paramMap.subscribe(param=>{
     var id= param.get("id");
     if(id==null){
       this.ModuleSeqId=Number(id);
      this.menus=this.modules[0].Menus
     }
     else{
      let index=this.modules.findIndex((m,index,array)=>m.SequenceId==Number(id))
      this.menus=this.modules[index].Menus
      this._navigaionDataProvider.data=this.ModuleSeqId;
      // this.getMenusByModule(id);
      //alert(this._sesionService.SelectedBranchId)
     }
    })
  }
  getMenusByModule(moduleSeqId:string){
    this._postLoginService.getMenusSubMenus().subscribe(response=>{
      this.menus=response
      this.menuAlreadyLoad=true;
    },error=>{
      var errorMessage=error
      alert(errorMessage.Message);
    })
  }
  ngOnDestroy(){
    this._navigaionDataProvider.data=this.ModuleSeqId;
  }

}
