import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOfAccountTree } from '../../../models/master-settings/account-defination/chart-of-account-tree.model';
import { AccountDefinationService } from '../../../services/master-settings/account-defination.service';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { ChartOfaccount } from '../../../models/master-settings/account-defination/chart-of-account.model';
import { AccountDetails } from '../../../models/master-settings/account-defination/account-details.model';
import { Subledger } from '../../../models/master-settings/account-defination/subledger.model';
import { MatDialog } from '@angular/material';
import { AddSubledgerComponent } from '../add-subledger/add-subledger.component';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgForm } from '@angular/forms';
import { AddChartOfAccountComponent } from '../add-chart-of-account/add-chart-of-account.component';
import { NavigationDataService } from '../../../services/common/navigation-data.service';
@Component({
  selector: 'app-chart-of-account',
  templateUrl: './chart-of-account.component.html',
  styleUrls: ['./chart-of-account.component.css']
})
export class ChartOfAccountComponent implements OnInit {
  @ViewChild('accountForm') accountForm:NgForm
  @BlockUI() blockUI: NgBlockUI;
  accountClicked:boolean=false;
  chartOfAccountTreeList:ChartOfAccountTree[]=[];
  oldChartOfAccountTreeList:ChartOfAccountTree[]=[];
  selectedAccount:ChartOfAccountTree={
    Children:[]
  }
  savedAcoount:ChartOfAccountTree={
    Children:[]
  }
  accountDetails:AccountDetails;
  account:ChartOfaccount={AccountType:"0",};
  Status:string="add";
  isFound:boolean=false;
  constructor(private _accountDeninationService:AccountDefinationService,
    private _service:AccountDefinationService,
    private matDialog:MatDialog,
    private _navigationData:NavigationDataService,
  private _alertBoxService:AlertBoxService){}
  ngOnInit(){
    debugger
    this.getChartOfaccountTreeList();
  }
  getChartOfaccountTreeList(){
    this.blockUI.start("Loading,Please wait...")
    this._service.getChartOfAccountListForTree().subscribe(response=>{
      this.blockUI.stop();
      this.accountDetails=response
      this.chartOfAccountTreeList=this.accountDetails.AccountParentChildRelationInfoList;
    },error=>{
      this.blockUI.stop();
      var dialogData=new DialogData();
      dialogData.message=error;
      this._alertBoxService.openDialog(dialogData);
    })
  }
  collapseAllChildNode(node:ChartOfAccountTree){
    debugger
    this.isFound=false;
    var position= this.chartOfAccountTreeList.findIndex(fea=>fea.AccountId==node.AccountId);
    if(position!=-1){
      this.isFound=true;
      if(this.chartOfAccountTreeList[position].IsClicked){
        this.chartOfAccountTreeList[position].IsClicked=false;
        this.chartOfAccountTreeList[position].Children.forEach((a,b,array)=>{
          a.Status=false
        })
       }
       else{
        this.chartOfAccountTreeList[position].IsClicked=true;
        this.chartOfAccountTreeList[position].Children.forEach((a,b,array)=>{
          a.Status=true
        })
       }
    }
    else{
      this.chartOfAccountTreeList.forEach((chartOfAcc,index,array)=>{
        let position=chartOfAcc.Children.findIndex(fea=>fea.AccountId==node.AccountId);
        if(position!=-1){
          this.isFound=true;
          if(chartOfAcc.Children[position].IsClicked){
            chartOfAcc.Children[position].IsClicked=false;
            chartOfAcc.Children[position].Children.forEach((a,b,array)=>{
            a.Status=false
            if(a.Children!=null){
              this.changeStatus(a.Children,true);
            }
          })
        }
        else{
          chartOfAcc.Children[position].IsClicked=true;
          chartOfAcc.Children[position].Children.forEach((a,b,array)=>{
          a.Status=true
           if(a.Children!=null){
            this.changeStatus(a.Children,false);
           }
         })
        }
       }
       else{
          this.findChildPosition(chartOfAcc.Children,node)
       }
      })
    }
    this.oldChartOfAccountTreeList=JSON.parse(JSON.stringify(this.chartOfAccountTreeList));
  }
  expandAllChildNode(node:ChartOfAccountTree){
    this.isFound=false;
    var position= this.chartOfAccountTreeList.findIndex(fea=>fea.AccountId==node.AccountId);
    if(position!=-1){
      this.isFound=true;
      if(this.chartOfAccountTreeList[position].IsClicked){
        this.chartOfAccountTreeList[position].IsClicked=false;
        this.chartOfAccountTreeList[position].Children.forEach((a,b,array)=>{
          a.Status=false
        })
       }
       else{
        this.chartOfAccountTreeList[position].IsClicked=true;
        this.chartOfAccountTreeList[position].Children.forEach((a,b,array)=>{
          a.Status=true
        })
       }
    }
    else{
      this.chartOfAccountTreeList.forEach((chartOfAcc,index,array)=>{
        let position=chartOfAcc.Children.findIndex(fea=>fea.AccountId==node.AccountId);
        if(position!=-1){
          this.isFound=true;
          if(chartOfAcc.Children[position].IsClicked){
            chartOfAcc.Children[position].IsClicked=false;
            chartOfAcc.Children[position].Children.forEach((a,b,array)=>{
            a.Status=false
            if(a.Children!=null){
              this.changeStatus(a.Children,true);
            }
          })
        }
        else{
          chartOfAcc.Children[position].IsClicked=true;
          chartOfAcc.Children[position].Children.forEach((a,b,array)=>{
          a.Status=true
           if(a.Children!=null){
            this.changeStatus(a.Children,false);
           }
         })
        }
       }
       else{
          this.findChildPosition(chartOfAcc.Children,node)
       }
      })
    }
    this.oldChartOfAccountTreeList=JSON.parse(JSON.stringify(this.chartOfAccountTreeList));
  }
  findChildPosition(trees:ChartOfAccountTree[],node:ChartOfAccountTree){
    trees.forEach((coa,index,array)=>{
      let position=coa.Children.findIndex(fea=>fea.AccountId==node.AccountId);
      if(position!=-1){
          this.isFound=true;
          if(coa.Children[position].IsClicked){
            coa.Children[position].IsClicked=false;
            coa.Children[position].Children.forEach((a,b,array)=>{
            a.Status=false
            if(a.Children!=null){
              this.changeStatus(a.Children,true)
            }
          })
        }
        else{
          coa.Children[position].IsClicked=true;
          coa.Children[position].Children.forEach((a,b,array)=>{
          a.Status=true
          if(a.Children!=null){
            this.changeStatus(a.Children,false)
          }
        })
        }
      }
      else{
        this.findChildPosition(coa.Children,node)
      }
    })
  }
  changeStatus(tree:ChartOfAccountTree[],status){
    tree.forEach((a,index,array)=>{
      a.Status=status;
      if(a.Children!=null){
        this.changeStatus(a.Children,status);
      }
    })
  }
  addNewAccount(status:string,selectedNode:ChartOfAccountTree){
    debugger
    this.Status=status;
    this.selectedAccount=selectedNode;
    if(this.Status=="add"){
      var AutoAccountCode;
      this.account.Id=null;
      this._service.getMaxAccidByGroupIdAndLevelId(selectedNode.ChildGroupId,selectedNode.ChildLevelId+1).subscribe(response=>{
        let maxAccid=response
        let newAccid=maxAccid+1;
        let newlevel=selectedNode.ChildLevelId+1;
        this.account.LevelId=newlevel;
        this.account.AccId=newAccid;
        this.account.GroupId=selectedNode.ChildGroupId
        AutoAccountCode=selectedNode.ChildGroupId+"0"+newlevel+"00"+newAccid.toString();
        this.account.AutoAccountCode=AutoAccountCode;
        this.account.ManualAccountCode=AutoAccountCode;
        this.account.AccountDescription=null;
        this.account.ParentAccountId=selectedNode.AccountId;
      },error=>{
        var dialogData=new DialogData();
        dialogData.message=error
        this._alertBoxService.openDialog(dialogData);
      })
    }
    else{
      this.account.Id=selectedNode.AccountId;
      this.account.ManualAccountCode=selectedNode.ManualAccountCode;
      this.account.AutoAccountCode=selectedNode.AutoAccountCode;
      this.account.AccountDescription=selectedNode.AccountDescription;
      //let position=this.accountDetails.AccountList.findIndex(fea=>fea.a)
      this.account.AccountType=selectedNode.AccountType.toString();
      this.account.IsLeaf=selectedNode.IsLeaf;
      this._navigationData.IsUpdate=true;
      this._navigationData.PreviousData=this.account.ManualAccountCode;
    }
    const dialogRef=this.matDialog.open(AddChartOfAccountComponent,{
      data:this.account,
      disableClose:true,
      height:'auto',
      width:window.screen.width*.5+'px'
    });
    dialogRef.afterClosed().subscribe((result:ChartOfAccountTree)=>{
      debugger
      if(result){
        this.savedAcoount=result;
        this.savedAcoount.Status=true;
        this.savedAcoount.Children=[]
        this.findSelectedAccount(this.selectedAccount)
      }
    })
  }
  createChartOfAccount(){
    if(this.account.Id==null){
      this._service.CreateChartOfAccount(this.account).subscribe(response=>{
        let result=response;
        this.clearChartOfAccountForm();
        this.accountClicked=false;
        if(result){
          var dialogData=new DialogData();
          dialogData.message="Chart of account create succesfully";
          this._alertBoxService.openDialog(dialogData);
          //this.getChartOfaccountTreeList();
          this.findSelectedAccount(result);
        }
      },error=>{
        var dialogData=new DialogData();
        dialogData.message=error
        this._alertBoxService.openDialog(dialogData);
      })
    }
    else{
      this._service.UpdateChartOfAccount(this.account).subscribe(response=>{
        let result=response;
        this.accountClicked=false;
        this.clearChartOfAccountForm();
        if(result){
          var dialogData=new DialogData();
          dialogData.message="Chart of account updated succesfully";
          this._alertBoxService.openDialog(dialogData);
         //this.getChartOfaccountTreeList();
          this.findSelectedAccount(result);
        }
      },error=>{
        var dialogData=new DialogData();
        dialogData.message=error
        this._alertBoxService.openDialog(dialogData);
      })
    }
  }
  findSelectedAccount(node:ChartOfAccountTree){
    debugger
    this.isFound=false;
    this.oldChartOfAccountTreeList.forEach((chartOfAcc,index,array)=>{
      if(chartOfAcc.AccountId.toLowerCase()==node.AccountId.toLowerCase()){
        this.isFound=true;
        chartOfAcc.IsClicked=true;
        if(this.Status=="add"){
          chartOfAcc.Children.push(this.savedAcoount)
        }
        else{
          chartOfAcc.AccountDescription=this.savedAcoount.AccountDescription;
          chartOfAcc.ManualAccountCode=this.savedAcoount.ManualAccountCode;
        }
        this.chartOfAccountTreeList=this.oldChartOfAccountTreeList;
        console.log(this.chartOfAccountTreeList)
      }
      else{
        if(chartOfAcc.Children!=null&&chartOfAcc.Children.length>0){
          chartOfAcc.Children.forEach((chartOfAcc2,index,array)=>{
            if(chartOfAcc2.AccountId.toLowerCase()==node.AccountId.toLowerCase()){
              this.isFound=true;
              chartOfAcc2.IsClicked=true;
              if(this.Status=="add"){
                chartOfAcc2.Children.push(this.savedAcoount)
              }
              else{
                chartOfAcc2.AccountDescription=this.savedAcoount.AccountDescription;
                chartOfAcc2.ManualAccountCode=this.savedAcoount.ManualAccountCode;
              }
              this.chartOfAccountTreeList=this.oldChartOfAccountTreeList;
              console.log(this.chartOfAccountTreeList);
           }
           else{
             if(chartOfAcc2.Children!=null&&chartOfAcc2.Children.length>0)
              this.findChildAccount(chartOfAcc2.Children,node)
           }
          })
        } 
      }
    })

  }
  findChildAccount(trees:ChartOfAccountTree[],node:ChartOfAccountTree){
    trees.forEach((coa,index,array)=>{
      if(coa.AccountId.toLowerCase()==node.AccountId.toLowerCase()){
          this.isFound=true;
          coa.IsClicked=true;
          if(this.Status=="add"){
            coa.Children.push(this.savedAcoount)
          }
          else{
            coa.AccountDescription=this.savedAcoount.AccountDescription;
            coa.ManualAccountCode=this.savedAcoount.ManualAccountCode;
          }
          this.chartOfAccountTreeList=this.oldChartOfAccountTreeList;
          console.log(this.chartOfAccountTreeList)
      }
      else{
        if(coa.Children!=null&&coa.Children.length>0){
          this.findChildAccount(coa.Children,node)
        }
      }
    })
  }
  clearChartOfAccountForm(){
    this.account.AccountDescription=null;
    this.account.AutoAccountCode=null;
    this.account.ManualAccountCode=null;
  }
}

