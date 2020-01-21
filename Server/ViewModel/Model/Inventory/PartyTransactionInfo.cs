using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class PartyTransactionInfo
    {
        public string Id { get; set; }
        public string ChalanNo { set; get; }
        public string InvoiceNo { set; get; }
        public string OrderNo { set; get; }
        public string Customer_Id { set; get; }
        public string CustomerName { set; get; }
        public string Group_Id { set; get; }
        public int? PaymentMode { set; get; }
        public DateTime? PaymentDate { set; get; }
        public string Ledger_Id { set; get; }
        public string LedgerName { set; get; }
        public string SubLedger_Id { set; get; }
        public string SubLedgerName { set; get; }
        public decimal PaidAmount { set; get; }
        public bool? IsFirstTransaction { set; get; }
        public List<CustomerSupplierTransactionDetailsInfo> TransactionDetailsList { set; get; }

    }
}
