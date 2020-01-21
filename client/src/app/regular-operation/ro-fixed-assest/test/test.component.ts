import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(
    public dialogRef:MatDialogRef<TestComponent>,
    @Inject(MAT_DIALOG_DATA) public rolePermissionData: any) { }

  ngOnInit() {
  }

}
