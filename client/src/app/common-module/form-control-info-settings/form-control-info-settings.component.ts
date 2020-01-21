import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormDetailsControlComponent } from '../form-details-control/form-details-control.component';

@Component({
  selector: 'app-form-control-info-settings',
  templateUrl: './form-control-info-settings.component.html',
  styleUrls: ['./form-control-info-settings.component.css']
})
export class FormControlInfoSettingsComponent implements OnInit {
  @Input() formName:string;
  constructor(private matDialog:MatDialog) { }

  ngOnInit() {
  }
  controlGroupItemForm(){
    debugger
    const dialogRef=this.matDialog.open(FormDetailsControlComponent,{
      data:this.formName,
      disableClose:true,
      height:'auto',
      maxHeight:window.screen.height*.8+'px',
      width:window.screen.width*.6+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
     if(result){
       //this.getItemPurchaseValidationList()
     }
    })
  }
}
