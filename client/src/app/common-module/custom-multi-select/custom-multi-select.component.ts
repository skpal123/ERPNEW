import { Component, ViewChild, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MultiSelectDropdown } from '../../models/common/multiselect.dropdown.model';

@Component({
  selector: 'app-custom-multi-select',
  templateUrl: './custom-multi-select.component.html',
  styleUrls: ['./custom-multi-select.component.css']
})
export class CustomMultiSelectComponent implements OnChanges {
  @ViewChild('multiselectForm') multiselectForm: NgForm;
  @Input() selectedItem: MultiSelectDropdown[];
  @Input() data: MultiSelectDropdown[];
  @Output() getSelectedItemChild: EventEmitter<any> = new EventEmitter<any>();
  @Output() showItemValue: EventEmitter<any> = new EventEmitter<any>();
  textBoxClicked: boolean = false;
  @Input() showItem: boolean;
  showItem1: boolean = false;
  searchText: string = null;
  filteredData: MultiSelectDropdown[] = [];
  constructor() { }
  ngOnChanges() {
    debugger
    this.multiselectForm.valueChanges.subscribe((d: string) => {
      this.textBoxClicked = true;
      const control = this.multiselectForm.controls['searchText']!=null?this.multiselectForm.controls['searchText'].value:null;
      if (this.textBoxClicked && control != '' && control != null) {
        this.filteredData = this.data.filter(fea => fea.itemName.toLowerCase().includes(control.toLowerCase()))
      }
      else {
        this.filteredData = this.data;
      }
    });
  }
  textBoxValueChange() {
    this.textBoxClicked = true;
    if (this.textBoxClicked && this.searchText != '' && this.searchText != null) {
      this.filteredData = this.data.filter(fea => fea.itemName.toLowerCase().includes(this.searchText.toLowerCase()))
    }
    else {
      this.filteredData = this.data;
    }
  }
  serachTermClicked() {
    this.textBoxClicked = true;
  }
  itemAdd(item: MultiSelectDropdown) {
    debugger
    let index = this.selectedItem.findIndex(a => a.itemName === item.itemName);
    if (index == -1) {
      this.selectedItem.push(item);
      this.selectedItem= this.selectedItem.filter(a=>a.id!="0")
      this.getSelectedItemChild.emit(item)
    }
    else {
      this.selectedItem.splice(index, 1);
      this.selectedItem= this.selectedItem.filter(a=>a.id!="0")
      this.getSelectedItemChild.emit(item)
    }
  }
  showItemListContent() {
    debugger
    if (this.showItem1) {
      this.showItem1 = false;
      this.showItemValue.emit(true)
    }
    else {
      this.showItem1 = true;
      this.showItemValue.emit(false)
    }
  }
}
