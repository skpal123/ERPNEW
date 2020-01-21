namespace ViewModel.Model.Validation.Inventory
{
    public class InventoryItemValidation
    {
        public bool? ItemId { set; get; }
        public bool? ItemCode { set; get; }
        public bool? ItemName { set; get; }
        public bool? Category_Id { set; get; }
        public bool? SubCategory_Id { set; get; }
        public bool? SubCategoryName { set; get; }
        public bool? UnitId { set; get; }
        public bool? Ledger_Id { set; get; }
        public bool? SubLedger_Id { set; get; }
    }
}
