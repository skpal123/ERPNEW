using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class ItemTransactionInfo
    {
        public string Id { get; set; }
        public string TransactionId { set; get; }
        public string Reason { set; get; }
        public string TransactionType { set; get; }
        public int Quantity { set; get; }
        public decimal UnitCost { set; get; }
        public decimal UnitSale { set; get; }
        public decimal Vat { set; get; }
        public decimal Tax { set; get; }
        public decimal DiscountRate { set; get; }
        public decimal DiscountAmount { set; get; }
        public string SerialNo { set; get; }
        public string LotNo { set; get; }
        public DateTime? TransactionDate { set; get; }
        public string Group_Id { set; get; }
        public string Item_Id { set; get; }
        public string ItemName { set; get; }
        public string Location_Id { set; get; }
        public string LocationName { set; get; }
    }
}
