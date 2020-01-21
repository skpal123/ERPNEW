import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/common/session.service';
import { Module } from '../../models/admin/module.model';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  modules:Module[]=[];
  constructor(private _sessionService:SessionService) { }

  ngOnInit() {
    this.modules=this._sessionService.Modules;
  }

}
