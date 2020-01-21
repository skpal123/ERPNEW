namespace ViewModel.Model.Validation.Inventory
{
    public  class ItemPurchaseValidation
    {
       public bool? TransactionId { set; get; }
        public bool? Reason { set; get; }
        public bool? TransactionType { set; get; }
        public bool? Quantity { set; get; }
        public bool? UnitCost { set; get; }
        public bool? UnitSale{ set; get; }
        public bool? InStock { set; get; }
        public bool? DiscountAmount { set; get; }
        public bool? Vat { set; get; }
        public bool? Tax { set; get; }
        public bool? SerialNo { set; get; }
        public bool? TransactionDate { set; get; }
        public bool? Comments { set; get; }
        public bool? GrvNo { set; get; }
        public bool? InvoiceNo { set; get; }
        public bool? ChalanNo { set; get; }
        public bool? Item_Id { set; get; }
        public bool? Location_Id { set; get; }
        public bool? Supplier_Id { set; get; }
        public bool? Party_Id { set; get; }
        public bool? Customer_Id { set; get; }
        public bool? GrvDate { set; get; }
        public bool? Approver_Id { set; get; }
        public bool? Ledger_Id { set; get; }
        public bool? SubLedger_Id { set; get; }
        public bool? PaymentMode { set; get; }
        public bool? DiscountRateTransaction { set; get; }
        public bool? DiscountRateGroup { set; get; }
        public bool? TotalAmountTransaction { set; get; }
        public bool? TotalAmountGroup { set; get; }
        public bool? QuantityGroup { set; get; }
        public bool? NetPayableAmount { set; get; }
        public bool? PaidAmount { set; get; }
        public bool? LotNo { set; get; }
        public bool? DiscountAmountGroup { set; get; }
    }
}
