import { ItemTransaction } from "./item-transaction.model";
import { ItemPurchaseValidation } from "../../validation/item-purchase.validation.model";

export class GroupItem{
    public Id?:string
    public TransactionId?:string
    public TransactionType?:string
    public Reason?:string
    public Quantity?:number
    public TotalAmount?:number
    public Vat?:number
    public Tax?:number
    public DiscountRate?:number
    public DiscountAmount?:number
    public NetPayableAmount?:number
    public PaidAmount?:number
    public PaymentMode?:number;
    public Ledger_Id?:string;
    public LedgerName?:string;
    public LedgerId?:string;
    public SubLedgerId?:string;
    public Comments?:string;
    public GrvNo?:string;
    public InvoiceNo?:string;
    public ChalanNo?:string;
    public Supplier_Id?:string;
    public GrvDate?:Date
    public TransactionDate?:Date
    public Approver_Id?:string;
    public SupplierName?:string;
    public SubLedger_Id?:string;
    public SubLedgerName?:string;
    public Party_Id?:string;
    public PartyName?:string;
    public Customer_Id?:string;
    public CustomerName?:string;
    public PayAmount?:number;
    public LotNo?:string;
    public ItemTransactionList?:ItemTransaction[];
    public data?:ItemPurchaseValidation[];
}