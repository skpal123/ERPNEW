import { Component, OnInit, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { Tree } from '../../../models/common/tree.model';
import { Role } from '../../../models/admin/role.model';
import { SecurityService } from '../../../services/admin/security.service';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RolePermission } from '../../../models/admin/role-permission.model';
import { RolePermissionData } from '../../../models/admin/role-permission-data.model';
import { RolePermissionDataInfo } from '../../../models/admin/role-permissionlist.model';
import { BlockUI,NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-add-role-permission',
  templateUrl: './add-role-permission.component.html',
  styleUrls: ['./add-role-permission.component.css']
})
export class AddRolePermissionComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  isFound:boolean=false;
  role:Role={
    Status:true
  }
  rolePermissionDataInfo:RolePermissionDataInfo={
    roleInfo:null,
    RolePermissionList:null
  }
  //tree:Tree[]=[];
  rolePermissions:RolePermission[]=[]
  constructor(private _securityService:SecurityService,private _alertBox:AlertBoxService,
  public dialogRef:MatDialogRef<AddRolePermissionComponent>,
  @Inject(MAT_DIALOG_DATA) public rolePermissionData: RolePermissionData) { }

  ngOnInit() {
    debugger
  }
  showCategory(id:number){
   var position= this.rolePermissionData.tree.findIndex(fea=>fea.Id==id.toString());
   if(this.rolePermissionData.tree[position].IsClicked){
    this.rolePermissionData.tree[position].IsClicked=false;
    this.rolePermissionData.tree[position].Children.forEach((a,b,array)=>{
      a.Status=true
    })
   }
   else{
    this.rolePermissionData.tree[position].IsClicked=true;
    this.rolePermissionData.tree[position].Children.forEach((a,b,array)=>{
      a.Status=false
    })
   }
   
  }
  showSubCategory(id:number){
    this.isFound=false;
      this.rolePermissionData.tree.forEach((subcategory,index,array)=>{
        if(!this.isFound){
          var position= subcategory.Children.findIndex(fea=>fea.Id==id.toString());
          if(position!=-1){
            this.isFound=true;
            if(subcategory.Children[position].IsClicked){
              subcategory.Children[position].IsClicked=false;
              for(var i=0;i<subcategory.Children[position].Children.length;i++){
                subcategory.Children[position].Children[i].Status=true;
              }            
             }
             else{
              subcategory.Children[position].IsClicked=true;
              for(var i=0;i<subcategory.Children[position].Children.length;i++){
                subcategory.Children[position].Children[i].Status=false;
              }
             }
          }
        }
      })
   
  }
  showSubItem(id:number){
    this.isFound=false;
      this.rolePermissionData.tree.forEach((subcategory,index,array)=>{
        subcategory.Children.forEach((treeitem,index,array)=>{
          if(!this.isFound){
            var position= treeitem.Children.findIndex(fea=>fea.Id==id.toString());
            if(position!=-1){
              this.isFound=true;
              if(treeitem.Children[position].IsClicked){
                treeitem.Children[position].IsClicked=false;
                for(var i=0;i<treeitem.Children[position].Children.length;i++){
                  treeitem.Children[position].Children[i].Status=true;
                }               
               }
               else{
                treeitem.Children[position].IsClicked=true;
                for(var i=0;i<treeitem.Children[position].Children.length;i++){
                  treeitem.Children[position].Children[i].Status=false;
                }
               }
            }
          }
        })
      }) 
  }
  checkChildNode(node:Tree,$event){
    if(!node.IsLeaf){
      if(node.Level==1){
        this.checkedAllCategoryNode(node,$event.currentTarget.checked);
      }
      else if(node.Level==2){
        this.checkedAllSubCategoryNode(node,$event.currentTarget.checked)
      }
      else if(node.Level==3){
        this.checkedAllSubItem(node,$event.currentTarget.checked);
      }
    }
    else{
      this.checkedLeafNode(node,$event.currentTarget.checked)
    }
  }
  checkedAllCategoryNode(node:Tree,IsChecked:boolean){
    let possition=this.rolePermissionData.tree.findIndex(fea=>fea.Id==node.Id);
    if(this.rolePermissionData.tree[possition].Children.length>0){
      this.rolePermissionData.tree[possition].Children.forEach((category,index,array)=>{
        category.Checked=IsChecked;
        category.Status=IsChecked
        category.Children.forEach((ca,index,array)=>{
          ca.Checked=IsChecked;
          ca.Status=IsChecked;
          if(ca.Children.length>0){
            ca.Children.forEach((sca,index,array2)=>{
              sca.Checked=IsChecked;
              sca.Status=IsChecked;
            })
          }
        })
      });
    }
  }
  checkedAllSubCategoryNode(node:Tree,IsChecked:boolean){
    this.isFound=false;
      this.rolePermissionData.tree.forEach((subcategory,index,array)=>{
        if(!this.isFound){
          var position= subcategory.Children.findIndex(fea=>fea.Id==node.Id);
          if(position!=-1){
            this.isFound=true;
             subcategory.Children[position].Checked=true;
             if(subcategory.Children[position].Children.length>0){
               subcategory.Children[position].Children.forEach((sc,index,arry)=>{
                 sc.Checked=IsChecked;
                 if(sc.Children.length>0){
                   sc.Children.forEach((i,index,arry)=>{
                     i.Checked=IsChecked;
                   })
                 }
               })
             }   
          }          
        }
    })  
  }
  checkedAllSubItem(node:Tree,IsChecked:boolean){
    this.isFound=false;
      this.rolePermissionData.tree.forEach((subcategory,index,array)=>{
        subcategory.Children.forEach((treeitem,index,array)=>{
          if(!this.isFound){
            var position= treeitem.Children.findIndex(fea=>fea.Id==node.Id);
            if(position!=-1){
              this.isFound=true;
              treeitem.Children[position].Checked=IsChecked;
              if(treeitem.Children[position].Children.length>0){
                treeitem.Children[position].Children.forEach((n,index,array)=>{
                  n.Checked=IsChecked;
                })
              }                        
            }
          }
        })
      }) 
  }
  checkedLeafNode(node:Tree,IsChecked:boolean){
    this.isFound=false;
    this.rolePermissionData.tree.forEach((module,index,aarry)=>{
      module.Children.forEach((menu,index2,arry2)=>{
        menu.Children.forEach((submenu,index3,array3)=>{
          let position=submenu.Children.findIndex(p=>p.Id==node.Id);
          if(position!=-1){
            this.isFound=true;
            submenu.Children[position].Checked=IsChecked;
          }
        })
      })
    })
  }
  showItem(id:number){
  }
  selectedNode(item:any){
    console.log(item);
  }

onNoClick():void{
  this.dialogRef.close();
}
saveRolePermission(){
  this.rolePermissions=[];
  this.rolePermissionData.tree.forEach((t,index,array)=>{
    if(t.Children!=null&&t.Children.length>0){
      this.getRolePermissionList(t.Children)
    }
  });
  this.createRoleAndRolePermission();
}
getRolePermissionList(permissionTree:Tree[]){
  permissionTree.forEach((tt,index,array)=>{
    if(tt.Children!=null&&tt.Children.length>0){
      this.getRolePermissionList(tt.Children)
    }
    else{
      if(tt.Checked&&tt.IsLeaf){
        var rolePermission=new RolePermission();
        rolePermission.PermissionId=tt.Id
        rolePermission.RoleId=rolePermission.RoleId
        this.rolePermissions.push(rolePermission);
      }
    }
  })
}
createRoleAndRolePermission(){
  this.rolePermissionDataInfo.roleInfo=this.rolePermissionData.role;
  this.rolePermissionDataInfo.RolePermissionList=this.rolePermissions;
  this.blockUI.start("Loading ... Please wait");
  this._securityService.saveRolePermission(this.rolePermissionDataInfo).subscribe(response=>{
    this.blockUI.stop();
    let result=response
    if(result){
      var dialogData=new DialogData();
      dialogData.message="Role permission created successfully";
      this._alertBox.openDialog(dialogData);
    }
  },
    error=>{
      this.blockUI.stop();
      var dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
 }
}
