import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/common/session.service';
import { PostLoginService } from '../../services/common/post-login.service';
import { AlertBoxService } from '../../shared/alert-box.service';
import { DialogData } from '../../models/common/dialog-data.model';
@Component({
  selector: 'app-postlogin',
  templateUrl: './postlogin.component.html',
  styleUrls: ['./postlogin.component.css']
})
export class PostloginComponent implements OnInit {
  constructor(private _router:Router,
    private _sessionService:SessionService,
    private _postLoginService:PostLoginService,
  private _alertBox:AlertBoxService){}
  UserSession:any
  BranchList:any;
  ngOnInit() {
    this.BranchList=this._sessionService.BranchList;
  }  
  loadModules(Id:string){
     this._router.navigate(['login/mainlayout']);
  }
  loadEcommerceAdminPanel(){
    this._router.navigate(['ecommerce/mainlayout']);
  }
}

