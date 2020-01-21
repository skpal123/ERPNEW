import { Component, OnInit, ViewChild,Output,EventEmitter, Input, OnChanges } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgForm, FormControl } from '@angular/forms';
import { MultiSelectDropdown } from '../../../models/common/multiselect.dropdown.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { NewDropdownDataService } from '../../../common-module/new-dropdown-data.service';
import { InventoryService } from '../../../services/regular-operation/inventory.service';
import { CustomerTransaction } from '../../../models/regular-operation/inventory/customer-transaction.model';
import { DialogData } from '../../../models/common/dialog-data.model';
import { MatDialog } from '@angular/material';
import { Customer } from '../../../models/master-settings/inventory-defination/customer.model';
import { CustomerEntryComponent } from '../../../master-settings/inventory-defination-module/customer-entry/customer-entry.component';

@Component({
  selector: 'app-customer-transaction-entry',
  templateUrl: './customer-transaction-entry.component.html',
  styleUrls: ['./customer-transaction-entry.component.css']
})
export class CustomerTransactionEntryComponent implements OnInit {
  panelOpenState = false;
  constructor(){}
  ngOnInit(){

  }
}
