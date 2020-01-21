import { SubledgerTransaction } from "./subledger-transaction.model";

export class SubledgerDialogData{
    public AccountId?:string;
    public SubledgerTransactionList:SubledgerTransaction[];
}