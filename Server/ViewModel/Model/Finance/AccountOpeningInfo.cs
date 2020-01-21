using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model.Finance
{
    public class AccountOpeningInfo
    {
        public string Id { get; set; }
        public string BranchCode { set; get; }
        public string BranchId { set; get; }
        public decimal? Amount { set; get; }
        public DateTime OpeningDate { set; get; }
        public string AutoAccountCode { set; get; }
        public string AccountId { set; get; }
    }
}
