using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class VoucherDetailInfo
    {
        public string Id { get; set; }
        public int? Lineno { get; set; }
        public double? Amount { get; set; }
        public int? GroupId { get; set; }
        public int? LevelId { get; set; }
        public int? AccId { get; set; }
        public string AccountDescription { get; set; }
        public string AccountId { get; set; }
        public double? Vat { get; set; }
        public double? Tax { get; set; }
        public List<SubLedgerTransactionInfo> SubLedgerTransactions { get; set; }
    }
}
