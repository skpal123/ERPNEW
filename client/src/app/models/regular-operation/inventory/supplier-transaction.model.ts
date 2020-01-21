export class SupplierTransaction{
    public Id?:string;
    public ChalanNo?:string;
    public InvoiceNo?:string;
    public OrderNo?:string;
    public Group_Id?:string;
    public Supplier_Id?:string;
    public PaymentMode?:string;
    public PaymentDate?:Date;
    public Ledger_Id?:string;
    public LedgerName?:string;
    public SubLedger_Id?:string;
    public SubLedgerName?:string;
    public PaidAmount?:number;
    public IsFirstTransaction?:boolean;
}