namespace ViewModel.Model.Validation.Inventory
{
    public class CustomerTransactionValidation
    {
        public bool? Customer_Id { set; get; }
        public bool? PaymentMode { set; get; }
        public bool? PaymentDate { set; get; }
        public bool? Ledger_Id { set; get; }
        public bool? SubLedger_Id { set; get; }
        public bool? PaymentType { set; get; }
        public bool? PaymentMethod { set; get; }
        public bool? PayAmount { set; get; }
        public bool? TotalDueAdvanceAmount { set; get; }
    }
}
