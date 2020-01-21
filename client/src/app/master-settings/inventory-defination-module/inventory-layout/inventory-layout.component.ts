import { Component, OnInit } from '@angular/core';
import { Submenu } from '../../../models/admin/submenu.model';
import { Menu } from '../../../models/admin/menu.model';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../../../services/common/session.service';

@Component({
  selector: 'app-inventory-layout',
  templateUrl: './inventory-layout.component.html',
  styleUrls: ['./inventory-layout.component.css']
})
export class InventoryLayoutComponent implements OnInit {
  submenus:Submenu[]=[];
  menus:Menu[]=[];
  constructor(
    private _activateRoute:ActivatedRoute,
    private _sessionService:SessionService) { }

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

}
