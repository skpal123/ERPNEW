import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoFixedAssetLayoutComponent } from './ro-fixed-asset-layout/ro-fixed-asset-layout.component';
import { FixedAssetEntryComponent } from './fixed-asset-entry/fixed-asset-entry.component';
import { AssetListComponent } from './asset-list/asset-list.component';
import { SaleDisposaleComponent } from './sale-disposale/sale-disposale.component';
import { AssetAdjustmentComponent } from './asset-adjustment/asset-adjustment.component';

const routes: Routes = [
  {
    path:'',
    component:RoFixedAssetLayoutComponent,
    children:[
      {path:'',component:FixedAssetEntryComponent},  
      {path:'asset-list',component:AssetListComponent},
      {path:'sale-disposale',component:SaleDisposaleComponent},
      {path:'asset-adjustment',component:AssetAdjustmentComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoFixedAssestRoutingModule { }
