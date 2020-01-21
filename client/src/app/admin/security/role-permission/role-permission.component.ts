import { Component, OnInit } from '@angular/core';
import { Tree } from '../../../models/common/tree.model';
import { SecurityService } from '../../../services/admin/security.service';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { Role } from '../../../models/admin/role.model';
import { RoleControl } from '../../../models/admin/role-control.model';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { MatDialog } from '@angular/material';
import { AddRolePermissionComponent } from '../add-role-permission/add-role-permission.component';
import { RolePermissionData } from '../../../models/admin/role-permission-data.model';
import { PostLoginService } from '../../../services/common/post-login.service';
import { BlockUI,NgBlockUI } from 'ng-block-ui';
import { CustomDatatableService } from '../../../services/common/custom-datatable.service';
@Component({
  selector: 'app-role-permission',
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.css']
})
export class RolePermissionComponent implements OnInit {
  reload:boolean=false;
  columnReady:boolean=false;
  dataReady:boolean=false;
  @BlockUI() blockUI: NgBlockUI;
  dtTrigger: Subject<any> = new Subject();
  isFound:boolean=false;
  p:Tree[]=[]
  roleList:Role[]=[];
  roleControlList:RoleControl[]=[];
  roleControlViewList:any[][]=[];
  tree:Tree[]=[];
  DataList:any[]=[];
  ColumnList:any[]=[];
  rolePermissionData:RolePermissionData={
    tree:null,
    role:{
      Id:null,RoleName:null,Description:null,Status:true
    }
  }
  newRolePermissionTree:Tree[]=[]
  constructor(private _securityService:SecurityService,
    private _alertBox:AlertBoxService,
    private _postLoginService:PostLoginService,
    private _customDatatableService:CustomDatatableService,
  private dialog:MatDialog) { }
  ngOnInit() {
    debugger  
    this.getRoleList();
    this.getRoleControlList();
  }
getRoleList(){
  this.blockUI.start("Loading ... Please wait");
  this._securityService.getRoleList().subscribe((response:Role[])=>{
    this.blockUI.stop();
    this.roleList=response
    this.DataList=this.roleList;
    this.reload=true;
    this.dataReady=true;
    this._customDatatableService.DataList=this.roleList;
    this.getRolePermissons();
  },error=>{
    this.blockUI.stop();
    var data=new DialogData();
    data.message=error
    this._alertBox.openDialog(data);
  })
}
getRoleControlList(){
  this.blockUI.start("Loading ... Please wait");
  this._postLoginService.getUserFormControlByFormName('role-permission').subscribe(response=>{
    this.blockUI.stop();
    this.roleControlList=response;
    this.ColumnList=this.roleControlList;
    this.columnReady=true;
    this._customDatatableService.ColumnList=this.roleControlList;
  },error=>{
    this.blockUI.stop();
    var data=new DialogData();
    data.message=error
    this._alertBox.openDialog(data);
  })
}
getRolePermissonsById(roleId:string){
  this.blockUI.start("Loading ... Please wait");
  this._securityService.getRolePermissionsRoleById(roleId).subscribe((response:Tree[])=>{
    this.blockUI.stop();
    this.tree=response
    console.log(this.tree);
  },error=>{
    this.blockUI.stop();
    var data=new DialogData();
    data.message=error
    this._alertBox.openDialog(data);
  })
}
getRolePermissons(){
  this.blockUI.stop();
  this.blockUI.start("Loading ... Please wait");
  this._securityService.getAllRolePermissions().subscribe((response:Tree[])=>{
    this.blockUI.stop();
    this.newRolePermissionTree=response
    console.log(this.tree);
  },error=>{
    this.blockUI.stop();
    var data=new DialogData();
    data.message=error
    this._alertBox.openDialog(data);
  })
}
createNewRolePermission(){
 this.rolePermissionData.tree=this.newRolePermissionTree;
 this.rolePermissionData.role.Description=null;
 this.rolePermissionData.role.Id=null;
 this.rolePermissionData.role.RoleName=null;
 this.rolePermissionData.role.Status=true;
 const dialogRef=this.dialog.open(AddRolePermissionComponent,{
    maxHeight:'600px',
    width:'500px',
    maxWidth:'500px',
    disableClose:true,
    data:this.rolePermissionData
  });
  dialogRef.afterClosed().subscribe(response=>{
  })
}

deleteRole($event:string){
  alert($event)
}
getRolePermissionDetailsById($event:Role){
  this.blockUI.start("Loading ... Please wait");
  this._securityService.getRolePermissionsRoleById($event.Id).subscribe((response:Tree[])=>{
    this.blockUI.stop();
    this.tree=response
    let index=this.roleList.findIndex(role=>role.Id==$event.Id);
    let role=this.roleList[index];
    this.rolePermissionData.tree=this.tree
    this.rolePermissionData.role=role
    const dialogRef=this.dialog.open(AddRolePermissionComponent,{
      maxHeight:'700px',
      width:'700px',
      maxWidth:'800px',
      disableClose:true,
      data: this.rolePermissionData
    });
    dialogRef.afterClosed().subscribe(response=>{
      alert('test'+response);
    })
  },error=>{
    this.blockUI.stop();
    var data=new DialogData();
    data.message=error
    this._alertBox.openDialog(data);
  })
}
}
