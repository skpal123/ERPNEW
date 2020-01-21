export class PurchaseSalesTransaction{
    public Id?:string
    public TransactionId?:string
    public TransactionType?:string
    public Reason?:string
    public Quantity?:number
    public TotalAmount?:number
    public DiscountRate?:number
    public DiscountAmount?:number
    public NetPayableAmount?:number
    public PaidAmount?:number
    public PaymentMode?:number;
    public LedgerName?:string;
    public Comments?:string;
    public GrvNo?:string;
    public InvoiceNo?:string;
    public ChalanNo?:string;
    public GrvDate?:Date
    public TransactionDate?:Date
    public SupplierName?:string;
    public SubLedgerName?:string;
    public PartyName?:string;
    public CustomerName?:string;
    public PayAmount?:number;
    public IsChecked?:boolean;
    public History?:string;
    public View?:string;
}