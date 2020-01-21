import { Component, OnInit,Inject } from '@angular/core';
import { AccountsService } from '../../../services/regular-operation/accounts.service';
import { Voucher } from '../../../models/regular-operation/finance/voucher.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertBoxService } from '../../../shared/alert-box.service';

@Component({
  selector: 'app-voucher-entry',
  templateUrl: './voucher-entry.component.html',
  styleUrls: ['./voucher-entry.component.css']
})
export class VoucherEntryComponent implements OnInit {

  voucherList:Voucher[]=[];
  voucher:Voucher;
  constructor(private _accountService:AccountsService,private _alertBox:AlertBoxService,
    // public dialogRef:MatDialogRef<VoucherEntryComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any
) 
{ }
  ngOnInit() {
  //  this.getVoucherList();
  }
  // getVoucherList(){
  //   this._accountService.getVoucherList("2-18-2019","2-18-2019").subscribe(response=>{
  //     this.voucherList=response.json();
  //   },error=>{

  //   })
  // }
  onNoClick():void{
    //this.dialogRef.close();
  }
}
