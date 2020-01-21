import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FixedAssetDefinationModuleRoutingModule } from './fixed-asset-defination-module-routing.module';
import { FixedAssetLayoutComponent } from './fixed-asset-layout/fixed-asset-layout.component';
import { AssetGroupComponent } from './asset-group/asset-group.component';

@NgModule({
  imports: [
    CommonModule,
    FixedAssetDefinationModuleRoutingModule
  ],
  declarations: [FixedAssetLayoutComponent, AssetGroupComponent]
})
export class FixedAssetDefinationModuleModule { }
