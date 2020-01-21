import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
@Component({
  selector: 'app-eccommerce-layout',
  templateUrl: './eccommerce-layout.component.html',
  styleUrls: ['./eccommerce-layout.component.css']
})
export class EccommerceLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $('#customnavbar li').click(function(){
        debugger
        $('li').removeClass('active');
      })
     })
  }

}
