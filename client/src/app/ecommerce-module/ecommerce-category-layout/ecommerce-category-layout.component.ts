import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ecommerce-category-layout',
  templateUrl: './ecommerce-category-layout.component.html',
  styleUrls: ['./ecommerce-category-layout.component.css']
})
export class EcommerceCategoryLayoutComponent implements OnInit {

  constructor(private _router:Router,private activateRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(param=>{
      let id=param.get('id');
      alert(id);
    })
  }

}
