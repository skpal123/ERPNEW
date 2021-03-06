import { VoucherDeatils } from "./voucher-details.model";

export class Voucher{
    public Id?:string;
    public VoucherNo?:string;
    public VoucherDate?:Date;
    public VoucherType?:string;
    public VoucherBankName?:string;
    public VType?:string;
    public VoucherStatus?:boolean
    public VStatus?:string
    public PostingStatus?:boolean;
    public ChequeNo?:string;
    public ChequeDate?:Date;
    public BankName?:string;
    public BankAccountNo?:string;
    public Particulars?:string;
    public PreparedBy?:string;
    public ApprovedBy?:string;
    public CheckedBy?:string;
    public IsAutoGenerated?:boolean;
    public BranchID?:string;
    public VoucherDetailsList?:VoucherDeatils[];
    public Amount?:number;
    public Vat?:number;
    public Tax?:number;
    public Status?:boolean;
}