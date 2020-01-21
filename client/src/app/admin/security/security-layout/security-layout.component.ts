import { Component, OnInit } from '@angular/core';
import { Submenu } from '../../../models/admin/submenu.model';
import { ActivatedRoute } from '@angular/router';
import { PostLoginService } from '../../../services/common/post-login.service';
import { Module } from '../../../models/admin/module.model';
import { Menu } from '../../../models/admin/menu.model';
import { SessionService } from '../../../services/common/session.service';
import { NavigationDataProiderService } from '../../../shared/navigation-data-proider.service';

@Component({
  selector: 'app-security-layout',
  templateUrl: './security-layout.component.html',
  styleUrls: ['./security-layout.component.css']
})
export class SecurityLayoutComponent implements OnInit {
  module:Module;
  menu:Menu;
  menus:Menu[]=[];
  submenus:Submenu[]=[];
  constructor(private _postLoginService:PostLoginService,
    private _activateRoute:ActivatedRoute,
    private _sessionService:SessionService,
    private _navigationData:NavigationDataProiderService) { }
  ngOnInit() {
    debugger
    this._activateRoute.paramMap.subscribe(param=>{
      var id=param.get('id');
      if(id==null){
      }
      else{
        let index=this._sessionService.Modules.findIndex(m=>m.SequenceId==Number(id));
        if(index==-1){
          let index=this._sessionService.Menus.findIndex(m=>m.MenuSqenceId==Number(id));
          this.submenus=this._sessionService.Menus[index].SubMenus;
        }else{
          this.menus=this._sessionService.Modules[index].Menus
          this.submenus=this.menus[1].SubMenus;
        }
      }
      //this.getSubmnenuByMenuSeqId(id);
    })
  }
  // getSubmnenuByMenuSeqId(MenuSeqId:string){
  //   this._postLoginService.geSubMenus(MenuSeqId).subscribe(response=>{
  //     this.submenus=response.json();
  //   },error=>{
  //     var errorMessage=error.json();
  //     alert(errorMessage.Message);
  //   })
  // }

}
