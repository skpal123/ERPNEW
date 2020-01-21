import { Injectable } from '@angular/core';
import { UserFormControl } from '../../models/common/user-form-control.model';

@Injectable({
  providedIn: 'root'
})
export class CustomDatatableService {
  constructor() { }
  DataList:any=[];
  ColumnList:UserFormControl[]=[];
  dataChange:boolean;
}
