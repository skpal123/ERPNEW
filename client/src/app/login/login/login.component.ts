import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { LoginService } from '../../services/common/login.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DialogData } from '../../models/common/dialog-data.model';
import { AlertBoxService } from '../../shared/alert-box.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  Username:string=null;
  Password:string=null;
  NewPassword:string="";
  IpAddress:string="";
  constructor( private _router:Router,
    private _alertBox:AlertBoxService,
    private _loginService:LoginService) { }

  ngOnInit() {
  }
  login(){
    debugger
    this.blockUI.start("Loading,Please wait...")
    this._loginService.login(this.Username,this.Password,this.NewPassword,this.IpAddress).subscribe(response=>{
      this.blockUI.stop();
      var loggedData=response.json();
      sessionStorage.setItem('loggedData',JSON.stringify( response.json()));
     // sessionStorage.setItem('sessionId',)
      this._router.navigate(['login/postlogin']);  
    },error=>{
      this.blockUI.stop();
      var dialogData=new DialogData();
      dialogData.message=error.json().Message
      this._alertBox.openDialog(dialogData);
    })
   
  }
  postlogin(){
    this._router.navigate(['login/mainlayout']);
  }
}
