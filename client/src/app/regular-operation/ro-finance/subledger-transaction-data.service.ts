import { Injectable } from '@angular/core';
import { SubledgerDialogData } from '../../models/regular-operation/finance/subledger-dialog-data.model';

@Injectable({
  providedIn: 'root'
})
export class SubledgerTransactionDataService {
  public subledgerDialogData:SubledgerDialogData={
    AccountId:null,SubledgerTransactionList:[]
  }
  public isDialogOpen:boolean=false;
  constructor() { }
}
