using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class InventoryItemInfo
    {
        public string Id { get; set; }
        public string ItemId { set; get; }
        public string ItemCode { set; get; }
        public string ItemName { set; get; }
        public string Category_Id { set; get; }
        public string CategoryName { set; get; }
        public string SubCategory_Id { set; get; }
        public string SubCategoryName { set; get; }
        public string UnitId { set; get; }
        public string UnitName { set; get; }
        public string Ledger_Id { set; get; }
        public string LedgerName { set; get; }
        public string SubLedger_Id { set; get; }
        public string SubLedgerName { set; get; }
    }
}
