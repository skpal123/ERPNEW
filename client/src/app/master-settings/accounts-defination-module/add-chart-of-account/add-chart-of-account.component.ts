import { Component, OnInit, Inject } from '@angular/core';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { AccountDefinationService } from '../../../services/master-settings/account-defination.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ChartOfaccount } from '../../../models/master-settings/account-defination/chart-of-account.model';
import { DialogData } from '../../../models/common/dialog-data.model';
import { Subledger } from '../../../models/master-settings/account-defination/subledger.model';
import { AddSubledgerComponent } from '../add-subledger/add-subledger.component';

@Component({
  selector: 'app-add-chart-of-account',
  templateUrl: './add-chart-of-account.component.html',
  styleUrls: ['./add-chart-of-account.component.css']
})
export class AddChartOfAccountComponent implements OnInit {
  IsSubledgerEnable: boolean = false;
  subledger: Subledger = { Id: null, Description: null, SublederCode: null, AccountId: null }
  constructor(private _accountService: AccountDefinationService,
    private _alertBox: AlertBoxService,
    private matDialog: MatDialog,
    public dialogRef: MatDialogRef<AddChartOfAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public account: ChartOfaccount
  ) { }

  ngOnInit() {
    debugger
    if (this.account.IsLeaf) {
      this.IsSubledgerEnable = true;
      this.subledger.AccountId = this.account.Id;
    }
    else {
      this.IsSubledgerEnable = false;
    }
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
  createChartOfAccount() {
    if (this.account.Id == null) {
      this._accountService.CreateChartOfAccount(this.account).subscribe(response => {
        let result = response;
        this.clearChartOfAccountForm();
        if (result) {
          var dialogData = new DialogData();
          dialogData.message = "Chart of account create succesfully";
          this._alertBox.openDialog(dialogData);
          this.dialogRef.close(response)
        }
      }, error => {
        var dialogData = new DialogData();
        dialogData.message = error
        this._alertBox.openDialog(dialogData);
      })
    }
    else {
      this._accountService.UpdateChartOfAccount(this.account).subscribe(response => {
        let result = response;
        this.clearChartOfAccountForm();
        if (result) {
          var dialogData = new DialogData();
          dialogData.message = "Chart of account updated succesfully";
          this._alertBox.openDialog(dialogData);
          this.dialogRef.close(result);
        }
      }, error => {
        var dialogData = new DialogData();
        dialogData.message = error
        this._alertBox.openDialog(dialogData);
      })
    }
  }
  clearChartOfAccountForm() {
    this.account.AccountDescription = null;
    this.account.AutoAccountCode = null;
    this.account.ManualAccountCode = null;
  }
  addSubleder() {
    const dialogRef = this.matDialog.open(AddSubledgerComponent, {
      disableClose: true,
      data: this.subledger,
      maxHeight: window.screen.height * .6 + 'px',
      height: 'auto',
      width: window.screen.width * .6 + 'px'
    });
  }
}
