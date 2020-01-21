import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FixedAssetLayoutComponent } from './fixed-asset-layout/fixed-asset-layout.component';
import { AssetGroupComponent } from './asset-group/asset-group.component';

const routes: Routes = [
  {
    path:'',
    component:FixedAssetLayoutComponent,
    children:[
      {path:'',component:AssetGroupComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixedAssetDefinationModuleRoutingModule { }
