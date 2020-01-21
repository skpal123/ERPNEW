import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-form-details-control',
  templateUrl: './form-details-control.component.html',
  styleUrls: ['./form-details-control.component.css']
})
export class FormDetailsControlComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<FormDetailsControlComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(){
    debugger
    console.log(this.data);
  }
  saveButtonclicked($event){
    this.dialogRef.close(true);
  }
}
