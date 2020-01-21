import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TestComponent } from 'src/app/regular-operation/ro-fixed-assest/test/test.component';

@Component({
  selector: 'app-asset-adjustment',
  templateUrl: './asset-adjustment.component.html',
  styleUrls: ['./asset-adjustment.component.css']
})
export class AssetAdjustmentComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit() {
  }
  openDialog(){
    const dialogRef=this.dialog.open(TestComponent,{
      maxHeight:'700px',
      width:'700px',
      maxWidth:'800px',
      disableClose:true,
      data: null
    })
  }
}
