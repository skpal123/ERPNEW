import { Injectable } from '@angular/core';
import { SelectDropdown } from '../models/common/select.dropdown.model';

@Injectable({
  providedIn: 'root'
})
export class NewDropdownDataService {
  categorySelectedData:SelectDropdown={Text:null,Value:null}
  subcategorySelectedData:SelectDropdown={Text:null,Value:null}
  itemSelectedData:SelectDropdown={Text:null,Value:null}
  constructor() { }
}
