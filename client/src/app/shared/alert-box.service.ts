import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogData } from '../models/common/dialog-data.model';
import { AlertComponent } from './alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertBoxService {

  public title: string = 'Popover title';
  public message: string = 'Popover description';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  public isOpen: boolean = false;
  constructor(private _dialog:MatDialog) {
    this.title= 'Popover title';
    this.message='Popover description';
    this.confirmClicked=false;
    this.cancelClicked= false;
    this.isOpen = false;
   }
   openDialog(data:DialogData): void {
    const dialogRef = this._dialog.open(AlertComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.title = result;
    });  
  }
}
