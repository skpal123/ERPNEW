import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalItem:number=0;
  text:string='';
  constructor(){}
  propertyTags: any = [
    {Id:"1",Name:"west"},
    {Id:"2",Name:"east"},
    {Id:"3",Name:"pool"}
  ];
  pointOfInterests: any = [
    {Id:"1",Name:"park",Value:0,tags:[]},
    {Id:"2",Name:"school",Value:0,tags:[]},
    {Id:"2",Name:"hospital",Value:0,tags:[]}
  ];
  items:any=[
    {Id:"0",Name:"Select"}
  ];
  mixeds:mixed[]=[];

  p:any[][]=[];
  a:any[]=[];
  b:any[]=[];
  ngOnInit(){
    this.getDynamicTable()
  }
  getDynamicTable(){
    debugger
    //this.a=this.pointOfInterests;
    //this.b=this.propertyTags
    this.pointOfInterests.forEach((s,t,n)=>{
      this.a=[];
      this.propertyTags.forEach((p,q,r)=>{
        var poi=new mixed();
        poi.poiId=s.Id;
        poi.tagId=p.Id
        poi.value=0
        this.a.push(poi)
       })
       this.p.push(this.a);
    })
  }
  save(){
    debugger
    console.log(this.p);
  }
 
  clickPlusBtn(){
    this.totalItem++
  }
  clickMinusBtn(){
    this.totalItem--
  }
  on(){
    document.getElementById("overlay").style.display = "block";
  }
  off(){
    document.getElementById("overlay").style.display = "none";
  }
  itemAdd(item:any){
    debugger
    let index=this.items.findIndex(a=>a.Name===item.Name);
    if(index==-1){
      this.items.push(item);
    }
    else{
      this.items.splice(index,1);
    }
  }
}
export class mixed{
  Id:string;
  poiId:string;
  tagId:string;
  value:number;
}
export class TagPoi{
  TagId:string;
  Pois:any[];
  Id:string;
}
