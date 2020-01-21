import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostLoginService } from '../../services/common/post-login.service';
import { Menu } from '../../models/admin/menu.model';
import { Module } from '../../models/admin/module.model';
import { SessionService } from '../../services/common/session.service';

@Component({
  selector: 'app-regular-operation-menu',
  templateUrl: './regular-operation-menu.component.html',
  styleUrls: ['./regular-operation-menu.component.css']
})
export class RegularOperationMenuComponent implements OnInit {
  menuAlreadyLoad:boolean=false;
  menus:Menu[]=[];
  modules:Module[]=[];
  ModuleSeqId:number;
  constructor(
    private _activateRoute:ActivatedRoute,
    private _postLoginService:PostLoginService,
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
     // this.getMenusByModule(id);
     //alert(this._sesionService.SelectedBranchId)
    }
    })
  }
  // getMenusByModule(moduleSeqId:string){
  //   this._postLoginService.getMenusSubMenus().subscribe(response=>{
  //     this.menus=response.json();
  //     this.menuAlreadyLoad=true;
  //   },error=>{
  //     var errorMessage=error.json();
  //     alert(errorMessage.Message);
  //   })
  // }

}