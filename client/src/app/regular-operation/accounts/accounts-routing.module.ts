import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountsLayoutComponent } from './accounts-layout/accounts-layout.component';
import { AccountEntryComponent } from './account-entry/account-entry.component';

const routes: Routes = [
  {
    path:'',
    component:AccountsLayoutComponent,
    children:[
      {path:'',component:AccountEntryComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
