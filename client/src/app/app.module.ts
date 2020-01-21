import { BrowserModule, } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BlockUIModule } from 'ng-block-ui';
import {SharedModule} from 'src/app/shared/shared/shared.module'
import {FormsModule, ReactiveFormsModule,FormControl} from '@angular/forms';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpGlobalInterceptor } from './shared/HttpGlobalInterceptor.ineterceptor';
const routes:Routes=[
  {
    path: 'login',
    loadChildren: 'src/app/login/login.module#LoginModule'  
  },
  {
    path: 'ecommerce',
    loadChildren: 'src/app/ecommerce-module/ecommerce-module.module#EcommerceModuleModule'  
  },
  {
    path: '',  
    redirectTo: 'ecommerce',
    pathMatch: 'full'
  }
]
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes,{useHash:true}),
    HttpModule,FormsModule,ReactiveFormsModule,
    SharedModule,
    BlockUIModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpGlobalInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
