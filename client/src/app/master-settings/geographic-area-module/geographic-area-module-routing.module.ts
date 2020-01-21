import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeographicMenuComponent } from './geographic-menu/geographic-menu.component';
import { LocationComponent } from './location/location.component';

const routes: Routes = [
  {
    path:'',
    component:GeographicMenuComponent,
    children:[
      {path:'',component:LocationComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeographicAreaModuleRoutingModule { }
