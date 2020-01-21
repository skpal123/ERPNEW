using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class CustomerSupplierTransactionDetailsInfo
    {
        public string Id { get; set; }
        public string InvoiceNo{ set; get; }
        public string TransactionId{ set; get; }
        public  string Group_Id{ set; get; }
        public  string CustomerTransaction_Id{ set; get; }
        public  string SupplierTransaction_Id{ set; get; }
        public DateTime? PaymentDate{ set; get; }
        public decimal PaidAmount { set; get; }
    }
}
