import { CustomerSupplierTransactionDetails } from "./customer-supplier-transaction-details.model";
export class CustomerTransaction{
    public Id?:string;
    public ChalanNo?:string;
    public InvoiceNo?:string;
    public OrderNo?:string;
    public Group_Id?:string;
    public Customer_Id?:string;
    public CustomerName?:string;
    public PaymentMode?:string;
    public PaymentDate?:Date;
    public Ledger_Id?:string;
    public LedgerName?:string;
    public SubLedger_Id?:string;
    public PaidAmount?:number;
    public SubLedgerName?:string;
    public PaymentType?:string;
    public PaymentMethod?:string;
    public TotalDueAdvanceAmount?:number;
    public IsFirstTransaction?:boolean;
    public TransactionDetailsList?:CustomerSupplierTransactionDetails[];
}