import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InventoryLocation } from '../../../models/master-settings/inventory-defination/inventory-location.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { ValidationService } from '../../../services/common/validation.service';
import { LocationValidation } from '../../../models/validation/inventory/location-validation.model';

@Component({
  selector: 'app-location-entry',
  templateUrl: './location-entry.component.html',
  styleUrls: ['./location-entry.component.css']
})
export class LocationEntryComponent implements OnInit {
  @ViewChild('locationForm') locationForm: NgForm
  itemName: string = "locationId"
  formName: string = "location-entry"
  IsAutoCode:boolean=false;
  locationValidation: LocationValidation[] = []
  constructor(public matDialogRef: MatDialogRef<LocationEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public location: InventoryLocation,
    private _alertBox: AlertBoxService,
    private _validationService: ValidationService,
    private _inventotyDefinationService: InventoryDefinationServiceService,
  ) { }

  ngOnInit() {
    this.getItemFormInfo();
  }
  onNoClick() {
    this.matDialogRef.close(false);
  }
  getItemFormInfo() {
    this._validationService.getLocationValidationData().subscribe((response: LocationValidation[]) => {
      this.locationValidation = response
      if(this.locationValidation[3].LocationId){
        this.IsAutoCode=true;
      }
    }, error => {
      let message = error;
      let dialogData = new DialogData();
      dialogData.message = message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  saveLocation() {
    if (this.location.Id == null) {
      this._inventotyDefinationService.CreateLocation(this.location).subscribe(response => {
        let result = response
        if (result) {
          this.matDialogRef.close(true);
          let dialogData = new DialogData();
          dialogData.message = "Save successfully";
          this._alertBox.openDialog(dialogData);
        }
      }, error => {
        let dialogData = new DialogData();
        dialogData.message = error
        this._alertBox.openDialog(dialogData);
      })
    }
    else {
      this._inventotyDefinationService.UpdateLocation(this.location).subscribe(response => {
        let result = response
        if (result) {
          this.matDialogRef.close(true);
          let dialogData = new DialogData();
          dialogData.message = "Update successfully";
          this._alertBox.openDialog(dialogData);
        }
      }, error => {
        let message = error
        let dialogData = new DialogData();
        dialogData.message = message.Message;
        this._alertBox.openDialog(dialogData);
      })
    }

  }
  parentGetGeneratedCode($event: string) {
    debugger
    this.location.LocationId = $event;
  }
}
