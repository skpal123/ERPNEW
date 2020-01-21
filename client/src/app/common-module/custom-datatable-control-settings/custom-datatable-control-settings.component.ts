import { Component, OnInit, Input } from '@angular/core';
import { UserFormControl } from '../../models/common/user-form-control.model';
import { MatDialog } from '@angular/material';
import { CustomDatatableControlComponent } from '../custom-datatable-control/custom-datatable-control.component';

@Component({
  selector: 'app-custom-datatable-control-settings',
  templateUrl: './custom-datatable-control-settings.component.html',
  styleUrls: ['./custom-datatable-control-settings.component.css']
})
export class CustomDatatableControlSettingsComponent implements OnInit {
  @Input() userControlList:UserFormControl[];
  constructor( private matDialog:MatDialog) { }

  ngOnInit() {

  }
  getDatatableControl(){
    // this.columnChange=false;
     const dialogRef=this.matDialog.open(CustomDatatableControlComponent,{
       data:this.userControlList,
       disableClose:true,
       height:'auto',
       maxHeight:window.screen.height*.9+'px',
       width:window.screen.width*.45+'px'
     });
     dialogRef.afterClosed().subscribe(result=>{
      if(result){
       // this.columnChange=true;
      }
     })
   }
}
