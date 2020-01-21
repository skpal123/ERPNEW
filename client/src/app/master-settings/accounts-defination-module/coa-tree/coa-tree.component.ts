import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-coa-tree',
  templateUrl: './coa-tree.component.html',
  styleUrls: ['./coa-tree.component.css']
})
export class CoaTreeComponent implements OnInit {
  @Input() tree:any
  constructor() { }

  ngOnInit() {
  }

}
