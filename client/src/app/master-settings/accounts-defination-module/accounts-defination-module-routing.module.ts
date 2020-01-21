import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcountLayoutComponent } from './acount-layout/acount-layout.component';
import { ChartOfAccountComponent } from './chart-of-account/chart-of-account.component';
import { AccountOpeningComponent } from './account-opening/account-opening.component';
import { SubledgerOpeningComponent } from './subledger-opening/subledger-opening.component';

const routes: Routes = [
  {
    path:'',
    component:AcountLayoutComponent,
    children:[
      {
         path:'',component:ChartOfAccountComponent,
      },
      {
        path:'chartOfAccount',component:ChartOfAccountComponent
      },
      {
         path:'account-opening',component:AccountOpeningComponent
      },
      {
        path:'subledger-opening',component:SubledgerOpeningComponent
      }
    ]
  },
  {
    path:'accounts-defination',
    component:AcountLayoutComponent,
    children:[
      {
        path:'chartOfAccount',component:ChartOfAccountComponent
      },
      {
         path:'account-opening',component:AccountOpeningComponent
      },
      {
        path:'subledger-opening',component:SubledgerOpeningComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  
  exports: [RouterModule]
})
export class AccountsDefinationModuleRoutingModule { }
