import { SubledgerTransaction } from "./subledger-transaction.model";

export class VoucherDeatils{
    public Id?:string;
    public Lineno?:number;
    public Amount?:number;
    public GroupId?:number;
    public LevelId?:number;
    public AccId?:number;
    public AccountId?:string;  
    public AccountDescription?:string;
    public SubLedgerTransactions?:SubledgerTransaction[];
    public Vat?:number;
    public Tax?:number; 
}