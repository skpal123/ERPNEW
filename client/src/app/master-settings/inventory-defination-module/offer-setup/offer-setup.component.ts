import { Component, OnInit, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { OfferSetup } from '../../../models/master-settings/inventory-defination/offer-setup.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { CommonService } from '../../../services/common/common.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { MatDialog } from '@angular/material';
import { DialogData } from '../../../models/common/dialog-data.model';
import { OfferEntryComponent } from '../offer-entry/offer-entry.component';
import { DatatableButtonOutput } from '../../../models/common/datatable-button-output';
import { NavigationDataService } from '../../../services/common/navigation-data.service';
import { FormControl } from '@angular/forms';
import { InventoryItem } from '../../../models/master-settings/inventory-defination/inventory-item.model';
import { OfferSetupDte } from '../../../models/master-settings/inventory-defination/offer-setup-dtn.model';
import { SelectList } from '../../../models/common/select-list.model';
import { Tree } from '../../../models/common/tree.model';

@Component({
  selector: 'app-offer-setup',
  templateUrl: './offer-setup.component.html',
  styleUrls: ['./offer-setup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferSetupComponent implements OnInit {
  @BlockUI() blockUi: NgBlockUI;
  @ViewChild('offerSettingsControl') offerSettingsControl: FormControl;
  offerSettings: string = "product-wise"
  userControlList: UserFormControl[] = [];
  oldUserControlList: UserFormControl[] = [];
  reload: boolean = false;
  columnReady: boolean = false;
  dataReady: boolean = false;
  ColumnList: any[] = [];
  selectList: SelectList[] = [{ Id: "0", Name: "SELECT" }];
  offerSetupDtn: OfferSetupDte[] = [];
  DataList: any[] = [];
  oldDataList: any[] = [];
  customerTypes: string[] = ["Platinum", "Gold", "Silver"]
  productList: InventoryItem[] = [];
  offerSetupList: OfferSetup[] = [];
  itemTree:Tree[]=[];
  ollItemTree:Tree[]=[];
  constructor(private _alertBox: AlertBoxService,
    private _commonService: CommonService,
    private _navigationData: NavigationDataService,
    private changeRef: ChangeDetectorRef,
    private _inventotyDefinationService: InventoryDefinationServiceService,
    private matDialog: MatDialog
  ) { }
  ngOnInit() {
    debugger
    this.offerSettingsControl.valueChanges.subscribe(data => {
      debugger
      if (data == "product-wise" && this.userControlList.length > 0) {
        
      }
      else if (data == "customer-wise" && this.userControlList.length > 0) {
        this.userControlList = this.oldUserControlList;
        this.oldUserControlList = JSON.parse(JSON.stringify(this.userControlList));
        let index = this.userControlList.findIndex(m => m.Name == "ProductName");
        this.userControlList[index].IsEnable = false;
        this.ColumnList = this.userControlList;
        this.getCustomerTypeDataList();
        this.changeRef.markForCheck()
      }
    })
    this.getUserFormControlByFormName()
    this.getItemTree()
    this.getOfferList();
  }
  getUserFormControlByFormName() {
    this.blockUi.start("Loading....,Please wait.")
    this._commonService.getUserFormControlByFormName('offer-setup').subscribe(response => {
      this.blockUi.stop();
      this.userControlList = response;
      this.oldUserControlList = JSON.parse(JSON.stringify(this.userControlList))
      if (this.offerSettings == "product-wise" && this.userControlList.length > 0) {
        let index = this.userControlList.findIndex(m => m.Name == "CustomerName");
        this.userControlList[index].IsEnable = false;
      }
      else if (this.userControlList.length > 0) {
        let index = this.userControlList.findIndex(m => m.Name == "ProductName");
        this.userControlList[index].IsEnable = false;
      }
      this.ColumnList = this.userControlList;
      this.columnReady = true;
      this.changeRef.markForCheck();
    }, error => {
      this.blockUi.stop();
      let dialogData = new DialogData();
      dialogData.message = error
      this._alertBox.openDialog(dialogData);
    })
  }
  getOfferList() {
    this.blockUi.start("Loading....,Please wait.")
    this._inventotyDefinationService.getOfferSetupList().subscribe(response => {
      this.blockUi.stop();
      this.offerSetupList = response;
      this.offerSetupList.forEach(a => {
        this.selectList.push({ Id: a.Id, Name: a.OfferName })
      })
      this.changeRef.markForCheck();
    }, error => {
      this.blockUi.stop();
      let dialogData = new DialogData();
      dialogData.message = error
      this._alertBox.openDialog(dialogData);
    })
  }
  getItemTree() {
    debugger
    this.blockUi.start("Loading....,Please wait.")
    this._inventotyDefinationService.getitemTree().subscribe(response => {
      this.blockUi.stop();
      this.itemTree=response;
      this.ollItemTree = JSON.parse(JSON.stringify(this.itemTree));
      this.changeRef.markForCheck();
    }, error => {
      this.blockUi.stop();
      let dialogData = new DialogData();
      dialogData.message = error
      this._alertBox.openDialog(dialogData);
    })
  }
  getCustomerTypeDataList() {
    this.DataList = [];
    this.customerTypes.forEach(a => {
      let b = new OfferSetupDte();
      b.CustomerName = a;
      b.Offer_Id = "0"
      b.DiscountRate = 0;
      this.DataList.push(b);
    });
  }
}
