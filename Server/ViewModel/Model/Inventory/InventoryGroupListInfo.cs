using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class InventoryGroupListInfo
    {
        public string Id { get; set; }
        public string TransactionId { set; get; }
        public string TransactionType { set; get; }
        public int Quantity { set; get; }
        public decimal TotalAmount { set; get; }
        public decimal Vat { set; get; }
        public decimal Tax { set; get; }
        public decimal DiscountRate { set; get; }
        public decimal DiscountAmount { set; get; }
        public decimal NetPayableAmount { set; get; }
        public decimal PaidAmount { set; get; }
        public string ChalanNo { set; get; }
        public string InvoiceNo { set; get; }
        public string Comments { set; get; }
        public DateTime? TransactionDate { set; get; }
        public String GrvNo { set; get; }
        public string SupplierName { set; get; }
        public DateTime GrvDate { set; get; }
        public string PartyName { set; get; }
        public string CustomerName { set; get; }
    }
}
